use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
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
