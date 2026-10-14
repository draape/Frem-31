import type { FooterGroup, NavigationItem } from '@/lib/types';
import { sanityFetch } from './client';
import { resolveLink } from './links';
import { SITE_SETTINGS_QUERY, type SanityLink, type SiteSettingsResult } from './queries';

// The site settings, or null when Sanity can't be reached. Pages then render
// with empty navigation rather than failing the build or the request.
export async function fetchSiteSettings(): Promise<SiteSettingsResult> {
  try {
    return await sanityFetch<SiteSettingsResult>({ query: SITE_SETTINGS_QUERY });
  } catch (error) {
    console.error('Failed to fetch siteSettings', error);
    return null;
  }
}

// Header items with a label and a published target, in Studio order.
export function toHeaderItems(settings: SiteSettingsResult): NavigationItem[] {
  return (settings?.header ?? []).flatMap((item) =>
    item.label && item.href ? [{ label: item.label, href: item.href, variant: 'link' as const }] : []
  );
}

// Footer columns in Studio order. Links that don't resolve are dropped; a
// column keeps its heading even when none of its links resolve.
export function toFooterGroups(settings: SiteSettingsResult): FooterGroup[] {
  return (settings?.footerColumns ?? []).flatMap((column) => {
    if (!column.title) {
      return [];
    }

    const links = (column.links ?? []).flatMap((link): NavigationItem[] => {
      const resolved = resolveLink(link);
      if (!resolved) {
        return [];
      }
      return [
        {
          label: link.label || destinationText(link, resolved.href),
          href: resolved.href,
          variant: 'link',
          external: resolved.newTab,
        },
      ];
    });

    return [{ title: column.title, links }];
  });
}

// What a link without a label shows: the page title (or path), the URL or the
// address. Mirrors the Studio's `link` preview.
function destinationText(link: SanityLink, href: string): string {
  switch (link.type) {
    case 'internal':
      return link.internalTitle || href;
    case 'email':
      return link.email || href;
    default:
      return href;
  }
}
