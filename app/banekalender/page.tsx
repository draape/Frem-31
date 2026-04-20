import { Metadata } from 'next';
import { CalendarEmbed } from '@/components/calendar';
import { calendarConfig } from '@/lib/constants/calendar';
import { PageHeader } from '@/components/headers';

export const metadata: Metadata = {
  title: 'Banekalender - Frembanen | Sportsklubb Frem-31',
  description: 'Se når Frembanen er ledig. Banekalender for trening og kamper på kunstgressbanen.',
};

export default function BanekalenderPage() {
  return (
    <>
      <PageHeader
        title={calendarConfig.title}
        description="Se når banen er ledig for trening og kamper."
      />
      <CalendarEmbed />
    </>
  );
}
