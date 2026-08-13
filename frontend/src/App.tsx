import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { VerificationPipeline } from './components/VerificationPipeline';
import { RecentSubmissionsTable } from './components/RecentSubmissionsTable';
import { CertificatePreviewCard } from './components/CertificatePreviewCard';
import { ExpiryAlertsCard } from './components/ExpiryAlertsCard';
import { QuickActions } from './components/QuickActions';
import { VerificationAnalytics } from './components/VerificationAnalytics';
import { NewSubmissionModal } from './components/NewSubmissionModal';

import { AIVerificationView } from './components/AIVerificationView';
import { OfficerReviewView } from './components/OfficerReviewView';
import { ApprovedNOCsView } from './components/ApprovedNOCsView';
import { AuditTrailView } from './components/AuditTrailView';

import { ProfileView } from './components/ProfileView';
import { SecurityView } from './components/SecurityView';
import { PermissionsView } from './components/PermissionsView';
import { SettingsView } from './components/SettingsView';
import { EntitiesView } from './components/EntitiesView';
import { ReportsView } from './components/ReportsView';

import { 
  fetchDashboardStats, 
  fetchSubmissions, 
  fetchExpiryAlerts, 
  type DashboardStats, 
  type Submission, 
  type ExpiryAlert 
} from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalSubmissions: 254,
    approvedNocs: 168,
    pendingReview: 42,
    expiringSoon: 19,
    registeredEntities: 112
  });

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [expiryAlerts, setExpiryAlerts] = useState<ExpiryAlert[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isNewSubmissionOpen, setIsNewSubmissionOpen] = useState(false);

  const loadData = async () => {
    const sData = await fetchDashboardStats();
    setStats(sData);

    const subData = await fetchSubmissions();
    setSubmissions(subData);

    const expData = await fetchExpiryAlerts();
    setExpiryAlerts(expData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNewSubmissionSuccess = (newSub: Submission) => {
    setSubmissions(prev => [newSub, ...prev]);
    setStats(prev => ({
      ...prev,
      totalSubmissions: prev.totalSubmissions + 1,
      pendingReview: prev.pendingReview + 1
    }));
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          activeTabTitle={activeTab.replace('-', ' ')} 
          onNavigateTab={(tabId) => setActiveTab(tabId)}
        />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <>
              {/* 1. Top Metrics Bar */}
              <StatsOverview stats={stats} />

              {/* 2. Verification Pipeline Stepper */}
              <VerificationPipeline />

              {/* 3. Main Grid Section matching Mockup layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 7 columns: Recent Submissions & Verification Analytics */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <RecentSubmissionsTable 
                    submissions={submissions.slice(0, 5)} 
                    onSelectSubmission={(sub) => setSelectedSubmission(sub)}
                  />
                  <VerificationAnalytics />
                </div>

                {/* Right 5 columns: Latest Approved Certificate, Expiry Alerts, Quick Actions */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <CertificatePreviewCard selectedSubmission={selectedSubmission} />
                  <ExpiryAlertsCard alerts={expiryAlerts} />
                  <QuickActions onNewSubmissionClick={() => setIsNewSubmissionOpen(true)} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'submissions' && (
            <RecentSubmissionsTable 
              submissions={submissions} 
              onSelectSubmission={(sub) => setSelectedSubmission(sub)}
            />
          )}

          {activeTab === 'ai-verification' && (
            <AIVerificationView submissions={submissions} />
          )}

          {activeTab === 'officer-review' && (
            <OfficerReviewView submissions={submissions} onRefresh={loadData} />
          )}

          {activeTab === 'approved-nocs' && (
            <ApprovedNOCsView submissions={submissions} />
          )}

          {activeTab === 'renewals' && (
            <ExpiryAlertsCard alerts={expiryAlerts} />
          )}

          {activeTab === 'expiry-alerts' && (
            <ExpiryAlertsCard alerts={expiryAlerts} />
          )}

          {activeTab === 'audit-trail' && (
            <AuditTrailView />
          )}

          {activeTab === 'profile' && (
            <ProfileView />
          )}

          {activeTab === 'security' && (
            <SecurityView />
          )}

          {(activeTab === 'permissions' || activeTab === 'users-roles') && (
            <PermissionsView />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}

          {activeTab === 'entities' && (
            <EntitiesView />
          )}

          {activeTab === 'reports' && (
            <ReportsView />
          )}
        </main>

        {/* Footer */}
        <footer className="h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-[11px] text-slate-500">
          <span>© 2025 NOC Verify. All rights reserved.</span>
          <div className="flex items-center gap-4 font-medium">
            <button className="hover:text-blue-600">Privacy Policy</button>
            <button className="hover:text-blue-600">Terms of Service</button>
            <button className="hover:text-blue-600">Support</button>
          </div>
        </footer>
      </div>

      {/* New Submission Modal */}
      <NewSubmissionModal
        isOpen={isNewSubmissionOpen}
        onClose={() => setIsNewSubmissionOpen(false)}
        onSuccess={handleNewSubmissionSuccess}
      />
    </div>
  );
}
