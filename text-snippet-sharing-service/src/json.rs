use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct RequestJson {
    pub snippet: String,
    pub expiration_stat: String,
}

#[derive(Serialize)]
pub struct ResponseJson {
    pub domain: String,
}

trait Queryable {
    fn generate_query(&self) -> String;
}

impl Queryable for RequestJson {
    // 変数のバインドはクエリ実行側で行うこと
    fn generate_query(&self) -> String {
        "INSERT INTO snippets (domain, snippet, expiration_stat) VALUES (?, ?, ?)".to_string()
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_query() {
        let json = RequestJson {
            snippet: "test snippet".to_string(),
            expiration_stat: "etnl".to_string(),
        };

        let expected =
            "INSERT INTO snippets (domain, snippet, expiration_stat) VALUES (?, ?, ?)".to_string();

        let result = json.generate_query();
        assert_eq!(result, expected);
    }
}
