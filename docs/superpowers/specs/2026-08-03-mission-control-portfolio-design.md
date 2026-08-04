# Mission Control Portfolio Design

Date: 2026-08-03
Status: Draft approved for direction

## Goal

Rebuild Reymundo Tenorio's portfolio as a bilingual EN/ES interactive editorial experience that feels premium, fast, personal, and deliberately designed. The site should not read like a generic AI-generated portfolio. It should feel like discovering a compact product/engineering world.

Recommended direction: **Juego Editorial / Mission Control**.

## Reference Read

- https://vshslv.com/?ref=a1.gallery: immersive full-screen atmosphere, minimal navigation, large photographic presence, discovery through motion.
- https://www.philipreadman.com/?ref=a1.gallery: editorial restraint, sparse copy, confident spacing, senior credibility.
- https://juanmora.co/?ref=a1.gallery: human-first hero photography, oversized type, kinetic brand energy.
- https://www.framer.com/?utm_source=dribbble&utm_medium=paid&utm_campaign=agents&utm_content=display&dub_id=fPnvtUXpDHeTe7H9: operable product UI, high polish, visual controls, clear hierarchy.
- https://dribbble.com/shots/27472617-Brand-Identity-Design-Logo-ID-Systems-We-Are-CreativeCo: bold identity motion, card choreography, brand-system polish.
- https://dribbble.com/shots/22194799-Developer-Portfolio-Website: arcade/dev energy, pixel/console mood, playful interaction.

## Core Concept

The site is a "mission control" interface for exploring Reymundo's career. The first screen should feel like a cinematic command surface, not a resume page. Visitors discover sections as mission nodes:

- `Leadership`
- `Product Engineering`
- `Career Sites`
- `Automation`
- `Frontend Systems`
- `Contact`

Each node opens a focused panel or scene with concise evidence: role, impact, tools, logos, and links. The experience can feel game-like, but the content remains senior and practical.

## Visual Direction

- Dark cinematic base, but avoid a one-note navy/slate palette.
- Use warm amber, electric cyan, off-white, signal red, and muted graphite as separate accents.
- Portrait should be a first-viewport signal, treated like an editorial/key-art asset rather than a small avatar.
- Use large custom-feeling type hierarchy, but keep body text compact and readable.
- UI should look operational: coordinates, small status labels, mission states, panels, counters, and map markers.
- Avoid generic glass cards, gradient blobs, marketing hero composition, and "AI portfolio" tropes.

## Interaction Model

Primary desktop experience:

- A full-screen hero with interactive map/canvas.
- Pointer movement subtly shifts light, depth, and node parallax.
- Mission nodes react on hover/focus with preview copy and visual pulses.
- Clicking a node opens a detailed panel without leaving the page.
- Scroll advances the story from hero to archive, selected work, timeline, and contact.
- Language switch preserves the current section/mission where possible.

Mobile experience:

- Same brand and content, but with touch-first tabs/list navigation.
- Interactive canvas becomes lighter and non-blocking.
- Mission panels open as stacked sections with deliberate transitions.

Reduced motion:

- Disable continuous camera/canvas motion.
- Keep instant reveal states and readable content.
- Preserve navigation and all content.

## Structure

1. Hero / Mission Control
   - Name: Reymundo Tenorio
   - Role: Engineering Manager + Full-stack Product Engineer
   - Short proposition: leads teams and ships product systems across React, TypeScript, Node, Firebase, and automation.
   - Photo integrated as cinematic subject.
   - Mission nodes visible in first viewport.

2. Mission Detail Layer
   - Node cards/panels for each capability.
   - Each panel has summary, proof points, relevant projects/logos, and a CTA.

3. Work Archive
   - Dense but polished project grid.
   - Career site links and logos become a curated archive, not a wall of cards.
   - Filters by category: career sites, product systems, automations, leadership.

4. Timeline
   - Current role, Nicasource, Scalar, and older highlights.
   - Use concise role blocks with outcomes and stack.

5. Contact
   - Direct CTA, LinkedIn, GitHub, email.
   - Bilingual copy.

## Content Principles

- English and Spanish should feel written natively, not translated word-by-word.
- Copy should be short, concrete, and evidence-led.
- Do not overclaim confidential product impact.
- Prioritize recognizable engineering leadership and product delivery.
- Use project logos/images as supporting evidence, not decoration.

## Technical Direction

- Keep Astro for static output and speed.
- Use framework-free Astro components where possible.
- Use GSAP for intentional timeline, scroll, and reveal choreography.
- Use Three.js only for a progressive hero/canvas layer.
- Keep canvas decorative/interactive but never required for content access.
- Prefer dynamic imports for heavy animation libraries.
- Keep bilingual routes: `/`, `/en/`, `/es/`.
- Preserve service-worker cleanup until old cached builds are fully gone.

## Performance Guardrails

- Initial HTML/CSS must show useful content before animation JS loads.
- WebGL must be lazy/progressive and fail silently.
- Mobile should avoid heavy geometry, high pixel ratios, and constant render loops when offscreen.
- Target no horizontal overflow at 390px, 768px, 1440px.
- Respect `prefers-reduced-motion`.
- Keep portrait variants optimized.

## Acceptance Criteria

- `pnpm build` passes.
- `git diff --check` passes.
- Production preview loads EN and ES routes.
- No console errors from portfolio code.
- No broken local images/assets.
- No horizontal overflow on mobile and desktop.
- First viewport clearly communicates Reymundo's identity.
- Visitor can access all content without WebGL.
- Interactive mission nodes work with mouse, keyboard focus, and touch.
- Reduced motion mode remains readable and polished.

## Risks

- Too much game styling could weaken senior/professional credibility.
- Too much cinematic styling could feel like a designer portfolio rather than engineering leadership.
- Three.js can hurt load performance if it owns the page.
- The project archive can feel noisy if every old logo/link receives equal visual weight.

## Design Recommendation

Build the hybrid. The site should feel like a premium engineering command center with playful discovery, not a literal game and not a conventional resume. The first implementation should focus on one exceptional hero interaction and a sharp mission/archive system instead of many mediocre effects.

## Self Review

- The spec defines a differentiated concept rather than only a visual restyle.
- It preserves speed and accessibility as hard requirements.
- It gives enough structure to implement without locking the design into a rigid mockup.
- The biggest open decision is visual intensity: cinematic/professional versus more arcade. Current recommendation keeps the arcade layer secondary.
