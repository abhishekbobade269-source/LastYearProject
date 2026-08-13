import React, { useState } from 'react';
import { reviewSubmission, type Submission } from '../services/api';
import { UserCheck, CheckCircle, XCircle } from 'lucide-react';

interface OfficerReviewViewProps {
  submissions: Submission[];
  onRefresh: () => void;
}

export const OfficerReviewView: React.FC<OfficerReviewViewProps> = ({ submissions, onRefresh }) => {
  const [selectedSub, setSelectedSub] = useState<Submission>(
    submissions.find(s => s.officer_status === 'Pending Review') || submissions[0]
  );
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDecision = async (status: 'Approved' | 'Rejected' | 'Revision Requested') => {
    if (!selectedSub) return;
    setIsProcessing(true);
    try {
      await reviewSubmission(selectedSub.id, status, notes);
      alert(`Submission ${status} successfully!`);
      onRefresh();
    } catch (e) {
      alert('Error saving officer review decision');
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingList = submissions.filter(s => s.officer_status === 'Pending Review');

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-600" />
            Government Officer Approval Queue
          </h3>
          <p className="text-xs text-slate-500">
            Verify AI OCR findings against municipal databases and grant final approval for blockchain anchoring.
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
          {pendingList.length} Pending Approvals
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Queue */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-2xs p-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Pending Review Queue</h4>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {submissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => { setSelectedSub(sub); setNotes(sub.officer_notes || ''); }}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedSub?.id === sub.id
                    ? 'border-amber-500 bg-amber-50/40 shadow-2xs'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h5 className="text-xs font-bold text-slate-800">{sub.entity_name}</h5>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sub.officer_status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                    sub.officer_status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {sub.officer_status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">{sub.document_type}</span>
                <span className="text-[10px] text-slate-400 block font-mono mt-1">Submitted: {sub.submitted_on}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Officer Workspace */}
        {selectedSub && (
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-2xs p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Officer: R. Sharma</span>
                  <h3 className="text-xl font-bold text-slate-900">{selectedSub.entity_name}</h3>
                  <span className="text-xs text-slate-500 font-semibold">{selectedSub.document_type}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 block">Current Status</span>
                  <span className="status-pill pending mt-1">{selectedSub.officer_status}</span>
                </div>
              </div>

              {/* Document Overview Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block">Certificate Number</span>
                  <span className="text-xs font-mono font-bold text-slate-800">{selectedSub.certificate_number}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block">AI Match Score</span>
                  <span className="text-xs font-bold text-emerald-600">{selectedSub.ai_confidence_score}% Verified</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block">Issuing Authority</span>
                  <span className="text-xs font-bold text-slate-800">{selectedSub.issuing_authority}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block">Address Location</span>
                  <span className="text-xs font-bold text-slate-800">{selectedSub.location}</span>
                </div>
              </div>

              {/* Officer Notes Textarea */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Officer Inspection Remarks & Compliance Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter verification notes or reasons for approval/rejection..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleDecision('Rejected')}
                disabled={isProcessing}
                className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Application</span>
              </button>
              <button
                onClick={() => handleDecision('Approved')}
                disabled={isProcessing}
                className="px-6 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve & Anchor to Blockchain</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
