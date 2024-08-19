use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use json::{RequestJson, ResponseJson};

mod db;
mod env;
mod hash;
mod json;
mod url;

#[post("/submit")]
async fn submit_snippet(request_data: web::Json<RequestJson>) -> impl Responder {
    let request_json = request_data.into_inner();

    match request_json.query().await {
        Ok(response_json) => HttpResponse::Ok().json(response_json),
        Err(e) => {
            eprintln!("Failed to insert snippet: {}", e);
            HttpResponse::InternalServerError().json(ResponseJson {
                url: "".to_string(),
            })
        }
    }
}

async fn run() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(submit_snippet))
        // todo: bindしているURLを最後に変更すること
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    if let Err(e) = run().await {
        eprintln!("Error: {}", e);
    }
    Ok(())
}
