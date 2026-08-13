import React from 'react';
import { ShieldCheck, Check, ShieldAlert } from 'lucide-react';

export const PermissionsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          Role-Based Access Control (RBAC) & Granted Permissions
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Cryptographically attributed authority scope for Officer account R. Sharma.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-indigo-300 block">CURRENT RBAC SCOPE</span>
          <h4 className="text-xl font-extrabold tracking-tight">Senior Government Officer (Department Approver)</h4>
          <p className="text-xs text-slate-300 font-medium mt-0.5">Authorized to inspect AI OCR findings, execute review decisions, and sign blockchain transactions.</p>
        </div>
        <span className="px-4 py-1.5 bg-emerald-500 text-white font-extrabold text-xs rounded-full shadow-md">
          Role Active
        </span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Granted Action Permissions Matrix</h4>

        <div className="space-y-2.5 text-xs font-semibold">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block">NOC Application Inspection & Review (`PERM_REVIEW_NOC`)</span>
                <span className="text-[11px] text-slate-500 font-medium">Access to pending queues and AI OCR field extraction breakdown</span>
              </div>
            </div>
            <span className="badge-pill badge-approved">Granted</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block">Blockchain SHA-256 Hash Anchoring & Signing (`PERM_BLOCKCHAIN_MINT`)</span>
                <span className="text-[11px] text-slate-500 font-medium">Allows minting tamper-evident certificate records on-chain</span>
              </div>
            </div>
            <span className="badge-pill badge-approved">Granted</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block">Issuing Rejections & Mandatory Corrections (`PERM_REJECT_NOC`)</span>
                <span className="text-[11px] text-slate-500 font-medium">Authority to reject or request resubmission with required inspection notes</span>
              </div>
            </div>
            <span className="badge-pill badge-approved">Granted</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-200 text-slate-600 rounded-lg">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block">SuperAdmin System Configuration Override (`PERM_SUPERADMIN`)</span>
                <span className="text-[11px] text-slate-500 font-medium">Restricted to IT System Administrators only</span>
              </div>
            </div>
            <span className="badge-pill badge-incomplete">Read Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
