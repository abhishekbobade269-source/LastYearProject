import React, { useState } from 'react';
import { Settings, Bell, Smartphone, Shield, Sliders } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-700" />
          Account & Officer Preferences
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Configure automated notification channels, review queue preferences, and SLA thresholds.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" /> Automated Notification Channels
        </h4>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Email Expiry Reminders</span>
                <span className="text-[11px] text-slate-500 font-medium">Receive automated notices at 30, 15, 7, and 1 day prior to NOC expiry</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">SMS Critical Alerts for High-SLA Reviews</span>
                <span className="text-[11px] text-slate-500 font-medium">Instant SMS notifications for urgent entity submissions</span>
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
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-600" /> Review Queue & SLA Rules
        </h4>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Auto-Assign Pending Submissions to Queue</span>
              <span className="text-[11px] text-slate-500 font-medium font-sans">Automatically assign new submissions based on department SLA load balancing</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={autoAssign}
            onChange={(e) => setAutoAssign(e.target.checked)}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        </div>

        <button
          onClick={() => alert('Preferences saved successfully!')}
          className="px-6 py-2.5 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
        >
          Save All Preferences
        </button>
      </div>
    </div>
  );
};
