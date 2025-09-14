export type QrOptions = {
  width: number;
  height: number;
  data: string;
  margin: number;
  qrOptions: {
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
  dotsOptions: {
    color: string;
    type: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
  };
  backgroundOptions: {
    color: string;
  };
  image?: string;
  cornersSquareOptions: {
    type: 'dot' | 'square' | 'extra-rounded';
    color: string;
  };
  cornersDotOptions: {
    type: 'dot' | 'square';
    color: string;
  };
};

export type UrlData = { url: string };
export type TextData = { text: string };
export type WifiData = { ssid: string; password?: string; encryption: 'WPA' | 'WEP' | 'nopass' };
export type EmailData = { email: string; subject?: string; body?: string };
export type PhoneData = { phone: string };
export type SmsData = { phone: string; message?: string };
export type VCardData = { name: string; phone?: string; email?: string; company?: string; title?: string, website?: string };
