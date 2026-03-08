import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';

const sectionStyles = css({
  backgroundColor: 'white',
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
  listStyleType: 'disc',
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
      <div className={containerStyles}>
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
      </div>
    </section>
  );
}
