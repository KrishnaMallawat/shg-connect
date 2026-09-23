import React, { useState } from 'react';
import { Member, Transaction, SupportedLanguage } from '../../types/shg';
import { translations } from '../../i18n/translations';
import { formatINR } from '../../theme/tokens';
import { Card } from '../ui/Card';
import { PlusCircle, PiggyBank, Target, Calendar, Filter, ArrowUpRight } from 'lucide-react';

interface SavingsViewProps {
  member: Member;
  transactions: Transaction[];
  language: SupportedLanguage;
  onOpenUpiPayment: (type: 'SAVINGS' | 'EMI_REPAYMENT', defaultAmt: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SavingsView: React.FC<SavingsViewProps> = ({
  member,
  transactions,
  language,
  onOpenUpiPayment,
  onNavigateTab
}) => {
  const t = translations[language] || translations.en;
  const [filterPeriod, setFilterPeriod] = useState<'month' | '3months' | 'all'>('all');

  const savingsTxs = transactions.filter(t => t.memberId === member.id && t.type === 'SAVINGS');

  const now = new Date();
  const filteredTxs = savingsTxs.filter(tx => {
    const txDate = new Date(tx.timestamp);
    if (filterPeriod === 'month') {
      return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
    }
    if (filterPeriod === '3months') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return txDate >= threeMonthsAgo;
    }
    return true;
  });

  const targetGoal = 25000;
  const progressPercent = Math.min(100, Math.round((member.totalSavings / targetGoal) * 100));
  const remainingGoal = Math.max(0, targetGoal - member.totalSavings);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-6">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
          <PiggyBank className="w-6 h-6 text-[#1A6B4A]" />
          <span>{language === 'mr' ? 'माझी बचत' : language === 'hi' ? 'मेरी बचत' : 'My Savings'}</span>
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {language === 'mr' ? 'तुमच्या बचतीचा सविस्तर आढावा आणि नोंदी' : language === 'hi' ? 'आपकी बचत का विस्तृत अवलोकन और रिकॉर्ड' : 'Overview of your savings balance and ledger entries'}
        </p>
      </div>

      {/* Main Savings Card */}
      <div className="card-hero-green rounded-2xl p-5 sm:p-6 relative overflow-hidden space-y-3.5">
        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-green-200">
            {language === 'mr' ? 'एकूण जमा बचत' : language === 'hi' ? 'कुल जमा बचत' : 'Total Personal Savings'}
          </span>
          <span className="bg-white/20 text-[#DCFCE7] border border-white/20 font-extrabold text-xs px-2.5 py-1 rounded-full">
            +₹500 {language === 'mr' ? 'या महिन्यात' : language === 'hi' ? 'इस महीने' : 'this month'}
          </span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2 relative z-10">
          <div className="text-4xl sm:text-5xl font-black text-white tracking-tight amount-display">
            {formatINR(member.totalSavings)}
          </div>
          <div className="text-xs text-green-200 font-semibold">
            {language === 'mr' ? 'मासिक योगदान:' : language === 'hi' ? 'मासिक योगदान:' : 'Monthly contribution:'} ₹500
          </div>
        </div>

        <div className="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <span className="text-xs font-bold text-green-200 flex items-center gap-1.5">
            <span>✓</span>
            <span>{language === 'mr' ? 'नोंद सुरक्षित आहे' : language === 'hi' ? 'रिकॉर्ड सुरक्षित है' : 'Record secured'}</span>
          </span>
          <button
            onClick={() => onOpenUpiPayment('SAVINGS', 500)}
            className="bg-white text-[#1A6B4A] hover:bg-green-50 px-5 py-2.5 rounded-xl text-[13px] font-bold transition flex items-center gap-2 min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{language === 'mr' ? '＋ बचत जमा करा' : language === 'hi' ? '＋ बचत जमा करें' : 'Deposit Savings'}</span>
          </button>
        </div>
      </div>

      {/* Savings Goal Section */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4E8EF] shadow-card space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#E8720C]" />
            {language === 'mr' ? 'बचतीची प्रगती (लक्ष्य)' : language === 'hi' ? 'बचत लक्ष्य प्रगति' : 'Savings Goal Progress'}
          </span>
          <span className="text-xs font-extrabold text-[#E8720C]">
            {progressPercent}%
          </span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#111827] mb-1.5">
            <span>{language === 'mr' ? 'आपत्कालीन व वैद्यकीय निधी' : language === 'hi' ? 'आपातकालीन और चिकित्सा कोष' : 'Emergency & Medical Fund'}</span>
            <span>{formatINR(member.totalSavings)} / {formatINR(targetGoal)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #C55E08 0%, #E8720C 100%)' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-1">
          <span>{language === 'mr' ? `₹${remainingGoal.toLocaleString('en-IN')} बाकी` : language === 'hi' ? `₹${remainingGoal.toLocaleString('en-IN')} शेष` : `₹${remainingGoal.toLocaleString('en-IN')} remaining`}</span>
          <span>{language === 'mr' ? 'दरमहा ₹५०० प्रमाणे अंदाजे पूर्णता' : language === 'hi' ? '₹500 प्रति माह पर अनुमानित पूर्णता' : 'Based on ₹500/mo contribution'}</span>
        </div>
      </div>

      {/* Savings Ledger History with Filter */}
      <Card className="p-0 border border-[#E4E8EF] shadow-card rounded-2xl overflow-hidden bg-white">
        <div className="p-4 border-b border-[#E4E8EF] flex flex-wrap items-center justify-between gap-3 bg-[#F8FAFC]">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#1A6B4A]" />
            {language === 'mr' ? 'बचतीचा इतिहास' : language === 'hi' ? 'बचत का इतिहास' : 'Savings History'}
          </span>

          {/* Time Filter Toggle */}
          <div className="flex bg-white rounded-xl p-1 border border-[#E4E8EF] text-xs">
            <button
              onClick={() => setFilterPeriod('month')}
              className={`px-3 py-1.5 min-h-[36px] min-w-[44px] rounded-lg font-bold transition ${
                filterPeriod === 'month' ? 'bg-[#1A6B4A] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {language === 'mr' ? 'या महिन्यात' : language === 'hi' ? 'इस महीने' : 'This Month'}
            </button>
            <button
              onClick={() => setFilterPeriod('3months')}
              className={`px-3 py-1.5 min-h-[36px] min-w-[44px] rounded-lg font-bold transition ${
                filterPeriod === '3months' ? 'bg-[#1A6B4A] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {language === 'mr' ? '३ महिने' : language === 'hi' ? '3 महीने' : '3 Months'}
            </button>
            <button
              onClick={() => setFilterPeriod('all')}
              className={`px-3 py-1.5 min-h-[36px] min-w-[44px] rounded-lg font-bold transition ${
                filterPeriod === 'all' ? 'bg-[#1A6B4A] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {language === 'mr' ? 'सर्व' : language === 'hi' ? 'सभी' : 'All'}
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#E4E8EF]">
          {filteredTxs.length === 0 ? (
            <div className="p-8 text-center text-[13px] text-gray-500 font-medium">
              {language === 'mr' ? 'निवडलेल्या कालावधीत कोणतीही बचत नोंद नाही.' : language === 'hi' ? 'चयनित अवधि में कोई बचत रिकॉर्ड नहीं है।' : 'No savings transactions found for the selected period.'}
            </div>
          ) : (
            filteredTxs.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between text-xs hover:bg-gray-50 transition min-h-[60px]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F4EE] text-[#1A6B4A] font-bold flex items-center justify-center text-lg">
                    +
                  </div>
                  <div>
                    <div className="font-bold text-[#111827] text-[13px]">
                      {language === 'mr' ? 'बचत जमा' : language === 'hi' ? 'बचत जमा' : 'Savings Deposit'}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {new Date(tx.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {tx.notes ? ` • ${tx.notes}` : ''}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-[#1A6B4A] text-[15px] amount-display">
                    {formatINR(tx.amount)}
                  </div>
                  {tx.checkpointFingerprint && (
                    <span className="text-[10px] font-mono text-gray-400 block">{tx.checkpointFingerprint}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
