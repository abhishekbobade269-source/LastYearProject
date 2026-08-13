import React from 'react';
import { Flame, ArrowUpRight } from 'lucide-react';
import type { ExpiryAlert } from '../services/api';

interface ExpiryAlertsCardProps {
  alerts: ExpiryAlert[];
}

export const ExpiryAlertsCard: React.FC<ExpiryAlertsCardProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Expiry Alerts</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">Certificates nearing operational validity expiration</p>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {alerts.map((item) => {
          const isUrgent = item.days_left <= 10;
          return (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 transition-all border border-slate-100 card-hover-glow"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isUrgent ? 'bg-rose-100 text-rose-600 ring-1 ring-rose-200' : 'bg-amber-100 text-amber-600 ring-1 ring-amber-200'}`}>
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">
                    {item.document_type} — <span className="font-semibold text-slate-600">{item.entity_name}</span>
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Expires on {item.expiry_date}
                  </span>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-2xs ${
                isUrgent 
                  ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {item.days_left} days left
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
