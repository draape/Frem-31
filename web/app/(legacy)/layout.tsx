import { SiteShell } from '@/components/layout/SiteShell';
import { navigationConfig, socialLinks } from '@/lib/constants/legacy-navigation';

// The hand-written routes keep their hardcoded navigation until #7.
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell
      headerItems={navigationConfig.header}
      footerGroups={navigationConfig.footer}
      facebookUrl={socialLinks.facebook}
    >
      {children}
    </SiteShell>
  );
}
