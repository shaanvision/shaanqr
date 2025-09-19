'use client';

import React, { useRef, useEffect, useState } from 'react';
import type QRCodeStyling from 'qr-code-styling';
import type { Options as QRCodeStylingOptions } from 'qr-code-styling';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy, Share2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { QrOptions } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

type QRCodePreviewProps = {
  options: QrOptions;
};

export default function QRCodePreview({ options }: QRCodePreviewProps) {
  const [qrCodeStyling, setQrCodeStyling] = useState<QRCodeStyling | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    // Web Share API'sının kullanılabilir olup olmadığını yalnızca istemci tarafında kontrol et
    if (typeof navigator !== 'undefined' && navigator.share) {
      setShowShare(true);
    }
    
    const importModule = async () => {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      setQrCodeStyling(new QRCodeStyling());
    };
    importModule();
  }, []);

  useEffect(() => {
    if (qrCodeStyling && ref.current) {
        if(ref.current.children.length === 0) {
            qrCodeStyling.append(ref.current);
        }
        setIsLoading(false);
    }
  }, [qrCodeStyling]);

  useEffect(() => {
    if (qrCodeStyling) {
      qrCodeStyling.update(options as QRCodeStylingOptions);
    }
  }, [options, qrCodeStyling]);

  const onDownload = (extension: 'png' | 'svg') => {
    if (!qrCodeStyling) return;
    qrCodeStyling.download({ name: 'shaan-qr', extension });
  };

  const onCopyToClipboard = async () => {
    if (!qrCodeStyling) return;
    try {
      const blob = await qrCodeStyling.getRawData('png');
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast({
          title: "Panoya kopyalandı!",
          description: "QR kod resmi panoya kopyalandı.",
        });
      }
    } catch (error) {
      console.error('Resim kopyalanamadı:', error);
      toast({
        variant: "destructive",
        title: "Kopyalama başarısız",
        description: "Resim panoya kopyalanamadı.",
      });
    }
  };

  const onShare = async () => {
    if (!qrCodeStyling) return;
    try {
        const blob = await qrCodeStyling.getRawData('png');
        if (blob && navigator.share) {
            const file = new File([blob], 'shaan-qr.png', { type: 'image/png' });
            await navigator.share({
                title: 'ShaanQR Kodu',
                text: 'Oluşturduğum bu QR koduna bir göz at!',
                files: [file],
            });
        } else {
             toast({
                variant: "destructive",
                title: "Paylaşım desteklenmiyor",
                description: "Web Paylaşım API'si tarayıcınızda mevcut değil.",
            });
        }
    } catch (error) {
        console.error('Paylaşım başarısız:', error);
        toast({
            variant: "destructive",
            title: "Paylaşım başarısız",
            description: "Paylaşmaya çalışırken bir hata oluştu.",
        });
    }
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="font-headline">Önizleme</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center aspect-square">
        {isLoading && <Skeleton className="w-full h-full" />}
        <div ref={ref} className={isLoading ? 'hidden' : ''} />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button onClick={() => onDownload('png')} variant="secondary"><Download /> PNG</Button>
        <Button onClick={() => onDownload('svg')} variant="secondary"><Download /> SVG</Button>
        <Button onClick={onCopyToClipboard} variant="secondary">
            {isCopied ? <Check /> : <Copy />} {isCopied ? 'Kopyalandı!' : 'Kopyala'}
        </Button>
        {showShare && (
            <Button onClick={onShare} variant="secondary"><Share2 /> Paylaş</Button>
        )}
      </CardFooter>
    </Card>
  );
}
