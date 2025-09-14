import Header from '@/components/header';
import QRConfigurator from '@/components/qr-configurator';
import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <QRConfigurator />
      </main>
      <footer className="py-4 px-4 sm:px-8 text-center text-sm text-muted-foreground border-t">
        <p>
          ShaanQR, bir <Link href="https://shaanvision.com.tr" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">ShaanVision</Link> Markasıdır.
        </p>
      </footer>
    </div>
  );
}
