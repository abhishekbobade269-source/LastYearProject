import React from 'react';
import { Search, Bell, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTabTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTabTitle }) => {
  return (
    <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Title & Context */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 capitalize tracking-tight leading-tight flex items-center gap-2">
          <span>{activeTabTitle}</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Welcome back, Officer! Here's what's happening with NOC verification today.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-5">
        {/* Search Bar */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search certificates, entities..."
            className="w-full pl-10 pr-12 py-2 text-xs bg-slate-100/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400 font-medium"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/60">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200/80">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-blue-500/30">
              RS
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white">
              <ShieldCheck className="w-3 h-3" />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 leading-tight">R. Sharma</h4>
            <span className="text-[11px] text-slate-500 font-semibold block">Senior Government Officer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
