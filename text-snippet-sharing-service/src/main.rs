use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use hash::RequestHash;
use json::RegisterRequest;

mod db;
mod env;
mod hash;
mod json;
mod url;

#[get("/")]
async fn index() -> impl Responder {
    "Message fetched."
}

// todo: パス文字列がない場合のエラー処理用
// #[get("/get/")]
// async fn get_without_snippet() -> impl Responder {
//     HttpResponse::BadRequest().body("Hash parameter is missing")
// }

#[get("/get/{hash}")]
async fn get_snippet(path: web::Path<String>) -> impl Responder {
    let hash = path.into_inner();
    let request_data = RequestHash { hash };

    match request_data.search().await {
        Ok(response) => HttpResponse::Ok().json(response),
        Err(error_response) => {
            eprintln!("Failed to insert snippet: {}", error_response.error);
            HttpResponse::Ok().json(error_response)
        }
    }
}

#[post("/register")]
async fn register_snippet(request_data: web::Json<RegisterRequest>) -> impl Responder {
    let request_json = request_data.into_inner();

    match request_json.query().await {
        Ok(response_json) => HttpResponse::Ok().json(response_json),
        Err(error_response) => {
            eprintln!("Failed to insert snippet: {}", error_response.error);
            HttpResponse::Ok().json(error_response)
        }
    }
}

async fn run() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            // todo: Corsは暫定で追加しているため、本番環境で不要であれば削除する
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_headers(vec!["Content-Type"]),
            )
            .service(index)
            .service(get_snippet)
            .service(register_snippet)
    })
    // todo: bindしているURLを最後に変更すること
    .bind(("127.0.0.1", 8000))?
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
