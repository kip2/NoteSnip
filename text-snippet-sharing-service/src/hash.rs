use blake3::Hasher;
use uuid::Uuid;

pub fn generate_random_hash() -> String {
    let uuid = Uuid::new_v4();
    let salt = uuid.as_bytes();
    let random_hash = generate_hash(salt);
    random_hash
}

fn generate_hash(salt: &[u8]) -> String {
    let mut hasher = Hasher::new();
    hasher.update(salt);
    let hash = hasher.finalize();

    let hash_stirng = hash.to_hex().to_string();
    hash_stirng
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_hash() {
        let hash_v = generate_hash(b"hello world");

        let expected =
            "d74981efa70a0c880b8d8c1985d075dbcbf679b99a5f9914e5aaf96b831a9e24".to_string();

        assert_eq!(hash_v, expected);
    }
}
