-- Create database and tables
CREATE DATABASE IF NOT EXISTS mascd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mascd;

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS organizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('manufacturer','distributor','pharmacy') NOT NULL,
  address VARCHAR(255),
  contact VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('manufacturer','distributor','pharmacy','customer','admin') NOT NULL,
  organization_id INT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_org FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS medicines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  generic_name VARCHAR(255),
  composition VARCHAR(255),
  manufacturer_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_meds_manufacturer FOREIGN KEY (manufacturer_id) REFERENCES organizations(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS batches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch_code VARCHAR(255) NOT NULL UNIQUE,
  medicine_id INT NOT NULL,
  manufacture_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  quantity_produced INT UNSIGNED NOT NULL,
  current_owner_id INT NULL,
  status ENUM('in_production','in_transit','with_distributor','with_pharmacy','sold','flagged') NOT NULL DEFAULT 'in_production',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_batches_medicine FOREIGN KEY (medicine_id) REFERENCES medicines(id),
  CONSTRAINT fk_batches_owner FOREIGN KEY (current_owner_id) REFERENCES organizations(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS supply_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch_id INT NOT NULL,
  from_org_id INT NULL,
  to_org_id INT NULL,
  to_customer_id INT NULL,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  note VARCHAR(255),
  location VARCHAR(255),
  initiated_by INT NULL,
  CONSTRAINT fk_tx_batch FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  CONSTRAINT fk_tx_fromorg FOREIGN KEY (from_org_id) REFERENCES organizations(id) ON DELETE SET NULL,
  CONSTRAINT fk_tx_toorg FOREIGN KEY (to_org_id) REFERENCES organizations(id) ON DELETE SET NULL,
  CONSTRAINT fk_tx_user FOREIGN KEY (initiated_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_tx_batch (batch_id),
  INDEX idx_tx_time (timestamp)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS verifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch_id INT NULL,
  checked_by VARCHAR(255),
  result ENUM('authentic','suspicious','not_found') NOT NULL,
  checked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ver_batch FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE SET NULL,
  INDEX idx_ver_batch (batch_id),
  INDEX idx_ver_checked_at (checked_at)
) ENGINE=InnoDB;
