-- NOC VERIFY PostgreSQL Database Schema

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Officer', -- 'Officer', 'EntityAdmin', 'SuperAdmin'
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS entities (
    id SERIAL PRIMARY KEY,
    entity_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    address TEXT,
    contact_email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS noc_submissions (
    id SERIAL PRIMARY KEY,
    entity_id INT REFERENCES entities(id) ON DELETE CASCADE,
    entity_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL, -- 'Fire NOC', 'Pollution NOC', 'Building Plan Approval', 'Trade License', 'Factory Licence'
    certificate_number VARCHAR(100),
    issuing_authority VARCHAR(255),
    submitted_on DATE NOT NULL DEFAULT CURRENT_DATE,
    issue_date DATE,
    expiry_date DATE,
    location TEXT,
    ai_status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- 'Verified', 'Minor Issues', 'Major Issues', 'Incomplete'
    ai_confidence_score NUMERIC(5,2) DEFAULT 0.00,
    ai_extraction_summary JSONB,
    officer_status VARCHAR(50) NOT NULL DEFAULT 'Pending Review', -- 'Approved', 'Pending Review', 'Rejected', 'Revision Requested'
    assigned_officer_id INT REFERENCES users(id) ON DELETE SET NULL,
    assigned_officer_name VARCHAR(255) DEFAULT 'R. Sharma',
    officer_notes TEXT,
    blockchain_hash VARCHAR(255),
    blockchain_tx_hash VARCHAR(255),
    blockchain_block_number BIGINT,
    blockchain_status VARCHAR(50) DEFAULT 'Not Anchored', -- 'Anchored', 'Not Anchored'
    file_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    submission_id INT REFERENCES noc_submissions(id) ON DELETE CASCADE,
    actor_name VARCHAR(255) NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL, -- 'SUBMITTED', 'AI_ANALYZED', 'OFFICER_APPROVED', 'OFFICER_REJECTED', 'BLOCKCHAIN_ANCHORED'
    details TEXT,
    ip_address VARCHAR(50),
    blockchain_tx VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expiry_alerts (
    id SERIAL PRIMARY KEY,
    submission_id INT REFERENCES noc_submissions(id) ON DELETE CASCADE,
    entity_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    expiry_date DATE NOT NULL,
    days_left INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'Resolved', 'Renewed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Enterprise Demo Data matching mockup
INSERT INTO users (name, email, role, department) VALUES
('R. Sharma', 'r.sharma@gov.in', 'Officer', 'Pune Fire Department'),
('A. Verma', 'a.verma@gov.in', 'Officer', 'State Pollution Control Board'),
('M. Kulkarni', 'm.kulkarni@gov.in', 'SuperAdmin', 'Department of Municipal Administration')
ON CONFLICT (email) DO NOTHING;

INSERT INTO entities (entity_name, registration_number, address, contact_email, status) VALUES
('Sunrise Hotels Pvt. Ltd.', 'REG-HOTEL-2025-01', '123, MG Road, Pune - 411001', 'compliance@sunrisehotels.com', 'Active'),
('Green Valley Industries', 'REG-IND-2025-02', 'Plot 45, MIDC Industrial Area, Pune - 411026', 'legal@greenvalley.com', 'Active'),
('BuildTech Constructions', 'REG-BUILD-2025-03', '78, Commercial Hub, Pune - 411004', 'info@buildtech.com', 'Active'),
('City Mall & Complex', 'REG-MALL-2025-04', 'City Mall, FC Road, Pune - 411005', 'ops@citymall.com', 'Active'),
('Alpha Manufacturing', 'REG-MFG-2025-05', 'Sector 12, Pimpri, Pune - 411018', 'admin@alphamfg.com', 'Active')
ON CONFLICT (registration_number) DO NOTHING;

INSERT INTO noc_submissions 
(entity_id, entity_name, document_type, certificate_number, issuing_authority, submitted_on, issue_date, expiry_date, location, ai_status, ai_confidence_score, officer_status, assigned_officer_name, blockchain_hash, blockchain_tx_hash, blockchain_block_number, blockchain_status) 
VALUES
(1, 'Sunrise Hotels Pvt. Ltd.', 'Fire NOC', 'FD/2025/4587', 'Pune Fire Department', '2025-05-12', '2025-05-01', '2026-04-30', '123, MG Road, Pune - 411001', 'Verified', 98.50, 'Approved', 'R. Sharma', '0x8f7d9a1c2b3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a', '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b', 18456321, 'Anchored'),
(2, 'Green Valley Industries', 'Pollution NOC', 'PCB/2025/1102', 'State Pollution Control Board', '2025-05-11', '2024-05-20', '2025-05-20', 'Plot 45, MIDC Industrial Area, Pune', 'Verified', 94.20, 'Pending Review', 'R. Sharma', '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', 18456290, 'Anchored'),
(3, 'BuildTech Constructions', 'Building Plan Approval', 'BPA/2025/089', 'Municipal Development Authority', '2025-05-10', '2025-05-05', '2027-05-04', '78, Commercial Hub, Pune', 'Verified', 96.80, 'Approved', 'R. Sharma', '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b', '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f', 18456150, 'Anchored'),
(4, 'City Mall & Complex', 'Trade License', 'TL/2025/041', 'Pune Municipal Corporation', '2025-05-09', '2024-06-10', '2025-06-10', 'City Mall, FC Road, Pune', 'Incomplete', 42.10, 'Rejected', 'R. Sharma', NULL, NULL, NULL, 'Not Anchored'),
(5, 'Alpha Manufacturing', 'Factory Licence', 'FL/2025/673', 'Department of Factories Inspection', '2025-05-08', '2024-06-05', '2025-06-05', 'Sector 12, Pimpri, Pune', 'Verified', 91.00, 'Pending Review', 'R. Sharma', '0x4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c', '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', 18456012, 'Anchored')
ON CONFLICT DO NOTHING;

INSERT INTO expiry_alerts (submission_id, entity_name, document_type, expiry_date, days_left, status) VALUES
(2, 'Green Valley Industries', 'Pollution NOC', '2025-05-20', 8, 'Active'),
(1, 'Sunrise Hotels Pvt. Ltd.', 'Fire NOC', '2025-05-25', 13, 'Active'),
(5, 'Alpha Manufacturing', 'Factory Licence', '2025-06-05', 24, 'Active'),
(4, 'City Mall & Complex', 'Trade License', '2025-06-10', 29, 'Active')
ON CONFLICT DO NOTHING;
