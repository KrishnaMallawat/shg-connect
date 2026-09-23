import React from 'react';
import { GroupInfo } from '../services/db';
import { SupportedLanguage } from '../types/shg';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Building2, Users, RefreshCw, ShieldCheck, Activity, Search } from 'lucide-react';
import { SettingsView } from '../components/settings/SettingsView';

interface AnimatorDashboardProps {
  group: GroupInfo;
  language: SupportedLanguage;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onOpenSyncCenter?: () => void;
  onOpenBackupModal?: () => void;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onToggleTts?: () => void;
  ttsEnabled?: boolean;
  onResetData?: () => void;
}

export const AnimatorDashboard: React.FC<AnimatorDashboardProps> = ({
  group,
  language,
  activeTab = 'home',
  onSelectTab,
  onOpenSyncCenter = () => {},
  onOpenBackupModal = () => {},
  onLanguageChange = () => {},
  onToggleTts = () => {},
  ttsEnabled = true,
  onResetData = () => {},
}) => {
  // Mock portfolio for Animator
  const portfolio = [
    { id: '1', name: group.name, code: group.shgCode, grade: 'A', members: 12, balance: 145000, syncStatus: 'synced', lastSync: '10 mins ago' },
    { id: '2', name: 'Lakshmi Mahila Bachat Gat', code: 'SHG-MH-2024-885', grade: 'B', members: 10, balance: 85000, syncStatus: 'pending', lastSync: '2 days ago' },
    { id: '3', name: 'Saraswati SHG', code: 'SHG-MH-2024-886', grade: 'C', members: 15, balance: 45000, syncStatus: 'failed', lastSync: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div
        className="rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #1D5FA8 0%, #174a83 100%)' }}
      >
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full mb-3"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#EBF3FF', border: '1px solid rgba(255,255,255,0.2)' }}>
            CRP / Prerak View
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Village Portfolio Overview
          </h1>
          <p className="text-sm text-blue-200 mt-1.5 font-medium">
            Supervising {portfolio.length} SHGs in {group.village}
          </p>
        </div>
      </div>

      {activeTab === 'home' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 stat-blue">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-600">
                  <Building2 className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">Total SHGs</span>
              </div>
              <div className="text-3xl font-black text-blue-800">{portfolio.length}</div>
            </div>
            <div className="rounded-2xl p-5 stat-violet">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-violet-600">
                  <Users className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-700">Total Beneficiaries</span>
              </div>
              <div className="text-3xl font-black text-violet-800">37</div>
            </div>
            <div className="rounded-2xl p-5 stat-orange">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-500">
                  <Activity className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Needs Attention</span>
              </div>
              <div className="text-3xl font-black text-amber-800">1</div>
              <p className="text-xs text-amber-600 mt-1">Grade C SHGs</p>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'home' || activeTab === 'members') && (
        <Card className="p-0 overflow-hidden border-0 shadow-card">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              SHG Portfolio & Sync Status
            </h3>
            <button onClick={onOpenSyncCenter} className="text-sm font-semibold text-blue-600 flex items-center gap-1.5 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              Force Sync All
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {portfolio.map(shg => (
              <div key={shg.id} className="p-4 hover:bg-gray-50 flex items-center justify-between flex-wrap gap-4 transition-colors">
                <div>
                  <div className="font-bold text-gray-900 text-[15px]">{shg.name}</div>
                  <div className="text-xs font-medium text-gray-500 mt-0.5">{shg.code} · {shg.members} Members</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={shg.grade === 'A' ? 'success' : shg.grade === 'B' ? 'warning' : 'error'} size="md">
                    Grade {shg.grade}
                  </Badge>
                  <div className="text-right min-w-[80px]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Sync State</div>
                    <div className={`text-xs font-bold ${shg.syncStatus === 'synced' ? 'text-green-600' : shg.syncStatus === 'pending' ? 'text-amber-500' : 'text-red-500'}`}>
                      {shg.syncStatus === 'synced' ? 'Up to date' : shg.syncStatus === 'pending' ? 'Pending' : 'Conflict'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'settings' && (
        <SettingsView
          language={language}
          onLanguageChange={onLanguageChange}
          ttsEnabled={ttsEnabled}
          onToggleTts={onToggleTts}
          onOpenBackupModal={onOpenBackupModal}
          onOpenSyncCenter={onOpenSyncCenter}
          onResetData={onResetData}
          federation={group.federation}
        />
      )}
    </div>
  );
};
