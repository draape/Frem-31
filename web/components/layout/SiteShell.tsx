import { css } from '@/styled-system/css';
import type { FooterGroup, NavigationItem } from '@/lib/types';
import { Header } from './Header';
import { Footer } from './Footer';

type SiteShellProps = {
  headerItems: NavigationItem[];
  footerGroups: FooterGroup[];
  facebookUrl?: string;
  children: React.ReactNode;
};

// Header, main and footer, shared by the `(legacy)` and `(site)` layouts so
// their markup can't drift apart.
export function SiteShell({ headerItems, footerGroups, facebookUrl, children }: SiteShellProps) {
  return (
    <>
      <Header items={headerItems} />
      <main className={mainStyles}>{children}</main>
      <Footer groups={footerGroups} facebookUrl={facebookUrl} />
    </>
  );
}

const mainStyles = css({
  flex: 1,
});
