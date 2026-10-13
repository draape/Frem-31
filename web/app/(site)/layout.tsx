import { SiteShell } from '@/components/layout/SiteShell';
import { fetchSiteSettings, toFooterGroups, toHeaderItems } from '@/lib/sanity';
import type { NavigationItem } from '@/lib/types';

// Temporary: the club's main site isn't in Sanity, and `navItem` links
// internally only. Goes away once this site moves to the main domain.
const TRENINGSTILBUD: NavigationItem = {
  label: 'Treningstilbud',
  href: 'https://frem-31.no',
  variant: 'button',
  external: true,
};

// Sanity pages: navigation comes from the `siteSettings` singleton, fetched
// once per render.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchSiteSettings();

  return (
    <SiteShell
      headerItems={[...toHeaderItems(settings), TRENINGSTILBUD]}
      footerGroups={toFooterGroups(settings)}
      facebookUrl={settings?.facebook ?? undefined}
    >
      {children}
    </SiteShell>
  );
}
