# Research: Frembanen Pitch Information Pages

**Feature**: 001-frembanen-pitch-pages
**Date**: 2026-03-08
**Status**: Complete

## Overview

This document captures technology decisions, best practices research, and resolved unknowns for the Frembanen pitch information pages feature.

---

## Technology Decisions

### 1. Next.js App Router with Static Generation

**Decision**: Use Next.js 14+ App Router with full static generation (SSG)

**Rationale**:
- All content is static and known at build time
- No user-specific data or authentication required
- Static generation provides fastest possible page loads
- Excellent SEO out of the box with static HTML
- Aligns with constitution principle "Performance Through Caching"

**Alternatives Considered**:
- Server-Side Rendering (SSR): Rejected - no dynamic data requiring per-request rendering
- Client-Side Rendering (CSR): Rejected - poor SEO, slower initial load
- Static Site Generator (Gatsby, Astro): Rejected - Next.js already in tech stack per constitution

**Implementation Notes**:
- All pages will export `export const dynamic = 'force-static'` or use default static behavior
- No `'use client'` directives needed except for interactive elements
- Build output will be fully static HTML/CSS/JS

---

### 2. Panda CSS Configuration

**Decision**: Configure Panda CSS with FREM-31 design tokens from spec

**Rationale**:
- Constitution mandates Panda CSS for styling
- Design tokens already defined in specification (blue, yellow, grey palettes)
- Type-safe styling with compile-time checks
- Zero-runtime CSS-in-JS for optimal performance

**Token Configuration**:
```typescript
// Semantic tokens derived from spec
colors: {
  primary: '{colors.blue.500}',      // #2854FF
  accent: '{colors.yellow.500}',     // #FFE61A
  background: '{colors.grey.50}',    // #FAFAFA
  text: '{colors.grey.900}',         // #1A1A1A
}
```

**Alternatives Considered**:
- Tailwind CSS: Rejected - constitution specifies Panda CSS
- CSS Modules: Rejected - less type-safe, no design token integration
- Styled Components: Rejected - runtime overhead, not in constitution

---

### 3. Arc UI Integration

**Decision**: Use Arc UI for primitive components (Button, Link) where applicable

**Rationale**:
- Constitution mandates Arc UI for atoms and primitives
- Provides accessible, well-tested base components
- Consistent interaction patterns

**Components to Use**:
- Button: For "Treningstilbud" CTA
- Link: For navigation items (internal and external)

**Components NOT Needed from Arc UI**:
- Form elements (no forms in this feature)
- Modal/Dialog (no modals needed)
- Table (static content, no tabular data)

---

### 4. Google Maps Embed Approach

**Decision**: Use Google Maps iframe embed (no API key required for basic embed)

**Rationale**:
- Simplest solution for displaying a location
- No API key management or billing concerns
- Works without JavaScript for basic display
- Meets requirement FR-007

**Implementation**:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!...!Nordraaks+vei+67+Stabekk"
  width="100%"
  height="300"
  style="border:0"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
/>
```

**Alternatives Considered**:
- Google Maps JavaScript API: Rejected - requires API key, more complexity
- Mapbox: Rejected - external dependency, overkill for single marker
- Static image: Rejected - less interactive, user expectation is interactive map

**Fallback Strategy**:
- Address text always visible above/beside map
- If iframe fails to load, address remains useful

---

### 5. EasyPlay Calendar Integration

**Decision**: Embed EasyPlay calendar using provided iframe code

**Rationale**:
- User provided exact embed code
- External service handles all calendar functionality
- No custom calendar development needed
- `hideHeader=true` parameter already in URL

**Implementation**:
```tsx
<iframe
  src="https://www.easyplay.no/clubs/frem31?stadium=Frembanen_kunstgress&hideHeader=true"
  width="100%"
  height="800px"
  frameBorder="0"
  allowFullScreen
