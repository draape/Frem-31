import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';
import { Section } from '../section';

const titleStyles = css({
  maxW: '37rem',
  fontSize: '2xl',
  fontWeight: 'semibold',
  color: 'grey.950',
  sm: {
    fontSize: 'xl',
  },
});

const subtitleStyles = css({
  fontSize: '2xl',
  fontWeight: 'semibold',
  color: 'blue.800',
  sm: {
    fontSize: 'xl',
  },
});

export function WelcomeSection() {
  const { welcome } = frembanenContent;

  return (
    <Section maxWidth="content" padding="sm">
      <h1 className={titleStyles}>
        {welcome.title} <span className={subtitleStyles}>{welcome.subtitle}</span>
      </h1>
    </Section>
  );
}
