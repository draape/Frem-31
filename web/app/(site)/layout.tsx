import { SiteShell } from '@/components/layout/SiteShell';
import { fetchSiteSettings, toFooterGroups, toHeaderItems } from '@/lib/sanity';

// Sanity pages: navigation comes from the `siteSettings` singleton, fetched
// once per render.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
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
