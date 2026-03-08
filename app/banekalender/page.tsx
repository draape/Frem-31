import { Metadata } from 'next';
import { css } from '@/styled-system/css';
import { CalendarEmbed } from '@/components/calendar';
import { calendarConfig } from '@/lib/constants/calendar';

export const metadata: Metadata = {
  title: 'Banekalender - Frembanen | Sportsklubb Frem-31',
  description: 'Se når Frembanen er ledig. Banekalender for trening og kamper på kunstgressbanen.',
};

const containerStyles = css({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '48px 24px',
  sm: {
    padding: '24px 16px',
  },
});

const headerStyles = css({
  marginBottom: '32px',
  sm: {
    marginBottom: '24px',
  },
});

const titleStyles = css({
  fontSize: '32px',
  fontWeight: '600',
  color: 'grey.900',
  marginBottom: '8px',
  sm: {
    fontSize: '24px',
  },
});

const subtitleStyles = css({
  fontSize: '16px',
  color: 'grey.600',
  sm: {
    fontSize: '14px',
  },
});

export default function BanekalenderPage() {
  return (
    <div className={containerStyles}>
      <header className={headerStyles}>
        <h1 className={titleStyles}>{calendarConfig.title}</h1>
        <p className={subtitleStyles}>Se når banen er ledig for trening og kamper.</p>
      </header>
      <CalendarEmbed />
    </div>
  );
}
