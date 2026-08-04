import type { Metadata } from 'next';
import { css } from '@/styled-system/css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { inter, fraunces } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sportsklubb Frem-31',
  description: 'Sportsklubb i Stabekk med fotballbane og treningsaktiviteter.',
};

const bodyStyles = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
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
    <html lang="no" className={`${inter.variable} ${fraunces.variable}`}>
      <body className={bodyStyles}>
        <Header />
        <main className={mainStyles}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
