use reqwest::Client;
use serde_json::json;

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_api_submit() {
        let url = "http://127.0.0.1:8080/submit";

        let client = Client::new();

        let request_body = json!({
            "snippet": "test snippet",
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

    #[tokio::test]
    async fn test_api_submit_error() {
        let url = "http://127.0.0.1:8080/submit";

        let client = Client::new();

        let request_body = json!({
            "snippet": "test snippet",
            // 無効なステータスをセット
            "expiration_stat" : "abcde",
        });

        let response = client
            .post(url)
            .json(&request_body)
            .send()
            .await
            .expect("Failed to send request");

        assert_eq!(response.status(), 500);
    }
}
