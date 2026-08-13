import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  ChevronDown, 
  User, 
  Key, 
  Shield, 
  Settings, 
  LogOut, 
  CheckCircle2,
  Mail,
  Building
} from 'lucide-react';

interface HeaderProps {
  activeTabTitle: string;
  onNavigateTab?: (tabId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTabTitle, onNavigateTab }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTab = (tabId: string) => {
    if (onNavigateTab) {
      onNavigateTab(tabId);
    }
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out of NOC VERIFY Platform?')) {
      alert('Logged out successfully.');
      setIsProfileOpen(false);
    }
  };

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
        <button className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/60 cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Interactive User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            onMouseEnter={() => setIsProfileOpen(true)}
            className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-2xl hover:bg-slate-100/80 transition-all cursor-pointer border border-transparent hover:border-slate-200/80 group"
          >
            {/* Avatar with Online Glow Indicator */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-900 text-white flex items-center justify-center font-extrabold text-sm shadow-md ring-2 ring-blue-500/30 group-hover:scale-105 transition-transform">
                RS
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white shadow-2xs">
                <ShieldCheck className="w-3 h-3" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-extrabold text-slate-900 leading-tight">R. Sharma</h4>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </div>
              <span className="text-[10px] text-blue-600 font-bold block mt-0.5 uppercase tracking-wide">
                Senior Officer
              </span>
            </div>
          </button>

          {/* Profile Dropdown Overlay Menu */}
          {isProfileOpen && (
            <div 
              className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-2xl p-4 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              {/* Profile Card Header */}
              <div 
                onClick={() => handleSelectTab('profile')}
                className="p-3 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-xl mb-3 shadow-md relative overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-base flex items-center justify-center shadow-inner ring-2 ring-white/20">
                    RS
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold tracking-tight flex items-center gap-1.5">
                      <span>R. Sharma</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <span className="text-[11px] text-blue-300 font-semibold block">Senior Government Officer</span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">ID: GOV-PU-8942</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 grid grid-cols-2 gap-2 text-[10px] text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3 h-3 text-blue-400" />
                    <span className="truncate">r.sharma@gov.in</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Building className="w-3 h-3 text-amber-400" />
                    <span className="truncate">Pune Fire Dept</span>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="space-y-1 text-xs font-semibold">
                <button 
                  onClick={() => handleSelectTab('profile')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <span>My Profile & Credentials</span>
                </button>

                <button 
                  onClick={() => handleSelectTab('security')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer"
                >
                  <Key className="w-4 h-4 text-amber-600" />
                  <span>Change Password & Security</span>
                </button>

                <button 
                  onClick={() => handleSelectTab('permissions')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span>Role & Permissions</span>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                    Admin Officer
                  </span>
                </button>

                <button 
                  onClick={() => handleSelectTab('settings')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Account Settings</span>
                </button>
              </div>

              {/* Logout Footer */}
              <div className="pt-2 mt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
