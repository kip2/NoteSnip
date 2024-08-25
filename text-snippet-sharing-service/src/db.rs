use chrono::{DateTime, Utc};
use sqlx::{PgPool, Pool, Postgres};
use std::error::Error;

use crate::env::read_env_value;

#[derive(Debug, PartialEq, sqlx::FromRow)]
pub struct SnippetData {
    pub id: i64,
    pub url_hash: String,
    pub snippet: String,
    pub expiration_stat: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

pub async fn generate_db_connection() -> Result<Pool<Postgres>, Box<dyn Error>> {
    let database_url = read_env_value("DATABASE_URL")?;
    let pool = PgPool::connect(&database_url).await?;

    Ok(pool)
}
