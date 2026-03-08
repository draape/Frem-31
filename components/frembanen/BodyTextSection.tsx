import NextLink from 'next/link';
import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';

const sectionStyles = css({
  backgroundColor: 'white',
  py: '48px',
});

const containerStyles = css({
  maxWidth: '800px',
  margin: '0 auto',
});

const bodyStyles = css({
  fontSize: '16px',
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
    <section className={sectionStyles}>
      <div className={containerStyles}>
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
      </div>
    </section>
  );
}
