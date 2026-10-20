// Paths owned by hand-written routes in app/. A static route wins over the
// [[...slug]] catch-all only at its exact path, so a Sanity page at one of
// these never renders and generateStaticParams skips it. Pages below them
// (e.g. /ui/child) are not shadowed and render as usual.
export const SHADOWED_PATHS = ['/ui'];

function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

// `undefined` -> `/`, `['a', 'b']` -> `/a/b`. Segments may arrive URL-encoded
// (æ/ø/å), while `fullPath` is stored decoded.
export function slugToFullPath(slug?: string[]): string {
  if (!slug || slug.length === 0) {
    return '/';
  }
  return `/${slug.map(decodeSegment).join('/')}`;
}

// `/` -> `[]`, `/a/b` -> `['a', 'b']`.
export function fullPathToSlug(fullPath: string): string[] {
  return fullPath.split('/').filter(Boolean);
}

export function isShadowedPath(fullPath: string): boolean {
  return SHADOWED_PATHS.includes(fullPath);
}
