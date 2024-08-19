use sqlx::{PgPool, Pool, Postgres};
use std::error::Error;

use crate::env::read_env_value;

pub async fn generate_db_connection() -> Result<Pool<Postgres>, Box<dyn Error>> {
    let database_url = read_env_value("DATABASE_URL")?;
    let pool = PgPool::connect(&database_url).await?;

    Ok(pool)
}
