# Project Showcase Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. No subagents or additional worktrees, per the user's instructions.

**Goal:** Make confirmed website, mobile and platform work visually inspectable in English and Spanish.

**Architecture:** Extend the existing typed project catalog with stable slugs and optional media/contribution metadata. Generate static localized cases and reuse the catalog for gallery groups and sitemap. Preserve the current hero and progressive enhancement.

**Tech Stack:** Astro 7, TypeScript, CSS, existing GSAP/Three.js; Node test runner and Playwright for verification.

**Spec:** `docs/superpowers/specs/2026-11-02-project-showcase-design.md`

## Global Constraints

- English default; Spanish equivalent; no personal city/email/phone or portrait.
- No new dependencies, private source links, real customer records or fabricated screenshots.
- Blackstone/AISA excluded; Microtec maintenance; Dele Peso financial tools; Claris website development.
- Development/design scope and historical/current media labels must remain visible. The later application-capture update supersedes intermediary naming preferences.

## Review Focus

- Every project has a unique, working localized internal URL, even without an external URL.
- Filtering opens every relevant native disclosure, hides empty groups and keeps no-JS access.
- Language switching on cases preserves the same project; canonical/alternate/sitemap URLs agree.
- Images are local, have intrinsic dimensions and do not overflow at 320px or cause layout shifts.
- Private/historical cases never imply public app access or expose private implementation data.

## Tasks

### 1. Catalog and assets
- [x] Add `tests/project-catalog.test.mjs`; run it red for slugs, new cases, exclusions, scope and credentials.
- [x] Add typed metadata and confirmed bilingual project records; capture/optimize authentic website media and safe original brand artwork.
- [x] Run `pnpm test` green and verify media integrity.

### 2. Gallery and case routes
- [x] Extend project cards and gallery grouping within the existing design system.
- [x] Generate `/en/work/[slug]/` and `/es/work/[slug]/`; add case navigation and correct metadata.
- [x] Update filtering, sitemap and static publisher for case routes and local media.
- [x] Run `pnpm build` and browser route/filter/no-JS/locale checks.

### 3. Verification and release
- [x] Review the complete diff inline; verify desktop/tablet/mobile screenshots, image loading, reduced motion, privacy and hero behavior.
- [x] Synchronize the tracked static build; commit source/content and generated output separately.
- [x] Publish the verified change, verify GitHub Pages and recheck public routes. Do not create a PR unnecessarily.

## Execution Record

- Initial state: clean master at `7945311`; implementation branch `feature/project-showcase`.
- Ruling: reuse the current design and real project captures rather than generate speculative screenshots. Private cases use confirmed descriptions/artwork, not reconstructed production UI.
- Catalog regression tests were first observed failing, then passed (4/4). Static output checks passed (2/2); Astro diagnostics reported no errors, warnings or hints across 22 files. The pre-existing lazy Three.js chunk-size advisory remains a non-fatal build warning.
- Browser verification: Chrome at 1440x960, 768x1024, 390x844 and 320x740; all eight filters and visible counts, every gallery image, canvas visibility, hero interaction, credentials and privacy. Selected public/private/historical cases were checked in both languages, with reduced motion and no-JS navigation. All 66 case URLs returned 200. Safari and physical devices were not tested.
- Media review corrected a Nicasource loading-screen capture and replaced the broken Dele Peso tools landing with its working net-salary calculator page. Assets total approximately 1.3 MB, loaded lazily in the gallery.
- Fresh dependency audit found 21 advisories in the prior lockfile. Updated Astro to 7.3.3 and resolved Vite, Undici, Zod and fast-uri within compatible major ranges; no new direct dependencies or overrides. The new audit reports zero advisories.
- Release: `a55f36f` (showcase), `2cd26dc` (dependencies) and `6588ab7` (static snapshot), fast-forwarded to master and pushed. All 163 build files matched the root static snapshot. GitHub Pages run `41533925773` succeeded for `6588ab7`; the complete four-viewport browser suite and all 66 bilingual case URLs passed again against `https://reymundotenorio.github.io/`. GitHub reports zero open Dependabot alerts. No private repository or uncertain client engagement was published.
