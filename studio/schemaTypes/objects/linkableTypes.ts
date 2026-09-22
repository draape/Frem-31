/**
 * Single source of truth for the document types that can be referenced and
 * rendered as a web page — used by the common `link` object and by any
 * reference that should point at "a page".
 *
 * When a new renderable document type is added (e.g. `article`, `product`),
 * add it here once and every link/reference picks it up.
 */
export const linkableTypes: {type: string}[] = [{type: 'page'}]
