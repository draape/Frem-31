import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentBlocks } from '@/components/content/content-blocks';
import { Hero, PageHeader } from '@/components/headers';
import {
  PAGE_BY_PATH_QUERY,
  PAGE_PATHS_QUERY,
  SITE_SEO_QUERY,
  type PageByPathResult,
  type PagePathsResult,
  type SanityLink,
  type SiteSeoResult,
  fullPathToSlug,
  isShadowedPath,
  resolveLink,
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

  // A hero page's heading reads "title accent", so the browser title does too
  // unless an SEO title overrides it.
  const accent = page.headerType === 'hero' ? page.hero?.titleAccent : null;
  const pageTitle = accent && page.title ? `${page.title} ${accent}` : page.title;
  const { title, description, imageUrl } = resolveSeo({ ...page, title: pageTitle }, site);
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

// A hero button needs a label and a resolvable destination (e.g. not an
// unpublished page), or it is left out.
function heroButton(link: SanityLink | null | undefined) {
  const resolved = link?.label ? resolveLink(link) : null;
  return resolved && link?.label
    ? { label: link.label, href: resolved.href, external: resolved.newTab }
    : undefined;
}

export default async function SanityPage({ params }: Props) {
  const { slug } = await params;
  const page = await fetchPage(slugToFullPath(slug));

  if (!page) {
    notFound();
  }

  return (
    <>
      {page.headerType === 'hero' ? (
        <Hero
          badge={page.hero?.badge ?? undefined}
          title={page.title ?? ''}
          titleAccent={page.hero?.titleAccent ?? undefined}
          description={page.description ?? undefined}
          primaryButton={heroButton(page.hero?.primaryButton)}
          secondaryButton={heroButton(page.hero?.secondaryButton)}
        />
      ) : (
        <PageHeader title={page.title ?? ''} description={page.description ?? undefined} />
      )}
      <ContentBlocks blocks={page.content ?? []} />
    </>
  );
}
