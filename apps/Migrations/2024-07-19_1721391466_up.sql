CREATE TABLE computer_parts (
                id SERIAL PRIMARY KEY ,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(50) NOT NULL,
                brand VARCHAR(255) NOT NULL,
                model_number VARCHAR(100),
                release_date DATE,
                description TEXT,
                performance_score INT,
                market_price NUMERIC(12, 2),
                rsm NUMERIC(12, 2),
                power_consumptionw REAL,
                lengthm DOUBLE PRECISION,
                widthm DOUBLE PRECISION,
                heightm DOUBLE PRECISION,
                lifespan INT,
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP);

-- Trigger function

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Trigger
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON computer_parts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
