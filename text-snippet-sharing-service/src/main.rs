use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use sqlx::query;
use url::generate_url;

mod db;
mod env;
mod hash;
mod url;

#[derive(Deserialize)]
struct RequestJson {
    snippet: String,
    expiration_stat: String,
}

trait Queryable {
    fn generate_query(&self) -> String;
}

impl Queryable for RequestJson {
    fn generate_query(&self) -> String {
        "INSERT INTO snippets (domain, snippet, expiration_stat) VALUES (?, ?, ?)".to_string()
    }
}

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

#[derive(Serialize)]
struct ResponseJson {
    domain: String,
}

#[post("/submit")]
async fn submit_json(request_data: web::Json<RequestJson>) -> impl Responder {
    let domain_str = generate_url().unwrap();
    let respose = ResponseJson { domain: domain_str };

    HttpResponse::Ok().json(respose)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(submit_json))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
