import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/lib/sanity';

// Dev-only smoke test for the Sanity client. Production builds serve a 404
// and never fetch.
const FRONT_PAGE_QUERY = defineQuery(`*[_id == "frontPage"][0]{_id, title}`);

type FrontPage = { _id: string; title: string | null } | null;

export default async function SanityDevPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const page = await sanityFetch<FrontPage>({
    query: FRONT_PAGE_QUERY,
    revalidate: 0,
  });

  return (
    <main>
      <h1>{page?.title ?? 'No frontPage document found'}</h1>
    </main>
  );
}
