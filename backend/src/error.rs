use crate::register::ErrorResponse;

pub trait MapToInternalServerError<T> {
    fn map_to_internal_server_error(self, msg: &str) -> Result<T, ErrorResponse>;
}

impl<T, E> MapToInternalServerError<T> for Result<T, E>
where
    E: std::fmt::Debug,
{
    fn map_to_internal_server_error(self, msg: &str) -> Result<T, ErrorResponse> {
        self.map_err(|e| {
            eprintln!("{}: {:?}", msg, e);
            ErrorResponse {
                error: "Internal server error".to_string(),
            }
        })
    }
}
