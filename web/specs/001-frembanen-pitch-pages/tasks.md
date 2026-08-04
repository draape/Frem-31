# Tasks: Frembanen Pitch Information Pages

**Input**: Design documents from `/specs/001-frembanen-pitch-pages/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: E2E tests with Playwright are included as the spec mentions testing requirements.

**Constitution Compliance**: All tasks must align with constitution principles including component-based architecture, separation of concerns, caching strategies, code quality gates, and incremental delivery.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

FREM-31 uses Next.js App Router structure:
- **App routes**: `app/page.tsx`, `app/banekalender/page.tsx`
- **Components**: `components/ui/`, `components/layout/`, `components/frembanen/`, `components/calendar/`
- **Constants**: `lib/constants/navigation.ts`, `lib/constants/frembanen.ts`, `lib/constants/calendar.ts`
- **Types**: `lib/types/index.ts`, `lib/types/navigation.ts`, `lib/types/content.ts`
- **Styles**: `panda.config.ts`
- **Tests**: `tests/e2e/`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create Next.js project with Panda CSS and Arc UI, configure tooling

- [x] T001 Create Next.js 14+ App Router project with TypeScript strict mode in repository root
- [x] T002 Remove Tailwind CSS and install Panda CSS with `pnpm add -D @pandacss/dev && pnpm panda init --postcss`
- [x] T003 [P] Install Arc UI with `pnpm add @ark-ui/react`
- [x] T004 [P] Install Playwright for E2E testing with `pnpm add -D @playwright/test`
- [x] T005 [P] Configure ESLint rules in `.eslintrc.json` with Next.js and TypeScript strict settings
- [x] T006 [P] Configure Prettier in `.prettierrc` with consistent formatting rules
- [x] T007 Configure Panda CSS with FREM-31 design tokens (blue, yellow, grey palettes) in `panda.config.ts`
- [x] T008 Update `app/globals.css` with Panda CSS layer imports
- [x] T009 Add npm scripts for dev, build, lint, and test in `package.json`
- [x] T010 Generate Panda CSS with `pnpm panda codegen` and verify `styled-system/` output

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared types, constants, and base layout structure that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T011 Create TypeScript types for navigation in `lib/types/navigation.ts`
- [x] T012 [P] Create TypeScript types for content sections in `lib/types/content.ts`
- [x] T013 [P] Create type barrel export in `lib/types/index.ts`
- [x] T014 Create navigation configuration constant in `lib/constants/navigation.ts`
- [x] T015 [P] Create Frembanen page content constant in `lib/constants/frembanen.ts`
- [x] T016 [P] Create calendar page content constant in `lib/constants/calendar.ts`
- [x] T017 Create base root layout structure in `app/layout.tsx` with metadata and body wrapper
- [x] T018 Add placeholder logo SVG in `public/images/logo.svg`
- [x] T019 [P] Add placeholder pitch map image in `public/images/pitch-map.svg`
- [x] T020 Initialize Playwright config in `playwright.config.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 3 - Navigate Between Pages (Priority: P1) - Navigation Components

**Goal**: Create header, footer, and navigation components that enable movement between pages

**Independent Test**: Click navigation links and verify correct page transitions occur

**Why first**: Navigation components (Header, Footer) are needed by all pages before they can be built

### Implementation for User Story 3

- [x] T021 [P] [US3] Create Link component wrapping Arc UI link in `components/ui/Link.tsx`
- [x] T022 [P] [US3] Create Button component wrapping Arc UI button in `components/ui/Button.tsx`
- [x] T023 [US3] Create Navigation component with header links in `components/layout/Navigation.tsx`
- [x] T024 [US3] Create Header component with logo and Navigation in `components/layout/Header.tsx`
- [x] T025 [US3] Create Footer component with social links and navigation groups in `components/layout/Footer.tsx`
- [x] T026 [US3] Integrate Header and Footer into root layout in `app/layout.tsx`
- [x] T027 [US3] Style navigation links with active state using Panda CSS in `components/layout/Navigation.tsx`
- [x] T028 [US3] Style Treningstilbud as CTA button (yellow accent) in `components/layout/Navigation.tsx`

**Checkpoint**: Navigation works - can click between pages (pages may be empty placeholders)

---

## Phase 4: User Story 1 - View Pitch Information (Priority: P1) - Frembanen Page

**Goal**: Display all Frembanen pitch information (welcome, address, parking, rules, pitch map)

**Independent Test**: Navigate to Frembanen page and verify all 5 content sections display correctly

### Implementation for User Story 1

