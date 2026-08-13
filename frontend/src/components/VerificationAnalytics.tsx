import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const VerificationAnalytics: React.FC = () => {
  const pieData = [
    { name: 'Verified', value: 176, percentage: '69%', color: '#10B981' },
    { name: 'Minor Issues', value: 48, percentage: '19%', color: '#F59E0B' },
    { name: 'Major Issues', value: 20, percentage: '8%', color: '#EF4444' },
    { name: 'Incomplete', value: 10, percentage: '4%', color: '#64748B' },
  ];

  const areaData = [
    { date: '1 May', submissions: 20 },
    { date: '7 May', submissions: 45 },
    { date: '14 May', submissions: 30 },
    { date: '21 May', submissions: 65 },
    { date: '28 May', submissions: 50 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Left Donut Breakdown */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Verification Analytics</h3>
            <p className="text-xs text-slate-500 font-medium">AI analysis score distribution</p>
          </div>
        </div>

        <div className="flex items-center justify-center relative my-3 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={82}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Overlay Count */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-slate-900 leading-none tracking-tight">254</span>
            <span className="text-[10px] uppercase font-extrabold text-slate-400 mt-1">Total NOCs</span>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-3 border-t border-slate-100">
          {pieData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-bold">{item.name}</span>
              </div>
              <span className="text-slate-900 font-extrabold">{item.value} <span className="text-slate-400 text-[10px]">({item.percentage})</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Timeline Submissions Overview */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Submissions Overview</h3>
            <p className="text-xs text-slate-500 font-medium">Monthly submission volume trajectory</p>
          </div>
          <select className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="submissionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} stroke="#E2E8F0" />
              <YAxis tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} stroke="#E2E8F0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', border: '1px solid #334155', fontSize: '12px', fontWeight: 600, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}
              />
              <Area type="monotone" dataKey="submissions" stroke="#2563EB" strokeWidth={3.5} fillOpacity={1} fill="url(#submissionGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
