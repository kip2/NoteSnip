use std::env;

use dotenv::dotenv;
pub fn read_env_value(key: String) -> String {
    dotenv().expect("Failed to read .env file");
    let env_val = env::var(&key).expect(&format!("{} must be set", &key));
    env_val
}
