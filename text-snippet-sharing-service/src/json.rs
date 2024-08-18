use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};
use std::error::Error;

use crate::url::generate_url;

#[derive(Deserialize)]
pub struct RequestJson {
    pub snippet: String,
    pub expiration_stat: String,
}

#[derive(Serialize)]
pub struct ResponseJson {
    pub domain: String,
}

trait Queryable {
    fn generate_query(&self) -> String;
}

impl Queryable for RequestJson {
    // 変数のバインドはクエリ実行側で行うこと
    fn generate_query(&self) -> String {
        "INSERT INTO snippets (domain, snippet, expiration_stat) VALUES ($1, $2, $3)".to_string()
    }
}

impl RequestJson {
    pub async fn insert(&self, pool: Pool<Postgres>) -> Result<(), Box<dyn Error>> {
        let mut transaction = pool.begin().await?;
        let domain = generate_url().unwrap();

        // todo: validation

        let query = self.generate_query();
        if let Err(e) = sqlx::query(&query)
            .bind(domain)
            .bind(&self.snippet)
            .bind(&self.expiration_stat)
            .execute(&pool)
            .await
        {
            transaction.rollback().await?;
            return Err(Box::new(e));
        }

        transaction.commit().await?;
        Ok(())
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_query() {
        let json = RequestJson {
            snippet: "test snippet".to_string(),
            expiration_stat: "etnl".to_string(),
        };

        let expected =
            "INSERT INTO snippets (domain, snippet, expiration_stat) VALUES (?, ?, ?)".to_string();

        let result = json.generate_query();
        assert_eq!(result, expected);
    }
}
