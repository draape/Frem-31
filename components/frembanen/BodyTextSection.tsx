import NextLink from 'next/link';
import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';
import { Section } from '../section';

const bodyStyles = css({
  fontSize: 'base',
  lineHeight: '1.6',
  color: 'text',
});

const linkStyles = css({
  color: 'primary',
  textDecoration: 'underline',
  _hover: {
    color: 'blue.600',
  },
});

export function BodyTextSection() {
  const { welcome } = frembanenContent;

  return (
    <Section maxWidth="content" padding="lg" background="white">
      <p className={bodyStyles}>
        {welcome.body.split('banekalenderen').map((part, index) => {
          if (index === 0) {
            return (
              <span key={index}>
                {part}
                <NextLink href="/banekalender" className={linkStyles}>
                  banekalenderen
                </NextLink>
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
    </Section>
  );
}
