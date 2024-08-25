use sqids::Sqids;
use sqlx::Row;
use std::error::Error;
use uuid::Uuid;

use crate::{db::generate_db_connection, json::ErrorResponse};

#[derive(Debug)]
pub struct RequestHash {
    hash: String,
}

impl RequestHash {
    fn generate_query(&self) -> String {
        "SELECT * FROM snippets WHERE url_hash = $1".to_string()
    }

    pub async fn search(&self) -> Result<ResponseViewData, ErrorResponse> {
        let pool = generate_db_connection().await.map_err(|e| {
            eprintln!("Database connection error: {:?}", e);
            ErrorResponse {
                error: "Internal server error".to_string(),
            }
        })?;

        let url_hash = "XTWDuRIIqvq0bF7v5Z75sMRd".to_string();
        let query = self.generate_query();
        let result = sqlx::query(&query)
            .bind(url_hash)
            .fetch_one(&pool)
            .await
            .unwrap();

        let snippet = result.try_get("snippet").unwrap();
        let expiration_stat = result.try_get("expiration_stat").unwrap();

        let response_view_data = ResponseViewData {
            snippet: snippet,
            expiration_stat: expiration_stat,
        };

        Ok(response_view_data)
    }
}

#[derive(Debug, PartialEq)]
pub struct ResponseViewData {
    snippet: String,
    expiration_stat: String,
}

/// DBからのデータ取得テスト用
/// 環境によりデータが違うため、必ず動くわけではないことに注意する
#[tokio::test]
async fn test_search() {
    let request = RequestHash {
        hash: "XTWDuRIIqvq0bF7v5Z75sMRd".to_string(),
    };

    let result = request.search().await.unwrap();

    let expected = ResponseViewData {
        snippet: "Example Snippet".to_string(),
        expiration_stat: "eternal".to_string(),
    };

    println!("result: {:?}", result);
    println!("expected: {:?}", expected);
    assert_eq!(result, expected);
}

pub fn generate_hash() -> Result<String, Box<dyn Error>> {
    let uuid = Uuid::new_v4();
    let uuid_bytes = uuid.as_bytes();
    let sqids = Sqids::default();

    let part1 = u64::from_be_bytes(uuid_bytes[0..8].try_into().unwrap());
    let part2 = u64::from_be_bytes(uuid_bytes[8..16].try_into().unwrap());

    Ok(sqids.encode(&[part1, part2]).unwrap())
}
