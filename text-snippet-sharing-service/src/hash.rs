use sqids::Sqids;
use std::error::Error;
use uuid::Uuid;

use crate::{
    db::{generate_db_connection, SnippetData},
    json::ErrorResponse,
};

#[derive(Debug, PartialEq)]
pub struct RequestHash {
    hash: String,
}

#[derive(Debug, PartialEq)]
pub struct ResponseViewData {
    snippet: String,
    expiration_stat: String,
}

impl RequestHash {
    fn generate_query(&self) -> String {
        "SELECT * FROM snippets WHERE url_hash = $1".to_string()
    }

    // todo: 有効期限切れのデータの場合の処理を追加する
    pub async fn search(&self) -> Result<ResponseViewData, ErrorResponse> {
        let pool = generate_db_connection().await.map_err(|e| {
            eprintln!("Database connection error: {:?}", e);
            ErrorResponse {
                error: "Internal server error".to_string(),
            }
        })?;

        let query = self.generate_query();

        let query_result = sqlx::query_as::<_, SnippetData>(&query)
            .bind(&self.hash)
            .fetch_optional(&pool)
            .await
            .map_err(|e| {
                eprintln!("Database Query failed: {:?}", e);
                ErrorResponse {
                    error: "Internal server error".to_string(),
                }
            })?;

        let snippet_data = match query_result {
            Some(data) => data,
            None => {
                return Err(ErrorResponse {
                    error: "No data found".to_string(),
                });
            }
        };

        let response_view_data = ResponseViewData {
            snippet: snippet_data.snippet,
            expiration_stat: snippet_data.expiration_stat,
        };

        Ok(response_view_data)
    }
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
