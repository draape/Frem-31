import type { Metadata } from 'next';
import { css } from '@/styled-system/css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Frembanen - Sportsklubb Frem-31',
  description: 'Informasjon om Frembanen, trenings- og kampanlegget til Frem-31 i Stabekk.',
};

const bodyStyles = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
});

const mainStyles = css({
  flex: 1,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={bodyStyles}>
        <Header />
        <main className={mainStyles}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
