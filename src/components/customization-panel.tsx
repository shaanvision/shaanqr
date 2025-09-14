"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QrOptions } from '@/lib/types';
import { UploadCloud } from 'lucide-react';
import { Button } from './ui/button';

type CustomizationPanelProps = {
  options: Omit<QrOptions, 'data' | 'width' | 'height'>;
  setOptions: Dispatch<SetStateAction<Omit<QrOptions, 'data' | 'width' | 'height'>>>;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
};

export function CustomizationPanel({ options, setOptions, size, setSize }: CustomizationPanelProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOptions(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Özelleştir</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="size">Boyut ({size}px)</Label>
          <Slider
            id="size"
            min={64}
            max={1024}
            step={8}
            value={[size]}
            onValueChange={(value) => setSize(value[0])}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="fg-color">Ön Plan</Label>
                <Input id="fg-color" type="color" value={options.dotsOptions.color} onChange={(e) => setOptions(prev => ({...prev, dotsOptions: {...prev.dotsOptions, color: e.target.value}, cornersSquareOptions: {...prev.cornersSquareOptions, color: e.target.value}, cornersDotOptions: {...prev.cornersDotOptions, color: e.target.value}}))} className="p-1 h-10"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bg-color">Arka Plan</Label>
                <Input id="bg-color" type="color" value={options.backgroundOptions.color} onChange={(e) => setOptions(prev => ({...prev, backgroundOptions: {...prev.backgroundOptions, color: e.target.value}}))} className="p-1 h-10"/>
            </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="margin">Kenar Boşluğu ({options.margin})</Label>
          <Slider
            id="margin"
            min={0}
            max={20}
            step={1}
            value={[options.margin]}
            onValueChange={(value) => setOptions(prev => ({ ...prev, margin: value[0] }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="error-correction">Hata Düzeltme</Label>
          <Select value={options.qrOptions.errorCorrectionLevel} onValueChange={(value: 'L' | 'M' | 'Q' | 'H') => setOptions(prev => ({...prev, qrOptions: {...prev.qrOptions, errorCorrectionLevel: value}}))}>
            <SelectTrigger id="error-correction">
              <SelectValue placeholder="Seviye seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Düşük (L)</SelectItem>
              <SelectItem value="M">Orta (M)</SelectItem>
              <SelectItem value="Q">Yüksek (Q)</SelectItem>
              <SelectItem value="H">Çok Yüksek (H)</SelectItem>
            </SelectContent>
          </Select>
        </div>
         <div className="space-y-2">
            <Label htmlFor="logo-upload">Logo</Label>
            <div className="flex items-center gap-2">
                <Input id="logo-upload" type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoUpload} className="hidden" />
                <Button asChild variant="outline">
                    <label htmlFor="logo-upload" className="cursor-pointer">
                        <UploadCloud className="mr-2" />
                        Resim Yükle
                    </label>
                </Button>
                {options.image && (
                     <Button variant="ghost" size="sm" onClick={() => setOptions(prev => ({...prev, image: undefined}))}>Kaldır</Button>
                )}
            </div>
            {options.image && <img src={options.image} alt="Logo önizlemesi" className="mt-2 h-16 w-16 object-contain rounded-md border p-1" />}
        </div>
      </CardContent>
    </Card>
  );
}
