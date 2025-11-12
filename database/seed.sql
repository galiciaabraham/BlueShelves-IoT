
-- User table seeding
INSERT INTO users (name, email, password, role) VALUES
    ('Admin User', 'admin@example.com', 'securepassword', 'admin');

-- Items table seeding
INSERT INTO items (name, description, quantity, sku) VALUES
    ('Item A', 'Description for Item A', 100, 'SKU001'),
    ('Item B', 'Description for Item B', 200, 'SKU002'),
    ('Item C', 'Description for Item C', 150, 'SKU003');

-- Item tracking table seeding
INSERT INTO item_tracking (item_id, uuid, last_seen, status) VALUES
    (1, 'UUID-001', NOW(), 'active'),
    (2, 'UUID-002', NOW(), 'active'),
    (3, 'UUID-003', NOW(), 'active');

