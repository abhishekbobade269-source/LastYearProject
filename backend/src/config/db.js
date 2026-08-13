const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'noc_verify_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Fallback in-memory dataset matching the UI mockup if Postgres is not reachable
let inMemoryStore = {
  stats: {
    totalSubmissions: 254,
    approvedNocs: 168,
    pendingReview: 42,
    expiringSoon: 19,
    registeredEntities: 112
  },
  submissions: [
    {
      id: 1,
      entity_name: 'Sunrise Hotels Pvt. Ltd.',
      document_type: 'Fire NOC',
      certificate_number: 'FD/2025/4587',
      issuing_authority: 'Pune Fire Department',
      submitted_on: '2025-05-12',
      issue_date: '2025-05-01',
      expiry_date: '2026-04-30',
      location: '123, MG Road, Pune - 411001',
      ai_status: 'Verified',
      ai_confidence_score: 98.50,
      officer_status: 'Approved',
      assigned_officer_name: 'R. Sharma',
      blockchain_hash: '0x8f7d9a1c2b3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
      blockchain_tx_hash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
      blockchain_block_number: 18456321,
      blockchain_status: 'Anchored'
    },
    {
      id: 2,
      entity_name: 'Green Valley Industries',
      document_type: 'Pollution NOC',
      certificate_number: 'PCB/2025/1102',
      issuing_authority: 'State Pollution Control Board',
      submitted_on: '2025-05-11',
      issue_date: '2024-05-20',
      expiry_date: '2025-05-20',
      location: 'Plot 45, MIDC Industrial Area, Pune',
      ai_status: 'Verified',
      ai_confidence_score: 94.20,
      officer_status: 'Pending Review',
      assigned_officer_name: 'R. Sharma',
      blockchain_hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      blockchain_tx_hash: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
      blockchain_block_number: 18456290,
      blockchain_status: 'Anchored'
    },
    {
      id: 3,
      entity_name: 'BuildTech Constructions',
      document_type: 'Building Plan Approval',
      certificate_number: 'BPA/2025/089',
      issuing_authority: 'Municipal Development Authority',
      submitted_on: '2025-05-10',
      issue_date: '2025-05-05',
      expiry_date: '2027-05-04',
      location: '78, Commercial Hub, Pune',
      ai_status: 'Verified',
      ai_confidence_score: 96.80,
      officer_status: 'Approved',
      assigned_officer_name: 'R. Sharma',
      blockchain_hash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
      blockchain_tx_hash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
      blockchain_block_number: 18456150,
      blockchain_status: 'Anchored'
    },
    {
      id: 4,
      entity_name: 'City Mall & Complex',
      document_type: 'Trade License',
      certificate_number: 'TL/2025/041',
      issuing_authority: 'Pune Municipal Corporation',
      submitted_on: '2025-05-09',
      issue_date: '2024-06-10',
      expiry_date: '2025-06-10',
      location: 'City Mall, FC Road, Pune',
      ai_status: 'Incomplete',
      ai_confidence_score: 42.10,
      officer_status: 'Rejected',
      assigned_officer_name: 'R. Sharma',
      blockchain_hash: null,
      blockchain_tx_hash: null,
      blockchain_block_number: null,
      blockchain_status: 'Not Anchored'
    },
    {
      id: 5,
      entity_name: 'Alpha Manufacturing',
      document_type: 'Factory Licence',
      certificate_number: 'FL/2025/673',
      issuing_authority: 'Department of Factories Inspection',
      submitted_on: '2025-05-08',
      issue_date: '2024-06-05',
      expiry_date: '2025-06-05',
      location: 'Sector 12, Pimpri, Pune',
      ai_status: 'Verified',
      ai_confidence_score: 91.00,
      officer_status: 'Pending Review',
      assigned_officer_name: 'R. Sharma',
      blockchain_hash: '0x4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c',
      blockchain_tx_hash: '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
      blockchain_block_number: 18456012,
      blockchain_status: 'Anchored'
    }
  ],
  expiryAlerts: [
    { id: 1, entity_name: 'Green Valley Industries', document_type: 'Pollution NOC', expiry_date: '2025-05-20', days_left: 8 },
    { id: 2, entity_name: 'Sunrise Hotels Pvt. Ltd.', document_type: 'Fire NOC', expiry_date: '2025-05-25', days_left: 13 },
    { id: 3, entity_name: 'Alpha Manufacturing', document_type: 'Factory Licence', expiry_date: '2025-06-05', days_left: 24 },
    { id: 4, entity_name: 'City Mall & Complex', document_type: 'Trade License', expiry_date: '2025-06-10', days_left: 29 }
  ],
  analytics: {
    breakdown: [
      { name: 'Verified', value: 176, percentage: 69, color: '#22C55E' },
      { name: 'Minor Issues', value: 48, percentage: 19, color: '#F59E0B' },
      { name: 'Major Issues', value: 20, percentage: 8, color: '#EF4444' },
      { name: 'Incomplete', value: 10, percentage: 4, color: '#94A3B8' }
    ],
    timeline: [
      { date: '1 May', submissions: 20, approved: 15 },
      { date: '7 May', submissions: 45, approved: 32 },
      { date: '14 May', submissions: 30, approved: 22 },
      { date: '21 May', submissions: 65, approved: 48 },
      { date: '28 May', submissions: 50, approved: 40 }
    ]
  }
};

let isConnected = false;

const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database');
    isConnected = true;
    
    // Execute DDL Schema script if available
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(sql);
      console.log('✅ Schema and seed data initialized in PostgreSQL');
    }
    client.release();
  } catch (err) {
    console.warn('⚠️ Could not connect to PostgreSQL directly (Using high-speed resilient in-memory database fallback):', err.message);
    isConnected = false;
  }
};

module.exports = {
  pool,
  initDb,
  getIsConnected: () => isConnected,
  getInMemoryStore: () => inMemoryStore
};
