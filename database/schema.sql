-- User table creation
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Items table creation
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    quantity INT NOT NULL,
    sku VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Item tracking table creation
CREATE TABLE IF NOT EXISTS item_tracking (
    id SERIAL PRIMARY KEY, 
    item_id INT REFERENCES items(id) ON DELETE CASCADE, 
    uuid VARCHAR(100) UNIQUE NOT NULL, last_seen TIMESTAMP DEFAULT NOW(), 
    status VARCHAR(50) NOT NULL DEFAULT 'active');
