import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';

const sectionStyles = css({
  marginBottom: '24px',
});

const titleStyles = css({
  fontSize: '18px',
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

const cyclingStyles = css({
  fontSize: '16px',
  color: 'grey.700',
  lineHeight: '1.5',
});

export function ParkingSection() {
  const { parking } = frembanenContent;

  return (
    <section className={sectionStyles}>
      <h2 className={titleStyles}>{parking.title}</h2>
      <p className={introStyles}>{parking.intro}</p>
      <ul className={listStyles}>
        {parking.rules.map((rule, index) => (
          <li key={index} className={listItemStyles}>
            {rule}
          </li>
        ))}
      </ul>
      <p className={cyclingStyles}>{parking.cycling}</p>
    </section>
  );
}
