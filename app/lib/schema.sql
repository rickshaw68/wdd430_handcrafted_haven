CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 0,
    image TEXT NOT NULL,
    seller TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'customer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);