import { PageHeader } from '@/components/headers';
import { Section } from '@/components/section';
import { Button } from '@/components/ui';

// Catches `notFound()` from the catch-all, which matches every URL outside
// /studio, and renders inside the (site) layout's header and footer. It sets
// no metadata, so the root layout's site title is the only <title>.
export default function NotFound() {
  return (
    <>
      <PageHeader title="Fant ikke siden" description="Siden du leter etter finnes ikke." />
      <Section maxWidth="content" padding="md">
        <Button href="/">Til forsiden</Button>
      </Section>
    </>
  );
}
