import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { SupportedLanguage } from '../types/shg';

interface OfflineBannerProps {
  language: SupportedLanguage;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ language }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-amber-100 text-amber-800 text-xs font-semibold px-4 py-2 flex items-center justify-center gap-2 relative z-50">
      <WifiOff className="w-3.5 h-3.5" />
      <span>
        {language === 'mr'
          ? 'इंटरनेट नाही · ऑफलाइन काम करत आहे · जोडले गेल्यावर डेटा सिंक होईल'
          : language === 'hi'
          ? 'कोई इंटरनेट नहीं · ऑफलाइन काम कर रहा है · कनेक्ट होने पर डेटा सिंक होगा'
          : 'No internet · Working offline · Data will sync when connected'}
      </span>
    </div>
  );
};
