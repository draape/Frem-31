import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';
import { Section } from '../section';

const titleStyles = css({
  fontSize: 'xl',
  fontWeight: 'semibold',
  color: 'grey.900',
  marginBottom: '12px',
});

const introStyles = css({
  fontSize: 'base',
  color: 'grey.700',
  marginBottom: '12px',
});

const listStyles = css({
  paddingLeft: '20px',
  marginBottom: '16px',
  listStyleType: 'disc',
});

const listItemStyles = css({
  fontSize: 'base',
  color: 'grey.700',
  marginBottom: '8px',
  lineHeight: '1.5',
});

const outroStyles = css({
  fontSize: 'base',
  color: 'grey.700',
  lineHeight: '1.5',
});

export function RulesSection() {
  const { rules } = frembanenContent;

  return (
    <Section maxWidth="content" padding="lg" background="white">
      <h2 className={titleStyles}>{rules.title}</h2>
      <p className={introStyles}>{rules.intro}</p>
      <ul className={listStyles}>
        {rules.prohibited.map((rule, index) => (
          <li key={index} className={listItemStyles}>
            {rule}
          </li>
        ))}
      </ul>
      <p className={outroStyles}>{rules.outro}</p>
    </Section>
  );
}
