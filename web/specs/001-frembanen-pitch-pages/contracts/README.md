# API Contracts: Frembanen Pitch Information Pages

**Feature**: 001-frembanen-pitch-pages
**Date**: 2026-03-08

## Overview

This feature is a **static website** with no backend API endpoints. All content is hardcoded at build time and served as static HTML/CSS/JS.

## External Integrations

### 1. Google Maps Embed

**Type**: iframe embed (no API contract)
**URL Pattern**: `https://www.google.com/maps/embed?pb=...`
**Authentication**: None required for basic embed

### 2. EasyPlay Calendar

**Type**: iframe embed (no API contract)
**URL**: `https://www.easyplay.no/clubs/frem31?stadium=Frembanen_kunstgress&hideHeader=true`
**Authentication**: None required (public calendar)

## Routes

| Route | Method | Description | Type |
|-------|--------|-------------|------|
| `/` | GET | Frembanen information page | Static |
| `/banekalender` | GET | Calendar page | Static |

## Future Considerations

If the site evolves to include dynamic features (e.g., contact form, booking), API contracts would be defined here using OpenAPI 3.0 specification format.

Example future endpoints (not in current scope):
- `POST /api/contact` - Contact form submission
- `GET /api/events` - Dynamic event listing

## Content Security Policy

For iframe embeds, the following CSP directives are recommended:

```
frame-src https://www.google.com https://www.easyplay.no;
```
