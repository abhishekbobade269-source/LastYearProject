import React from 'react';
import { User, Mail, Building, Award, ShieldCheck, FileCheck2, Clock, BarChart2 } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-900 text-white flex items-center justify-center font-black text-xl shadow-md ring-4 ring-blue-500/20">
            RS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">R. Sharma</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-300">
                <ShieldCheck className="w-3 h-3" /> Verified Officer
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Senior Government Officer — Pune Fire Department</p>
          </div>
        </div>
        <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-mono font-bold rounded-xl border border-blue-200">
          ID: GOV-PU-8942
        </span>
      </div>

      {/* Official Government Credential Badge */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/80 text-white rounded-2xl shadow-md backdrop-blur-xs border border-white/20">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 block">GOVERNMENT OF MAHARASHTRA</span>
              <h4 className="text-lg font-extrabold text-white tracking-tight">Registered Approving Authority Credential</h4>
              <p className="text-xs text-slate-300 font-medium">Digital Signature RSA-4096 Key Fingerprint Validated</p>
            </div>
          </div>
          <div className="text-right font-mono text-xs text-slate-300">
            <span className="block text-[10px] text-slate-400 font-sans uppercase font-bold">Public Key Hash</span>
            <span className="text-blue-400 font-bold">0x9F4A...82B1</span>
          </div>
        </div>
      </div>

      {/* Personal Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Officer Name</span>
          <span className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" /> R. Sharma
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Official Email</span>
          <span className="text-sm font-bold text-blue-700 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" /> r.sharma@gov.in
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Government ID</span>
          <span className="text-sm font-mono font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> GOV-PU-8942
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Department</span>
          <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-600" /> Pune Fire Dept
          </span>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-600" /> Officer Approval Performance Analytics
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
            <FileCheck2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-3xl font-black text-blue-700 block">168</span>
            <span className="text-xs font-bold text-slate-600">Total Approved NOCs</span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <span className="text-3xl font-black text-emerald-700 block">4.2 Hours</span>
            <span className="text-xs font-bold text-slate-600">Average Turnaround Time</span>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <ShieldCheck className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <span className="text-3xl font-black text-indigo-700 block">99.8%</span>
            <span className="text-xs font-bold text-slate-600">Audit Compliance Score</span>
          </div>
        </div>
      </div>
    </div>
  );
};
