# Feature Specification: Frembanen Pitch Information Pages

**Feature Branch**: `001-frembanen-pitch-pages`
**Created**: 2026-03-08
**Status**: Draft
**Input**: User description: "Build football pitch information page and schedule calendar page for Frem-31 with Next.js project setup and design tokens"

**Constitution Compliance**: This specification must align with FREM-31 Constitution principles (Component-Based Architecture, Separation of Concerns, Performance Through Caching, Code Quality Gates, Incremental Delivery with Simplicity).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Pitch Information (Priority: P1)

As a visitor to Frembanen, I want to view essential information about the football pitch so that I can understand the location, parking rules, and pitch regulations before arriving.

**Why this priority**: This is the core informational content that serves the primary purpose of the website - helping visitors find and understand how to use Frembanen. Without this page, the site has no fundamental value.

**Independent Test**: Can be fully tested by navigating to the Frembanen page and verifying all information sections (welcome message, address, parking instructions, pitch rules, and pitch map) are displayed correctly and are readable.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the Frembanen page, **When** the page loads, **Then** they see a welcome message introducing Frembanen as a training and match facility for Frem-31
2. **Given** a visitor is on the Frembanen page, **When** they scroll to the address section, **Then** they see the full address "Nordraaks vei 67, 1369 Stabekk" with an interactive map showing the location
3. **Given** a visitor is on the Frembanen page, **When** they view the parking section, **Then** they see clear parking instructions including the 100m walking distance from school parking, cycling recommendations, and prohibited parking areas
4. **Given** a visitor is on the Frembanen page, **When** they view the pitch rules section (Baneregler), **Then** they see a bulleted list of prohibited activities on the artificial turf
5. **Given** a visitor is on the Frembanen page, **When** they view the pitch map section (Banekart), **Then** they see a visual diagram showing the pitch layout with labeled zones (5er-A through 5er-D, 7er-A, 7er-B) and parent zones (Foreldresone)

---

### User Story 2 - View Pitch Schedule Calendar (Priority: P1)

As a parent, player, or coach, I want to view the pitch booking schedule so that I can see when the pitch is available or when my team's training/match is scheduled.

**Why this priority**: The schedule calendar is equally critical as the information page - it enables users to plan their visits and check availability, which is a core functional need for the facility.

**Independent Test**: Can be fully tested by navigating to the Banekalender page and verifying the embedded EasyPlay calendar loads and displays schedule information.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to the Banekalender (pitch calendar) page, **When** the page loads, **Then** they see an embedded calendar showing the pitch schedule from EasyPlay
2. **Given** the calendar is displayed, **When** the visitor views it, **Then** the calendar fills the content area appropriately (minimum 800px height) and is fully interactive
3. **Given** the embedded calendar, **When** displayed, **Then** the EasyPlay header is hidden to maintain a clean, integrated appearance

---

### User Story 3 - Navigate Between Pages (Priority: P1)

As a visitor, I want to easily navigate between the pitch information page and the schedule calendar so that I can access all relevant information without confusion.

**Why this priority**: Navigation is essential for a multi-page site to be usable. Without clear navigation, users cannot discover or access the available pages.

**Independent Test**: Can be fully tested by clicking navigation links and verifying correct page transitions.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they view the header, **Then** they see navigation links for "Frembanen", "Banekalender", and "Treningstilbud" (with Treningstilbud styled as an external/action link)
2. **Given** a visitor clicks on "Frembanen" in the navigation, **When** the navigation completes, **Then** they are taken to the pitch information page
3. **Given** a visitor clicks on "Banekalender" in the navigation, **When** the navigation completes, **Then** they are taken to the calendar page
4. **Given** a visitor is on the Frembanen page, **When** they click the "banekalenderen" link in the welcome text, **Then** they navigate to the calendar page

---

### User Story 4 - Experience Consistent Branding (Priority: P2)

As a visitor, I want the website to have consistent Frem-31 branding and colors so that I feel confident I am on the official club website.

**Why this priority**: Branding builds trust and recognition but is secondary to the core informational and functional content. The site would still be usable without perfect branding.

**Independent Test**: Can be tested by visually verifying consistent use of brand colors, logo placement, and typography across all pages.

**Acceptance Scenarios**:

