mod env;
mod hash;
mod url;

use url::generate_url;

fn main() {
    let result = generate_url();
    println!("{}", result);
}
