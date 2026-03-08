# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (strict mode) with Next.js App Router (latest)
**Primary Dependencies**: Next.js, React, Panda CSS, Arc UI
**Storage**: [if applicable, e.g., PostgreSQL, Sanity, files or N/A]
**Testing**: [e.g., Vitest, Jest, Playwright or NEEDS CLARIFICATION]
**Target Platform**: Web (modern browsers)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: [domain-specific, e.g., <2s page load, <100ms interaction or NEEDS CLARIFICATION]
**Constraints**: [domain-specific, e.g., <200ms p95 API, must support offline or NEEDS CLARIFICATION]
**Scale/Scope**: [domain-specific, e.g., 10k users, 100 pages, 50 components or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with FREM-31 Constitution principles:

- [ ] **Component-Based Architecture**: Does the design use reusable components with Panda CSS and Arc UI?
- [ ] **Separation of Concerns**: Are presentation, business logic, and data layers clearly separated?
- [ ] **Performance Through Caching**: Does the implementation use Next.js caching (RSC, fetch cache, static generation)?
- [ ] **Code Quality Gates**: Are linting, formatting, type safety, and build checks configured?
- [ ] **Incremental Delivery**: Is the feature broken into small, independently deployable increments?
- [ ] **Simplicity (YAGNI)**: Is this the simplest solution? Document any added complexity with justification.

If any principle is violated, document the reason in the Complexity Tracking section below.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# Next.js App Router Structure (FREM-31 standard)
app/
├── [feature]/
│   ├── page.tsx           # Route page component
│   ├── layout.tsx         # Feature-specific layout
│   └── components/        # Feature-specific components
├── api/
│   └── [endpoint]/
│       └── route.ts       # API route handlers
└── layout.tsx             # Root layout

components/
├── ui/                    # Arc UI wrappers and primitives
├── [feature]/             # Shared feature components
└── shared/                # Cross-feature components

lib/
├── services/              # Business logic layer
├── utils/                 # Utility functions
└── types/                 # Shared TypeScript types

styles/
└── panda.config.ts        # Panda CSS configuration

tests/
├── e2e/                   # Playwright end-to-end tests
├── integration/           # Integration tests
└── unit/                  # Unit tests
```

**Structure Decision**: Using Next.js App Router with separation of concerns per
constitution. Components in `components/`, business logic in `lib/services/`, API routes
in `app/api/`. Tests organized by type (e2e, integration, unit).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
