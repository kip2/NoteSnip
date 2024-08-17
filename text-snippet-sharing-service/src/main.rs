use hash_util::generate_hash;

mod hash_util;

fn main() {
    let salt = b"hello world";
    let result = generate_hash(salt);
    println!("{}", result);
}
