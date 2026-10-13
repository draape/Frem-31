import type { SanityLink } from './queries';

export type ResolvedLink = {
  href: string;
  newTab: boolean;
};

// The shared `link` object as an href. Null when the destination is missing,
// e.g. an internal link to a page that isn't published.
export function resolveLink(link: SanityLink | null | undefined): ResolvedLink | null {
  if (!link) {
    return null;
  }

  const newTab = link.openInNewTab === true;

  switch (link.type) {
    case 'internal':
      return link.internalPath ? { href: link.internalPath, newTab } : null;
    case 'external':
      return link.href ? { href: link.href, newTab } : null;
    case 'email':
      return link.email ? { href: `mailto:${link.email}`, newTab: false } : null;
    default:
      return null;
  }
}
