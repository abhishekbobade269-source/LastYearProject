import React from 'react';
import { History, ShieldCheck, User, Cpu, FileUp } from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const auditLogs = [
    {
      id: 1,
      timestamp: '2025-05-12 14:32:10 IST',
      actor: 'NOC Blockchain Contract',
      role: 'Smart Contract',
      action: 'BLOCKCHAIN_ANCHORED',
      details: 'SHA-256 Hash 0x8f7d9a1c2b3e4f5a... anchored on Sepolia Block #18456321',
      icon: ShieldCheck,
      color: 'bg-emerald-500 text-white'
    },
    {
      id: 2,
      timestamp: '2025-05-12 14:28:45 IST',
      actor: 'R. Sharma',
      role: 'Government Officer',
      action: 'OFFICER_APPROVED',
      details: 'Application verified against fire safety department registry and granted approval.',
      icon: User,
      color: 'bg-blue-500 text-white'
    },
    {
      id: 3,
      timestamp: '2025-05-12 14:20:12 IST',
      actor: 'AI Verification Engine',
      role: 'System AI',
      action: 'AI_ANALYZED',
      details: 'OCR parsed metadata. Match confidence: 98.5%. Field integrity confirmed.',
      icon: Cpu,
      color: 'bg-indigo-500 text-white'
    },
    {
      id: 4,
      timestamp: '2025-05-12 14:15:00 IST',
      actor: 'Sunrise Hotels Pvt. Ltd.',
      role: 'Entity Applicant',
      action: 'SUBMITTED',
      details: 'Uploaded Fire NOC renewal document package (FD/2025/4587).',
      icon: FileUp,
      color: 'bg-slate-700 text-white'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            Immutable Audit Trail & Ledger Activity Inspector
          </h3>
          <p className="text-xs text-slate-500">
            Cryptographically verifier-auditable log of all system transitions and officer actions.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6">
        <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
          {auditLogs.map((log) => {
            const Icon = log.icon;
            return (
              <div key={log.id} className="relative">
                {/* Timeline Icon Node */}
                <div className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full ${log.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{log.action}</span>
                    <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-700">{log.actor}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">{log.role}</span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {log.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
