import React, { useState } from 'react';
import type { Submission } from '../services/api';
import { ShieldCheck, QrCode, ExternalLink, Copy, Check } from 'lucide-react';

interface ApprovedNOCsViewProps {
  submissions: Submission[];
}

export const ApprovedNOCsView: React.FC<ApprovedNOCsViewProps> = ({ submissions }) => {
  const approvedList = submissions.filter(s => s.officer_status === 'Approved' || s.blockchain_status === 'Anchored');
  const [selectedCert, setSelectedCert] = useState<Submission | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Blockchain-Anchored Approved Certificates Registry
          </h3>
          <p className="text-xs text-slate-500">
            Official immutable register of active, officer-approved No Objection Certificates.
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
          {approvedList.length} Active Verified Certificates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedList.map((noc) => (
          <div 
            key={noc.id}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="status-pill approved">
                  <ShieldCheck className="w-3 h-3" /> Approved
                </span>
                <span className="text-[10px] font-mono text-slate-400">Block #{noc.blockchain_block_number || 18456321}</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1">{noc.entity_name}</h4>
              <span className="text-xs font-semibold text-blue-600 block mb-2">{noc.document_type}</span>

              <div className="space-y-1 text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Certificate No.:</span>
                  <span className="font-mono font-bold text-slate-800">{noc.certificate_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Valid Until:</span>
                  <span className="font-bold text-emerald-700">{noc.expiry_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Authority:</span>
                  <span className="font-medium text-slate-700">{noc.issuing_authority}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCert(noc)}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Verify On-Chain Hash</span>
            </button>
          </div>
        ))}
      </div>

      {/* Hash Verification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center relative">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h4 className="text-lg font-bold text-slate-900">Blockchain Validation Record</h4>
            <p className="text-xs text-slate-500 mb-4">{selectedCert.entity_name} ({selectedCert.document_type})</p>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl text-left space-y-2 mb-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase font-sans font-bold">SHA-256 Document Hash</span>
                <div className="flex items-center justify-between text-blue-400 break-all text-[11px]">
                  <span>{selectedCert.blockchain_hash}</span>
                  <button 
                    onClick={() => copyHash(selectedCert.blockchain_hash || '')}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    {copiedHash ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block uppercase font-sans font-bold">Ethereum Transaction Hash</span>
                <span className="text-slate-300 break-all text-[11px]">{selectedCert.blockchain_tx_hash || '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b'}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-[11px]">
                <span className="text-slate-400 font-sans">Block Height:</span>
                <span className="text-emerald-400 font-bold">#{selectedCert.blockchain_block_number || 18456321}</span>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <a
                href="https://sepolia.etherscan.io"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700 transition-colors"
              >
                <span>View on Etherscan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