- [x] T029 [P] [US1] Create WelcomeSection component with intro text in `components/frembanen/WelcomeSection.tsx`
- [x] T030 [P] [US1] Create AddressSection component with Google Maps iframe embed in `components/frembanen/AddressSection.tsx`
- [x] T031 [P] [US1] Create ParkingSection component with rules list in `components/frembanen/ParkingSection.tsx`
- [x] T032 [P] [US1] Create RulesSection component with prohibited activities list in `components/frembanen/RulesSection.tsx`
- [x] T033 [P] [US1] Create PitchMap component displaying pitch diagram in `components/frembanen/PitchMap.tsx`
- [x] T034 [US1] Create index barrel export for frembanen components in `components/frembanen/index.ts`
- [x] T035 [US1] Implement Frembanen home page composing all sections in `app/page.tsx`
- [x] T036 [US1] Add yellow hero background styling to welcome section per design
- [x] T037 [US1] Add card styling for address/parking/rules container per design
- [x] T038 [US1] Ensure Google Maps embed has loading="lazy" and proper sizing

**Checkpoint**: Frembanen page fully functional with all content visible

---

## Phase 5: User Story 2 - View Pitch Schedule Calendar (Priority: P1) - Calendar Page

**Goal**: Display EasyPlay calendar embed on Banekalender page

**Independent Test**: Navigate to Banekalender page and verify calendar iframe loads and is interactive

### Implementation for User Story 2

- [x] T039 [P] [US2] Create CalendarEmbed component with iframe wrapper in `components/calendar/CalendarEmbed.tsx`
- [x] T040 [US2] Add fallback UI for when calendar fails to load in `components/calendar/CalendarEmbed.tsx`
- [x] T041 [US2] Create index barrel export for calendar components in `components/calendar/index.ts`
- [x] T042 [US2] Implement Banekalender page with CalendarEmbed in `app/banekalender/page.tsx`
- [x] T043 [US2] Add page title/heading above calendar embed
- [x] T044 [US2] Style calendar container with proper min-height (800px) and full width

**Checkpoint**: Banekalender page shows working EasyPlay calendar

---

## Phase 6: User Story 4 - Experience Consistent Branding (Priority: P2)

**Goal**: Ensure consistent use of brand colors, logo, and typography across all pages

