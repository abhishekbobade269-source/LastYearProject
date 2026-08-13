import React from 'react';
import { Upload, Cpu, UserCheck, ShieldCheck, BellRing, ArrowRight } from 'lucide-react';

export const VerificationPipeline: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Submission',
      description: 'Entity uploads NOCs / Documents',
      icon: Upload,
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      number: '2',
      title: 'AI Verification',
      description: 'OCR & AI extracts and validates data',
      icon: Cpu,
      gradient: 'from-indigo-600 to-violet-600',
    },
    {
      number: '3',
      title: 'Officer Review',
      description: 'Assigned officer verifies & approves',
      icon: UserCheck,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      number: '4',
      title: 'Blockchain',
      description: 'Hash stored on blockchain',
      icon: ShieldCheck,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      number: '5',
      title: 'Compliance',
      description: 'Monitoring & renewal alerts',
      icon: BellRing,
      gradient: 'from-sky-500 to-blue-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs mb-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Verification Pipeline</h3>
          <p className="text-xs text-slate-500 font-medium">End-to-end lifecycle from document upload to blockchain anchoring</p>
        </div>
        <button className="px-3.5 py-1.5 rounded-xl border border-blue-200 text-blue-700 bg-blue-50/60 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all shadow-2xs cursor-pointer">
          View Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx} 
              className="relative flex flex-col items-center text-center p-4 rounded-xl bg-slate-50/60 border border-slate-200/60 hover:border-blue-300 hover:bg-white transition-all card-hover-glow group"
            >
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center font-bold text-sm mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-extrabold text-slate-900 mb-1">
                {step.number}. {step.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-snug font-medium">
                {step.description}
              </p>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
