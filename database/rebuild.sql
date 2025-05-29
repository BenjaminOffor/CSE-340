
--DROP TABLE IF EXISTS (for clean rebuilds)--
DROP TABLE IF EXISTS inventory, classification, account;
DROP TYPE IF EXISTS account_type_enum;


-- CREATE TYPE --
CREATE TYPE account_type_enum AS ENUM ('Client', 'Admin');

--  CREATE TABLES  .... Classification Table --
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name TEXT NOT NULL
);

-- Inventory Table--
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make TEXT NOT NULL,
    inv_model TEXT NOT NULL,
    inv_description TEXT NOT NULL,
    inv_image TEXT NOT NULL,
    inv_thumbnail TEXT NOT NULL,
    classification_id INT REFERENCES classification(classification_id)
);


-- Account Table --
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname TEXT NOT NULL,
    account_lastname TEXT NOT NULL,
    account_email TEXT NOT NULL UNIQUE,
    account_password TEXT NOT NULL,
    account_type account_type_enum DEFAULT 'Client'
);


-- INSERT INITIAL DATA (2 tables) ... Classification--
INSERT INTO classification (classification_name) VALUES
('Sport'), ('SUV'), ('Truck');

-- Inventory (example):--
INSERT INTO inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id) VALUES
('GM', 'Hummer', 'Known for small interiors', '/images/hummer.jpg', '/images/hummer-thumb.jpg', 2),
('Toyota', 'Supra', 'A fast sports car', '/images/supra.jpg', '/images/supra-thumb.jpg', 1);


-- Append Queries 4 and 6 from Task 1 (as last two lines in rebuild file)--
-- Query 4
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 6
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');


