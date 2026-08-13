import React, { useState } from 'react';
import { Key, Lock, Smartphone, Laptop, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export const SecurityView: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New Password and Confirm Password do not match.');
      return;
    }
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-600" />
          Password & Account Security Settings
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage your government officer login password, multi-factor authentication (MFA), and active device sessions.
        </p>
      </div>

      {/* Password Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        {passwordSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Your password has been updated successfully! Next login will require your new password.</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Update Password</h4>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-extrabold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Save New Password</span>
          </button>
        </form>
      </div>

      {/* MFA & Active Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-indigo-600" /> Multi-Factor Authentication (MFA)
          </h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Requires a 6-digit TOTP verification code from Google Authenticator / Duo on every login attempt.
          </p>

          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900">MFA Protection Status</span>
            <button
              onClick={() => setMfaEnabled(!mfaEnabled)}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                mfaEnabled ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {mfaEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-600" /> Active Session Inspector
          </h4>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-extrabold text-slate-900 block">Windows PC — Chrome Browser</span>
              <span className="text-[10px] text-slate-400 font-mono">IP: 192.168.0.189 — Pune, India</span>
            </div>
            <span className="badge-pill badge-verified">Active Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};
