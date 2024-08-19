use crate::env::read_env_value;
use std::error::Error;

pub fn generate_url(url_hash: &str) -> Result<String, Box<dyn Error>> {
    let url_prefix = read_env_value("URL_PREFIX")?;
    let url = format!("{}{}", url_prefix, url_hash);
    Ok(url)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_hash() {
        let hash = "123456778900";

        let url_prefix = read_env_value("URL_PREFIX").unwrap();
        let expected = format!("{}{}", url_prefix, hash);

        let result = generate_url(hash).unwrap();

        assert_eq!(result, expected);
    }
}
