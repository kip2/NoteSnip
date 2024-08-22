use sqids::Sqids;
use std::error::Error;
use uuid::Uuid;

pub fn generate_hash() -> Result<String, Box<dyn Error>> {
    let uuid = Uuid::new_v4();
    let uuid_bytes = uuid.as_bytes();
    let sqids = Sqids::default();

    let part1 = u64::from_be_bytes(uuid_bytes[0..8].try_into().unwrap());
    let part2 = u64::from_be_bytes(uuid_bytes[8..16].try_into().unwrap());

    Ok(sqids.encode(&[part1, part2]).unwrap())
}
