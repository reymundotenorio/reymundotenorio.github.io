# Mission Control Design Inventory

Date: 2026-08-03
Status: Approved visual source

## Concept Images

- Hero: /Users/Reymundo/.codex/generated_images/019fca79-df95-7102-ba51-eac2a65b15e1/call_mAhYqeZQTZQLcycFJdhPqdrh.png
- Mission panel: /Users/Reymundo/.codex/generated_images/019fca79-df95-7102-ba51-eac2a65b15e1/call_NXX065custhuPjwmv4wBboNJ.png
- Archive and timeline: /Users/Reymundo/.codex/generated_images/019fca79-df95-7102-ba51-eac2a65b15e1/call_oRwRKboQsobgmfaa3TmqC5ll.png
- Mobile hero: /Users/Reymundo/.codex/generated_images/019fca79-df95-7102-ba51-eac2a65b15e1/call_tDvykXdb11cUtGanBJTnGbHg.png

## Color Tokens

- Background: #050505
- Surface: #111214
- Text: #f5f1e8
- Muted text: #9a9891
- Amber: #ffb35c
- Cyan: #5bdcff
- Signal red: #ff4d55
- Graphite: #25282b

## Typography

- Display: condensed grotesk fallback stack, uppercase optional only for chrome labels.
- Body: readable sans fallback stack.
- Letter spacing: 0.
- Hero name: breakpoint-controlled responsive CSS, not viewport-width font scaling.
- Chrome labels: 11px to 13px with explicit line-height.

## Component Families

- Mission node buttons
- Mission detail panels
- Work archive rows
- Logo evidence strip
- Timeline rail
- Contact dock
- Language toggle
- AI autocomplete prompt
- Mission console
- Abstract mesh canvas

## Fidelity Rules

- No visible photo, portrait, avatar, silhouette, or face for now.
- Identity comes from name typography, autocomplete cursor, command console, and interactive mission mesh.
- No hero eyebrow above the name.
- Canvas is enhancement only.
- All text remains code-native.
- Mobile uses touch-first mission list.
- Autocomplete suggests capability context, but it must not imply live AI generation.
- Motion must respect reduced-motion settings.

## QA Evidence

- 2026-08-04: `pnpm build` passes for `/`, `/en/`, and `/es/`.
- 2026-08-04: Preview routes verified with HTTP 200 at `http://127.0.0.1:4324/`, `/en/`, and `/es/`.
- 2026-08-04: Chrome headless screenshots reviewed for desktop 1440x1000 and mobile 390x844; hero remains no-image, mission mesh is visible, and mobile contact navigation is icon-only.
