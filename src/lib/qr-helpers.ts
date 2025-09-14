import type { UrlData, TextData, WifiData, EmailData, PhoneData, SmsData, VCardData } from './types';

export function formatUrl(data: UrlData): string {
  return data.url || '';
}

export function formatText(data: TextData): string {
  return data.text || '';
}

export function formatWifi(data: WifiData): string {
  if (!data?.ssid) return '';
  // Escape special characters in SSID and password
  const ssid = data.ssid.replace(/([\\;,"'])/g, '\\$1');
  const password = data.password ? data.password.replace(/([\\;,"'])/g, '\\$1') : '';
  return `WIFI:T:${data.encryption};S:${ssid};P:${password};H:${data.encryption === 'WPA' ? 'true' : 'false'};`;
}

export function formatEmail(data: EmailData): string {
    if (!data?.email) return '';
    const subject = data.subject ? `?subject=${encodeURIComponent(data.subject)}` : '';
    const body = data.body ? `${subject ? '&' : '?'}body=${encodeURIComponent(data.body)}` : '';
    return `mailto:${data.email}${subject}${body}`;
}

export function formatPhone(data: PhoneData): string {
    if (!data?.phone) return '';
    return `tel:${data.phone}`;
}

export function formatSms(data: SmsData): string {
    if (!data?.phone) return '';
    const message = data.message ? `?body=${encodeURIComponent(data.message)}` : '';
    return `smsto:${data.phone}${message}`;
}

export function formatVCard(data: VCardData): string {
  if (!data?.name) return '';
  let vCard = `BEGIN:VCARD\nVERSION:3.0\n`;
  if (data.name) vCard += `FN:${data.name}\n`;
  if (data.company) vCard += `ORG:${data.company}\n`;
  if (data.title) vCard += `TITLE:${data.title}\n`;
  if (data.phone) vCard += `TEL;TYPE=WORK,VOICE:${data.phone}\n`;
  if (data.email) vCard += `EMAIL:${data.email}\n`;
  if (data.website) vCard += `URL:${data.website}\n`;
  vCard += `END:VCARD`;
  return vCard;
}
