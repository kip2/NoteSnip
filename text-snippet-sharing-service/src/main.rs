use hash_util::generate_random_hash;

mod hash_util;

fn main() {
    let result = generate_random_hash();
    println!("{}", result);
}
