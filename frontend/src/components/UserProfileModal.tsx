import React, { useState } from 'react';
import { 
  X, 
  User, 
  Key, 
  ShieldCheck, 
  Settings, 
  Mail, 
  Building, 
  Award, 
  Smartphone, 
  Laptop, 
  Lock, 
  Check, 
  CheckCircle2, 
  ShieldAlert, 
  Bell, 
  Eye, 
  EyeOff 
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  initialTab?: 'profile' | 'security' | 'permissions' | 'settings';
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  initialTab = 'profile',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'permissions' | 'settings'>(initialTab);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Settings State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  if (!isOpen) return null;

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
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200/90 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-md ring-2 ring-white/20">
              RS
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight flex items-center gap-2">
                <span>R. Sharma</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-xs text-slate-300 font-medium">Senior Government Officer — Pune Fire Department</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200/80 bg-slate-50/80 px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Password & Security</span>
          </button>

          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'permissions'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Role & Permissions</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar">

          {/* TAB 1: MY PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Officer Official Badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">Official Government Credential</span>
                    <h4 className="text-sm font-extrabold text-slate-900">Registered Approving Authority Badge</h4>
                    <p className="text-xs text-slate-600 font-medium">Digital Signing Key RSA-4096 Fingerprint Verified</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-full shadow-2xs">
                  Active
                </span>
              </div>

              {/* Personal Details Form Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Full Name</span>
                  <span className="text-sm font-extrabold text-slate-900">R. Sharma</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Official Email</span>
                  <span className="text-sm font-bold text-blue-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> r.sharma@gov.in
                  </span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Government Officer ID</span>
                  <span className="text-sm font-mono font-bold text-slate-900">GOV-PU-8942</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Assigned Department</span>
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-amber-600" /> Pune Fire Department
                  </span>
                </div>
              </div>

              {/* Approval Performance Stats */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">Officer Performance Analytics</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-2xl font-black text-blue-600 block">168</span>
                    <span className="text-[11px] font-bold text-slate-500">Approved NOCs</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-2xl font-black text-emerald-600 block">4.2h</span>
                    <span className="text-[11px] font-bold text-slate-500">Avg Turnaround Time</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-2xl font-black text-indigo-600 block">99.8%</span>
                    <span className="text-[11px] font-bold text-slate-500">Audit Accuracy Score</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PASSWORD & SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {passwordSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Password updated successfully! Next login will require your new password.</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Change Password</h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">New Password *</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </button>
              </form>

              {/* 2FA / MFA Security Box */}
              <div className="pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-900">Two-Factor Authentication (MFA)</h5>
                      <span className="text-[11px] text-slate-500 font-medium block">Secures login using Google Authenticator / TOTP token</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                      mfaEnabled ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {mfaEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Active Sessions */}
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Active Sessions</h4>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2.5">
                    <Laptop className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="font-bold text-slate-900 block">Windows PC — Chrome Browser (Current Session)</span>
                      <span className="text-[10px] text-slate-400 font-mono">IP: 192.168.0.189 — Pune, India</span>
                    </div>
                  </div>
                  <span className="status-pill verified text-[10px]">Active Now</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ROLE & PERMISSIONS */}
          {activeTab === 'permissions' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 block">Assigned RBAC Role</span>
                  <h4 className="text-base font-extrabold text-slate-900">Senior Government Officer (Department Approver)</h4>
                  <p className="text-xs text-slate-600 font-medium">Authorized to inspect AI OCR findings, execute review decisions, and sign blockchain transactions.</p>
                </div>
                <span className="px-3 py-1 bg-indigo-600 text-white font-extrabold text-xs rounded-full shadow-2xs">
                  Role Active
                </span>
              </div>

              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Granted Action Permissions</h4>
              <div className="space-y-2 text-xs font-semibold">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>NOC Application Inspection & Review (`PERM_REVIEW_NOC`)</span>
                  </div>
                  <span className="badge-pill badge-approved">Granted</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Blockchain SHA-256 Hash Anchoring & Signing (`PERM_BLOCKCHAIN_MINT`)</span>
                  </div>
                  <span className="badge-pill badge-approved">Granted</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Issuing Rejection & Mandatory Correction Requests (`PERM_REJECT_NOC`)</span>
                  </div>
                  <span className="badge-pill badge-approved">Granted</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-slate-400" />
                    <span>SuperAdmin System Configuration Override (`PERM_SUPERADMIN`)</span>
                  </div>
                  <span className="badge-pill badge-incomplete">Read Only</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-5">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Notification Preferences</h4>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 block">Email Alerts for Expiry Thresholds</span>
                      <span className="text-[11px] text-slate-500 font-medium">Receive automated notices at 30, 15, and 7 days prior to NOC expiration</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-indigo-600" />
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 block">SMS Critical Alerts for Urgent Approvals</span>
                      <span className="text-[11px] text-slate-500 font-medium">Instant SMS notifications for high-priority submissions</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('Settings saved successfully!')}
                  className="px-5 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
