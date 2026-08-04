import Image from 'next/image';
import NextLink from 'next/link';
import { FacebookLogoIcon } from '@phosphor-icons/react/ssr';
import { sva } from '@/styled-system/css';
import { navigationConfig, socialLinks } from '@/lib/constants/navigation';

export function Footer() {
  const s = styles();
  return (
    <footer className={s.root}>
      <div className={s.container}>
        <div className={s.topGrid}>
          <div className={s.brand}>
            <NextLink href="/" className={s.logoLink}>
              <Image src="/logo.svg" alt="" width={26} height={38} />
              <span className={s.logoText}>
                Frem<span className={s.logoAccent}>-31</span>
              </span>
            </NextLink>
            <p className={s.description}>
              Frem-31 er en breddeklubb på nedre Stabekk tilknyttet Lysaker skole.
            </p>
          </div>
          {navigationConfig.footer.map((group) => (
            <div key={group.title} className={s.navGroup}>
              <h3 className={s.navGroupTitle}>{group.title}</h3>
              {group.links.map((link) => (
                <NextLink
                  key={link.href + link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={s.navLink}
                >
                  {link.label}
                </NextLink>
              ))}
            </div>
          ))}
        </div>
        <hr className={s.divider} />
        <div className={s.bottom}>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={s.socialLink}
            aria-label="Facebook"
          >
            <FacebookLogoIcon size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = sva({
  slots: [
    'root',
    'container',
    'topGrid',
    'brand',
    'logoLink',
    'logoText',
    'logoAccent',
    'description',
    'navGroup',
    'navGroupTitle',
    'navLink',
    'divider',
    'bottom',
    'socialLink',
  ],
  base: {
    root: {
      bg: 'blue.800',
      w: 'full',
      mt: '16',
    },
    container: {
      maxW: '1280px',
      mx: 'auto',
      px: '6',
      py: '16',
    },
    topGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '10',
      md: {
        gridTemplateColumns: '2fr 1fr 1fr',
      },
    },
    brand: {
      display: 'flex',
      flexDir: 'column',
      gap: '4',
    },
    logoLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2.5',
      textDecoration: 'none',
      color: 'gray.50',
      _hover: {
        color: 'yellow.400',
      },
    },
    logoText: {
      fontFamily: 'serif',
      fontWeight: 'bold',
      fontSize: 'xl',
      lineHeight: '1',
      whiteSpace: 'nowrap',
    },
    logoAccent: {
      color: 'yellow.400',
    },
    description: {
      color: 'white',
      fontSize: 'sm',
      lineHeight: '1.6',
      maxW: '300px',
    },
    navGroup: {
      display: 'flex',
      flexDir: 'column',
      gap: '3',
    },
    navGroupTitle: {
      color: 'yellow.400',
      fontSize: 'xs',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      mb: '1',
    },
    navLink: {
      color: 'white',
      fontSize: 'sm',
      textDecoration: 'none',
      _hover: {
        color: 'yellow.400',
      },
    },
    divider: {
      border: 'none',
      borderTop: '1px solid',
      borderColor: 'blue.600',
      my: '8',
    },
    bottom: {
      display: 'flex',
      alignItems: 'center',
    },
    socialLink: {
      color: 'white',
      display: 'flex',
      _hover: {
        color: 'yellow.400',
      },
    },
  },
});
