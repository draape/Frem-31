# Data Model: Frembanen Pitch Information Pages

**Feature**: 001-frembanen-pitch-pages
**Date**: 2026-03-08
**Status**: Complete

## Overview

This feature is a static informational website with no persistent data storage. All content is hardcoded at build time. This document defines the TypeScript types and content structures used in the application.

---

## Type Definitions

### Navigation Types

```typescript
// lib/types/navigation.ts

export type NavigationVariant = 'link' | 'button';

export interface NavigationItem {
  /** Display label for the navigation item */
  label: string;
  /** Internal route path or external URL */
  href: string;
  /** Visual style variant */
  variant: NavigationVariant;
  /** Whether link opens in new tab */
  external?: boolean;
}

export interface NavigationConfig {
  /** Main header navigation items */
  header: NavigationItem[];
  /** Footer navigation groups */
  footer: FooterGroup[];
}

export interface FooterGroup {
  /** Group heading (e.g., "Topic") */
  title: string;
  /** Links within the group */
  links: NavigationItem[];
}
```

### Content Section Types

```typescript
// lib/types/content.ts

export interface ContentSection {
  /** Section heading */
  title: string;
  /** Main content (can be string or structured) */
  content: string | ContentBlock[];
}

export interface ContentBlock {
  type: 'paragraph' | 'list' | 'emphasis';
  text?: string;
  items?: string[];
}

export interface AddressInfo {
  /** Full street address */
  street: string;
  /** Postal code and city */
  postalCity: string;
  /** Google Maps embed URL */
  mapEmbedUrl: string;
  /** Coordinates for map centering */
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PitchZone {
  /** Zone identifier (e.g., "5er-A", "7er-B") */
  id: string;
  /** Display label */
  label: string;
  /** Zone type */
  type: '5er' | '7er' | 'parent-zone';
  /** Position on map (for SVG rendering if needed) */
  position?: { x: number; y: number };
}
```

### Design Token Types

```typescript
// lib/types/tokens.ts

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface DesignTokens {
  colors: {
    blue: ColorScale;
    yellow: ColorScale;
    grey: ColorScale;
  };
  semantic: {
    primary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
}
```

---

## Static Content Structure

### Navigation Configuration

```typescript
// lib/constants/navigation.ts

export const navigationConfig: NavigationConfig = {
  header: [
    { label: 'Frembanen', href: '/', variant: 'link' },
    { label: 'Banekalender', href: '/banekalender', variant: 'link' },
    { label: 'Treningstilbud', href: 'https://...', variant: 'button', external: true },
  ],
  footer: [
    {
      title: 'Topic',
      links: [
        { label: 'Page', href: '/...', variant: 'link' },
        // ... more links
      ],
    },
    // ... more groups
  ],
};
```

### Frembanen Page Content

```typescript
// lib/constants/frembanen.ts

export const frembanenContent = {
  welcome: {
    title: 'Velkommen til Frembanen',
    subtitle: 'trenings- og kampanlegget til Frem-31.',
    body: `Frembanen er åpen for alle og fungerer som en samlingsplass for nærmiljøet rundt
           Lysaker skole og Nedre Stabekk. Her møtes barn, unge og familier til aktivitet,
           lek og fotball – både organisert og uorganisert. Sjekk banekalenderen for å se
           når banen er ledig.`,
  },
  address: {
    street: 'Nordraaks vei 67',
    postalCity: '1369 Stabekk',
    mapEmbedUrl: 'https://www.google.com/maps/embed?...',
    coordinates: { lat: 59.9127, lng: 10.6089 },
  },
  parking: {
    title: 'Parkering',
    intro: 'For minst mulig forstyrrelse av annen trafikk, og for å redusere faren for ulykker, ber vi deg vennligst',
    rules: [
      'benytte parkeringsmulighetene oppe på skolen. Det er 100m å gå derfra til banen',
      'respektere parkeringsforbudet, følg skilting',
      'ikke bruke veien inn til banen som snuplass eller henteplass',
    ],
    cycling: 'Sykle gjerne til trening og kamper! Det er fin oppvarming og reduserer antall biler. Fra Bekkestua tar det eksempelvis 7 min å sykle til banen, og 12 min hjem igjen.',
  },
  rules: {
    title: 'Baneregler',
    intro: 'Hjelp oss å ta vare på den fine banen vår! Følgende er ikke tillatt på kunstgresset:',
    prohibited: [
      'Leking og klatring i mål og nett',
      'Hunder – av hygieniske grunner',
      'Snus og mat',
      'Sykler og annet på hjul. Sykler bes parkert på asfalten i enden mot klubbhuset.',
    ],
    outro: 'Vennligst ta med deg søppel av banen og kast det i søppeldunkene ved inngangene og ved klubbhuset.',
  },
  pitchMap: {
    title: 'Banekart',
    zones: [
      { id: '5er-A', label: '5er – A', type: '5er' },
      { id: '5er-B', label: '5er – B', type: '5er' },
      { id: '5er-C', label: '5er – C', type: '5er' },
      { id: '5er-D', label: '5er – D', type: '5er' },
      { id: '7er-A', label: '7er – A', type: '7er' },
      { id: '7er-B', label: '7er – B', type: '7er' },
    ],
    parentZones: [
      { id: 'parent-5er-A', label: 'Foreldresone 5er – A', type: 'parent-zone' },
      { id: 'parent-5er-B', label: 'Foreldresone 5er – B', type: 'parent-zone' },
      { id: 'parent-5er-C', label: 'Foreldresone 5er – C', type: 'parent-zone' },
      { id: 'parent-5er-D', label: 'Foreldresone 5er – D', type: 'parent-zone' },
      { id: 'parent-7er-A', label: 'Foreldresone 7er – A', type: 'parent-zone' },
      { id: 'parent-7er-B', label: 'Foreldresone 7er – B', type: 'parent-zone' },
    ],
  },
};
```

### Calendar Page Content

```typescript
// lib/constants/calendar.ts

export const calendarConfig = {
  title: 'Banekalender',
  embedUrl: 'https://www.easyplay.no/clubs/frem31?stadium=Frembanen_kunstgress&hideHeader=true',
  height: '800px',
  fallbackMessage: 'Kalenderen er midlertidig utilgjengelig. Besøk easyplay.no direkte.',
  fallbackUrl: 'https://www.easyplay.no/clubs/frem31',
};
```

---

## Entity Relationships

```
NavigationConfig
├── header: NavigationItem[]
└── footer: FooterGroup[]
    └── links: NavigationItem[]

FrembanenContent
├── welcome: ContentSection
├── address: AddressInfo
├── parking: ContentSection (with rules list)
├── rules: ContentSection (with prohibited list)
└── pitchMap: PitchMapConfig
    ├── zones: PitchZone[]
    └── parentZones: PitchZone[]

CalendarConfig
└── (standalone embed configuration)
```

---

## Validation Rules

Since this is a static site with no user input, validation rules are minimal:

1. **Navigation Items**: `href` must be valid URL or route path
2. **External Links**: Must include `external: true` flag for new tab behavior
3. **Embed URLs**: Must be HTTPS for security
4. **Design Tokens**: All color values must be valid hex codes

---

## State Transitions

No state transitions - this is a stateless, static site. All content is immutable after build.

---

## Data Volume / Scale

- **Pages**: 2 (Frembanen, Banekalender)
- **Navigation Items**: ~5 header, ~9 footer
- **Content Sections**: 5 on Frembanen page
- **External Embeds**: 2 (Google Maps, EasyPlay)
- **Images**: ~5 (logo, pitch map, social icons)

Total static assets estimated at <1MB after optimization.
