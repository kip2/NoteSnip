use std::{collections::HashSet, fs::File, io::BufReader};

use serde::{Deserialize, Serialize};
use thiserror::Error;

use crate::{
    db::generate_db_connection, env::read_env_value, hash::generate_hash, url::generate_url,
};

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub snippet: String,
    pub snippet_language: String,
    pub expiration_stat: String,
}

#[derive(Debug, Serialize)]
pub struct RegisterResponse {
    pub url: String,
}

#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub error: String,
}

trait Insertable {
    fn generate_query(&self) -> String;
}

impl Insertable for RegisterRequest {
    fn generate_query(&self) -> String {
        "INSERT INTO snippets (url_hash, snippet, snippet_language, expiration_stat) VALUES ($1, $2, $3, $4)".to_string()
    }
}

#[derive(Debug, Error)]
#[error("Validation error: {0}")]
struct ValidationError(String);

#[derive(Debug, Deserialize, Clone)]
struct ValidSnippetLanguages {
    snippet_languages: HashSet<String>,
}

impl ValidSnippetLanguages {
    fn new() -> Result<Self, ErrorResponse> {
        let file_path = read_env_value("SNIPPET_LANGUAGES_PATH").map_err(|e| {
            eprintln!("Snippet language validate file path is not set");
            ErrorResponse {
                error: "Internal serve error".to_string(),
            }
        })?;

        let file = File::open(file_path).map_err(|e| {
            eprintln!("Failed to open file: {}", e);
            ErrorResponse {
                error: "Internal serve error".to_string(),
            }
        })?;

        let reader = BufReader::new(file);

        let mut valid_snippet_languages: ValidSnippetLanguages = serde_json::from_reader(reader)
            .map_err(|e| {
                eprintln!("Failed to read snippet languages file: {}", e);
                ErrorResponse {
                    error: "Internal serve error".to_string(),
                }
            })?;

        valid_snippet_languages.snippet_languages = valid_snippet_languages
            .snippet_languages
            .into_iter()
            .map(|lang| lang.to_lowercase())
            .collect();

        Ok(valid_snippet_languages.clone())
    }

    pub fn validate_language(&self, language: &str) -> bool {
        self.snippet_languages.contains(&language.to_lowercase())
    }
}

impl RegisterRequest {
    fn validate_expiration_stat(&self) -> bool {
        match self.expiration_stat.as_str() {
            "10min" | "1hour" | "1day" | "1week" | "eternal" => true,
            _ => false,
        }
    }

    fn validate_snippet_language(&self) -> Result<bool, ErrorResponse> {
        let valid_snippet_languages = ValidSnippetLanguages::new()?;
        Ok(valid_snippet_languages.validate_language(&self.snippet_language))
    }

