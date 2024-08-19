use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use json::{RequestJson, ResponseJson};
use url::generate_url;

mod db;
mod env;
mod hash;
mod json;
mod url;

// todo: 暫定のコードをおいているため、あとでAPIの実情に即したものに直すこと
#[post("/submit")]
async fn submit_snippet(request_data: web::Json<RequestJson>) -> impl Responder {
    // request process
    let request_json = request_data.into_inner();
    if let Err(e) = request_json.query().await {
        eprintln!("Failed to insert snippet: {}", e);
        return HttpResponse::InternalServerError().json(ResponseJson {
            url: "".to_string(),
        });
    };

    // respose process
    // todo: response processの実装
    let url = generate_url().unwrap();
    let respose = ResponseJson { url: url };

    HttpResponse::Ok().json(respose)
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
