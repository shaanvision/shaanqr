"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomizationPanel } from '@/components/customization-panel';
import QRCodePreview from '@/components/qr-code-preview';
import type { QrOptions } from '@/lib/types';
import * as qrHelpers from '@/lib/qr-helpers';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Link, Type, Wifi, Mail, Phone, MessageSquare, User } from 'lucide-react';

type TabValue = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'sms' | 'vcard';

const urlSchema = z.object({ url: z.string().url("Lütfen geçerli bir URL girin.").min(1, "URL gerekli.") });
const textSchema = z.object({ text: z.string().min(1, "Metin gerekli.") });
const wifiSchema = z.object({ ssid: z.string().min(1), encryption: z.enum(['WPA', 'WEP', 'nopass']), password: z.string().optional() });
const emailSchema = z.object({ email: z.string().email(), subject: z.string().optional(), body: z.string().optional() });
const phoneSchema = z.object({ phone: z.string().min(1) });
const smsSchema = z.object({ phone: z.string().min(1), message: z.string().optional() });
const vcardSchema = z.object({ name: z.string().min(1), phone: z.string().optional(), email: z.string().email().optional(), company: z.string().optional(), title: z.string().optional(), website: z.string().url().optional() });

const schemas = {
    url: urlSchema,
    text: textSchema,
    wifi: wifiSchema,
    email: emailSchema,
    phone: phoneSchema,
    sms: smsSchema,
    vcard: vcardSchema,
};

const defaultValues = {
    url: { url: 'https://qr.shaanvision.com.tr' },
    text: { text: '' },
    wifi: { ssid: '', encryption: 'WPA', password: '' },
    email: { email: '', subject: '', body: '' },
    phone: { phone: '' },
    sms: { phone: '', message: '' },
    vcard: { name: '', phone: '', email: '', company: '', title: '', website: '' },
};

