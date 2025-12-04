
-- User table seeding
INSERT INTO users (name, email, password, role) VALUES
    ('Admin User', 'admin@example.com', 'securepassword', 'admin');

-- Items table seeding
INSERT INTO items (item_name, item_color, item_size, item_quantity, item_sku) VALUES
    ('Item A', 'Red', 'Large', 100, 'SKU001'),
    ('Item B', 'Blue', 'Medium', 200, 'SKU002'),
    ('Item C', 'Green', 'Small', 150, 'SKU003');

-- Item tracking table seeding
INSERT INTO item_tracking (item_id, last_seen, tracking_status) VALUES
    (1, NOW(), 'lost'),
    (2, NOW(), 'lost'),
    (3, NOW(), 'lost');
