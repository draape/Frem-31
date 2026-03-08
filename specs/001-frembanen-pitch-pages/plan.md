# Implementation Plan: Frembanen Pitch Information Pages

**Branch**: `001-frembanen-pitch-pages` | **Date**: 2026-03-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-frembanen-pitch-pages/spec.md`

## Summary

Build a Next.js web application for Sportsklubb Frem-31 featuring two primary pages: a Frembanen pitch information page (with address, parking info, rules, and pitch map) and a Banekalender schedule page (with embedded EasyPlay calendar). The application will use the FREM-31 design system with established color tokens (blue, yellow, grey palettes) and follow component-based architecture with Panda CSS and Arc UI.

## Technical Context

**Language/Version**: TypeScript (strict mode) with Next.js 14+ App Router
**Primary Dependencies**: Next.js, React 18+, Panda CSS, Arc UI
**Storage**: N/A (static content site, no database required)
**Testing**: Playwright for E2E testing (navigation, page rendering)
**Target Platform**: Web (modern browsers - Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (Next.js App Router) - Static/SSG site
**Performance Goals**: <3s page load on standard broadband (per SC-003), instant client-side navigation
**Constraints**: Must embed external iframe (EasyPlay calendar), responsive 320px-1920px viewport
**Scale/Scope**: 2 pages, ~10 components, <1000 monthly visitors expected (community sports club)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with FREM-31 Constitution principles:

- [x] **Component-Based Architecture**: Design uses reusable components (Header, Footer, ContentSection, PitchMap, CalendarEmbed) built with Panda CSS and Arc UI primitives
- [x] **Separation of Concerns**: Presentation (components/), layout (app/), static content (content/), styles (panda.config.ts) clearly separated; no business logic layer needed for static site
- [x] **Performance Through Caching**: Site will use Next.js static generation (SSG) for all pages - maximum caching, zero server-side rendering at request time
- [x] **Code Quality Gates**: ESLint, Prettier, TypeScript strict mode configured; build must pass
- [x] **Incremental Delivery**: Feature broken into increments: 1) Project setup + design tokens, 2) Layout components, 3) Frembanen page, 4) Banekalender page
- [x] **Simplicity (YAGNI)**: Static site with no database, no auth, no API routes - simplest possible solution for informational content

All constitution principles satisfied. No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-frembanen-pitch-pages/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (minimal for static site)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── page.tsx                    # Home/Frembanen page (primary landing)
├── banekalender/
│   └── page.tsx                # Calendar page
├── layout.tsx                  # Root layout with Header/Footer
├── globals.css                 # Global styles (Panda CSS entry)
└── favicon.ico                 # Site favicon

components/
├── ui/                         # Arc UI wrappers and primitives
│   ├── Button.tsx              # Button component (for Treningstilbud CTA)
│   └── Link.tsx                # Navigation link component
├── layout/
│   ├── Header.tsx              # Site header with logo and navigation
│   ├── Footer.tsx              # Site footer with links and social
│   └── Navigation.tsx          # Navigation menu component
├── frembanen/
│   ├── WelcomeSection.tsx      # Welcome/intro text section
│   ├── AddressSection.tsx      # Address with Google Maps embed
│   ├── ParkingSection.tsx      # Parking instructions
│   ├── RulesSection.tsx        # Pitch rules (Baneregler)
│   └── PitchMap.tsx            # Pitch layout diagram (Banekart)
└── calendar/
    └── CalendarEmbed.tsx       # EasyPlay calendar iframe wrapper

lib/
├── constants/
│   └── navigation.ts           # Navigation items configuration
└── types/
    └── index.ts                # Shared TypeScript types

public/
├── images/
│   ├── logo.svg                # Frem-31 logo
│   ├── pitch-map.svg           # Pitch layout diagram
│   └── icons/                  # Social media icons
└── fonts/                      # Custom fonts (if needed)

panda.config.ts                 # Panda CSS configuration with design tokens
styled-system/                  # Generated Panda CSS output

tests/
└── e2e/
    ├── navigation.spec.ts      # Navigation E2E tests
    └── pages.spec.ts           # Page rendering tests
```

**Structure Decision**: Using Next.js App Router with static generation. Components organized by feature (frembanen/, calendar/) and type (ui/, layout/). No API routes needed - purely static content. Tests focus on E2E since unit tests have limited value for static components.

## Complexity Tracking

No constitution violations. This is a straightforward static site implementation.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |
