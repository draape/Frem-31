import { Metadata } from 'next';
import {
  WelcomeSection,
  BodyTextSection,
  AddressParkingSection,
  RulesSection,
  // PitchMap,
} from '@/components/frembanen';

export const metadata: Metadata = {
  title: 'Frembanen - Sportsklubb Frem-31',
  description: 'Informasjon om Frembanen, trenings- og kampanlegget til Frem-31 i Stabekk.',
};

export default function FrembanenPage() {
  return (
    <>
      <WelcomeSection />
      <BodyTextSection />
      <AddressParkingSection />
      <RulesSection />
      {/* <PitchMap /> */}
    </>
  );
}
