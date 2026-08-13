import React from 'react';
import { UploadCloud, UserPlus, Search, BarChart3, History, Settings } from 'lucide-react';

interface QuickActionsProps {
  onNewSubmissionClick: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNewSubmissionClick }) => {
  const actions = [
    {
      title: 'New Submission',
      icon: UploadCloud,
      color: 'hover:border-blue-300 hover:bg-blue-50/50 text-blue-600',
      iconBg: 'bg-blue-600 text-white',
      action: onNewSubmissionClick
    },
    {
      title: 'Assign Officer',
      icon: UserPlus,
      color: 'hover:border-emerald-300 hover:bg-emerald-50/50 text-emerald-600',
      iconBg: 'bg-emerald-600 text-white',
      action: () => alert('Assign to Officer modal')
    },
    {
      title: 'Search Cert',
      icon: Search,
      color: 'hover:border-purple-300 hover:bg-purple-50/50 text-purple-600',
      iconBg: 'bg-purple-600 text-white',
      action: () => alert('Search Certificate trigger')
    },
    {
      title: 'Generate Report',
      icon: BarChart3,
      color: 'hover:border-amber-300 hover:bg-amber-50/50 text-amber-600',
      iconBg: 'bg-amber-600 text-white',
      action: () => alert('Generating PDF Report...')
    },
    {
      title: 'Audit Trail',
      icon: History,
      color: 'hover:border-pink-300 hover:bg-pink-50/50 text-pink-600',
      iconBg: 'bg-pink-600 text-white',
      action: () => alert('Opening Blockchain Audit Logs...')
    },
    {
      title: 'Settings',
      icon: Settings,
      color: 'hover:border-slate-300 hover:bg-slate-100/50 text-slate-700',
      iconBg: 'bg-slate-800 text-white',
      action: () => alert('Opening Settings...')
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 mb-6">
      <div className="mb-4">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Quick Actions</h3>
        <p className="text-xs text-slate-500 font-medium">Common administrative workflows</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              onClick={act.action}
              className={`p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60 flex flex-col items-center justify-center gap-2.5 transition-all duration-200 text-center group cursor-pointer card-hover-glow ${act.color}`}
            >
              <div className={`w-9 h-9 rounded-xl ${act.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-slate-900 leading-tight block">{act.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
