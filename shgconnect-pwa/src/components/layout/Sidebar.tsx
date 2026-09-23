import React from 'react';
import { Role, SupportedLanguage } from '../../types/shg';
import { translations } from '../../i18n/translations';
import { 
  Home, 
  Users, 
  Landmark, 
  Calendar, 
  BookOpen, 
  Award, 
  FileSpreadsheet, 
  RefreshCw, 
  Settings, 
  Shield,
  Target,
  PiggyBank,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentRole: Role;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
  onRoleChange: (role: Role) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeTab,
  onSelectTab,
  language,
  onRoleChange
}) => {
  const t = translations[language] || translations.en;

  const getNavItems = () => {
    if (currentRole === 'MEMBER') {
      return [
        { id: 'home', label: language === 'mr' ? 'मुख्य पृष्ठ' : language === 'hi' ? 'मुख्य पृष्ठ' : 'Overview', icon: Home, color: '#1A6B4A' },
        { id: 'savings', label: language === 'mr' ? 'माझी बचत' : language === 'hi' ? 'मेरी बचत' : 'My Savings', icon: PiggyBank, color: '#1A6B4A' },
        { id: 'loans', label: language === 'mr' ? 'माझे कर्ज' : language === 'hi' ? 'मेरा ऋण' : 'My Loans', icon: Landmark, color: '#1D5FA8' },
        { id: 'passbook', label: language === 'mr' ? 'माझे पासबुक' : language === 'hi' ? 'मेरा पासबुक' : 'My Passbook', icon: BookOpen, color: '#6D28D9' },
        { id: 'meetings', label: language === 'mr' ? 'माझ्या बैठका' : language === 'hi' ? 'मेरी बैठकें' : 'My Meetings', icon: Calendar, color: '#E8720C' },
        { id: 'calculator', label: language === 'mr' ? 'बचत ध्येय' : language === 'hi' ? 'बचत लक्ष्य' : 'Savings Goal', icon: Target, color: '#1A6B4A' },
      ];
    }

    if (currentRole === 'OFFICE_BEARER') {
      return [
        { id: 'home', label: language === 'mr' ? 'मुख्य पृष्ठ' : language === 'hi' ? 'मुख्य पृष्ठ' : 'Overview', icon: Home, color: '#1A6B4A' },
        { id: 'members', label: language === 'mr' ? 'सभासद' : language === 'hi' ? 'सदस्य' : 'Members', icon: Users, color: '#1D5FA8' },
        { id: 'loans', label: language === 'mr' ? 'कर्ज व्यवहार' : language === 'hi' ? 'ऋण प्रबंधन' : 'Loans', icon: Landmark, color: '#1D5FA8' },
        { id: 'meetings', label: language === 'mr' ? 'मासिक बैठक' : language === 'hi' ? 'मासिक बैठक' : 'Meetings', icon: Calendar, color: '#E8720C' },
        { id: 'passbook', label: language === 'mr' ? 'पासबुक' : language === 'hi' ? 'पासबुक' : 'Passbook', icon: BookOpen, color: '#6D28D9' },
      ];
    }

    if (currentRole === 'ANIMATOR') {
      return [
        { id: 'home', label: language === 'mr' ? 'मुख्य पृष्ठ' : language === 'hi' ? 'मुख्य पृष्ठ' : 'Overview', icon: Home, color: '#1A6B4A' },
        { id: 'members', label: language === 'mr' ? 'माझे SHGs' : language === 'hi' ? 'मेरे SHGs' : 'My SHGs', icon: Users, color: '#1D5FA8' },
      ];
    }

    // AUDITOR
    return [
      { id: 'home', label: language === 'mr' ? 'मुख्य पृष्ठ' : language === 'hi' ? 'मुख्य पृष्ठ' : 'Overview', icon: Home, color: '#1A6B4A' },
      { id: 'panchasutra', label: language === 'mr' ? 'पंचसूत्र' : language === 'hi' ? 'पंचसूत्र' : 'Panchasutra', icon: Award, color: '#E8720C' },
      { id: 'reports', label: language === 'mr' ? 'अहवाल' : language === 'hi' ? 'रिपोर्ट' : 'Reports', icon: FileSpreadsheet, color: '#6D28D9' },
    ];
  };

  const navItems = getNavItems();

  const roleConfig = [
    { id: 'MEMBER', label: language === 'mr' ? 'सदस्य' : language === 'hi' ? 'सदस्य' : 'Member', color: '#1A6B4A' },
    { id: 'OFFICE_BEARER', label: language === 'mr' ? 'पदाधिकारी' : language === 'hi' ? 'पदाधिकारी' : 'Officer', color: '#E8720C' },
    { id: 'ANIMATOR', label: language === 'mr' ? 'अॅनिमेटर' : language === 'hi' ? 'एनिमेटर' : 'Animator', color: '#1D5FA8' },
    { id: 'AUDITOR', label: language === 'mr' ? 'लेखापरीक्षक' : language === 'hi' ? 'लेखापरीक्षक' : 'Auditor', color: '#6D28D9' },
  ];

  return (
    <aside className="w-64 bg-white flex flex-col h-screen sticky top-0 hidden lg:flex z-30" style={{ boxShadow: '2px 0 16px rgba(17,24,39,0.07)' }}>
      
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid #E4E8EF' }}>
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1A6B4A 0%, #0F4230 100%)' }}>
          स
        </div>
        <div>
          <h1 className="text-[15px] font-bold tracking-tight text-gray-900">SHGConnect</h1>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">
            {language === 'mr' ? 'सुरक्षित • ऑफलाइन • विश्वासार्ह' : language === 'hi' ? 'सुरक्षित • ऑफलाइन • विश्वसनीय' : 'Secure · Offline · Trusted'}
          </p>
        </div>
      </div>

      {/* Role Switcher */}
      <div className="px-4 py-3">
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Shield className="w-3 h-3" style={{ color: '#E8720C' }} />
          Active View
        </div>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl" style={{ background: '#F4F6FA', border: '1px solid #E4E8EF' }}>
          {roleConfig.map(r => (
            <button
              key={r.id}
              onClick={() => onRoleChange(r.id as Role)}
              className="py-1.5 px-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-200 truncate"
              style={currentRole === r.id ? {
                background: '#FFFFFF',
                color: r.color,
                boxShadow: '0 1px 4px rgba(17,24,39,0.10)',
                border: '1px solid #E4E8EF',
              } : { color: '#6B7280' }}
              title={r.label}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-5 mb-1">
        Navigation
      </div>
      <nav className="flex-1 px-3 pb-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 text-left relative group"
              style={isActive ? {
                background: '#E6F4EE',
                color: '#1A6B4A',
                fontWeight: 600,
              } : {
                color: '#374151',
              }}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full" style={{ background: '#1A6B4A' }} />
              )}
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={isActive ? {
                  background: `${item.color}18`,
                  color: item.color,
                } : {
                  color: '#9CA3AF',
                }}
              >
                <Icon className="w-4 h-4" />
              </span>
              <span className="truncate">{item.label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
            </button>
          );
        })}

        {/* Divider + Utility Nav */}
        <div className="pt-2 mt-1" style={{ borderTop: '1px solid #E4E8EF' }}>
          {[
            { id: 'sync', label: language === 'mr' ? 'सिंक केंद्र' : language === 'hi' ? 'सिंक केंद्र' : 'Sync Center', icon: RefreshCw, color: '#1D5FA8' },
            { id: 'settings', label: language === 'mr' ? 'सेटिंग्ज' : language === 'hi' ? 'सेटिंग्स' : 'Settings', icon: Settings, color: '#6B7280' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 text-left mt-0.5 relative"
                style={isActive ? {
                  background: '#E6F4EE',
                  color: '#1A6B4A',
                  fontWeight: 600,
                } : { color: '#6B7280' }}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full" style={{ background: '#1A6B4A' }} />
                )}
                <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: isActive ? '#1A6B4A' : item.color }}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* SHG Identity Footer */}
      <div className="p-4 mx-3 mb-3 rounded-2xl" style={{ background: 'linear-gradient(145deg, #E6F4EE 0%, #CDEADB 100%)', border: '1px solid #A7D9BC' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: '#1A6B4A' }}>
            स
          </div>
          <div>
            <p className="text-[12px] font-semibold" style={{ color: '#0F4230' }}>Savitri Mahila Bachat Gat</p>
            <p className="text-[10px] font-medium" style={{ color: '#1A6B4A' }}>Satara · Maharashtra</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
