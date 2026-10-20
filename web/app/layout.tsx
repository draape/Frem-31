import type { Metadata } from 'next';
import { css } from '@/styled-system/css';
import { SITE_SEO_QUERY, type SiteSeoResult, sanityFetch } from '@/lib/sanity';
import { siteSettingsFallback } from '@/lib/seo';
import { inter, fraunces } from './fonts';
import './globals.css';

// Defaults for every route. Sanity pages set their own title, description,
// canonical and social tags; 404s and the /ui sandbox inherit these.
export async function generateMetadata(): Promise<Metadata> {
  const site = await sanityFetch<SiteSeoResult>({ query: SITE_SEO_QUERY });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    title: site?.title || siteSettingsFallback.title,
    description: site?.description || siteSettingsFallback.description,
  };
}

const bodyStyles = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

// The only root layout. Header, main and footer come from the `(site)` route
// group layout, which wraps the Sanity pages and the /ui sandbox.
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
