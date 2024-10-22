use std::env;
use std::error::Error;

use dotenv::dotenv;
pub fn read_env_value(key: &str) -> Result<String, Box<dyn Error>> {
    dotenv().expect("Failed to read .env file");
    let env_val = env::var(&key).expect(&format!("{} must be set", &key));
    Ok(env_val)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    /// テスト前に以下の準備が必要
    /// 準備がないままにテストした場合は、テストが失敗することに注意
    ///
    /// .envにテスト用のデータの準備が必要
    /// TEST_VALUE=test_value
    fn test_read_env_value() {
        let expected = "test_value";
        let result = read_env_value("TEST_VALUE").unwrap();
        assert_eq!(result, expected);
    }
}
