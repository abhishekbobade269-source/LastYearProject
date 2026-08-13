import React, { useState } from 'react';
import { reviewSubmission, type Submission } from '../services/api';
import { UserCheck, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface OfficerReviewViewProps {
  submissions: Submission[];
  onRefresh: () => void;
}

export const OfficerReviewView: React.FC<OfficerReviewViewProps> = ({ submissions, onRefresh }) => {
  const [selectedSub, setSelectedSub] = useState<Submission>(
    submissions.find(s => s.officer_status === 'Pending Review') || submissions[0]
  );
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDecision = async (status: 'Approved' | 'Rejected' | 'Correction Required') => {
    if (!selectedSub) return;
    setErrorMsg('');

    if ((status === 'Rejected' || status === 'Correction Required') && (!notes || notes.trim() === '')) {
      setErrorMsg('Mandatory Rule (REV-004): You must provide official inspection remarks explaining the rejection or correction reason.');
      return;
    }

    setIsProcessing(true);
    try {
      await reviewSubmission(selectedSub.id, status, notes);
      alert(`Submission decision "${status}" saved and logged in immutable audit trail!`);
      onRefresh();
    } catch (e: any) {
      setErrorMsg(e.message || 'Error processing officer review decision');
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingList = submissions.filter(s => s.officer_status === 'Pending Review');

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-600" />
            Government Officer Approval Queue
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Verify AI OCR findings against municipal databases and grant final approval for blockchain anchoring.
          </p>
        </div>
        <span className="px-3.5 py-1.5 bg-amber-100/80 text-amber-800 text-xs font-extrabold rounded-full border border-amber-200">
          {pendingList.length} Pending Approvals
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Queue */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-1">Pending Review Queue</h4>
          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
            {submissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => { setSelectedSub(sub); setNotes(sub.officer_notes || ''); setErrorMsg(''); }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedSub?.id === sub.id
                    ? 'border-amber-500 bg-amber-50/50 shadow-2xs ring-1 ring-amber-500/20'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h5 className="text-xs font-extrabold text-slate-900">{sub.entity_name}</h5>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    sub.officer_status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                    sub.officer_status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {sub.officer_status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold block">{sub.document_type}</span>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">Submitted: {sub.submitted_on}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Officer Workspace */}
        {selectedSub && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-slate-400">Assigned Officer: R. Sharma</span>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{selectedSub.entity_name}</h3>
                  <span className="text-xs text-slate-500 font-bold">{selectedSub.document_type} (Version V{selectedSub.version_number || 1})</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 block">Current Status</span>
                  <span className="badge-pill badge-pending mt-1">{selectedSub.officer_status}</span>
                </div>
              </div>

              {/* Document Overview Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Certificate Number</span>
                  <span className="text-xs font-mono font-extrabold text-slate-900">{selectedSub.certificate_number}</span>
                </div>
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">AI Match Confidence</span>
                  <span className="text-xs font-extrabold text-emerald-600">{selectedSub.ai_confidence_score}% Verified</span>
                </div>
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Issuing Authority</span>
                  <span className="text-xs font-extrabold text-slate-900">{selectedSub.issuing_authority}</span>
                </div>
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Premises Location</span>
                  <span className="text-xs font-extrabold text-slate-900">{selectedSub.location}</span>
                </div>
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Officer Remarks Input */}
              <div className="mb-6">
                <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                  Officer Inspection Remarks & Decision Notes *
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter official verification remarks or reasons for approval / rejection..."
                  value={notes}
                  onChange={(e) => { setNotes(e.target.value); setErrorMsg(''); }}
                  className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleDecision('Correction Required')}
                disabled={isProcessing}
                className="px-4 py-2.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200 cursor-pointer"
              >
                Request Correction
              </button>
              <button
                onClick={() => handleDecision('Rejected')}
                disabled={isProcessing}
                className="px-4 py-2.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200 flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Application</span>
              </button>
              <button
                onClick={() => handleDecision('Approved')}
                disabled={isProcessing}
                className="px-6 py-2.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
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
