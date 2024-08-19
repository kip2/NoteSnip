use crate::env::read_env_value;
use crate::hash::generate_random_hash;
use std::error::Error;

pub fn generate_url() -> Result<String, Box<dyn Error>> {
    let url_prefix = read_env_value("URL_PREFIX")?;
    let random_hash = generate_random_hash().unwrap();
    let url = format!("{}{}", url_prefix, random_hash);
    Ok(url)
}
