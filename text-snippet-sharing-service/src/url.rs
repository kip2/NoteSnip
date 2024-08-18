use crate::env::read_env_value;
use crate::hash::generate_random_hash;

pub fn generate_url() -> String {
    let url_prefix = read_env_value("DOMAIN_PREFIX");
    let random_hash = generate_random_hash();
    let url = format!("{}{}", url_prefix, random_hash);
    url
}
