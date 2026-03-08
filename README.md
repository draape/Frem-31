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

- Node.js 18+
- pnpm 8+

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
  page.tsx             # Frembanen home page
  banekalender/page.tsx # Calendar page
  layout.tsx           # Root layout
components/
  frembanen/           # Frembanen page sections
  calendar/            # Calendar components
  layout/              # Header, Footer, Navigation
  ui/                  # Reusable UI components
lib/
  constants/           # Static content and config
  types/               # TypeScript type definitions
public/images/         # Static assets
tests/e2e/             # Playwright tests
```

## Design Tokens

Colors are configured in `panda.config.ts`:

- **Primary**: Blue (#2854FF)
- **Accent**: Yellow (#FFE61A)
- **Grey scale**: #000000 to #FAFAFA
