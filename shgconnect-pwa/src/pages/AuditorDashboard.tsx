import React, { useState, useEffect } from 'react';
import { GroupInfo } from '../services/db';
import { SupportedLanguage, Transaction } from '../types/shg';
import { verifyLedgerIntegrity } from '../services/hashChain';
import { PanchasutraVisualizer } from '../components/panchasutra/PanchasutraVisualizer';
import { LedgerVerifier } from '../components/LedgerVerifier';
import { ReportsView } from '../components/reports/ReportsView';
import { SettingsView } from '../components/settings/SettingsView';
import { ShieldCheck, Award, FileText, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface AuditorDashboardProps {
  group: GroupInfo;
  transactions: Transaction[];
  language: SupportedLanguage;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onToggleTts?: () => void;
  ttsEnabled?: boolean;
}

export const AuditorDashboard: React.FC<AuditorDashboardProps> = ({
  group,
  transactions,
  language,
  activeTab = 'home',
  onSelectTab,
  onLanguageChange = () => {},
  onToggleTts = () => {},
  ttsEnabled = true,
}) => {
  const [isChainValid, setIsChainValid] = useState<boolean>(true);

  useEffect(() => {
    async function checkChain() {
      const res = await verifyLedgerIntegrity(transactions);
      setIsChainValid(res.isValid);
    }
    checkChain();
  }, [transactions]);

  const mockPanchasutraScore = {
    regularMeetingsScore: 18,
    regularSavingsScore: 20,
    internalLendingScore: 18,
    timelyRecoveryScore: 16,
    transparentBooksScore: 20,
    totalScore: 92,
    bankGrade: 'Grade A' as const,
    loanEligibilityInr: 500000
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div
        className="rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)' }}
      >
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full mb-3"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#EDE9FE', border: '1px solid rgba(255,255,255,0.2)' }}>
            Compliance & Audit View
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {group.name} Compliance Report
          </h1>
          <p className="text-sm text-purple-200 mt-1.5 font-medium">
            Bank Linkage Eligibility: Grade A · Cryptographic Ledger: {isChainValid ? 'Intact' : 'Compromised'}
          </p>
        </div>
      </div>

      {(activeTab === 'home' || activeTab === 'panchasutra') && (
        <div className="space-y-6">
          <PanchasutraVisualizer score={mockPanchasutraScore} language={language} />
        </div>
      )}

      {(activeTab === 'home' || activeTab === 'reports') && (
        <ReportsView
          language={language}
          onOpenPassbook={() => onSelectTab?.('verifier')}
          onOpenPanchasutra={() => onSelectTab?.('panchasutra')}
          onOpenVerifier={() => onSelectTab?.('verifier')}
          onOpenResolutions={() => onSelectTab?.('panchasutra')} // fallback
        />
      )}

      {activeTab === 'verifier' && (
        <LedgerVerifier transactions={transactions} language={language} onSimulateTamper={() => {}} />
      )}

      {activeTab === 'settings' && (
        <SettingsView
          language={language}
          onLanguageChange={onLanguageChange}
          ttsEnabled={ttsEnabled}
          onToggleTts={onToggleTts}
          onOpenBackupModal={() => {}}
          onOpenSyncCenter={() => {}}
          onResetData={() => {}}
          federation={group.federation}
        />
      )}
    </div>
  );
};
