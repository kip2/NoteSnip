use blake3::{Hash, Hasher};
use std::convert::TryInto;

fn main() {
    generate_hash();
}

fn generate_hash() -> Hash {
    let mut hasher = Hasher::new();
    hasher.update(b"hello world");
    let result = hasher.finalize();

    result
}

#[test]
fn test_generate_hash() {
    let hash_v = generate_hash();

    let expected_hex = "d74981efa70a0c880b8d8c1985d075dbcbf679b99a5f9914e5aaf96b831a9e24";
    let expected_bytes: [u8; 32] = hex::decode(expected_hex)
        .expect("Invalid hex string")
        .try_into()
        .expect("Expected a 32-byte array");
    let expected = Hash::from(expected_bytes);

    assert_eq!(hash_v, expected);
}
