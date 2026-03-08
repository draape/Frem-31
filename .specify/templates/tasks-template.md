---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are strongly recommended per FREM-31 Constitution but not strictly mandatory.

**Constitution Compliance**: All tasks must align with constitution principles including component-based architecture, separation of concerns, caching strategies, code quality gates, and incremental delivery.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

FREM-31 uses Next.js App Router structure:
- **App routes**: `app/[feature]/page.tsx`, `app/[feature]/layout.tsx`
- **API routes**: `app/api/[endpoint]/route.ts`
- **Components**: `components/ui/`, `components/[feature]/`, `components/shared/`
- **Business logic**: `lib/services/`, `lib/utils/`, `lib/types/`
- **Styles**: `styles/panda.config.ts`, Panda CSS in components
- **Tests**: `tests/e2e/`, `tests/integration/`, `tests/unit/`

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Next.js App Router project structure per implementation plan
- [ ] T002 Initialize TypeScript with strict mode and Next.js dependencies
- [ ] T003 [P] Configure ESLint, Prettier, and pre-commit hooks
- [ ] T004 [P] Install and configure Panda CSS and Arc UI

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Configure Panda CSS and Arc UI integration
- [ ] T005 [P] Setup base layout structure (app/layout.tsx) with caching
- [ ] T006 [P] Configure TypeScript strict mode and ESLint rules
- [ ] T007 [P] Setup base API route patterns (app/api/) with error handling
- [ ] T008 Create shared types and utilities (lib/types/, lib/utils/)
- [ ] T009 Configure environment variables and validation
- [ ] T010 [P] Setup testing framework (Vitest/Jest, Playwright)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] E2E test for [user journey] in tests/e2e/[name].spec.ts
- [ ] T012 [P] [US1] Integration test for [feature] in tests/integration/[name].test.ts

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create [Component1] UI component in components/[feature]/[component1].tsx with Panda CSS
- [ ] T014 [P] [US1] Create [Component2] UI component in components/[feature]/[component2].tsx with Arc UI
- [ ] T015 [US1] Implement [Service] business logic in lib/services/[service].ts
- [ ] T016 [US1] Create page component with caching in app/[feature]/page.tsx
- [ ] T017 [US1] Add API route handler in app/api/[endpoint]/route.ts
- [ ] T018 [US1] Add TypeScript types in lib/types/[feature].ts
- [ ] T019 [US1] Configure component-level caching and revalidation

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T020 [P] [US2] E2E test for [user journey] in tests/e2e/[name].spec.ts
- [ ] T021 [P] [US2] Integration test for [feature] in tests/integration/[name].test.ts

### Implementation for User Story 2

- [ ] T022 [P] [US2] Create [Component] UI with Panda CSS in components/[feature]/[component].tsx
- [ ] T023 [US2] Implement [Service] in lib/services/[service].ts
- [ ] T024 [US2] Create page with caching in app/[feature]/page.tsx
- [ ] T025 [US2] Add API route in app/api/[endpoint]/route.ts
- [ ] T026 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T027 [P] [US3] E2E test for [user journey] in tests/e2e/[name].spec.ts
- [ ] T028 [P] [US3] Integration test for [feature] in tests/integration/[name].test.ts

### Implementation for User Story 3

- [ ] T029 [P] [US3] Create [Component] with Arc UI in components/[feature]/[component].tsx
- [ ] T030 [US3] Implement [Service] in lib/services/[service].ts
- [ ] T031 [US3] Create page with static generation in app/[feature]/page.tsx
- [ ] T032 [US3] Add API route in app/api/[endpoint]/route.ts

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring (maintain simplicity)
- [ ] TXXX Verify caching strategies and optimize cache hit rates
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Run production build and verify all quality gates pass
- [ ] TXXX Verify component reusability and extract shared patterns
- [ ] TXXX Run quickstart.md validation
- [ ] TXXX Constitution compliance review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- UI components within a story marked [P] can run in parallel
- API routes and services can be developed in parallel if they don't share state
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "E2E test for [user journey] in tests/e2e/[name].spec.ts"
Task: "Integration test for [feature] in tests/integration/[name].test.ts"

# Launch all UI components for User Story 1 together:
Task: "Create [Component1] UI with Panda CSS in components/[feature]/[component1].tsx"
Task: "Create [Component2] UI with Arc UI in components/[feature]/[component2].tsx"

# Parallel work on business logic and types:
Task: "Implement [Service] in lib/services/[service].ts"
Task: "Add TypeScript types in lib/types/[feature].ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