export default function QRConfigurator() {
  const [activeTab, setActiveTab] = useState<TabValue>('url');
  const [qrData, setQrData] = useState<any>(defaultValues.url);
  const [qrValue, setQrValue] = useState<string>('https://qr.shaanvision.com.tr');
  const [size, setSize] = useState(300);
  const [options, setOptions] = useState<Omit<QrOptions, 'data' | 'width' | 'height'>>({
    margin: 10,
    qrOptions: { errorCorrectionLevel: 'Q' },
    dotsOptions: { color: '#560a86', type: 'rounded' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#560a86', type: 'extra-rounded' },
    cornersDotOptions: { color: '#560a86', type: 'dot' },
  });

  const methods = useForm({
    resolver: zodResolver(schemas[activeTab]),
    defaultValues: defaultValues[activeTab],
    mode: 'onChange',
  });

  useEffect(() => {
    methods.reset(defaultValues[activeTab]);
    setQrData(defaultValues[activeTab]);
  }, [activeTab, methods]);
  
  useEffect(() => {
    const subscription = methods.watch((value) => {
        setQrData(value);
    });
    return () => subscription.unsubscribe();
  }, [methods]);
  
  useEffect(() => {
    let formattedValue = '';
    switch (activeTab) {
      case 'url': formattedValue = qrHelpers.formatUrl(qrData); break;
      case 'text': formattedValue = qrHelpers.formatText(qrData); break;
      case 'wifi': formattedValue = qrHelpers.formatWifi(qrData); break;
      case 'email': formattedValue = qrHelpers.formatEmail(qrData); break;
      case 'phone': formattedValue = qrHelpers.formatPhone(qrData); break;
      case 'sms': formattedValue = qrHelpers.formatSms(qrData); break;
      case 'vcard': formattedValue = qrHelpers.formatVCard(qrData); break;
    }
    setQrValue(formattedValue || ' ');
  }, [qrData, activeTab]);

  const qrOptions = useMemo(() => ({
    ...options,
    width: size,
    height: size,
    data: qrValue,
  }), [options, size, qrValue]);

  const tabs = [
    { value: 'url', label: 'URL', icon: <Link className="h-4 w-4" /> },
    { value: 'text', label: 'Metin', icon: <Type className="h-4 w-4" /> },
    { value: 'wifi', label: 'Wi-Fi', icon: <Wifi className="h-4 w-4" /> },
    { value: 'email', label: 'E-posta', icon: <Mail className="h-4 w-4" /> },
    { value: 'phone', label: 'Telefon', icon: <Phone className="h-4 w-4" /> },
    { value: 'sms', label: 'SMS', icon: <MessageSquare className="h-4 w-4" /> },
    { value: 'vcard', label: 'Kartvizit', icon: <User className="h-4 w-4" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">İçerik</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 h-auto">
                {tabs.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value} className="flex-col sm:flex-row sm:gap-2 h-auto py-2">
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                ))}
              </TabsList>
              <FormProvider {...methods}>
                <form>
                  <TabsContent value="url" className="mt-6">
                    <FormField name="url" render={({ field }) => ( <FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} placeholder="https://example.com" /></FormControl><FormMessage /></FormItem> )} />
                  </TabsContent>
                  <TabsContent value="text" className="mt-6">
                    <FormField name="text" render={({ field }) => ( <FormItem><FormLabel>Metin</FormLabel><FormControl><Textarea {...field} placeholder="Herhangi bir metin girin" /></FormControl><FormMessage /></FormItem> )} />
                  </TabsContent>
                  <TabsContent value="wifi" className="mt-6 space-y-4">
                    <FormField name="ssid" render={({ field }) => ( <FormItem><FormLabel>Ağ Adı (SSID)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField name="encryption" render={({ field }) => ( <FormItem><FormLabel>Şifreleme</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="WPA">WPA/WPA2</SelectItem><SelectItem value="WEP">WEP</SelectItem><SelectItem value="nopass">Yok</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                    <FormField name="password" render={({ field }) => ( <FormItem><FormLabel>Parola</FormLabel><FormControl><Input {...field} type="password" /></FormControl><FormMessage /></FormItem> )} />
                  </TabsContent>
                  <TabsContent value="email" className="mt-6 space-y-4">
                     <FormField name="email" render={({ field }) => ( <FormItem><FormLabel>E-posta Adresi</FormLabel><FormControl><Input {...field} type="email" placeholder="alici@example.com"/></FormControl><FormMessage /></FormItem> )} />
                     <FormField name="subject" render={({ field }) => ( <FormItem><FormLabel>Konu</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                     <FormField name="body" render={({ field }) => ( <FormItem><FormLabel>Mesaj</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </TabsContent>
                  <TabsContent value="phone" className="mt-6">
                     <FormField name="phone" render={({ field }) => ( <FormItem><FormLabel>Telefon Numarası</FormLabel><FormControl><Input {...field} type="tel" /></FormControl><FormMessage /></FormItem> )} />
                  </TabsContent>
                   <TabsContent value="sms" className="mt-6 space-y-4">
                     <FormField name="phone" render={({ field }) => ( <FormItem><FormLabel>Telefon Numarası</FormLabel><FormControl><Input {...field} type="tel" /></FormControl><FormMessage /></FormItem> )} />
                     <FormField name="message" render={({ field }) => ( <FormItem><FormLabel>Mesaj</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </TabsContent>
                  <TabsContent value="vcard" className="mt-6 space-y-4">
                     <FormField name="name" render={({ field }) => ( <FormItem><FormLabel>Tam Ad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField name="phone" render={({ field }) => ( <FormItem><FormLabel>Telefon Numarası</FormLabel><FormControl><Input {...field} type="tel" /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="email" render={({ field }) => ( <FormItem><FormLabel>E-posta</FormLabel><FormControl><Input {...field} type="email" /></FormControl><FormMessage /></FormItem> )} />
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField name="company" render={({ field }) => ( <FormItem><FormLabel>Şirket</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="title" render={({ field }) => ( <FormItem><FormLabel>Unvan</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                     </div>
                     <FormField name="website" render={({ field }) => ( <FormItem><FormLabel>Web Sitesi</FormLabel><FormControl><Input {...field} placeholder="https://example.com"/></FormControl><FormMessage /></FormItem> )} />
                  </TabsContent>
                </form>
              </FormProvider>
            </Tabs>
          </CardContent>
        </Card>
        
        <CustomizationPanel options={options} setOptions={setOptions} size={size} setSize={setSize} />
      </div>

      <div className="lg:col-span-1">
        <QRCodePreview options={qrOptions} />
      </div>
    </div>
  );
}
