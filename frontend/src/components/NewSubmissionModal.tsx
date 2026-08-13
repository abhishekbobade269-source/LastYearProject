import React, { useState } from 'react';
import { X, UploadCloud, Cpu, ShieldCheck } from 'lucide-react';
import { createSubmission, type Submission } from '../services/api';

interface NewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSub: Submission) => void;
}

export const NewSubmissionModal: React.FC<NewSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [entityName, setEntityName] = useState('');
  const [documentType, setDocumentType] = useState('Fire NOC');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entityName) return;

    setIsSubmitting(true);
    try {
      const created = await createSubmission({
        entity_name: entityName,
        document_type: documentType,
        location: location || 'Pune, Maharashtra'
      });
      onSuccess(created);
      onClose();
    } catch (err) {
      alert('Error creating submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Submit New NOC Document</h3>
            <p className="text-xs text-slate-500">Initiates automated AI OCR verification & Blockchain anchoring</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Entity / Organization Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sunrise Hotels Pvt. Ltd."
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Document Type *
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="Fire NOC">Fire NOC</option>
              <option value="Pollution NOC">Pollution NOC</option>
              <option value="Building Plan Approval">Building Plan Approval</option>
              <option value="Trade License">Trade License</option>
              <option value="Factory Licence">Factory Licence</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Premises / Address Location
            </label>
            <input
              type="text"
              placeholder="e.g. 123, MG Road, Pune - 411001"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Upload Dropzone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Upload NOC Document PDF / Image
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50 hover:bg-slate-100/60 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <span className="text-xs font-bold text-slate-700 block">Click to upload or drag & drop</span>
              <span className="text-[10px] text-slate-400 block mt-1">PDF, PNG, JPG (Max size 15MB)</span>
            </div>
          </div>

          {/* Process Indicators */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              <span>AI OCR will parse metadata & compute validation score.</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>SHA-256 hash will be generated & queued for blockchain anchoring.</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2"
            >
              {isSubmitting ? 'Processing AI & Blockchain...' : 'Submit & Analyze'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
