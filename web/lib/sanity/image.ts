import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { dataset, projectId } from './env';
import type { SanityImage } from './queries';

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type ResolvedImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type SanityImageOptions = {
  // Width / height of the rendered box. Without it the image keeps the
  // ratio of the editor's crop.
  aspectRatio?: number;
  maxWidth?: number;
};

// A Sanity image as props for next/image. The URL carries the editor's crop,
// and with `aspectRatio` a crop around the hotspot; next/image builds the
// srcset from it. Null when the image has no asset.
export function sanityImage(
  image: SanityImage | null | undefined,
  { aspectRatio, maxWidth = 2000 }: SanityImageOptions = {}
): ResolvedImage | null {
  const dimensions = image?.asset?.metadata?.dimensions;
  if (!image?.asset || !dimensions) {
    return null;
  }

  const crop = image.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const naturalWidth = dimensions.width * (1 - crop.left - crop.right);
  const naturalHeight = dimensions.height * (1 - crop.top - crop.bottom);

  const width = Math.round(Math.min(naturalWidth, maxWidth));
  const height = Math.round(width / (aspectRatio ?? naturalWidth / naturalHeight));

  const source = image as SanityImageSource;
  const src = aspectRatio
    ? urlFor(source).width(width).height(height).fit('crop').auto('format').url()
    : urlFor(source).width(width).auto('format').url();

  // Legacy content may lack alt text; render it as decorative rather than fail.
  const alt = image.decorative ? '' : (image.alt ?? '');

  return { src, alt, width, height };
}
