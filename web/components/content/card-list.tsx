import React from 'react';
import { css, cva, cx } from '@/styled-system/css';
import { Section } from '@/components/section';

type CardListProps = {
  title?: string;
  children: React.ReactNode;
};

export function CardList({ title, children }: CardListProps) {
  const count = React.Children.count(children);
  const columns = count === 1 ? '1' : count === 2 ? '2' : '3';

  return (
    <Section maxWidth="layout" padding="md">
      {title && <h2 className={heading}>{title}</h2>}
      <div className={cx(grid({ columns }))}>
        {children}
      </div>
    </Section>
  );
}

const heading = css({
  fontFamily: 'serif',
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'grey.950',
  lineHeight: '1.2',
  mb: '6',
});

const grid = cva({
  base: {
    display: 'grid',
    gap: '6',
    gridTemplateColumns: '1fr',
  },
  variants: {
    columns: {
      '1': {
        md: { maxW: '50%' },
      },
      '2': {
        md: { gridTemplateColumns: 'repeat(2, 1fr)' },
      },
      '3': {
        md: { gridTemplateColumns: 'repeat(3, 1fr)' },
      },
    },
  },
});
