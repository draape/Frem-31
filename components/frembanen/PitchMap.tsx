import Image from 'next/image';
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
  marginBottom: '16px',
});

const imageContainerStyles = css({
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  position: 'relative',
  aspectRatio: '3/2',
});

export function PitchMap() {
  const { pitchMap } = frembanenContent;

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <h2 className={titleStyles}>{pitchMap.title}</h2>
        <div className={imageContainerStyles}>
          <Image
            src="/images/pitch-map.svg"
            alt="Banekart over Frembanen med oversikt over 5er og 7er baner samt foreldresoner"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
