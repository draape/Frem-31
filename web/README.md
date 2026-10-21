# Frem-31 Web

Website for Sportsklubb Frem-31 featuring Frembanen pitch information and calendar.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Panda CSS** - CSS-in-JS with design tokens
- **Arc UI** - Headless component primitives
- **TypeScript** - Type safety
- **Playwright** - E2E testing

## Getting Started

### Prerequisites

- Node.js 22+ (see .nvmrc; CI uses 24)
- pnpm 10+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
pnpm build
```

Generates static HTML in the `out/` directory.

### Testing

```bash
pnpm test
```

Runs Playwright E2E tests.

### Linting

```bash
pnpm lint
```

## Project Structure

```
app/                    # Next.js App Router pages
  (site)/[[...slug]]/page.tsx # Pages from Sanity, including the front page
  (site)/ui/page.tsx   # Component sandbox (hand-written)
  (site)/layout.tsx    # Header and footer from siteSettings
  (site)/not-found.tsx # 404 for notFound() and unmatched URLs
  studio/[[...tool]]/page.tsx # The Sanity Studio
  layout.tsx           # Root layout: document shell, fonts, default metadata
sanity/                # Studio schema, desk structure, utils and scripts
sanity.config.ts       # Studio config (basePath /studio)
sanity.cli.ts          # Sanity CLI config
components/
  content/             # Page content blocks (text, image, map, split, …)
  calendar/            # The EasyPlay calendar embed
  layout/              # Header, Footer, Navigation
  ui/                  # Reusable UI components
lib/
  sanity/              # Client, queries, path and link helpers
  types/               # TypeScript type definitions
public/images/         # Static assets
tests/e2e/             # Playwright tests
```

## Pages from Sanity

`app/(site)/[[...slug]]/page.tsx` renders every published `page` document at its `path.fullPath`: `/` is the front page, `/parent/child` a nested page. Unknown paths return 404. Pages without a `fullPath` are not reachable. A page renders its header and then its content blocks in Studio order. `/frembanen` and `/banekalender` are ordinary Sanity pages (created by `sanity/scripts/migrateLegacyPages.ts`); navigation comes from the `siteSettings` document.

- **Revalidation:** time-based ISR with a 60 s window (`revalidate = 60`). Reads go through Sanity's API CDN, which can add a few seconds, so published changes appear within about a minute. Pages published after a deploy render on their first request without a rebuild. Drafts never show; the client uses the `published` perspective.
- **Build:** `pnpm build` queries Sanity for all page paths (`generateStaticParams`), so it needs the `NEXT_PUBLIC_SANITY_*` variables and network access.
- **Shadowed paths:** `/ui` belongs to a hand-written route, which takes priority over the catch-all at exactly that path. A Sanity page with that `fullPath` never renders and is left out of the build (`SHADOWED_PATHS` in `lib/sanity/paths.ts`). Pages below it, such as `/ui/child`, render as usual. `/studio` is different: its route catches everything below it too, so a Sanity page at `/studio` or under it never renders. None exists; don't create one.
- **`/`:** unless `NEXT_PUBLIC_ENABLE_HOME_PAGE=true`, `next.config.mjs` still redirects `/` to `/frembanen`.

## Design Tokens

Colors are configured in `panda.config.ts`:

- **Primary**: Blue (#2854FF)
- **Accent**: Yellow (#FFE61A)
- **Grey scale**: #000000 to #FAFAFA
