CREATE TABLE snippets (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    url_hash VARCHAR(255) NOT NULL,
    snippet TEXT NOT NULL,
    expiration_stat CHAR(7) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);