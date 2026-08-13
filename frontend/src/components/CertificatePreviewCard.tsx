import React from 'react';
import type { Submission } from '../services/api';
import { ShieldCheck, QrCode, Award } from 'lucide-react';

interface CertificatePreviewCardProps {
  selectedSubmission: Submission | null;
}

export const CertificatePreviewCard: React.FC<CertificatePreviewCardProps> = ({ selectedSubmission }) => {
  const currentDoc = selectedSubmission || {
    id: 1,
    entity_name: 'Sunrise Hotels Pvt. Ltd.',
    document_type: 'Fire NOC',
    certificate_number: 'FD/2025/4587',
    issuing_authority: 'Pune Fire Department',
    issue_date: '01/05/2025',
    expiry_date: '30/04/2026',
    location: '123, MG Road, Pune - 411001',
    blockchain_hash: '0x8f7d9a1c2b3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Latest Approved Certificate</h3>
          <p className="text-xs text-slate-500 font-medium">Official verified government document preview</p>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
          View All
        </button>
      </div>

      {/* Premium Official Certificate Card Frame */}
      <div className="official-certificate rounded-xl p-6 relative overflow-hidden">
        {/* Subtle Watermark Icon */}
        <div className="absolute right-4 top-4 text-amber-500/10 pointer-events-none">
          <Award className="w-32 h-32" />
        </div>

        {/* Certificate Header */}
        <div className="text-center mb-4 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">
            GOVERNMENT OF MAHARASHTRA
          </span>
          <h4 className="text-sm font-extrabold text-red-800 tracking-wider uppercase font-serif">
            FIRE DEPARTMENT
          </h4>
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide underline decoration-red-600 decoration-2 underline-offset-4 mt-0.5">
            NO OBJECTION CERTIFICATE
          </h5>
        </div>

        {/* Certificate Numbers */}
        <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-4 border-b border-amber-200/80 pb-2.5 relative z-10">
          <span>Certificate No: <strong className="text-slate-900 font-mono font-bold">{currentDoc.certificate_number}</strong></span>
          <span>Date: <strong className="text-slate-900 font-bold">{currentDoc.issue_date}</strong></span>
        </div>

        {/* Main Certificate Text */}
        <p className="text-xs text-slate-700 text-center leading-relaxed italic mb-5 relative z-10">
          This is to certify that the building / premises of <strong className="text-slate-900 not-italic font-extrabold">{currentDoc.entity_name}</strong> located at <span className="underline decoration-slate-300 font-semibold">{currentDoc.location}</span> has complied with the fire safety requirements. This NOC is valid from <strong className="text-slate-900 not-italic font-bold">{currentDoc.issue_date}</strong> to <strong className="text-slate-900 not-italic font-bold">{currentDoc.expiry_date}</strong>.
        </p>

        {/* Seals & Signatures Row */}
        <div className="flex items-end justify-between pt-3 border-t border-amber-200/80 relative z-10">
          {/* Circular Stamp Seal */}
          <div className="certificate-seal-stamp">
            <span className="text-[9px] font-extrabold leading-tight">PUNE FIRE</span>
            <span className="text-[8px] font-bold text-amber-700">DEPT</span>
          </div>

          {/* QR Code Validation Tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-2xs backdrop-blur-xs">
            <QrCode className="w-6 h-6 text-slate-800" />
            <div className="text-[9px] font-mono leading-none">
              <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" /> VERIFIED
              </span>
              <span className="text-slate-400 block mt-0.5">Hash Anchored</span>
            </div>
          </div>

          {/* Signature Block */}
          <div className="text-right">
            <div className="h-6 font-serif italic text-slate-900 text-sm font-bold border-b border-slate-400">
              Fire Officer
            </div>
            <span className="text-[10px] font-bold text-slate-900 block mt-0.5">Fire Officer</span>
            <span className="text-[9px] text-slate-500 font-medium block">Pune Fire Department</span>
          </div>
        </div>
      </div>

      {/* Dots Carousel Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-2xs" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
      </div>
    </div>
  );
};
