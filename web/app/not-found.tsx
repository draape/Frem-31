import { PageHeader } from '@/components/headers';
import { Section } from '@/components/section';
import { Button } from '@/components/ui';

// The root not-found: catches `notFound()` from the catch-all and any
// unmatched URL, and renders inside the root layout's header and footer. It
// sets no metadata, so the layout's site title is the only <title>.
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
