import React from 'react';
import { BarChart3, Download, FileSpreadsheet, FileJson, PieChart as PieIcon } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const handleExport = (format: 'csv' | 'json') => {
    const apiBase = import.meta.env.VITE_API_URL || 'https://noc-verify-backend.onrender.com/api';
    window.open(`${apiBase}/reports/export?format=${format}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Executive Reports & Data Export Workspace
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Download comprehensive compliance audits, submission histories, and verification metrics in CSV/JSON formats.
          </p>
        </div>
      </div>

      {/* Quick Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between card-hover-glow">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-emerald-100 text-emerald-700 rounded-2xl border border-emerald-200">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">CSV Export — Full Registry Data</h4>
              <p className="text-xs text-slate-500 font-medium">Includes submission IDs, certificates, AI scores, officer review notes, and blockchain hashes.</p>
            </div>
          </div>
          <button
            onClick={() => handleExport('csv')}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between card-hover-glow">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-indigo-100 text-indigo-700 rounded-2xl border border-indigo-200">
              <FileJson className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">JSON Export — Audit Machine Records</h4>
              <p className="text-xs text-slate-500 font-medium">Structured JSON payload formatted for external government integrations and machine inspection.</p>
            </div>
          </div>
          <button
            onClick={() => handleExport('json')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Summary */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-blue-600" /> Compliance Performance Breakdown
        </h4>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-slate-900 block">254</span>
            <span className="text-[11px] font-bold text-slate-500">Total Processed NOCs</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-emerald-600 block">168</span>
            <span className="text-[11px] font-bold text-slate-500">Active Approved</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-amber-600 block">42</span>
            <span className="text-[11px] font-bold text-slate-500">Pending Review Queue</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-rose-600 block">44</span>
            <span className="text-[11px] font-bold text-slate-500">Rejected / Correction Required</span>
          </div>
        </div>
      </div>
    </div>
  );
};
