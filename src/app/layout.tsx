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
  applicationName: 'ShaanQR',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ShaanQR',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'ShaanQR',
    title,
    description,
    url: domain,
    images: [
      {
        url: '/shaanqr300.png',
        width: 300,
        height: 300,
        alt: title,
      },
    ],
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [`${domain}/shaanqr300.png`],
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
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#560a86" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#560a86" />
        
        <link rel="apple-touch-icon" href="/shaanqr300.png" />
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <link rel="shortcut icon" href="/shaanqr300.png" />
        
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
