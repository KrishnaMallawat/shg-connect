import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { SupportedLanguage } from '../types/shg';

interface InstallPromptProps {
  language: SupportedLanguage;
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({ language }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show if not previously dismissed in this session
      if (!sessionStorage.getItem('installPromptDismissed')) {
        setIsVisible(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!isVisible) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-0 right-0 px-4 z-[100] pointer-events-none pb-safe">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-4 flex items-center gap-4 pointer-events-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 animate-fadeIn">
        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 truncate">
            {language === 'mr' ? 'अॅप इंस्टॉल करा' : language === 'hi' ? 'ऐप इंस्टॉल करें' : 'Install App'}
          </h3>
          <p className="text-xs text-gray-500 font-medium">
            {language === 'mr' ? 'जलद प्रवेशासाठी होम स्क्रीनवर जोडा' : language === 'hi' ? 'त्वरित पहुंच के लिए होम स्क्रीन पर जोड़ें' : 'Add to home screen for quick access'}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleDismiss}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={handleInstall}
            className="bg-[#1A6B4A] hover:bg-[#145739] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            {language === 'mr' ? 'जोडा' : language === 'hi' ? 'जोड़ें' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};
