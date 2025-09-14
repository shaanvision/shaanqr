import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const domain = 'https://qr.shaanvision.com.tr';
const title = 'ShaanQR - Ücretsiz QR Kod Oluşturucu';
const description = 'Ücretsiz QR kodları oluşturun, özelleştirin ve indirin. Kullanımı kolay aracımızla URL, metin, Wi-Fi, vCard ve daha fazlası için QR kodları oluşturun. QR okuyucu ile uyumlu, özel ve custom QR kodlarınızı anında hazırlayın.';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title,
  description,
  openGraph: {
    title,
    description,
    url: domain,
    siteName: 'ShaanQR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      'name': 'Shaan Vision',
      'url': 'https://www.shaanvision.com.tr/',
      'logo': 'https://www.shaanvision.com.tr/logo.png',
      'contactPoint': {
        '@type': 'ContactPoint',
        'email': 'shaanvision@proton.me',
        'contactType': 'customer support',
        'areaServed': 'TR',
      },
      'sameAs': [
        'https://www.instagram.com/shaanvision/',
        'https://gitlab.com/shaanvision',
        'https://mastodon.social/@sahandigital'
      ]
    },
    {
      '@type': 'SoftwareApplication',
      'name': 'ShaanQR - Ücretsiz QR Kod Oluşturucu',
      'operatingSystem': 'Any',
      'applicationCategory': 'Utilities',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'TRY'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Shaan Vision'
      }
    }
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/shaanqr300.png" type="image/png" />
        <link rel="shortcut icon" href="/shaanqr300.png" type="image/png" />
        <link rel="apple-touch-icon" href="/shaanqr300.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
