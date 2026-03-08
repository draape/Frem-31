import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';

const sectionStyles = css({
  marginBottom: '24px',
});

const titleStyles = css({
  fontSize: '24px',
  fontWeight: '600',
  color: 'grey.900',
  marginBottom: '12px',
});

const introStyles = css({
  fontSize: '16px',
  color: 'grey.700',
  marginBottom: '12px',
});

const listStyles = css({
  paddingLeft: '20px',
  marginBottom: '16px',
});

const listItemStyles = css({
  fontSize: '16px',
  color: 'grey.700',
  marginBottom: '8px',
  lineHeight: '1.5',
});

const outroStyles = css({
  fontSize: '16px',
  color: 'grey.700',
  lineHeight: '1.5',
});

export function RulesSection() {
  const { rules } = frembanenContent;

  return (
    <section className={sectionStyles}>
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
    </section>
  );
}
