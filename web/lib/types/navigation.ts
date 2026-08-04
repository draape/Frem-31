export type NavigationVariant = 'link' | 'button';

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
