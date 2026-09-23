import React, { useState, useRef, useEffect } from 'react';
import { Role, SupportedLanguage, FederationScope } from '../types/shg';
import { ArrowLeft, Globe, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  ttsEnabled: boolean;
  onToggleTts: () => void;
  onResetData: () => void;
  onOpenBackupModal: () => void;
  shgName: string;
  shgNameRegional: string;
  federation?: FederationScope;
  onSwitchShgGroup?: (shgId: string) => void;
  onOpenConflictModal?: () => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onGoBack?: () => void;
  parentTabLabel?: string;
}

const LANGUAGES: { code: SupportedLanguage; label: string; native: string; short: string }[] = [
  { code: 'mr', label: 'Marathi',  native: 'मराठी', short: 'मर' },
  { code: 'hi', label: 'Hindi',    native: 'हिंदी',  short: 'हि' },
  { code: 'en', label: 'English',  native: 'English', short: 'EN' },
];

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  shgName,
  shgNameRegional,
  activeTab = 'home',
  onGoBack,
  parentTabLabel,
}) => {
  const isInnerScreen = activeTab !== 'home';

  // ── Language dropdown state ──
  const [showLangMenu, setShowLangMenu]       = useState(false);
  const [pendingLang, setPendingLang]         = useState<SupportedLanguage | null>(null);
  const [showConfirm, setShowConfirm]         = useState(false);
  const dropdownRef                            = useRef<HTMLDivElement>(null);

  // ── Role dropdown state ──
  const [showRoleMenu, setShowRoleMenu]       = useState(false);
  const roleDropdownRef                       = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setShowRoleMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const handleLangSelect = (lang: SupportedLanguage) => {
    if (lang === language) {
      setShowLangMenu(false);
      return;
    }
    setPendingLang(lang);
    setShowLangMenu(false);
    setShowConfirm(true);
  };

  const handleConfirmSwitch = () => {
    if (pendingLang) {
      onLanguageChange(pendingLang);
    }
    setShowConfirm(false);
    setPendingLang(null);
  };

  const handleCancelSwitch = () => {
    setShowConfirm(false);
    setPendingLang(null);
  };

  const pendingLangInfo = LANGUAGES.find(l => l.code === pendingLang);

  // Confirmation dialog text based on CURRENT language
  const confirmTitle =
    language === 'mr' ? 'भाषा बदलायची का?' :
    language === 'hi' ? 'भाषा बदलें?' :
    'Switch Language?';

  const confirmMsg =
    language === 'mr'
      ? `भाषा "${pendingLangInfo?.native}" मध्ये बदलायची आहे का?`
      : language === 'hi'
      ? `क्या आप भाषा "${pendingLangInfo?.native}" में बदलना चाहते हैं?`
      : `Switch to ${pendingLangInfo?.native}?`;

  const confirmYes = language === 'mr' ? 'हो, बदला' : language === 'hi' ? 'हाँ, बदलें' : 'Yes, Switch';
  const confirmNo  = language === 'mr' ? 'रद्द करा'  : language === 'hi' ? 'रद्द करें'  : 'Cancel';

  return (
    <>
      <header
        className="bg-white sticky top-0 z-40 print:hidden"
        style={{ borderBottom: '1px solid #E4E8EF', boxShadow: '0 2px 8px rgba(17,24,39,0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* ── Left: Back button or Brand ── */}
          <div className="flex items-center gap-3 min-w-0">
            {isInnerScreen && onGoBack ? (
              <button
                onClick={onGoBack}
                className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 rounded-xl px-3 py-2 hover:bg-gray-50"
                style={{ color: '#374151', border: '1px solid #E4E8EF' }}
              >
                <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                <span className="truncate max-w-[160px] sm:max-w-xs text-xs">
                  {parentTabLabel || (language === 'mr' ? 'मागे' : 'Back')}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-3 min-w-0">
                {/* Logo — mobile only */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base flex-shrink-0 lg:hidden"
                  style={{ background: 'linear-gradient(135deg, #1A6B4A 0%, #0F4230 100%)' }}
                >
                  स
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-[15px] text-gray-900 tracking-tight lg:hidden">
                      SHGConnect
                    </span>
                    {/* SHG name chip */}
                    <span
                      className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: '#E6F4EE', color: '#1A6B4A', border: '1px solid #A7D9BC' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                      {shgNameRegional || shgName}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Chips row ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">

            {/* ── Role Switcher Dropdown ── */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRoleMenu(v => !v);
                }}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full select-none hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer relative z-40"
                style={
                  currentRole === 'MEMBER' ? { background: '#E6F4EE', color: '#1A6B4A', border: '1px solid #A7D9BC' } :
                  currentRole === 'OFFICE_BEARER' ? { background: '#FFF0E5', color: '#E8720C', border: '1px solid #FED7AA' } :
                  currentRole === 'ANIMATOR' ? { background: '#EBF3FF', color: '#1D5FA8', border: '1px solid #BFDBFE' } :
                  { background: '#EDE9FE', color: '#6D28D9', border: '1px solid #C4B5FD' }
                }
                title="Switch role"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current pointer-events-none" />
                {currentRole === 'MEMBER' ? (language === 'mr' ? 'सदस्य' : language === 'hi' ? 'सदस्य' : 'Member') :
                 currentRole === 'OFFICE_BEARER' ? (language === 'mr' ? 'पदाधिकारी' : language === 'hi' ? 'पदाधिकारी' : 'Officer') :
                 currentRole === 'ANIMATOR' ? (language === 'mr' ? 'अॅनिमेटर' : language === 'hi' ? 'एनिमेटर' : 'Animator') :
                 (language === 'mr' ? 'लेखापरीक्षक' : language === 'hi' ? 'लेखापरीक्षक' : 'Auditor')}
                <ChevronDown
                  className="w-3 h-3 transition-transform duration-200 pointer-events-none"
                  style={{ transform: showRoleMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Role Dropdown panel */}
              {showRoleMenu && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden z-50 animate-popIn"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E4E8EF',
                    boxShadow: '0 12px 32px rgba(17,24,39,0.12), 0 4px 8px rgba(17,24,39,0.06)',
                  }}
                >
                  <div className="px-3.5 pt-3 pb-2" style={{ borderBottom: '1px solid #F4F6FA' }}>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                      {language === 'mr' ? 'भूमिका निवडा' : language === 'hi' ? 'भूमिका चुनें' : 'Select Role'}
                    </p>
                  </div>
                  <div className="py-1.5">
                    {(['MEMBER', 'OFFICE_BEARER', 'ANIMATOR', 'AUDITOR'] as Role[]).map((r) => {
                      const isActive = r === currentRole;
                      const roleName = r === 'MEMBER' ? (language === 'mr' ? 'सदस्य' : language === 'hi' ? 'सदस्य' : 'Member') :
                                       r === 'OFFICE_BEARER' ? (language === 'mr' ? 'पदाधिकारी' : language === 'hi' ? 'पदाधिकारी' : 'Officer') :
                                       r === 'ANIMATOR' ? (language === 'mr' ? 'अॅनिमेटर' : language === 'hi' ? 'एनिमेटर' : 'Animator') :
                                       (language === 'mr' ? 'लेखापरीक्षक' : language === 'hi' ? 'लेखापरीक्षक' : 'Auditor');
                      const roleColors = r === 'MEMBER' ? { bg: '#E6F4EE', text: '#1A6B4A' } :
                                         r === 'OFFICE_BEARER' ? { bg: '#FFF0E5', text: '#E8720C' } :
                                         r === 'ANIMATOR' ? { bg: '#EBF3FF', text: '#1D5FA8' } :
                                         { bg: '#EDE9FE', text: '#6D28D9' };
                      return (
                        <button
                          key={r}
                          onClick={() => {
                            onRoleChange(r);
                            setShowRoleMenu(false);
                          }}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-all duration-150 hover:bg-gray-50 group"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                              style={{ background: roleColors.bg, color: roleColors.text }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            </span>
                            <span className={`text-[13px] font-semibold ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                              {roleName}
                            </span>
                          </div>
                          {isActive && (
                            <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: roleColors.text }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── Language Switcher Button ── */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowLangMenu(v => !v)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: showLangMenu ? '#EDE9FE' : '#F4F6FA',
                  color:      showLangMenu ? '#6D28D9'  : '#374151',
                  border: `1px solid ${showLangMenu ? '#C4B5FD' : '#E4E8EF'}`,
                }}
                title="Switch language"
              >
                <Globe className="w-3 h-3 flex-shrink-0" />
                <span>{currentLang.short}</span>
                <ChevronDown
                  className="w-3 h-3 transition-transform duration-200"
                  style={{ transform: showLangMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Dropdown panel */}
              {showLangMenu && (
                <div
                  className="absolute right-0 top-full mt-2 w-44 rounded-2xl overflow-hidden z-50 animate-popIn"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E4E8EF',
                    boxShadow: '0 12px 32px rgba(17,24,39,0.12), 0 4px 8px rgba(17,24,39,0.06)',
                  }}
                >
                  {/* Header */}
                  <div className="px-3.5 pt-3 pb-2" style={{ borderBottom: '1px solid #F4F6FA' }}>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                      Select Language
                    </p>
                  </div>

                  {/* Options */}
                  <div className="py-1.5">
                    {LANGUAGES.map((lang) => {
                      const isActive = lang.code === language;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleLangSelect(lang.code)}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-all duration-150 hover:bg-gray-50 group"
                        >
                          <div className="flex items-center gap-2.5">
                            {/* Language avatar */}
                            <span
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-all"
                              style={isActive ? {
                                background: '#6D28D9',
                                color: 'white',
                              } : {
                                background: '#F4F6FA',
                                color: '#374151',
                              }}
                            >
                              {lang.short}
                            </span>
                            <div>
                              <p className="text-[13px] font-semibold text-gray-900">{lang.native}</p>
                              <p className="text-[10px] text-gray-400">{lang.label}</p>
                            </div>
                          </div>
                          {isActive && (
                            <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6D28D9' }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Secure badge */}
            <span
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: '#E6F4EE', color: '#1A6B4A', border: '1px solid #A7D9BC' }}
            >
              <span>✓</span>
              <span className="hidden xs:inline">
                {language === 'mr' ? 'सुरक्षित' : language === 'hi' ? 'सुरक्षित' : 'Secured'}
              </span>
            </span>
          </div>
        </div>
      </header>

      {/* ── Language Switch Confirmation Modal ── */}
      {showConfirm && pendingLangInfo && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(17,24,39,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={handleCancelSwitch}
        >
          <div
            className="w-full max-w-xs rounded-3xl p-6 animate-popIn"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4E8EF',
              boxShadow: '0 24px 64px rgba(17,24,39,0.16)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: '#EDE9FE', border: '1px solid #C4B5FD' }}
            >
              <Globe className="w-6 h-6" style={{ color: '#6D28D9' }} />
            </div>

            {/* Title */}
            <h2 className="text-base font-bold text-gray-900 text-center">{confirmTitle}</h2>

            {/* Body */}
            <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">{confirmMsg}</p>

            {/* Target language pill */}
            <div className="flex justify-center mt-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"
                style={{ background: '#EDE9FE', color: '#6D28D9', border: '1px solid #C4B5FD' }}
              >
                <span className="w-5 h-5 rounded-md flex items-center justify-center bg-white text-[10px] font-bold" style={{ color: '#6D28D9' }}>
                  {pendingLangInfo.short}
                </span>
                {pendingLangInfo.native}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-5">
              <button
                onClick={handleCancelSwitch}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-gray-100"
                style={{ background: '#F4F6FA', color: '#374151', border: '1px solid #E4E8EF' }}
              >
                {confirmNo}
              </button>
              <button
                onClick={handleConfirmSwitch}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)' }}
              >
                {confirmYes}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
