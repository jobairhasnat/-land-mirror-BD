CREATE TABLE IF NOT EXISTS land_records (
  id SERIAL PRIMARY KEY,
  qr_code VARCHAR(100) UNIQUE NOT NULL,
  dag_number VARCHAR(50),
  mouza_name VARCHAR(100),
  owner_name VARCHAR(200),
  area_decimal DECIMAL(10,2),
  owner_phone VARCHAR(15),
  registration_date DATE,
  mutation_history JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'active',
  gps_latitude DECIMAL(10,8),
  gps_longitude DECIMAL(11,8),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS disputes (
  id SERIAL PRIMARY KEY,
  qr_id VARCHAR(100) REFERENCES land_records(qr_code),
  reporter_name VARCHAR(200),
  description TEXT,
  contact VARCHAR(15),
  status VARCHAR(20) DEFAULT 'pending',
  verified_by VARCHAR(200),
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_land_qr ON land_records(qr_code);
CREATE INDEX idx_dispute_qr ON disputes(qr_id);