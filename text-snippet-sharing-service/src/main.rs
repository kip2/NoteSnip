use std::env;

use dotenv::dotenv;
use hash_util::generate_random_hash;

mod hash_util;

fn main() {
    let result = generate_url();
    println!("{}", result);
}

fn generate_url() -> String {
    let url_prefix = read_env_value("DOMAIN_PREFIX".to_string());
    let random_hash = generate_random_hash();
    let url = format!("{}{}", url_prefix, random_hash);
    url
}

fn read_env_value(key: String) -> String {
    dotenv().expect("Failed to read .env file");
    let env_val = env::var(&key).expect(&format!("{} must be set", &key));
    env_val
}
