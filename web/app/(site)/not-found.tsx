import { PageHeader } from '@/components/headers';
import { Section } from '@/components/section';
import { Button } from '@/components/ui';

// Rendered for `notFound()` from the catch-all, inside the `(site)` layout so
// the 404 keeps the header and footer.
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
