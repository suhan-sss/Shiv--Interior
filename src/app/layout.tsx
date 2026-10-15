import type { Metadata, Viewport } from 'next';

import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Shiv Interior — Interior Design & Premium Furniture',
    template: '%s · Shiv Interior',
  },
  description:
    'Bespoke interior design and premium furniture for offices, homes, and institutions — Shiv Interior.',
  metadataBase: new URL('https://shivinterior.example'),
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden bg-white text-neutral-900 antialiased" suppressHydrationWarning>
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}