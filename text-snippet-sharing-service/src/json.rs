use serde::{Deserialize, Serialize};
use std::error::Error;

use crate::{db::generate_db_connection, hash::generate_random_hash, url::generate_url};

#[derive(Deserialize)]
pub struct RequestJson {
    pub snippet: String,
    pub expiration_stat: String,
}

#[derive(Serialize)]
pub struct ResponseJson {
    pub url: String,
}

trait Queryable {
    fn generate_query(&self) -> String;
}

impl Queryable for RequestJson {
    fn generate_query(&self) -> String {
        "INSERT INTO snippets (url_hash, snippet, expiration_stat) VALUES ($1, $2, $3)".to_string()
    }
}

#[derive(Debug)]
struct ValidationError(String);

impl std::fmt::Display for ValidationError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Validation error: {}", self.0)
    }
}

impl Error for ValidationError {}

impl RequestJson {
    fn validate(&self) -> bool {
        match self.expiration_stat.as_str() {
            "10min" | "1hour" | "1day" | "1mon" | "eternal" => true,
            _ => false,
        }
    }

    pub async fn query(&self) -> Result<ResponseJson, Box<dyn Error>> {
        let pool = generate_db_connection().await?;
        let transaction = pool.begin().await?;
        let url_hash = generate_random_hash().unwrap();

        if !self.validate() {
            transaction.rollback().await?;
            return Err(Box::new(ValidationError(
                "Invalid expiration_stat value".to_string(),
            )));
        }

        let query = self.generate_query();
        if let Err(e) = sqlx::query(&query)
            .bind(&url_hash)
            .bind(&self.snippet)
            .bind(&self.expiration_stat)
            .execute(&pool)
            .await
        {
            transaction.rollback().await?;
            return Err(Box::new(e));
        }

        transaction.commit().await?;

        // レスポンス用のJSONを作成する処理
        let url = generate_url(&url_hash).unwrap();
        let response_json = ResponseJson { url: url };
        Ok(response_json)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_query() {
        let json = RequestJson {
            snippet: "test snippet".to_string(),
            expiration_stat: "eternal".to_string(),
        };

        let expected =
            "INSERT INTO snippets (url_hash, snippet, expiration_stat) VALUES ($1, $2, $3)"
                .to_string();

        let result = json.generate_query();
        assert_eq!(result, expected);
    }

    /// DBへのインサート処理のテスト用コード
    /// インサートするのみでアサートは行わない
    #[tokio::test]
    async fn test_execute_insert() {
        let json = RequestJson {
            snippet: "test snippet".to_string(),
            expiration_stat: "eternal".to_string(),
        };

        json.query().await.unwrap();
    }
}
