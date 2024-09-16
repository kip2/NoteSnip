use chrono::{DateTime, Duration, Utc};
use sqlx::{PgPool, Pool, Postgres};
use std::error::Error;

use crate::env::read_env_value;

#[derive(Debug, PartialEq, sqlx::FromRow)]
pub struct SnippetData {
    pub id: i64,
    pub url_hash: String,
    pub snippet: String,
    pub snippet_language: String,
    pub expiration_stat: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl SnippetData {
    pub fn is_not_expired(&self) -> bool {
        let now: DateTime<Utc> = Utc::now();

        let created_at_utc = self.created_at.with_timezone(&Utc);

        match self.expiration_stat.as_str().trim() {
            "10min" => {
                let expiration_time = created_at_utc + Duration::minutes(10);
                now < expiration_time
            }
            "1hour" => {
                let expiration_time = created_at_utc + Duration::hours(1);
                now < expiration_time
            }
            "1day" => {
                let expiration_time = created_at_utc + Duration::days(1);
                now < expiration_time
            }
            "1week" => {
                let expiration_time = created_at_utc + Duration::weeks(1);
                now < expiration_time
            }
            "eternal" => true,
            _ => false,
        }
    }
}

pub async fn generate_db_connection() -> Result<Pool<Postgres>, Box<dyn Error>> {
    let database_url = read_env_value("DATABASE_URL")?;
    let pool = PgPool::connect(&database_url).await?;

    Ok(pool)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_is_expired() {
        let snippet = SnippetData {
            id: 1,
            url_hash: "examplehash".to_string(),
            snippet: "example snippet".to_string(),
            snippet_language: "plain text".to_string(),
            expiration_stat: "1week".to_string(),
            created_at: Utc::now() - Duration::days(5),
            updated_at: Utc::now(),
        };

        assert!(snippet.is_not_expired());

        let snippet = SnippetData {
            id: 1,
            url_hash: "examplehash".to_string(),
            snippet: "example snippet".to_string(),
            snippet_language: "plain text".to_string(),
            expiration_stat: "1week".to_string(),
            created_at: Utc::now() - Duration::days(8),
            updated_at: Utc::now(),
        };

        assert!(!snippet.is_not_expired());
    }
}
