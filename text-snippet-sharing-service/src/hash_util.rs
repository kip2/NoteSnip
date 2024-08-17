use blake3::{Hash, Hasher};
use uuid::Uuid;

pub fn generate_random_hash() -> Hash {
    let uuid = Uuid::new_v4();
    let salt = uuid.as_bytes();
    let random_hash = generate_hash(salt);
    random_hash
}

fn generate_hash(salt: &[u8]) -> Hash {
    let mut hasher = Hasher::new();
    hasher.update(salt);
    let hash = hasher.finalize();

    hash
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::convert::TryInto;

    #[test]
    fn test_generate_hash() {
        let hash_v = generate_hash(b"hello world");

        let expected_hex = "d74981efa70a0c880b8d8c1985d075dbcbf679b99a5f9914e5aaf96b831a9e24";
        let expected_bytes: [u8; 32] = hex::decode(expected_hex)
            .expect("Invalid hex string")
            .try_into()
            .expect("Expected a 32-byte array");
        let expected = Hash::from(expected_bytes);

        assert_eq!(hash_v, expected);
    }
}
