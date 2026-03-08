import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';
import { Section } from '../section';

const containerStyles = css({
  maxWidth: '800px',
  margin: '0 auto',
  py: '2rem',
});

const titleStyles = css({
  maxW: '37rem',
  fontSize: '32px',
  fontWeight: '600',
  color: '#000',
  sm: {
    fontSize: '24px',
  },
});

const subtitleStyles = css({
  fontSize: '32px',
  fontWeight: '600',
  color: 'blue.800',
  sm: {
    fontSize: '24px',
  },
});

export function WelcomeSection() {
  const { welcome } = frembanenContent;

  return (
    <Section>
      <div className={containerStyles}>
        <h1 className={titleStyles}>
          {welcome.title} <span className={subtitleStyles}>{welcome.subtitle}</span>
        </h1>
      </div>
    </Section>
  );
}
