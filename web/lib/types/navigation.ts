export type NavigationVariant = 'link' | 'button';

/**
 * A header or footer link. Comes from `lib/constants/legacy-navigation.ts` on
 * the hand-written routes, and from the `siteSettings` document on Sanity pages.
 */
export interface NavigationItem {
  /** Display label for the navigation item */
  label: string;
  /** Internal route path or external URL */
  href: string;
  /** Visual style variant */
  variant: NavigationVariant;
  /** Whether link opens in new tab */
  external?: boolean;
}

/** A footer column, from the legacy constants or a `siteSettings` footer column. */
export interface FooterGroup {
  /** Group heading (e.g., "Topic") */
  title: string;
  /** Links within the group */
  links: NavigationItem[];
}

export interface NavigationConfig {
  /** Main header navigation items */
  header: NavigationItem[];
  /** Footer navigation groups */
  footer: FooterGroup[];
}

/** Social profiles shown as icons in the footer. */
export interface SocialLinks {
  facebook?: string;
}
