import Image from 'next/image';
import NextLink from 'next/link';
import { sva } from '@/styled-system/css';
import { Navigation } from './Navigation';

export function Header() {
  const s = styles();
  return (
    <header className={s.root}>
      <NextLink href="/" className={s.logoLink}>
        <Image src="/logo.svg" alt="" width={26} height={38} priority />
        <span className={s.logoText}>
          Frem<span className={s.logoAccent}>-31</span>
        </span>
      </NextLink>
      <Navigation />
    </header>
  );
}

const styles = sva({
  slots: ['root', 'logoLink', 'logoText', 'logoAccent'],
  base: {
    root: {
      bg: 'blue.800',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: '4',
      h: '62px',
      w: 'full',
      pos: 'sticky',
      top: '0',
      zIndex: '10',
      boxShadow: '0 4px 6px rgba(0,0,0,0.25)',
    },
    logoLink: {
      display: 'flex',
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
  },
});
