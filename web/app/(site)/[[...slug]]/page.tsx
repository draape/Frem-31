import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentBlocks } from '@/components/content/content-blocks';
import { PageHeader } from '@/components/headers';
import {
  PAGE_BY_PATH_QUERY,
  PAGE_PATHS_QUERY,
  type PageByPathResult,
  type PagePathsResult,
  fullPathToSlug,
  isShadowedPath,
  sanityFetch,
  slugToFullPath,
} from '@/lib/sanity';

// ISR: rendered pages are regenerated at most every 60 seconds, the same
// window as the sanityFetch default. The client reads through Sanity's API
// CDN, which can add a few seconds, so published content shows up within
// about a minute. Paths published after the build render on first request
// (dynamicParams defaults to true) and are cached from then on.
export const revalidate = 60;

type Props = {
  params: Promise<{ slug?: string[] }>;
};

function fetchPage(fullPath: string) {
  return sanityFetch<PageByPathResult>({
    query: PAGE_BY_PATH_QUERY,
    params: { fullPath },
  });
}

export async function generateStaticParams() {
  const paths = await sanityFetch<PagePathsResult>({ query: PAGE_PATHS_QUERY });

  return [...new Set(paths)]
    .filter((fullPath) => !isShadowedPath(fullPath))
    .map((fullPath) => ({ slug: fullPathToSlug(fullPath) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fullPath = slugToFullPath(slug);
  const page = await fetchPage(fullPath);

  if (!page) {
    return {};
  }

  const metadata: Metadata = {};
  const title = page.seoTitle ?? page.title;
  const description = page.seoDescription ?? page.description;

  // The front page keeps the layout's "Sportsklubb Frem-31" title.
  if (title && fullPath !== '/') {
    metadata.title = `${title} - Sportsklubb Frem-31`;
  }
  if (description) {
    metadata.description = description;
  }

  return metadata;
}

export default async function SanityPage({ params }: Props) {
  const { slug } = await params;
  const page = await fetchPage(slugToFullPath(slug));

  if (!page) {
    notFound();
  }

  return (
    <>
      <PageHeader title={page.title ?? ''} description={page.description ?? undefined} />
      <ContentBlocks blocks={page.content ?? []} />
    </>
  );
}
