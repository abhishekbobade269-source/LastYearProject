import React from 'react';
import type { Submission } from '../services/api';
import { CheckCircle2, AlertTriangle, Eye, ArrowUpRight } from 'lucide-react';

interface RecentSubmissionsTableProps {
  submissions: Submission[];
  onSelectSubmission: (sub: Submission) => void;
}

export const RecentSubmissionsTable: React.FC<RecentSubmissionsTableProps> = ({
  submissions,
  onSelectSubmission
}) => {
  const getAiBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return <span className="badge-pill badge-verified"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>;
      case 'Minor Issues':
        return <span className="badge-pill badge-minor"><AlertTriangle className="w-3.5 h-3.5" /> Minor Issues</span>;
      case 'Incomplete':
        return <span className="badge-pill badge-incomplete"><AlertTriangle className="w-3.5 h-3.5" /> Incomplete</span>;
      default:
        return <span className="badge-pill badge-incomplete">{status}</span>;
    }
  };

  const getOfficerBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <span className="badge-pill badge-approved">Approved</span>;
      case 'Pending Review':
        return <span className="badge-pill badge-pending">Pending Review</span>;
      case 'Rejected':
        return <span className="badge-pill badge-rejected">Rejected</span>;
      default:
        return <span className="badge-pill badge-pending">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden mb-6">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recent Submissions</h3>
          <p className="text-xs text-slate-500 font-medium">Entities requesting NOC verification approval</p>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-slate-500 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-4 text-center">#</th>
              <th className="py-3.5 px-4">Entity Name</th>
              <th className="py-3.5 px-4">Document Type</th>
              <th className="py-3.5 px-4">Submitted On</th>
              <th className="py-3.5 px-4">AI Status</th>
              <th className="py-3.5 px-4">Officer Status</th>
              <th className="py-3.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {submissions.map((sub, index) => (
              <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-[11px] font-bold">{index + 1}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                      {sub.entity_name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 block leading-tight group-hover:text-blue-600 transition-colors">{sub.entity_name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{sub.certificate_number || 'N/A'}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-semibold">{sub.document_type}</td>
                <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap">{sub.submitted_on}</td>
                <td className="py-3.5 px-4">{getAiBadge(sub.ai_status)}</td>
                <td className="py-3.5 px-4">{getOfficerBadge(sub.officer_status)}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => onSelectSubmission(sub)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold text-xs transition-all border border-slate-200/80 shadow-2xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing 1 to 5 of 254 results</span>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
            &lt;
          </button>
          <button className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold shadow-sm">
            1
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
            3
          </button>
          <span className="px-1 text-slate-400 font-bold">...</span>
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
            51
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
