import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';

const sectionStyles = css({
  backgroundColor: 'yellow.100',
  py: '3rem',
});

const containerStyles = css({
  maxW: '80rem',
  margin: '0 auto',
  display: 'flex',
  backgroundColor: 'white',
  borderRadius: '12px',
  gap: '2rem',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
});

const textContentStyles = css({
  padding: '2rem',
  fontSize: '16px',
  color: 'grey.700',
  lineHeight: '1.5',
  display: 'flex',
  flexDir: 'column',
  gap: '1rem',
});

const titleStyles = css({
  fontSize: '18px',
  fontWeight: '600',
  color: 'grey.900',
  marginBottom: '8px',
});

const mapContainerStyles = css({
  width: '100%',
  height: '100%',
  minHeight: '500px',
  borderRadius: '8px',
  overflow: 'hidden',
});

const iframeStyles = css({
  width: '100%',
  height: '100%',
  minHeight: '500px',
  border: 'none',
});

const listStyles = css({
  listStyleType: 'disc',
  paddingLeft: '1.5rem',
});

export function AddressParkingSection() {
  const { address, parking } = frembanenContent;

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <div className={textContentStyles}>
          <h2 className={titleStyles}>Addresse</h2>
          <p>
            {address.street}, {address.postalCity}
          </p>

          <h2 className={titleStyles}>{parking.title}</h2>
          <p>{parking.intro}</p>
          <ul className={listStyles}>
            {parking.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <p>{parking.cycling}</p>
        </div>

        <div className={mapContainerStyles}>
          <iframe
            src={address.mapEmbedUrl}
            className={iframeStyles}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kart over Frembanen"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
