import Image from 'next/image';
import { css } from '@/styled-system/css';
import { frembanenContent } from '@/lib/constants/frembanen';
import { Section } from '../section';

const titleStyles = css({
  fontSize: 'xl',
  fontWeight: 'semibold',
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
    <Section maxWidth="content" padding="lg" background="white">
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
    </Section>
  );
}
