USE mascd;

-- Organizations
INSERT INTO organizations (name, type, address, contact) VALUES
  ('Acme Pharma', 'manufacturer', '123 Pharma St', 'contact@acmepharma.com'),
  ('FastDist', 'distributor', '45 Logistics Ave', 'ops@fastdist.com'),
  ('City Pharmacy', 'pharmacy', '7 Main Road', 'hello@citypharmacy.com');

-- Admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role, organization_id)
VALUES ('Admin', 'admin@example.com', '$2b$10$1cK9Z8b6w3p1xW0Yb7oS2u4hN0cV0Xw7dIYxRr7t7jTzXb0o4FQ8a', 'admin', NULL);

-- Manufacturer user (password: manufacturer123)
INSERT INTO users (name, email, password_hash, role, organization_id)
VALUES (
  'Manufacturer User',
  'mfg@example.com',
  '$2b$10$1cK9Z8b6w3p1xW0Yb7oS2u4hN0cV0Xw7dIYxRr7t7jTzXb0o4FQ8a',
  'manufacturer',
  (SELECT id FROM organizations WHERE name = 'Acme Pharma' LIMIT 1)
);

-- Medicine
INSERT INTO medicines (name, generic_name, composition, manufacturer_id)
VALUES ('PainAway', 'Ibuprofen', 'Ibuprofen 200mg', (SELECT id FROM organizations WHERE name = 'Acme Pharma' LIMIT 1));

-- Batch (example code: DEMO1234)
INSERT INTO batches (batch_code, medicine_id, manufacture_date, expiry_date, quantity_produced, current_owner_id, status)
VALUES (
  'DEMO1234',
  (SELECT id FROM medicines WHERE name = 'PainAway' LIMIT 1),
  '2024-01-01',
  '2026-01-01',
  1000,
  (SELECT id FROM organizations WHERE name = 'Acme Pharma' LIMIT 1),
  'in_production'
);
