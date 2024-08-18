use sqlx::{PgPool, Pool, Postgres};
use std::error::Error;

use crate::{env::read_env_value, RequestJson};

pub async fn execute_query(data: RequestJson) -> Result<(), Box<dyn Error>> {
    data.query().await?;

    Ok(())
}

pub async fn generate_db_connection() -> Result<Pool<Postgres>, Box<dyn Error>> {
    let database_url = read_env_value("DATABASE_URL")?;
    let pool = PgPool::connect(&database_url).await?;

    Ok(pool)
}

// todo: あとで削除すること
#[tokio::test]
async fn test_execute_query() {
    let json = RequestJson {
        snippet: "test snippet".to_string(),
        expiration_stat: "etnl".to_string(),
    };

    execute_query(json).await.unwrap();
}