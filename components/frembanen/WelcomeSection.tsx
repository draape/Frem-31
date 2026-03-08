import NextLink from 'next/link';
import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';

const sectionStyles = css({
  backgroundColor: 'yellow.100',
  padding: '48px 24px',
  sm: {
    padding: '32px 16px',
  },
});

const containerStyles = css({
  maxWidth: '800px',
  margin: '0 auto',
});

const titleStyles = css({
  fontSize: '32px',
  fontWeight: '400',
  color: 'text',
  marginBottom: '4px',
  sm: {
    fontSize: '24px',
  },
});

const subtitleStyles = css({
  fontSize: '32px',
  fontWeight: '400',
  color: 'primary',
  marginBottom: '24px',
  sm: {
    fontSize: '24px',
    marginBottom: '16px',
  },
});

const bodyStyles = css({
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'muted',
});

const linkStyles = css({
  color: 'primary',
  textDecoration: 'underline',
  _hover: {
    color: 'blue.600',
  },
});

export function WelcomeSection() {
  const { welcome } = frembanenContent;

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <h1 className={titleStyles}>{welcome.title}</h1>
        <p className={subtitleStyles}>{welcome.subtitle}</p>
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
