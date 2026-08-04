<!--
Sync Impact Report:
- Version: N/A → 1.0.0 (Initial constitution creation)
- New project constitution established
- Principles defined: 5 core principles
  1. Component-Based Architecture (Panda CSS + Arc UI)
  2. Separation of Concerns (Presentation/Business/Data layers)
  3. Performance Through Caching (Next.js App Router caching)
  4. Code Quality Gates (Linting, formatting, type safety)
  5. Incremental Delivery with Simplicity (YAGNI, feature branches)
- Templates updated:
  ✅ .specify/templates/plan-template.md - Constitution Check section added, paths updated for Next.js
  ✅ .specify/templates/spec-template.md - Constitution compliance note added
  ✅ .specify/templates/tasks-template.md - Path conventions and example tasks updated for Next.js
- All templates now reference FREM-31 Constitution principles
- No deferred placeholders - all values defined
-->

# FREM-31 Constitution

## Core Principles

### I. Component-Based Architecture

All UI development MUST follow component-based design patterns where:
- Components are reusable, composable building blocks
- Components use Panda CSS for styling
- Arc UI components MUST be used for atoms and primitives when available
- Each component has a single, clear responsibility
- Components are self-contained with their styles and logic

**Rationale**: Component architecture enables parallel development, easier testing, and
consistent UI patterns. Panda CSS and Arc UI provide type-safe, performant styling with
excellent developer experience.

### II. Separation of Concerns

The application MUST maintain clear boundaries between:
- **Presentation Layer**: React components, UI logic, client-side state
- **Business Logic Layer**: Services, utilities, domain logic
- **Data Layer**: API clients, data fetching, caching, persistence

Frontend and backend code MUST be organized in separate directories. No business logic
in components; no UI code in services.

**Rationale**: Clear separation enables independent testing, easier maintenance, and
allows teams to work in parallel without conflicts.

### III. Performance Through Caching

The application MUST prioritize cached and static content:
- Use Next.js App Router caching strategies (React Server Components, fetch cache)
- Cache components wherever possible using Next.js cache directives
- Prefer static generation over server-side rendering when feasible
- Use incremental static regeneration (ISR) for dynamic content that changes infrequently
- Implement proper cache invalidation strategies

**Rationale**: Next.js App Router provides powerful caching primitives. Proper caching
reduces server load, improves response times, and enhances user experience while lowering
infrastructure costs.

### IV. Code Quality Gates

All code MUST pass automated quality checks before merge:
- **Linting**: ESLint rules enforced, no warnings allowed
- **Formatting**: Prettier formatting required (automated on commit)
- **Type Safety**: TypeScript strict mode enabled, no `any` types without justification
- **Build**: Production build must succeed without errors

Pull requests MUST NOT be merged if quality gates fail.

**Rationale**: Automated quality gates catch issues early, maintain consistency, and
reduce cognitive load during code review by focusing on logic rather than style.

### V. Incremental Delivery with Simplicity

Development MUST follow incremental delivery principles:
- Start with the simplest solution that works (YAGNI - You Aren't Gonna Need It)
- Ship features incrementally in small, testable units
- Each increment delivers user value and can be deployed independently
- Avoid premature optimization and over-engineering
- Add complexity only when requirements clearly justify it

Feature work MUST be done in feature branches with pull request reviews before merge.

**Rationale**: Incremental delivery reduces risk, enables faster feedback, and ensures
we build what users actually need. Simple solutions are easier to understand, test, and
maintain. Feature branches enable safe parallel development and code review.

## Development Workflow

### Branch Strategy

- **Main branch**: Always deployable, protected
- **Feature branches**: Named `[issue-number]-feature-name`, created from main
- **Pull requests**: Required for all changes, must pass quality gates
- **Reviews**: At least one approval required before merge

### Quality Standards

- Code reviews focus on logic, architecture, and user value (style is automated)
- Tests are strongly recommended but not strictly mandatory
- Documentation MUST be updated with code changes
- Breaking changes require migration path documentation

## Technology Stack

### Frontend

- **Framework**: Next.js (latest version with App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Panda CSS
- **Components**: Arc UI for primitives and atoms
- **React**: Latest stable version

### Backend

- **Framework**: Next.js API routes or dedicated backend (as appropriate)
- **Language**: TypeScript
- **Data**: Appropriate data layer based on feature requirements

## Governance

### Amendment Process

1. Proposed changes documented with rationale
2. Impact assessment on existing code and templates
3. Team review and approval
4. Constitution version incremented (semantic versioning)
5. Dependent templates and documentation updated

### Version Policy

- **MAJOR**: Backward-incompatible principle removals or redefinitions
- **MINOR**: New principles added or material expansions
- **PATCH**: Clarifications, wording improvements, non-semantic refinements

### Compliance Review

All pull requests MUST verify compliance with constitution principles. Deviations require
explicit justification and approval.

When complexity is introduced that appears to violate simplicity principles, the
justification MUST be documented in the pull request and/or implementation plan.

**Version**: 1.0.0 | **Ratified**: 2026-02-10 | **Last Amended**: 2026-02-10
