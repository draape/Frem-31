import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentBlocks } from '@/components/content/content-blocks';
import { PageHeader } from '@/components/headers';
import {
  PAGE_BY_PATH_QUERY,
  PAGE_PATHS_QUERY,
  SITE_SEO_QUERY,
  type PageByPathResult,
  type PagePathsResult,
  type SiteSeoResult,
  fullPathToSlug,
  isShadowedPath,
  sanityFetch,
  slugToFullPath,
} from '@/lib/sanity';
import { SEO_IMAGE_HEIGHT, SEO_IMAGE_WIDTH, resolveSeo } from '@/lib/seo';

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
  const [page, site] = await Promise.all([
    fetchPage(fullPath),
    sanityFetch<SiteSeoResult>({ query: SITE_SEO_QUERY }),
  ]);

  if (!page) {
    return {};
  }

  const { title, description, imageUrl } = resolveSeo(page, site);
  // Relative paths resolve against the layout's metadataBase.
  const url = page.seo?.canonical || fullPath;
  const images = imageUrl
    ? [{ url: imageUrl, width: SEO_IMAGE_WIDTH, height: SEO_IMAGE_HEIGHT }]
    : undefined;

  // Keys without a value are left out, so Next emits no empty tags and the
  // layout's title and description still apply.
  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: { canonical: url },
    ...(page.seo?.noIndex && { robots: { index: false } }),
    openGraph: {
      type: 'website',
      url,
      ...(title && { title }),
      ...(description && { description }),
      ...(images && { images }),
    },
    twitter: {
      card: 'summary_large_image',
      ...(title && { title }),
      ...(description && { description }),
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
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