1. **Given** a visitor views any page, **When** they look at the header, **Then** they see the Sportsklubb Frem-31 logo with the club crest
2. **Given** a visitor views any page, **When** they observe the color scheme, **Then** they see consistent use of the brand blue (#2854FF primary) and yellow (#FFE61A accent) colors
3. **Given** a visitor views the footer, **When** displayed, **Then** they see the club name, social media links (Facebook, Instagram), and organized footer navigation

---

### User Story 5 - Access Site on Mobile Devices (Priority: P2)

As a visitor using a mobile phone, I want the website to be readable and usable so that I can access information on the go, especially when traveling to the pitch.

**Why this priority**: Mobile accessibility is important for practical use (checking info while traveling) but the desktop experience is the primary design target initially.

**Independent Test**: Can be tested by viewing pages on mobile viewport sizes and verifying content remains readable and navigation remains accessible.

**Acceptance Scenarios**:

1. **Given** a visitor accesses the site on a mobile device, **When** the page loads, **Then** all content sections stack vertically and remain readable
2. **Given** a visitor is on mobile, **When** they view the navigation, **Then** they can access all navigation links
3. **Given** a visitor views the pitch map on mobile, **When** displayed, **Then** the map scales appropriately to remain visible

---

### Edge Cases

- What happens when the EasyPlay calendar embed fails to load? The page should still display with a graceful fallback message indicating the calendar is temporarily unavailable
- What happens when the Google Maps embed fails to load? The address text should still be visible and useful without the map
- How does the site behave with JavaScript disabled? Core content (text, images) should remain accessible; interactive elements may be limited

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a header with the Sportsklubb Frem-31 logo and main navigation links (Frembanen, Banekalender, Treningstilbud)
- **FR-002**: System MUST display a Frembanen information page with welcome text, address with map, parking instructions, pitch rules, and pitch layout diagram
- **FR-003**: System MUST display a Banekalender page with an embedded EasyPlay calendar iframe using the provided embed code with hidden header
- **FR-004**: System MUST provide navigation between pages using client-side routing for fast transitions
- **FR-005**: System MUST display a footer with club name, social media links, and footer navigation structure
- **FR-006**: System MUST use consistent design tokens for colors, typography, and spacing throughout the application
- **FR-007**: System MUST include an interactive map (Google Maps) showing the Frembanen location at "Nordraaks vei 67, 1369 Stabekk"
- **FR-008**: System MUST display the pitch layout diagram (Banekart) showing all pitch zones and parent viewing areas
- **FR-009**: The "Treningstilbud" navigation item MUST be visually distinguished as a call-to-action button
- **FR-010**: System MUST render appropriately on both desktop and mobile viewport sizes

### Key Entities

- **Page**: Represents a page in the site (Frembanen, Banekalender); contains sections and metadata
- **Navigation Item**: A link in the header/footer navigation; contains label, destination, and optional styling variant (standard link vs. action button)
- **Content Section**: A block of content on a page (welcome text, address info, parking info, rules, map); contains heading, body content, and optional media
- **Design Token**: A named value for colors, typography, or spacing used consistently across the application

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can find the pitch address within 5 seconds of landing on the Frembanen page
- **SC-002**: Visitors can view the pitch schedule within 2 clicks from any page
- **SC-003**: All pages load and display primary content within 3 seconds on standard broadband connection
- **SC-004**: 100% of navigation links correctly route to their intended destinations
- **SC-005**: The site displays correctly on viewports from 320px (mobile) to 1920px (desktop) width
- **SC-006**: All brand colors used match the defined design tokens within exact hex values
- **SC-007**: The embedded calendar displays and is interactive without requiring page reload

## Assumptions

- The EasyPlay calendar embed will remain available and the embed URL will not change without notice
- Google Maps embed is acceptable for the location map (standard approach)
- The pitch layout diagram will be provided as a static image or SVG asset
- Norwegian language content is acceptable (no internationalization required initially)
- The "Treningstilbud" link points to an external resource (not built as part of this feature)
- Standard web fonts or system fonts will be used initially (custom fonts can be added later)

## Design Token Reference

Based on the provided design system, the following tokens are established:

### Blue (Primary Brand)
- blue-50: #F4FCFF
- blue-100: #C8DEFF
- blue-200: #9DBFFF
- blue-300: #729EFF
- blue-400: #487AFF
- blue-500: #2854FF (Primary)
- blue-600: #1836E3
- blue-700: #0F08C8
- blue-800: #0C00A0
- blue-900: #06006D
- blue-950: #02003E

### Yellow (Accent)
- yellow-50: #FFFDF0
- yellow-100: #FFFBD6
- yellow-200: #FFF7B3
- yellow-300: #FFF180
- yellow-400: #FFED57
- yellow-500: #FFE61A (Primary Accent)
- yellow-600: #E6CD00
- yellow-700: #B39F00
- yellow-800: #807200
- yellow-900: #4D4400
- yellow-950: #292600

### Grey (Neutral)
- grey-50: #FAFAFA
- grey-100: #F5F5F5
- grey-200: #E8E8E8
- grey-300: #D6D6D6
- grey-400: #ABABAB
- grey-500: #757575
- grey-600: #575757
- grey-700: #424242
- grey-800: #2B2B2B
- grey-900: #1A1A1A
- grey-950: #000000
