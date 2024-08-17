use hash_util::generate_random_hash;

mod hash_util;

fn main() {
    let result = generate_url();
    println!("{}", result);
}

fn generate_url() -> String {
    let url_prefix = "https://domain/path/".to_string();
    let random_hash = generate_random_hash();
    let url = format!("{}{}", url_prefix, random_hash);
    url
}

#[test]
fn test_generate_domain() {
    let result = generate_url();
    let expected = "https://domain/path/";

    assert_eq!(result, expected);
}
