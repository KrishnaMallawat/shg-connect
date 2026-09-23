import React from 'react';
import { SupportedLanguage } from '../../types/shg';
import { BookOpen, Target, Award, RefreshCw, Settings, ChevronRight, MoreHorizontal } from 'lucide-react';

interface MoreMenuViewProps {
  language: SupportedLanguage;
  onNavigateTab: (tab: string) => void;
}

export const MoreMenuView: React.FC<MoreMenuViewProps> = ({
  language,
  onNavigateTab
}) => {
  const menuOptions = [
    {
      id: 'passbook',
      title: language === 'mr' ? 'माझे पासबुक' : language === 'hi' ? 'मेरा पासबुक' : 'My Passbook',
      desc: language === 'mr' ? 'सर्व आर्थिक व्यवहारांची सविस्तर नोंद' : language === 'hi' ? 'सभी वित्तीय लेन-देन का विस्तृत रिकॉर्ड' : 'Complete financial transaction ledger',
      icon: <BookOpen className="w-5 h-5 text-[#0F766E]" />,
      color: 'bg-[#CCFBF1]'
    },
    {
      id: 'calculator',
      title: language === 'mr' ? 'बचतीचे ध्येय' : language === 'hi' ? 'बचत लक्ष्य' : 'Savings Goal',
      desc: language === 'mr' ? 'बचत लक्ष्याची प्रगती आणि अंदाज' : language === 'hi' ? 'बचत लक्ष्य प्रगति और अनुमान' : 'Goal tracking and financial calculator',
      icon: <Target className="w-5 h-5 text-[#F97316]" />,
      color: 'bg-[#FFEDD5]'
    },
    {
      id: 'panchasutra',
      title: language === 'mr' ? 'गटाची कार्यक्षमता (पंचसूत्र)' : language === 'hi' ? 'SHG Operational Health' : 'SHG Operational Health',
      desc: language === 'mr' ? 'नाबार्ड (NABARD) ०-१०० मूल्यांकन व आरोग्य वर्ग' : language === 'hi' ? 'पंचसूत्र मूल्यांकन (NABARD 0-100)' : 'NABARD Panchasutra health scorecard',
      icon: <Award className="w-5 h-5 text-[#0F766E]" />,
      color: 'bg-[#CCFBF1]'
    },
    {
      id: 'sync',
      title: language === 'mr' ? 'सिंक केंद्र' : language === 'hi' ? 'सिंक केंद्र' : 'Sync Center',
      desc: language === 'mr' ? 'ऑफलाइन बदल आणि सर्वर सिंक स्थिती' : language === 'hi' ? 'ऑफलाइन परिवर्तन और सिंक स्थिति' : 'Offline mutations & sync status',
      icon: <RefreshCw className="w-5 h-5 text-[#0F766E]" />,
      color: 'bg-[#CCFBF1]'
    },
    {
      id: 'settings',
      title: language === 'mr' ? 'सेटिंग्ज' : language === 'hi' ? 'सेटिंग्स' : 'Settings',
      desc: language === 'mr' ? 'ॲप भाषा, आवाज मार्गदर्शन आणि डेटा बॅकअप' : language === 'hi' ? 'ऐप सेटिंग्स, भाषा और बैकअप' : 'App settings, language & backup',
      icon: <Settings className="w-5 h-5 text-[#78716C]" />,
      color: 'bg-[#F5F5F4]'
    }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
          <MoreHorizontal className="w-6 h-6 text-gray-500" />
          <span>{language === 'mr' ? 'अधिक' : language === 'hi' ? 'अधिक' : 'More Features'}</span>
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {language === 'mr' ? 'इतर सर्व सुविधा आणि उपयुक्त पर्याय' : language === 'hi' ? 'अन्य सभी सुविधाएं और विकल्प' : 'Access additional tools, passbook ledger, and settings'}
        </p>
      </div>

      {/* Grouped List Box Container */}
      <div className="bg-white rounded-2xl border border-[#E4E8EF] shadow-card overflow-hidden divide-y divide-[#E4E8EF]">
        {menuOptions.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigateTab(item.id)}
            className="w-full p-4 hover:bg-gray-50 transition flex items-center justify-between text-left group min-h-[72px]"
          >
            <div className="flex items-center space-x-4 min-w-0">
              <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${item.color.replace('bg-', 'bg-')} flex-shrink-0 transition-transform group-hover:scale-105`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-[15px] text-[#111827] group-hover:text-[#1A6B4A] transition">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500 truncate mt-0.5 font-medium">
                  {item.desc}
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#1A6B4A] transition flex-shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};
