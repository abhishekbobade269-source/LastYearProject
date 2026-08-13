import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BrainCircuit, 
  UserCheck, 
  ShieldCheck, 
  RefreshCw, 
  Bell, 
  Building2, 
  BarChart3, 
  History, 
  Users, 
  Settings,
  ExternalLink,
  Shield
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'submissions', label: 'Submissions', icon: FileText },
    { id: 'ai-verification', label: 'AI Verification', icon: BrainCircuit },
    { id: 'officer-review', label: 'Officer Review', icon: UserCheck },
    { id: 'approved-nocs', label: 'Approved NOCs', icon: ShieldCheck },
    { id: 'renewals', label: 'Renewals', icon: RefreshCw },
    { id: 'expiry-alerts', label: 'Expiry Alerts', icon: Bell, badge: 7 },
    { id: 'entities', label: 'Entities', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'audit-trail', label: 'Audit Trail', icon: History },
    { id: 'users-roles', label: 'Users & Roles', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-slate-950 text-slate-300 flex flex-col h-screen flex-shrink-0 select-none border-r border-slate-800/80 shadow-2xl relative z-20">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3.5 border-b border-slate-800/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1 font-sans">
            NOC VERIFY
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
              Blockchain + AI
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation List */}
      <nav className="flex-1 px-3.5 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-white scale-110' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs ${
                  isActive ? 'bg-white text-blue-700' : 'bg-rose-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Blockchain Status Panel */}
      <div className="p-4 m-3.5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900 border border-slate-800/80 shadow-inner">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Blockchain Network</span>
          <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <span className="live-pulse-green" />
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wide">Connected</span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-slate-400 mb-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-medium">Network</span>
            <span className="font-semibold text-slate-200">Ethereum Sepolia</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-medium">Latest Block</span>
            <span className="font-mono text-blue-400 font-bold">#18456321</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-medium">Sync State</span>
            <span className="text-emerald-400 font-semibold">100% Realtime</span>
          </div>
        </div>

        <a 
          href="https://sepolia.etherscan.io" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all border border-slate-700/60 shadow-2xs hover:shadow-md"
        >
          <span>View on Explorer</span>
          <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
        </a>
      </div>
    </aside>
  );
};
