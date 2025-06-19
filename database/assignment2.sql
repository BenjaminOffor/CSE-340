-- 1. Drop existing tables/types for a clean slate (optional but safe)
DROP TABLE IF EXISTS inventory, classification, account;
DROP TYPE IF EXISTS account_type_enum;

-- 2. Create the enum and tables
CREATE TYPE account_type_enum AS ENUM ('Client', 'Admin');

CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name TEXT NOT NULL UNIQUE
);

CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make TEXT NOT NULL,
  inv_model TEXT NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image TEXT NOT NULL,
  inv_thumbnail TEXT NOT NULL,
  inv_price NUMERIC(10,2) DEFAULT 0,
  inv_miles INT DEFAULT 0,
  inv_color TEXT DEFAULT '',
  classification_id INT REFERENCES classification(classification_id)
);

CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname TEXT NOT NULL,
  account_lastname TEXT NOT NULL,
  account_email TEXT NOT NULL UNIQUE,
  account_password TEXT NOT NULL,
  account_type account_type_enum DEFAULT 'Client'
);

-- 3. Seed classification data
INSERT INTO classification (classification_name)
VALUES 
  ('Custom'),
  ('Sedan'),
  ('Sport'),
  ('SUV'),
  ('Truck')
ON CONFLICT DO NOTHING;

-- 4. Seed sample inventory data
INSERT INTO inventory 
  (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
VALUES
  ('Batmobile', 'Custom', 'Collector’s item', '/images/vehicles/batmobile.jpg', '/images/vehicles/batmobile-tn.jpg', 65000, 0, 'Black', 1),
  ('FBI Surveillance Van', 'Survan', 'Undercover van', '/images/vehicles/survan.jpg', '/images/vehicles/survan-tn.jpg', 20000, 12000, 'Gray', 1),
  ('Ford', 'Model T', 'Iconic early car', '/images/vehicles/model-t.jpg', '/images/vehicles/model-t-tn.jpg', 30000, 5000, 'Black', 2),
  ('Mechanic', 'Special', 'Fixer’s pride', '/images/vehicles/mechanic.jpg', '/images/vehicles/mechanic-tn.jpg', 100, 300000, 'Red', 2),
  ('Porsche', '911', 'Classic sports car', '/images/vehicles/911.jpg', '/images/vehicles/911-tn.jpg', 90000, 25000, 'White', 3),
  ('Toyota', 'Land Cruiser', 'Reliable 4x4', '/images/vehicles/landcruiser.jpg', '/images/vehicles/landcruiser-tn.jpg', 80000, 40000, 'Silver', 4),
  ('Ford', 'F-150', 'Workhorse truck', '/images/vehicles/f150.jpg', '/images/vehicles/f150-tn.jpg', 50000, 35000, 'Blue', 5)
ON CONFLICT DO NOTHING;

-- 5. Account operations (Tony Stark example)
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n')
ON CONFLICT DO NOTHING;

UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- 6. Inventory updates
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

UPDATE inventory
SET inv_thumbnail = REPLACE(inv_thumbnail, 'vehicles/vehicles/', 'vehicles/')
WHERE inv_thumbnail LIKE '%vehicles/vehicles/%';


SELECT inv_id, inv_make, inv_model, inv_thumbnail FROM public.inventory;

SELECT inv_make, inv_model, inv_thumbnail
FROM inventory;

SELECT inv_make, inv_model, inv_image
FROM inventory;

UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/vehicles/vehicles/', '/images/vehicles/')
WHERE inv_image LIKE '%/images/vehicles/vehicles/%';

SELECT inv_make, inv_model, inv_image
FROM inventory;

SELECT inv_make, inv_model, inv_thumbnail FROM inventory;

UPDATE inventory
SET inv_image = REPLACE(inv_image, '.jpg', '-tn.jpg')
WHERE inv_model IN ('911', 'Land Cruiser', 'F-150');



