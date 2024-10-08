use reqwest::Client;
use serde_json::json;

#[cfg(test)]
mod tests {
    use super::*;

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_register_with_eternal_status() {
        let url = "http://127.0.0.1:8000/register";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
            "snippet_language": "Rust",
            "expiration_stat" : "eternal",
        });

        let response = client
            .post(url)
            .json(&request_body)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);
    }

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_register_with_1week_status() {
        let url = "http://127.0.0.1:8000/register";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
            "snippet_language": "Rust",
            "expiration_stat" : "1week",
        });

        let response = client
            .post(url)
            .json(&request_body)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);
    }
    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_register_with_1day_status() {
        let url = "http://127.0.0.1:8000/register";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
            "snippet_language": "Rust",
            "expiration_stat" : "1day",
        });

        let response = client
            .post(url)
            .json(&request_body)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);
    }
    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_register_with_1hour_status() {
        let url = "http://127.0.0.1:8000/register";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
            "snippet_language": "Rust",
            "expiration_stat" : "1hour",
        });

        let response = client
            .post(url)
            .json(&request_body)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);
    }

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_register_with_10min_status() {
        let url = "http://127.0.0.1:8000/register";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
            "snippet_language": "Rust",
            "expiration_stat" : "10min",
        });

        let response = client
            .post(url)
            .json(&request_body)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);
    }

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_register_with_error_status() {
        let url = "http://127.0.0.1:8000/register";

        let client = Client::new();

        let request_body = json!({
            "snippet": "test snippet",
            "snippet_language": "Rust",
            // 無効なステータスをセット
            "expiration_stat" : "abcde",
        });

        let response = client
            .post(url)
            .json(&request_body)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);

        let response_body: serde_json::Value = response.json().await.expect("Failed to parse JSON");
        assert_eq!(response_body["error"], "Invalid expiration_stat value");
    }

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_get_snippet() {
        let url = "http://127.0.0.1:8000/get/XTWDuRIIqvq0bF7v5Z75sMRd";

        let client = Client::new();

        let response = client
            .get(url)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);

        let response_body: serde_json::Value = response.json().await.expect("Failed to parse JSON");
        let expected_json = json!({
            "snippet": "Example Snippet",
            "snippet_language": "plain text",
            "expiration_stat": "eternal"
        });

        assert_eq!(response_body, expected_json);
    }

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_get_snippet_with_nonexistent_data() {
        let url = "http://127.0.0.1:8000/get/NONEXIXTENT";

        let client = Client::new();

        let response = client
            .get(url)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);

        let response_body: serde_json::Value = response.json().await.expect("Failed to parse JSON");

        assert_eq!(response_body["error"], "No data found");
    }

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_get_snippet_with_expired_data() {
        let url = "http://127.0.0.1:8000/get/KRi1XopV7HZQ5PAkaofbCma4";

        let client = Client::new();

        let response = client
            .get(url)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 200);

        let response_body: serde_json::Value = response.json().await.expect("Failed to parse JSON");

        println!("response: {:?}", response_body);
        assert_eq!(response_body["error"], "Data is expired");
    }
}
