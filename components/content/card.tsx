import NextLink from 'next/link';
import { sva } from '@/styled-system/css';
import type { ReactNode } from 'react';

type CardProps = {
  kicker?: string;
  icon?: ReactNode;
  title: string;
  description: string;
  link?: {
    label: string;
    href: string;
  };
};

export function Card({ kicker, icon, title, description, link }: CardProps) {
  const s = styles();

  return (
    <div className={s.root}>
      {icon && <div className={s.iconWrap}>{icon}</div>}
      <div className={s.body}>
        {kicker && <p className={s.kicker}>{kicker}</p>}
        <h3 className={s.title}>{title}</h3>
        <p className={s.description}>{description}</p>
        {link && (
          <NextLink href={link.href} className={s.link}>
            {link.label} →
          </NextLink>
        )}
      </div>
    </div>
  );
}

const styles = sva({
  slots: ['root', 'iconWrap', 'body', 'kicker', 'title', 'description', 'link'],
  base: {
    root: {
      display: 'flex',
      flexDir: 'column',
      gap: '4',
      p: '6',
      bg: 'white',
      border: '1px solid',
      borderColor: 'grey.200',
      borderRadius: 'xl',
      h: '100%',
    },
    iconWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: '10',
      h: '10',
      bg: 'blue.100',
      borderRadius: 'lg',
      color: 'blue.800',
      flexShrink: '0',
    },
    body: {
      display: 'flex',
      flexDir: 'column',
      gap: '3',
      flex: '1',
    },
    kicker: {
      textStyle: 'tag',
      color: 'grey.500',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    title: {
      fontFamily: 'serif',
      fontSize: 'xl',
      fontWeight: 'bold',
      color: 'grey.950',
      lineHeight: '1.2',
    },
    description: {
      textStyle: 'lead',
      fontSize: 'base',
      color: 'grey.600',
      flex: '1',
    },
    link: {
      fontFamily: 'sans',
      fontSize: 'sm',
      fontWeight: 'semibold',
      color: 'blue.600',
      textDecoration: 'none',
      _hover: { color: 'blue.800' },
      mt: 'auto',
    },
  },
});
