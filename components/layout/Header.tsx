import Image from 'next/image';
import NextLink from 'next/link';
import { css } from '@/styled-system/css';
import { Navigation } from './Navigation';
import { Section } from '../section';

const headerStyles = css({
  maxW: '80rem',
  margin: '0 auto',
  display: 'flex',
  py: '1.5rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
});

const logoContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export function Header() {
  return (
    <Section>
      <header className={headerStyles}>
        <NextLink href="/" className={logoContainerStyles}>
          <Image src="/logo.svg" alt="Sportsklubb Frem-31" width={120} height={40} priority />
        </NextLink>
        <Navigation />
      </header>
    </Section>
  );
}
