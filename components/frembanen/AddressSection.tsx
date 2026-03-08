import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';

const sectionStyles = css({
  marginBottom: '24px',
});

const titleStyles = css({
  fontSize: '18px',
  fontWeight: '600',
  color: 'grey.900',
  marginBottom: '8px',
});

const addressStyles = css({
  fontSize: '16px',
  color: 'grey.700',
  marginBottom: '16px',
});

const mapContainerStyles = css({
  width: '100%',
  aspectRatio: '16/9',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: 'grey.200',
});

const iframeStyles = css({
  width: '100%',
  height: '100%',
  border: 'none',
});

export function AddressSection() {
  const { address } = frembanenContent;

  return (
    <section className={sectionStyles}>
      <h2 className={titleStyles}>Addresse</h2>
      <p className={addressStyles}>
        {address.street}, {address.postalCity}
      </p>
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
    </section>
  );
}
