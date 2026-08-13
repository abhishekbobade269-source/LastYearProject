const API_BASE = import.meta.env.VITE_API_URL || 'https://noc-verify-backend.onrender.com/api';

export interface DashboardStats {
  totalSubmissions: number;
  approvedNocs: number;
  pendingReview: number;
  expiringSoon: number;
  registeredEntities: number;
}

export interface Submission {
  id: number;
  entity_name: string;
  document_type: string;
  certificate_number: string;
  issuing_authority: string;
  submitted_on: string;
  issue_date: string;
  expiry_date: string;
  location: string;
  ai_status: 'Verified' | 'Minor Issues' | 'Major Issues' | 'Incomplete';
  ai_confidence_score: number;
  officer_status: 'Approved' | 'Pending Review' | 'Rejected' | 'Revision Requested';
  assigned_officer_name: string;
  blockchain_hash: string | null;
  blockchain_tx_hash: string | null;
  blockchain_block_number: number | null;
  blockchain_status: 'Anchored' | 'Not Anchored';
  officer_notes?: string;
}

export interface ExpiryAlert {
  id: number;
  entity_name: string;
  document_type: string;
  expiry_date: string;
  days_left: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('API unavailable, fallback to offline defaults');
  }
  return {
    totalSubmissions: 254,
    approvedNocs: 168,
    pendingReview: 42,
    expiringSoon: 19,
    registeredEntities: 112
  };
};

export const fetchSubmissions = async (search?: string, ai_status?: string, officer_status?: string): Promise<Submission[]> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (ai_status) params.append('ai_status', ai_status);
    if (officer_status) params.append('officer_status', officer_status);

    const res = await fetch(`${API_BASE}/submissions?${params.toString()}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('API unavailable, using initial data');
  }
  return [
    {
      id: 1,
      entity_name: 'Sunrise Hotels Pvt. Ltd.',
      document_type: 'Fire NOC',
      certificate_number: 'FD/2025/4587',
      issuing_authority: 'Pune Fire Department',
      submitted_on: '12 May 2025',
      issue_date: '01/05/2025',
      expiry_date: '30/04/2026',
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
      submitted_on: '11 May 2025',
      issue_date: '20/05/2024',
      expiry_date: '20/05/2025',
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
      submitted_on: '10 May 2025',
      issue_date: '05/05/2025',
      expiry_date: '04/05/2027',
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
      submitted_on: '09 May 2025',
      issue_date: '10/06/2024',
      expiry_date: '10/06/2025',
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
      submitted_on: '08 May 2025',
      issue_date: '05/06/2024',
      expiry_date: '05/06/2025',
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
  ];
};

export const fetchExpiryAlerts = async (): Promise<ExpiryAlert[]> => {
  try {
    const res = await fetch(`${API_BASE}/expiry-alerts`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Expiry alerts API unavailable');
  }
  return [
    { id: 1, entity_name: 'Green Valley Industries', document_type: 'Pollution NOC', expiry_date: '20 May 2025', days_left: 8 },
    { id: 2, entity_name: 'Sunrise Hotels Pvt. Ltd.', document_type: 'Fire NOC', expiry_date: '25 May 2025', days_left: 13 },
    { id: 3, entity_name: 'Alpha Manufacturing', document_type: 'Factory Licence', expiry_date: '05 June 2025', days_left: 24 },
    { id: 4, entity_name: 'City Mall & Complex', document_type: 'Trade License', expiry_date: '10 June 2025', days_left: 29 }
  ];
};

export const createSubmission = async (data: { entity_name: string; document_type: string; location?: string }): Promise<Submission> => {
  const res = await fetch(`${API_BASE}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.data;
};

export const reviewSubmission = async (id: number, status: string, notes?: string) => {
  const res = await fetch(`${API_BASE}/submissions/${id}/review`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes })
  });
  return await res.json();
};
