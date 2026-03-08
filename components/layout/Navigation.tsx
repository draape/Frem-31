'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { css } from '@/styled-system/css';
import { navigationConfig } from '@/lib/constants/navigation';
import { Button } from '@/components/ui/Button';

const navStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  flexWrap: 'wrap',
  md: {
    gap: '16px',
  },
  sm: {
    gap: '8px',
  },
});

const linkStyles = css({
  color: 'grey.700',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1rem',
  padding: '8px 18px',
  borderRadius: '9999px',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
  _hover: {
    backgroundColor: 'blue.50',
    color: 'blue.600',
  },
});

const activeLinkStyles = css({
  backgroundColor: 'blue.200',
  color: 'blue.600',
});

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={navStyles}>
      {navigationConfig.header.map((item) => {
        const isActive = pathname === item.href;

        if (item.variant === 'button') {
          return <Button key={item.href} item={item} variant="accent" />;
        }

        return (
          <NextLink
            key={item.href}
            href={item.href}
            className={`${linkStyles} ${isActive ? activeLinkStyles : ''}`}
          >
            {item.label}
          </NextLink>
        );
      })}
    </nav>
  );
}
