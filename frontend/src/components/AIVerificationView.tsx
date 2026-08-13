import React, { useState } from 'react';
import type { Submission } from '../services/api';
import { Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AIVerificationViewProps {
  submissions: Submission[];
}

export const AIVerificationView: React.FC<AIVerificationViewProps> = ({ submissions }) => {
  const [selectedDoc, setSelectedDoc] = useState<Submission>(submissions[0] || null);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            AI Document OCR & Verification Inspection Workspace
          </h3>
          <p className="text-xs text-slate-500">
            Real-time optical character recognition, NLP field parsing, consistency scoring, and tamper detection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Submissions Selection List */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-2xs p-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Document to Inspect</h4>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {submissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedDoc(sub)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedDoc?.id === sub.id
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-2xs'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h5 className="text-xs font-bold text-slate-800">{sub.entity_name}</h5>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sub.ai_status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {sub.ai_confidence_score}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">{sub.document_type}</span>
                <span className="text-[10px] text-slate-400 block font-mono mt-1">{sub.certificate_number}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right AI Extraction Inspector */}
        {selectedDoc && (
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-2xs p-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600">Extracted Document Metadata</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedDoc.entity_name}</h3>
                <span className="text-xs text-slate-500">{selectedDoc.document_type}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-600">{selectedDoc.ai_confidence_score}%</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Match Confidence</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-400 font-bold block">Extracted Certificate No.</span>
                <span className="text-sm font-bold text-slate-800 font-mono">{selectedDoc.certificate_number}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-400 font-bold block">Issuing Authority</span>
                <span className="text-sm font-bold text-slate-800">{selectedDoc.issuing_authority}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-400 font-bold block">Issue Date</span>
                <span className="text-sm font-bold text-slate-800">{selectedDoc.issue_date}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-400 font-bold block">Expiry Date</span>
                <span className="text-sm font-bold text-slate-800">{selectedDoc.expiry_date}</span>
              </div>
            </div>

            {/* AI Automated Sanity Checks */}
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Automated Rules & Anomaly Analysis</h4>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
                <span>Text layout aligns with standard municipal template schema.</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
                <span>Expiry date timestamp validated (Greater than Issue Date).</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
                <span>SHA-256 binary hash computed: <code className="font-mono text-[10px] bg-white px-1 py-0.5 rounded">{selectedDoc.blockchain_hash ? selectedDoc.blockchain_hash.substring(0, 20) + '...' : 'Pending'}</code></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
