
export const defaultLanguage = "rust"


export const defaultSnippet = `#[derive(Debug, Error)]
#[error("Validation error: {0}")]
struct ValidationError(String);

#[derive(Debug, Deserialize, Clone)]
struct ValidSnippetLanguages {
    snippet_languages: HashSet<String>,
}

impl ValidSnippetLanguages {
    fn new() -> Result<Self, ErrorResponse> {
        let file_path = read_env_value("SNIPPET_LANGUAGES_PATH")
            .map_to_internal_server_error("Snippet language validate file path is not set")?;

        let file = File::open(file_path).map_to_internal_server_error("Failed to open file")?;

        let reader = BufReader::new(file);

        let mut valid_snippet_languages: ValidSnippetLanguages = serde_json::from_reader(reader)
            .map_to_internal_server_error("Failed to read snippet languages file")?;

        valid_snippet_languages.snippet_languages = valid_snippet_languages
            .snippet_languages
            .into_iter()
            .map(|lang| lang.to_lowercase())
            .collect();

        Ok(valid_snippet_languages.clone())
    }

    pub fn validate_language(&self, language: &str) -> bool {
        self.snippet_languages.contains(&language.to_lowercase())
    }
}
`
