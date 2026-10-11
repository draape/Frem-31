import { defineQuery } from 'next-sanity';

// Every published page that has a URL. Pages without `path.fullPath` (before
// the compute-full-path Function has run on them) are unreachable.
export const PAGE_PATHS_QUERY = defineQuery(
  `*[_type == "page" && defined(path.fullPath)].path.fullPath`
);

export type PagePathsResult = string[];

export const PAGE_BY_PATH_QUERY = defineQuery(
  `*[_type == "page" && path.fullPath == $fullPath][0]{
    title,
    description,
    "seoTitle": seo.title,
    "seoDescription": seo.description
  }`
);

export type PageByPathResult = {
  title: string | null;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
} | null;
