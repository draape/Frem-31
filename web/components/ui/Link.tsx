import NextLink from 'next/link';
import { css } from '@/styled-system/css';
import type { NavigationItem } from '@/lib/types';

interface LinkProps {
  item: NavigationItem;
  className?: string;
  children?: React.ReactNode;
}

const linkStyles = css({
  color: 'text',
  textDecoration: 'none',
  fontWeight: '500',
  transition: 'color 0.2s ease',
  _hover: {
    color: 'primary',
  },
});

const activeLinkStyles = css({
  color: 'primary',
});

export function Link({ item, className, children }: LinkProps) {
  const content = children ?? item.label;

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkStyles} ${className ?? ''}`}
      >
        {content}
      </a>
    );
  }

  return (
    <NextLink href={item.href} className={`${linkStyles} ${className ?? ''}`}>
      {content}
    </NextLink>
  );
}

export { linkStyles, activeLinkStyles };
