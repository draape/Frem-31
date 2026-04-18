'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import Image from 'next/image';
import { sva, cva, cx } from '@/styled-system/css';
import { navigationConfig } from '@/lib/constants/navigation';

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const s = navStyles();

  const isActive = (href: string) =>
    !href.startsWith('http') && (pathname === href || pathname.startsWith(href + '/'));

  const close = () => setIsOpen(false);

  return (
    <>
      <nav className={s.desktopMenu}>
        {navigationConfig.header.map((item) => (
          <NextLink
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className={menuItem({ active: isActive(item.href) })}
          >
            {item.label}
          </NextLink>
        ))}
      </nav>

      <button
        className={s.hamburger}
        onClick={() => setIsOpen(true)}
        aria-label="Åpne meny"
        aria-expanded={isOpen}
      >
        <span className={s.hamburgerLine} />
        <span className={s.hamburgerLine} />
      </button>

      {isOpen && (
        <div className={s.overlay}>
          <div className={s.overlayTopBar}>
            <NextLink href="/" className={s.overlayLogo} onClick={close}>
              <Image src="/logo.svg" alt="" width={26} height={38} />
              <span className={s.overlayLogoText}>
                Frem<span className={s.overlayLogoAccent}>-31</span>
              </span>
            </NextLink>
            <button className={s.closeBtn} onClick={close} aria-label="Lukk meny">
              <span className={cx(s.closeLine, s.closeLineOne)} />
              <span className={cx(s.closeLine, s.closeLineTwo)} />
            </button>
          </div>
          <nav className={s.overlayMenu}>
            {navigationConfig.header.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={menuItem({ active: isActive(item.href) })}
                onClick={close}
              >
                {item.label}
              </NextLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

const menuItem = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: '3',
    py: '1.5',
    borderRadius: 'md',
    fontFamily: 'sans',
    fontWeight: 'medium',
    fontSize: 'sm',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background 0.15s ease, color 0.15s ease',
  },
  variants: {
    active: {
      false: {
        color: 'blue.50',
        _hover: {
          bg: 'blue.600',
          color: 'blue.50',
        },
      },
      true: {
        bg: 'yellow.400',
        color: 'blue.800',
        _hover: {
          bg: 'yellow.300',
          color: 'blue.800',
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

const navStyles = sva({
  slots: [
    'desktopMenu',
    'hamburger',
    'hamburgerLine',
    'overlay',
    'overlayTopBar',
    'overlayLogo',
    'overlayLogoText',
    'overlayLogoAccent',
    'overlayMenu',
    'closeBtn',
    'closeLine',
    'closeLineOne',
    'closeLineTwo',
  ],
  base: {
    desktopMenu: {
      display: 'none',
      md: { display: 'flex', alignItems: 'center', gap: '2.5' },
    },
    hamburger: {
      display: 'flex',
      flexDir: 'column',
      gap: '1',
      bg: 'transparent',
      border: 'none',
      cursor: 'pointer',
      p: '2',
      alignItems: 'flex-start',
      md: { display: 'none' },
    },
    hamburgerLine: {
      display: 'block',
      w: '8',
      h: '3px',
      bg: 'grey.50',
      borderRadius: 'xs',
    },
    overlay: {
      pos: 'fixed',
      inset: '0',
      zIndex: '50',
      bg: 'blue.800',
      display: 'flex',
      flexDir: 'column',
    },
    overlayTopBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: '4',
      h: '62px',
      flexShrink: '0',
    },
    overlayLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '2.5',
      textDecoration: 'none',
    },
    overlayLogoText: {
      fontFamily: 'serif',
      fontWeight: 'bold',
      fontSize: 'xl',
      color: 'white',
      lineHeight: '1',
      whiteSpace: 'nowrap',
    },
    overlayLogoAccent: {
      color: 'yellow.400',
    },
    overlayMenu: {
      display: 'flex',
      flexDir: 'column',
      alignItems: 'flex-end',
      gap: '5',
      px: '4',
      py: '3',
      flex: '1',
      overflowY: 'auto',
    },
    closeBtn: {
      pos: 'relative',
      w: '8',
      h: '8',
      bg: 'transparent',
      border: 'none',
      cursor: 'pointer',
      p: '0',
      flexShrink: '0',
    },
    closeLine: {
      pos: 'absolute',
      inset: '0',
      m: 'auto',
      display: 'block',
      w: '6',
      h: '3px',
      bg: 'grey.50',
      borderRadius: 'xs',
    },
    closeLineOne: {
      transform: 'rotate(45deg)',
    },
    closeLineTwo: {
      transform: 'rotate(-45deg)',
    },
  },
});
