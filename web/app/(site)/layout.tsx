import { SiteShell } from '@/components/layout/SiteShell';
import { fetchSiteSettings, toFooterGroups, toHeaderItems } from '@/lib/sanity';

// Wraps the Sanity pages, the /ui sandbox and the 404 in the header, main and
// footer; navigation comes from the `siteSettings` singleton, fetched once per
// render. /studio sits outside this group, so the Studio gets no site chrome.
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSiteSettings();

  return (
    <SiteShell
      headerItems={toHeaderItems(settings)}
      footerGroups={toFooterGroups(settings)}
      facebookUrl={settings?.facebook ?? undefined}
    >
      {children}
    </SiteShell>
  );
}
