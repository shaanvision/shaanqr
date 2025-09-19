import Link from 'next/link';
import Image from 'next/image';
import { Github, Heart } from 'lucide-react';
import { Button } from './ui/button';
import PWAInstallButton from './pwa-install-button';

const GitlabIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L12 13.29l-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.73-6.88a.74.74 0 0 0 .27-.83Z" />
    </svg>
);


export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-8 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 text-foreground">
          <Image src="/shaanqr300.png" alt="ShaanQR Logo" width={32} height={32} className="rounded-lg" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-headline font-bold">
              ShaanQR
            </h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Heart className="h-3 w-3 fill-red-500 text-red-500"/>
                <span className="font-medium">ShaanVision</span>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
            <PWAInstallButton />
            <Button asChild variant="ghost" size="icon">
                <Link href="https://github.com/shaanvision/shaanqr" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                    <Github className="h-5 w-5" />
                </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
                <Link href="https://gitlab.com/shaanvision/shaanqr" target="_blank" rel="noopener noreferrer" aria-label="GitLab Repository">
                    <GitlabIcon className="h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
