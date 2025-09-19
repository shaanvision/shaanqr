"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string,
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // PWA yüklendi mi kontrol et
    const handleAppInstalled = () => {
      setIsVisible(false);
      setInstallPrompt(null);
    };
    
    // Zaten yüklü mü kontrol et
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsVisible(false);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', handleAppInstalled);


    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Kullanıcı PWA yüklemeyi kabul etti');
    } else {
      console.log('Kullanıcı PWA yüklemeyi reddetti');
    }
    
    setInstallPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Button onClick={handleInstallClick} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      Yükle
    </Button>
  );
}