/>
```

**Fallback Strategy**:
- Wrap iframe in component with loading state
- Show fallback message if iframe fails to load after timeout
- Provide direct link to EasyPlay as alternative

---

### 6. Responsive Design Strategy

**Decision**: Mobile-first responsive design with CSS breakpoints

**Rationale**:
- Spec requires 320px to 1920px viewport support (SC-005)
- Mobile users checking info while traveling to pitch
- Panda CSS provides built-in responsive utilities

**Breakpoints**:
```typescript
breakpoints: {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
}
```

**Key Responsive Behaviors**:
- Navigation: Horizontal on desktop, hamburger menu on mobile (future enhancement) or stacked
- Content sections: Full-width on mobile, contained max-width on desktop
- Maps/embeds: Maintain aspect ratio, scale to container width

---

### 7. Testing Strategy

**Decision**: E2E tests with Playwright, minimal unit tests

**Rationale**:
- Static site with minimal logic - unit tests have low ROI
- E2E tests verify actual user experience
- Navigation and page rendering are primary test targets

**Test Coverage**:
- Navigation between pages works correctly
- All pages render without errors
- Key content sections visible
- External embeds load (or fail gracefully)

**Alternatives Considered**:
- Jest + React Testing Library: Rejected - overkill for static components
- Cypress: Rejected - Playwright preferred in modern Next.js setups
- No tests: Rejected - constitution requires quality gates

---

### 8. External Link Handling (Treningstilbud)

**Decision**: Treningstilbud opens in new tab, links to external URL

**Rationale**:
- Spec identifies it as external/action link
- Visual distinction as button (per FR-009)
- New tab prevents navigation away from site

**Implementation**:
- Styled as button using Arc UI Button with variant
- `target="_blank"` with `rel="noopener noreferrer"`
- URL to be configured (placeholder until provided)

---

## Resolved Unknowns

| Unknown | Resolution | Source |
|---------|------------|--------|
| Testing framework | Playwright E2E | Best practice for Next.js static sites |
| Performance target | <3s page load | SC-003 from specification |
| Map provider | Google Maps iframe embed | Standard approach, no API key needed |
| Mobile navigation | Horizontal links initially | Simplicity; hamburger menu deferred |
| Calendar fallback | Loading state + fallback message | Edge case handling from spec |
| Treningstilbud URL | Placeholder, to be configured | External dependency |
| Social media URLs | Placeholder, to be configured | External dependency |

---

## Best Practices Applied

### Next.js App Router
- Use `layout.tsx` for shared Header/Footer
- Co-locate page-specific components near pages
- Leverage automatic static optimization
- Use `next/link` for client-side navigation
- Use `next/image` for optimized image loading

### Panda CSS
- Define all colors as tokens, never hardcode hex values
- Use semantic tokens for consistent theming
- Leverage responsive array syntax for breakpoints
- Keep component styles co-located or in recipe files

### Accessibility
- Semantic HTML elements (header, main, footer, nav, section)
- Alt text for images (logo, pitch map)
- Skip to content link
- Sufficient color contrast (verified against WCAG 2.1 AA)
- Keyboard navigation support

### Performance
- Lazy load iframes (Google Maps, EasyPlay)
- Optimize images (SVG where possible, next/image for raster)
- Minimize JavaScript bundle (static pages need minimal JS)
- Leverage browser caching with appropriate headers

---

## Dependencies Summary

| Dependency | Version | Purpose |
|------------|---------|---------|
| next | 14.x | Framework |
| react | 18.x | UI library |
| react-dom | 18.x | React DOM |
| @pandacss/dev | latest | Build-time CSS |
| @ark-ui/react | latest | UI primitives |
| typescript | 5.x | Type safety |
| @playwright/test | latest | E2E testing |
| eslint | 8.x | Linting |
| prettier | 3.x | Formatting |

---

## Open Items for Implementation

1. **Treningstilbud URL**: Needs to be provided by stakeholder
2. **Social media URLs**: Facebook and Instagram links needed
3. **Frem-31 Logo**: SVG asset to be provided or extracted
4. **Pitch Map Asset**: SVG/image of Banekart to be provided or recreated
5. **Favicon**: Club icon for browser tab

These items do not block implementation - placeholders will be used and updated when assets are provided.
