import type { Metadata } from 'next';
import { css } from '@/styled-system/css';
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

// The only root layout. Header, main and footer come from the route group
// layouts: `(legacy)` for the hand-written routes, `(site)` for Sanity pages.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${inter.variable} ${fraunces.variable}`}>
      <body className={bodyStyles}>{children}</body>
    </html>
  );
}
