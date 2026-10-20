export type NavigationVariant = 'link' | 'button';

/** A header or footer link, mapped from the `siteSettings` document. */
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

/** A footer column, from a `siteSettings` footer column. */
export interface FooterGroup {
  /** Group heading (e.g., "Topic") */
  title: string;
  /** Links within the group */
  links: NavigationItem[];
}
