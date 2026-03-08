import Image from 'next/image';
import NextLink from 'next/link';
import { css } from '@/styled-system/css';
import { Navigation } from './Navigation';

const headerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px',
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  flexWrap: 'wrap',
  gap: '16px',
  sm: {
    padding: '12px 16px',
  },
});

const logoContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export function Header() {
  return (
    <header className={headerStyles}>
      <NextLink href="/" className={logoContainerStyles}>
        <Image src="/images/logo.svg" alt="Sportsklubb Frem-31" width={120} height={40} priority />
      </NextLink>
      <Navigation />
    </header>
  );
}
