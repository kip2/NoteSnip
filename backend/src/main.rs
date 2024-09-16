use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use env::read_env_value;
use hash::RequestHash;
use register::RegisterRequest;

mod db;
mod env;
mod error;
mod hash;
mod register;

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
    let allowed_origin = read_env_value("ALLOWED_ORIGIN").unwrap();
    let bind_address = read_env_value("BIND_ADDRESS").unwrap();
    let bind_port = read_env_value("BIND_PORT").unwrap();

    HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    // .allowed_origin(&allowed_origin)
                    .allow_any_origin()
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_headers(vec!["Content-Type"]),
            )
            .service(get_snippet)
            .service(register_snippet)
    })
    .bind((bind_address.as_str(), bind_port.parse::<u16>().unwrap()))?
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
