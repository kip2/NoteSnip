use serde::Serialize;
use sqids::Sqids;
use std::error::Error;
use uuid::Uuid;

use crate::{
    db::{generate_db_connection, SnippetData},
    error::MapToInternalServerError,
    register::ErrorResponse,
};

#[derive(Debug, PartialEq)]
pub struct RequestHash {
    pub hash: String,
}

#[derive(Debug, PartialEq, Serialize)]
pub struct ResponseViewData {
    snippet: String,
    snippet_language: String,
    expiration_stat: String,
}

impl RequestHash {
    fn generate_query(&self) -> String {
        "SELECT * FROM snippets WHERE url_hash = $1".to_string()
    }

    pub async fn search(&self) -> Result<ResponseViewData, ErrorResponse> {
        let pool = generate_db_connection()
            .await
            .map_to_internal_server_error("Database connection error")?;

        let query = self.generate_query();

        let query_result = sqlx::query_as::<_, SnippetData>(&query)
            .bind(&self.hash)
            .fetch_optional(&pool)
            .await
            .map_to_internal_server_error("Database query failed")?;

        let snippet_data = match query_result {
            Some(data) => data,
            None => {
                return Err(ErrorResponse {
                    error: "No data found".to_string(),
                });
            }
        };

        if !snippet_data.is_not_expired() {
            return Err(ErrorResponse {
                error: "Data is expired".to_string(),
            });
        }

        let response_view_data = ResponseViewData {
            snippet: snippet_data.snippet,
            snippet_language: snippet_data.snippet_language,
            expiration_stat: snippet_data.expiration_stat,
        };

        Ok(response_view_data)
    }
}

pub fn generate_hash() -> Result<String, Box<dyn Error>> {
    let uuid = Uuid::new_v4();
    let uuid_bytes = uuid.as_bytes();
    let sqids = Sqids::default();

    let part1 = u64::from_be_bytes(uuid_bytes[0..8].try_into().unwrap());
    let part2 = u64::from_be_bytes(uuid_bytes[8..16].try_into().unwrap());

    Ok(sqids.encode(&[part1, part2]).unwrap())
}

#[cfg(test)]
mod tests {
    use super::*;
    /// DBからのデータ取得テスト用
    /// テストデータをDBにシードしてから行うこと
    #[tokio::test]
    async fn test_search() {
        let request = RequestHash {
            hash: "XTWDuRIIqvq0bF7v5Z75sMRd".to_string(),
        };

        let result = request.search().await.unwrap();

        let expected = ResponseViewData {
            snippet: "Example Snippet".to_string(),
            snippet_language: "plain text".to_string(),
            expiration_stat: "eternal".to_string(),
        };

        assert_eq!(result, expected);
    }

    #[tokio::test]
    async fn test_search_no_data() {
        let request = RequestHash {
            hash: "no data hash".to_string(),
        };

        let result = request.search().await;

        let expected_error = "No data found";

        match result {
            Ok(_) => panic!("Expected an error but got Ok result"),
            Err(e) => {
                assert_eq!(e.error, expected_error);
            }
        }
    }

    /// DBからのデータ取得テスト用
    /// テストデータをDBにシードしてから行うこと
    #[tokio::test]
    async fn test_search_with_expired_data() {
        let request = RequestHash {
            hash: "KRi1XopV7HZQ5PAkaofbCma4".to_string(),
        };

        let result = request.search().await;

        let expected_error = "Data is expired";

        match result {
            Ok(_) => panic!("Expected an error but got Ok result"),
            Err(e) => {
                assert_eq!(e.error, expected_error);
            }
        }
    }
}
