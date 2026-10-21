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

// Header, main and footer around a page, used by the (site) layout.
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
