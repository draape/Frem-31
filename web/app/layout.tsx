import type { Metadata } from 'next';
import { css } from '@/styled-system/css';
import { SiteShell } from '@/components/layout/SiteShell';
import {
  SITE_SEO_QUERY,
  type SiteSeoResult,
  fetchSiteSettings,
  sanityFetch,
  toFooterGroups,
  toHeaderItems,
} from '@/lib/sanity';
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

// The only layout. It wraps the Sanity pages, the /ui sandbox and the 404 in
// the header, main and footer; navigation comes from the `siteSettings`
// singleton, fetched once per render.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSiteSettings();

  return (
    <html lang="no" className={`${inter.variable} ${fraunces.variable}`}>
      <body className={bodyStyles}>
        <SiteShell
          headerItems={toHeaderItems(settings)}
          footerGroups={toFooterGroups(settings)}
          facebookUrl={settings?.facebook ?? undefined}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
