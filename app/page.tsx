import { css } from '@/styled-system/css';
import {
  WelcomeSection,
  AddressSection,
  ParkingSection,
  RulesSection,
  PitchMap,
} from '@/components/frembanen';

const contentContainerStyles = css({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '48px 24px',
  sm: {
    padding: '24px 16px',
  },
});

const cardStyles = css({
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '32px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '48px',
  marginBottom: '48px',
  md: {
    gridTemplateColumns: '1fr',
    gap: '32px',
  },
  sm: {
    padding: '20px',
    gap: '24px',
  },
});

const leftColumnStyles = css({
  display: 'flex',
  flexDirection: 'column',
});

const rightColumnStyles = css({
  display: 'flex',
  flexDirection: 'column',
});

export default function FrembanenPage() {
  return (
    <>
      <WelcomeSection />
      <div className={contentContainerStyles}>
        <div className={cardStyles}>
          <div className={leftColumnStyles}>
            <AddressSection />
            <ParkingSection />
          </div>
          <div className={rightColumnStyles}>
            <RulesSection />
          </div>
        </div>
        <PitchMap />
      </div>
    </>
  );
}
