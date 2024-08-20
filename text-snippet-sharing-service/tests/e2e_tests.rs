use reqwest::Client;
use serde_json::json;

#[cfg(test)]
mod tests {
    use super::*;

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_submit_with_eternal_status() {
        let url = "http://127.0.0.1:8080/submit";

        let client = Client::new();

        // eternal
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

    /// 以下のテストは、事前準備をしてから行うこと
    /// 1.Dockerによる検証環境の立ち上げ
    /// 2.APIアプリを起動状態にする
    #[tokio::test]
    async fn test_api_submit_with_1mon_status() {
        let url = "http://127.0.0.1:8080/submit";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
            "expiration_stat" : "1mon",
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
    async fn test_api_submit_with_1day_status() {
        let url = "http://127.0.0.1:8080/submit";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
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
    async fn test_api_submit_with_1hour_status() {
        let url = "http://127.0.0.1:8080/submit";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
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
    async fn test_api_submit_with_10min_status() {
        let url = "http://127.0.0.1:8080/submit";

        let client = Client::new();

        // eternal
        let request_body = json!({
            "snippet": "test snippet",
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
    async fn test_api_submit_with_error_status() {
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
