import { defineQuery } from 'next-sanity';
import type { PortableTextBlock } from 'next-sanity';

// Every published page that has a URL. Pages without `path.fullPath` (before
// the compute-full-path Function has run on them) are unreachable.
export const PAGE_PATHS_QUERY = defineQuery(
  `*[_type == "page" && defined(path.fullPath)].path.fullPath`
);

export type PagePathsResult = string[];

// Image fields as `sanityImage()` reads them: the asset's dimensions plus the
// editor's crop, hotspot and alt text.
const IMAGE = `crop, hotspot, alt, decorative, asset->{ _id, metadata { dimensions } }`;

// The client reads published content only, so a reference to an unpublished
// page dereferences to null and leaves `internalPath` (or a card's `href`)
// unset.
export const PAGE_BY_PATH_QUERY = defineQuery(
  `*[_type == "page" && path.fullPath == $fullPath][0]{
    title,
    description,
    "seoTitle": seo.title,
    "seoDescription": seo.description,
    content[]{
      _type,
      _key,
      _type == "textBlock" => {
        content[]{
          ...,
          markDefs[]{ ..., _type == "link" => { "internalPath": internal->path.fullPath } }
        }
      },
      _type == "imageSection" => { caption, image{ ${IMAGE} } },
      _type == "split" => {
        kicker,
        title,
        lead,
        imagePosition,
        image{ ${IMAGE} },
        cta{ ..., "internalPath": internal->path.fullPath }
      },
      _type == "cardSection" => {
        title,
        cards[]{
          _key,
          "title": coalesce(title, reference->title),
          "description": coalesce(description, reference->description),
          "href": reference->path.fullPath
        }
      }
    }
  }`
);

// The site settings singleton (fixed id). Header items and footer links to an
// unpublished page dereference to null and are dropped by the mapper.
export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_id == "siteSettings"][0]{
    "header": header[]{ _key, label, "href": reference->path.fullPath },
    "footerColumns": footer.columns[]{
      _key,
      title,
      links[]{
        _key, type, label, href, email, openInNewTab,
        "internalPath": internal->path.fullPath,
        "internalTitle": internal->title
      }
    },
    "facebook": socialLinks.facebook
  }`
);

export type SanityImage = {
  crop?: { top: number; bottom: number; left: number; right: number } | null;
  hotspot?: { x: number; y: number; width: number; height: number } | null;
  alt?: string | null;
  decorative?: boolean | null;
  asset: {
    _id: string;
    metadata: { dimensions: { width: number; height: number } } | null;
  } | null;
};

export type SanityLink = {
  type?: 'internal' | 'external' | 'email' | null;
  label?: string | null;
  href?: string | null;
  email?: string | null;
  openInNewTab?: boolean | null;
  // Resolved from `internal`; null when the target page is unpublished.
  internalPath?: string | null;
  // The target page's title, where the query asks for it (label fallback).
  internalTitle?: string | null;
};

export type CardItem = {
  _key: string;
  title: string | null;
  description: string | null;
  href: string | null;
};

export type TextBlock = {
  _type: 'textBlock';
  _key: string;
  content: PortableTextBlock[] | null;
};

export type ImageSectionBlock = {
  _type: 'imageSection';
  _key: string;
  caption: string | null;
  image: SanityImage | null;
};

export type SplitBlock = {
  _type: 'split';
  _key: string;
  kicker: string | null;
  title: string | null;
  lead: string | null;
  imagePosition: 'left' | 'right' | null;
  image: SanityImage | null;
  cta: SanityLink | null;
};

export type CardSectionBlock = {
  _type: 'cardSection';
  _key: string;
  title: string | null;
  cards: CardItem[] | null;
};

// A block type the web doesn't know yet (added in the Studio first).
export type UnknownBlock = {
  _type: string;
  _key: string;
};

export type ContentBlock =
  | TextBlock
  | ImageSectionBlock
  | SplitBlock
  | CardSectionBlock
  | UnknownBlock;

export type PageByPathResult = {
  title: string | null;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  content: ContentBlock[] | null;
} | null;

export type SiteSettingsResult = {
  header: { _key: string; label: string | null; href: string | null }[] | null;
  footerColumns:
    | {
        _key: string;
        title: string | null;
        links: (SanityLink & { _key: string })[] | null;
      }[]
    | null;
  facebook: string | null;
} | null;
