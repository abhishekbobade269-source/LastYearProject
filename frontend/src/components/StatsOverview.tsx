import React from 'react';
import { FileText, CheckCircle2, Clock, CalendarDays, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import type { DashboardStats } from '../services/api';

interface StatsOverviewProps {
  stats: DashboardStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions,
      change: '+18% from last month',
      isPositive: true,
      icon: FileText,
      gradient: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/60',
      sparklineColor: '#2563EB',
    },
    {
      title: 'Approved NOCs',
      value: stats.approvedNocs,
      change: '+22% from last month',
      isPositive: true,
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      sparklineColor: '#10B981',
    },
    {
      title: 'Pending Review',
      value: stats.pendingReview,
      change: '-8% from last month',
      isPositive: false,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/60',
      sparklineColor: '#F59E0B',
    },
    {
      title: 'Expiring Soon',
      value: stats.expiringSoon,
      subtext: 'Within next 30 days',
      isPositive: null,
      icon: CalendarDays,
      gradient: 'from-purple-500 to-pink-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/60',
      sparklineColor: '#9333EA',
    },
    {
      title: 'Registered Entities',
      value: stats.registeredEntities,
      subtext: 'Active entities',
      isPositive: null,
      icon: Building2,
      gradient: 'from-sky-500 to-blue-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/60',
      sparklineColor: '#0284C7',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx} 
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs card-hover-glow relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top header row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">{card.title}</span>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center shadow-md ring-2 ring-white`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Main stat value */}
            <div className="mb-2">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                {card.value}
              </h3>
            </div>

            {/* Bottom change indicator / subtext */}
            <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-slate-100">
              {card.change && (
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-bold ${card.badgeBg}`}>
                  {card.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{card.change}</span>
                </div>
              )}
              {card.subtext && (
                <span className="text-slate-400 font-medium text-[11px]">{card.subtext}</span>
              )}
            </div>

            {/* Sparkline Graphic */}
            <div className="mt-2 h-7 w-full opacity-60">
              <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                <path
                  d="M0 20 Q 25 5, 50 15 T 100 8"
                  fill="none"
                  stroke={card.sparklineColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};
