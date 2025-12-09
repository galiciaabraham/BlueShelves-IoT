-- -- User table creation
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
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    item_color VARCHAR (100) NOT NULL,
    item_size VARCHAR(100) NOT NULL,
    item_quantity INT NOT NULL,
    item_sku VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Item tracking table creation
CREATE TABLE IF NOT EXISTS item_tracking (
    tracking_id INTEGER PRIMARY KEY,
    item_id INT REFERENCES items(item_id) ON DELETE CASCADE,
    last_seen TIMESTAMP DEFAULT NOW(),
    tracking_status VARCHAR(50) NOT NULL DEFAULT 'lost'
);
