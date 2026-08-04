# Quickstart: Frembanen Pitch Information Pages

**Feature**: 001-frembanen-pitch-pages
**Date**: 2026-03-08

## Prerequisites

- Node.js 18.17+ (LTS recommended)
- pnpm 8+ (or npm/yarn)
- Git

## Initial Setup

### 1. Create Next.js Project

```bash
# From repository root
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Note: We'll replace Tailwind with Panda CSS in next step
```

### 2. Install Dependencies

```bash
# Remove Tailwind (we use Panda CSS per constitution)
pnpm remove tailwindcss postcss autoprefixer

# Install Panda CSS
pnpm add -D @pandacss/dev

# Install Arc UI
pnpm add @ark-ui/react

# Install testing tools
pnpm add -D @playwright/test

# Initialize Panda CSS
pnpm panda init --postcss
```

### 3. Configure Panda CSS

Update `panda.config.ts` with FREM-31 design tokens:

```typescript
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          blue: {
            50: { value: '#F4FCFF' },
            100: { value: '#C8DEFF' },
            200: { value: '#9DBFFF' },
            300: { value: '#729EFF' },
            400: { value: '#487AFF' },
            500: { value: '#2854FF' },
            600: { value: '#1836E3' },
            700: { value: '#0F08C8' },
            800: { value: '#0C00A0' },
            900: { value: '#06006D' },
            950: { value: '#02003E' },
          },
          yellow: {
            50: { value: '#FFFDF0' },
            100: { value: '#FFFBD6' },
            200: { value: '#FFF7B3' },
            300: { value: '#FFF180' },
            400: { value: '#FFED57' },
            500: { value: '#FFE61A' },
            600: { value: '#E6CD00' },
            700: { value: '#B39F00' },
            800: { value: '#807200' },
            900: { value: '#4D4400' },
            950: { value: '#292600' },
          },
          grey: {
            50: { value: '#FAFAFA' },
            100: { value: '#F5F5F5' },
            200: { value: '#E8E8E8' },
            300: { value: '#D6D6D6' },
            400: { value: '#ABABAB' },
            500: { value: '#757575' },
            600: { value: '#575757' },
            700: { value: '#424242' },
            800: { value: '#2B2B2B' },
            900: { value: '#1A1A1A' },
            950: { value: '#000000' },
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: { value: '{colors.blue.500}' },
          accent: { value: '{colors.yellow.500}' },
          background: { value: '{colors.grey.50}' },
          text: { value: '{colors.grey.900}' },
          muted: { value: '{colors.grey.500}' },
        },
      },
    },
  },
  outdir: 'styled-system',
});
```

### 4. Update Package Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "panda codegen && next dev",
    "build": "panda codegen && next build",
    "start": "next start",
    "lint": "next lint",
    "prepare": "panda codegen",
    "test": "playwright test",
    "test:ui": "playwright test --ui"
  }
}
```

### 5. Generate Panda CSS

```bash
pnpm panda codegen
```

### 6. Update Global CSS

Replace `app/globals.css`:

```css
@layer reset, base, tokens, recipes, utilities;

@import url('../styled-system/styles.css');
```

## Development

### Start Development Server

```bash
pnpm dev
```

Site available at `http://localhost:3000`

### Run Linting

```bash
pnpm lint
```

### Run Tests

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run E2E tests
pnpm test
```

### Build for Production

```bash
pnpm build
```

Output in `.next/` directory (static export if configured).

## Project Structure Overview

```
├── app/
│   ├── page.tsx              # Frembanen page
│   ├── banekalender/
│   │   └── page.tsx          # Calendar page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── layout/               # Header, Footer, Navigation
│   ├── frembanen/            # Frembanen page sections
│   ├── calendar/             # Calendar embed
│   └── ui/                   # Shared UI components
├── lib/
│   ├── constants/            # Static content data
│   └── types/                # TypeScript types
├── public/
│   └── images/               # Static assets
├── styled-system/            # Generated Panda CSS
├── tests/
│   └── e2e/                  # Playwright tests
├── panda.config.ts           # Panda CSS config
└── next.config.js            # Next.js config
```

## Key Files to Create

1. **Layout Components** (Priority 1)
   - `components/layout/Header.tsx`
   - `components/layout/Footer.tsx`
   - `components/layout/Navigation.tsx`

2. **Frembanen Sections** (Priority 2)
   - `components/frembanen/WelcomeSection.tsx`
   - `components/frembanen/AddressSection.tsx`
   - `components/frembanen/ParkingSection.tsx`
   - `components/frembanen/RulesSection.tsx`
   - `components/frembanen/PitchMap.tsx`

3. **Calendar Component** (Priority 3)
   - `components/calendar/CalendarEmbed.tsx`

4. **Pages** (Priority 4)
   - `app/page.tsx` (uses Frembanen components)
   - `app/banekalender/page.tsx` (uses Calendar component)

## Assets Needed

Before completing implementation, obtain:

- [ ] Frem-31 logo (SVG preferred)
- [ ] Pitch map diagram (SVG or PNG)
- [ ] Social media icons (or use icon library)
- [ ] Treningstilbud URL
- [ ] Facebook page URL
- [ ] Instagram page URL

## Verification Checklist

After setup, verify:

- [ ] `pnpm dev` starts without errors
- [ ] `pnpm lint` passes
- [ ] `pnpm build` completes successfully
- [ ] Panda CSS styles apply correctly
- [ ] Navigation between pages works
- [ ] Google Maps embed loads
- [ ] EasyPlay calendar embed loads
