import React from 'react';
import { SupportedLanguage } from '../../types/shg';
import { Home, PiggyBank, Landmark, Calendar, MoreHorizontal } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
}

const NAV_ITEMS = (language: SupportedLanguage) => [
  {
    id: 'home',
    label: language === 'mr' ? 'मुख्य' : language === 'hi' ? 'मुख्य' : 'Home',
    icon: Home,
    color: '#1A6B4A',
  },
  {
    id: 'savings',
    label: language === 'mr' ? 'बचत' : language === 'hi' ? 'बचत' : 'Savings',
    icon: PiggyBank,
    color: '#1A6B4A',
  },
  {
    id: 'loans',
    label: language === 'mr' ? 'कर्ज' : language === 'hi' ? 'ऋण' : 'Loans',
    icon: Landmark,
    color: '#1D5FA8',
  },
  {
    id: 'meetings',
    label: language === 'mr' ? 'बैठका' : language === 'hi' ? 'बैठकें' : 'Meetings',
    icon: Calendar,
    color: '#E8720C',
  },
  {
    id: 'more',
    label: language === 'mr' ? 'अधिक' : language === 'hi' ? 'अधिक' : 'More',
    icon: MoreHorizontal,
    color: '#6D28D9',
  },
];

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onSelectTab, language }) => {
  const items = NAV_ITEMS(language);
  const moreTabIds = ['passbook', 'calculator', 'panchasutra', 'reports', 'settings', 'sync'];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white lg:hidden z-50 print:hidden safe-area-bottom"
      style={{ boxShadow: '0 -2px 16px rgba(17,24,39,0.08)', borderTop: '1px solid #E4E8EF' }}
    >
      <div className="flex items-stretch justify-around h-16 max-w-lg mx-auto px-1">
        {items.map((item) => {
          const isActive =
            activeTab === item.id ||
            (item.id === 'more' && moreTabIds.includes(activeTab));
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full py-1.5 gap-0.5 transition-all duration-200 relative"
            >
              {/* Active top indicator */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b-full"
                  style={{ background: item.color }}
                />
              )}

              {/* Icon container */}
              <span
                className="w-9 h-7 flex items-center justify-center rounded-xl transition-all duration-200"
                style={isActive ? {
                  background: `${item.color}18`,
                } : {}}
              >
                <Icon
                  className="w-[19px] h-[19px] transition-all duration-200"
                  style={{ color: isActive ? item.color : '#9CA3AF', strokeWidth: isActive ? 2.5 : 1.8 }}
                />
              </span>

              {/* Label */}
              <span
                className="text-[10px] font-semibold transition-colors duration-200 truncate max-w-[56px]"
                style={{ color: isActive ? item.color : '#9CA3AF' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
