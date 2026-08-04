import { Metadata } from 'next';
import {
  BodyTextSection,
  AddressParkingSection,
  RulesSection,
  // PitchMap,
} from '@/components/frembanen';
import { PageHeader } from '@/components/headers';

export const metadata: Metadata = {
  title: 'Frembanen - Sportsklubb Frem-31',
  description: 'Informasjon om Frembanen, trenings- og kampanlegget til Frem-31.',
};

export default function FrembanenPage() {
  return (
    <>
      <PageHeader
        title="Frembanen"
        description="Velkommen til Frembanen, trenings- og kampanlegget til Frem-31."
      />
      <BodyTextSection />
      <AddressParkingSection />
      <RulesSection />
      {/* <PitchMap /> */}
    </>
  );
}