    pub async fn query(&self) -> Result<RegisterResponse, ErrorResponse> {
        let pool = generate_db_connection().await.map_err(|e| {
            eprintln!("Database connection error: {:?}", e);
            ErrorResponse {
                error: "Internal server error".to_string(),
            }
        })?;

        let transaction = pool.begin().await.map_err(|e| {
            eprintln!("Transaction start error: {:?}", e);
            ErrorResponse {
                error: "Internal server error".to_string(),
            }
        })?;
        let url_hash = generate_hash().map_err(|e| {
            eprintln!("Hash generation error: {:?}", e);
            ErrorResponse {
                error: "Internal server error".to_string(),
            }
        })?;

        if !self.validate_expiration_stat() {
            transaction.rollback().await.ok();
            return Err(ErrorResponse {
                error: "Invalid expiration_stat value".to_string(),
            });
        }

        if !self.validate_snippet_language()? {
            transaction.rollback().await.ok();
            return Err(ErrorResponse {
                error: "Invalid snippet_language value".to_string(),
            });
        }

        let query = self.generate_query();
        if let Err(e) = sqlx::query(&query)
            .bind(&url_hash)
            .bind(&self.snippet)
            .bind(&self.snippet_language)
            .bind(&self.expiration_stat)
            .execute(&pool)
            .await
        {
            transaction.rollback().await.ok();
            eprintln!("Database query failed: {:?}", e);
            return Err(ErrorResponse {
                error: "Internal server error".to_string(),
            });
        }

        transaction.commit().await.map_err(|e| {
            eprintln!("Transaction commit error: {:?}", e);
            ErrorResponse {
                error: "Internal server error".to_string(),
            }
        })?;

        // レスポンス用のJSONを作成する処理
        let url = generate_url(&url_hash).map_err(|e| {
            eprintln!("URL generation error: {:?}", e);
            ErrorResponse {
                error: "Internal server error".to_string(),
            }
        })?;
        let response_json = RegisterResponse { url: url };

        Ok(response_json)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_validate_snippet_language() {
        let json = RegisterRequest {
            snippet: "test snippet".to_string(),
            snippet_language: "Rust".to_string(),
            expiration_stat: "eternal".to_string(),
        };

        assert!(json.validate_snippet_language());
    }

    #[test]
    fn test_validate_snippet_language_fails_with_invalid_value() {
        let json = RegisterRequest {
            snippet: "test snippet".to_string(),
            snippet_language: "abcdefg".to_string(),
            expiration_stat: "eternal".to_string(),
        };

        assert!(!json.validate_snippet_language());
    }

    #[test]
    fn test_validate_expiration_stat() {
        let json = RegisterRequest {
            snippet: "test snippet".to_string(),
            snippet_language: "plain text".to_string(),
            expiration_stat: "eternal".to_string(),
        };

        assert!(json.validate_expiration_stat());
    }

    #[test]
    fn test_validate_expiration_stat_fails_with_invalid_value() {
        let json = RegisterRequest {
            snippet: "test snippet".to_string(),
            snippet_language: "plain text".to_string(),
            // invalid value
            expiration_stat: "abcdefg".to_string(),
        };

        assert!(!json.validate_expiration_stat());
    }

    #[test]
    fn test_generate_query() {
        let json = RegisterRequest {
            snippet: "test snippet".to_string(),
            snippet_language: "plain text".to_string(),
            expiration_stat: "eternal".to_string(),
        };

        let expected =
            "INSERT INTO snippets (url_hash, snippet, snippet_language, expiration_stat) VALUES ($1, $2, $3, $4)"
                .to_string();

        let result = json.generate_query();
        assert_eq!(result, expected);
    }

    /// DBへのインサート処理のテスト用コード
    /// インサートするのみでアサートは行わない
    ///
    /// ローカル環境の場合、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_execute_insert() {
        let json = RegisterRequest {
            snippet: "test snippet".to_string(),
            snippet_language: "plain text".to_string(),
            expiration_stat: "eternal".to_string(),
        };

        json.query().await.unwrap();
    }

    #[test]
    fn test_new_valid_snippet_language() {
        let valid_languages: HashSet<String> = vec![
            "c++".to_string(),
            "javascript".to_string(),
            "rust".to_string(),
            "typescript".to_string(),
        ]
        .into_iter()
        .collect();

        let valid_snippet_languages = ValidSnippetLanguages {
            snippet_languages: valid_languages,
        };

        assert!(valid_snippet_languages.validate_language("C++"));
        assert!(valid_snippet_languages.validate_language("JavaScript"));
        assert!(valid_snippet_languages.validate_language("Rust"));
        assert!(valid_snippet_languages.validate_language("TypeScript"));
    }

    #[test]
    fn test_validate_language_empty() {
        let valid_languages: HashSet<String> = HashSet::new();

        let valid_snippet_languages = ValidSnippetLanguages {
            snippet_languages: valid_languages,
        };

        assert!(!valid_snippet_languages.validate_language("Rust"));
        assert!(!valid_snippet_languages.validate_language("Python"));
        assert!(!valid_snippet_languages.validate_language("JavaScript"));
    }
}
