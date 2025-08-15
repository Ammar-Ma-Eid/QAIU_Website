
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import GlobalLoader from '@/components/global-loader';
import { NavigationEvents } from '@/components/navigation-events';
import { Suspense } from 'react';
import ClientInteractiveBackground from '@/components/client-interactive-background';
import GlobalErrorBoundary from '@/components/global-error-boundary';
import Logo from '@/components/logo';

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const fontHeadline = SpaceGrotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'QAIU - Quantum Computing at Alamein International University',
  description: 'The official website for the Quantum Computing at Alamein International University student club.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favico.png" />
        <meta name="theme-color" content="#b71c1c" />
        <title>QAIU - Quantum Computing at Alamein International University</title>

      </head>
      <body className={cn('font-body antialiased', fontBody.variable, fontHeadline.variable)}>
        <a href="#main-content" className="sr-only focus:not-sr-only absolute left-2 top-2 z-50 bg-primary text-primary-foreground rounded px-4 py-2">Skip to main content</a>
        <GlobalErrorBoundary>
          <ClientInteractiveBackground />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <Toaster />
          <GlobalLoader />
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