**Independent Test**: Visually verify brand blue (#2854FF) and yellow (#FFE61A) used consistently

### Implementation for User Story 4

- [x] T045 [P] [US4] Update logo SVG with actual Frem-31 club crest in `public/images/logo.svg`
- [x] T046 [P] [US4] Add Facebook and Instagram icon SVGs in `public/images/icons/`
- [x] T047 [US4] Apply semantic color tokens consistently across all components
- [x] T048 [US4] Verify header logo displays at correct size with alt text
- [x] T049 [US4] Style footer with club name, social links with hover states
- [x] T050 [US4] Add footer navigation groups per design mockup

**Checkpoint**: Consistent branding across all pages

---

## Phase 7: User Story 5 - Access Site on Mobile Devices (Priority: P2)

**Goal**: Ensure site is responsive and usable on mobile devices (320px-1920px)

**Independent Test**: View pages at 320px, 768px, and 1920px widths - content readable and navigation accessible

### Implementation for User Story 5

- [x] T051 [P] [US5] Add responsive container max-width and padding in root layout
- [x] T052 [P] [US5] Make navigation links stack or wrap on small screens in `components/layout/Navigation.tsx`
- [x] T053 [US5] Ensure content sections stack vertically on mobile in `app/page.tsx`
- [x] T054 [US5] Make Google Maps embed responsive with aspect-ratio in `components/frembanen/AddressSection.tsx`
- [x] T055 [US5] Make pitch map image scale appropriately on mobile in `components/frembanen/PitchMap.tsx`
- [x] T056 [US5] Make calendar embed responsive with proper overflow handling in `components/calendar/CalendarEmbed.tsx`
- [x] T057 [US5] Test and fix any text overflow issues at 320px width

**Checkpoint**: Site works well on mobile devices

---

## Phase 8: E2E Tests

**Purpose**: Verify all user stories work correctly with automated tests

- [x] T058 [P] Create navigation E2E test verifying all links work in `tests/e2e/navigation.spec.ts`
- [x] T059 [P] Create Frembanen page E2E test verifying content sections in `tests/e2e/frembanen.spec.ts`
- [x] T060 [P] Create Banekalender page E2E test verifying calendar loads in `tests/e2e/banekalender.spec.ts`
- [x] T061 Run all E2E tests with `pnpm test` and fix any failures

**Checkpoint**: All E2E tests pass

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, optimization, and validation

- [x] T062 Run production build with `pnpm build` and verify no errors
- [x] T063 [P] Run ESLint with `pnpm lint` and fix any warnings
- [x] T064 [P] Format all code with Prettier
- [x] T065 Verify static generation works (check `.next/` output)
- [x] T066 Test all pages in Chrome, Firefox, Safari (if available)
- [x] T067 Verify page load time <3s on simulated slow connection
- [x] T068 Constitution compliance review - verify all principles met
- [x] T069 Update README with project setup instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 - BLOCKS all user stories
- **US3 Navigation (Phase 3)**: Depends on Phase 2 - Should be done first as Header/Footer needed by pages
- **US1 Frembanen (Phase 4)**: Depends on Phase 2 and Phase 3 (needs navigation in layout)
- **US2 Calendar (Phase 5)**: Depends on Phase 2 and Phase 3 (needs navigation in layout)
- **US4 Branding (Phase 6)**: Depends on Phase 3, 4, 5 (applies to existing components)
- **US5 Mobile (Phase 7)**: Depends on Phase 3, 4, 5 (makes existing components responsive)
- **E2E Tests (Phase 8)**: Depends on Phase 4 and 5 (tests actual pages)
- **Polish (Phase 9)**: Depends on all previous phases

### User Story Dependencies

- **User Story 3 (Navigation)**: Must complete first - provides Header/Footer for all pages
- **User Story 1 (Frembanen)**: Depends on US3 - Can run parallel with US2 after US3
- **User Story 2 (Calendar)**: Depends on US3 - Can run parallel with US1 after US3
- **User Story 4 (Branding)**: Depends on US1, US2, US3 - Enhancement layer
- **User Story 5 (Mobile)**: Depends on US1, US2, US3 - Responsive layer

### Parallel Opportunities

**Within Phase 1 (Setup)**:
```
T003, T004, T005, T006 can run in parallel
```

**Within Phase 2 (Foundational)**:
```
T012, T013 can run in parallel after T011
T015, T016 can run in parallel after T014
T018, T019 can run in parallel
```

**Within Phase 3 (Navigation)**:
```
T021, T022 can run in parallel (both UI primitives)
```

**Within Phase 4 (Frembanen)**:
```
T029, T030, T031, T032, T033 can ALL run in parallel (separate components)
```

**Within Phase 5 (Calendar)**:
```
T039 standalone, then sequential
```

**Within Phase 8 (E2E Tests)**:
```
T058, T059, T060 can ALL run in parallel (separate test files)
```

---

## Parallel Example: Frembanen Page Components

```bash
# Launch all Frembanen section components in parallel:
Task: "Create WelcomeSection component in components/frembanen/WelcomeSection.tsx"
Task: "Create AddressSection component in components/frembanen/AddressSection.tsx"
Task: "Create ParkingSection component in components/frembanen/ParkingSection.tsx"
Task: "Create RulesSection component in components/frembanen/RulesSection.tsx"
Task: "Create PitchMap component in components/frembanen/PitchMap.tsx"

# Then compose them in the page:
Task: "Implement Frembanen home page composing all sections in app/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1-3 Only)

1. Complete Phase 1: Setup (T001-T010)
2. Complete Phase 2: Foundational (T011-T020)
3. Complete Phase 3: Navigation (T021-T028)
4. Complete Phase 4: Frembanen (T029-T038)
5. Complete Phase 5: Calendar (T039-T044)
6. **STOP and VALIDATE**: Both pages work, navigation works
7. Deploy/demo - core functionality complete

### Full Delivery

1. MVP (Phases 1-5)
2. Add Phase 6: Branding polish
3. Add Phase 7: Mobile responsiveness
4. Add Phase 8: E2E tests
5. Add Phase 9: Final polish

### Parallel Team Strategy

With 2 developers after Phase 3 (Navigation) completes:
- Developer A: User Story 1 (Frembanen page)
- Developer B: User Story 2 (Calendar page)

Then together: Branding, Mobile, Tests, Polish

---

## Summary

| Phase | Tasks | Story | Parallel Tasks |
|-------|-------|-------|----------------|
| 1. Setup | T001-T010 (10) | - | 4 |
| 2. Foundational | T011-T020 (10) | - | 6 |
| 3. Navigation | T021-T028 (8) | US3 | 2 |
| 4. Frembanen | T029-T038 (10) | US1 | 5 |
| 5. Calendar | T039-T044 (6) | US2 | 1 |
| 6. Branding | T045-T050 (6) | US4 | 2 |
| 7. Mobile | T051-T057 (7) | US5 | 2 |
| 8. E2E Tests | T058-T061 (4) | - | 3 |
| 9. Polish | T062-T069 (8) | - | 2 |
| **Total** | **69 tasks** | **5 stories** | **27 parallel** |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story checkpoint = independently testable increment
- MVP = Phases 1-5 (44 tasks for core functionality)
- Commit after each task or logical group
- Run `pnpm build` frequently to catch issues early
