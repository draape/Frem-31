// Top-level segments owned by hand-written routes in app/. Static segments win
// over the [[...slug]] catch-all, so a Sanity page under one of these can never
// render; generateStaticParams skips them. Entries go away as #7 migrates the
// routes to Sanity.
export const RESERVED_TOP_SEGMENTS = ['frembanen', 'banekalender', 'ui', 'dev'];

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

export function isReservedPath(fullPath: string): boolean {
  const [first] = fullPathToSlug(fullPath);
  return first !== undefined && RESERVED_TOP_SEGMENTS.includes(first);
}
