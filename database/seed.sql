CREATE TABLE IF NOT EXISTS users (name VARCHAR(100), email VARCHAR(100), password VARCHAR(100), role VARCHAR(50));

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', 'securepassword', 'admin');

CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, name VARCHAR(100), description TEXT, quantity INT, sku VARCHAR(50));

INSERT INTO items (name, description, quantity, sku) VALUES
('Item A', 'Description for Item A', 100, 'SKU001'),
('Item B', 'Description for Item B', 200, 'SKU002'),
('Item C', 'Description for Item C', 150, 'SKU003');

CREATE TABLE IF NOT EXISTS item (item_id INT REFERENCES items(id), sku VARCHAR(50), last_updated TIMESTAMP);

INSERT INTO item (item_id, sku, last_updated) VALUES
(1, 'SKU001', NOW()),
(2, 'SKU002', NOW()),
(3, 'SKU003', NOW());

