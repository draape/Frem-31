import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentBlocks } from '@/components/content/content-blocks';
import { Hero, PageHeader } from '@/components/headers';
import {
  PAGE_BY_PATH_QUERY,
  PAGE_PATHS_QUERY,
  type PageByPathResult,
  type PagePathsResult,
  type SanityLink,
  fullPathToSlug,
  isShadowedPath,
  resolveLink,
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
  // A hero page's heading reads "title accent", so the browser title does too
  // unless an SEO title overrides it.
  const accent = page.headerType === 'hero' ? page.hero?.titleAccent : null;
  const pageTitle = accent && page.title ? `${page.title} ${accent}` : page.title;
  const title = page.seoTitle ?? pageTitle;
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
