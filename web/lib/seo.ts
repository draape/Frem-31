import type { SanityImageSource } from '@sanity/image-url';
import { urlFor } from './sanity/image';
import type { SeoFields, SeoImage } from './sanity/queries';

// Share images are cropped to the size Open Graph and Twitter cards display.
export const SEO_IMAGE_WIDTH = 1200;
export const SEO_IMAGE_HEIGHT = 630;

// Used by the root layout until siteSettings has its own SEO values.
export const siteSettingsFallback = {
  title: 'Sportsklubb Frem-31',
  description: 'Sportsklubb i Stabekk med fotballbane og treningsaktiviteter.',
};

type PageSeoSource = {
  title: string | null;
  description: string | null;
  image: SeoImage | null;
  seo: SeoFields | null;
};

export type ResolvedSeo = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

// Resolves each value as page.seo.<field> -> the page's own field ->
// siteSettings.seo.<field> (see studio/schemaTypes/objects/seo.ts). Editors
// can leave every field empty, so an empty string or an image without an
// asset counts as missing and the result may have no values at all.
export function resolveSeo(page: PageSeoSource, site: SeoFields | null): ResolvedSeo {
  const title = page.seo?.title || page.title || site?.title || undefined;
  const description =
    page.seo?.description || page.description || site?.description || undefined;
  const imageUrl =
    seoImageUrl(page.seo?.image) ?? seoImageUrl(page.image) ?? seoImageUrl(site?.image);

  return { title, description, imageUrl };
}

// An absolute cdn.sanity.io URL, cropped around the hotspot. Undefined when
// the image has no asset.
export function seoImageUrl(image: SeoImage | null | undefined): string | undefined {
  if (!image?.asset) {
    return undefined;
  }

  return urlFor(image as SanityImageSource)
    .width(SEO_IMAGE_WIDTH)
    .height(SEO_IMAGE_HEIGHT)
    .fit('crop')
    .url();
}
