# Mission Control Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio into a bilingual EN/ES "Mission Control" editorial game-like experience that is fast, cinematic, personal, and credible for engineering leadership.

**Architecture:** Keep Astro as the static page shell and split the page into focused components for hero mission control, mission panels, work archive, timeline, and contact. Use data-driven localized content, CSS design tokens, GSAP for choreography, and a progressive Three.js canvas that enhances the hero without owning core content.

**Tech Stack:** Astro static output, TypeScript, CSS, GSAP + ScrollTrigger, Three.js, optimized local images, Playwright/browser verification.

## Global Constraints

- Keep Astro for static output and speed.
- Use framework-free Astro components where possible.
- Use GSAP for intentional timeline, scroll, and reveal choreography.
- Use Three.js only for a progressive hero/canvas layer.
- Keep canvas decorative/interactive but never required for content access.
- Prefer dynamic imports for heavy animation libraries.
- Keep bilingual routes: `/`, `/en/`, `/es/`.
- Preserve service-worker cleanup until old cached builds are fully gone.
- Initial HTML/CSS must show useful content before animation JS loads.
- WebGL must be lazy/progressive and fail silently.
- Mobile should avoid heavy geometry, high pixel ratios, and constant render loops when offscreen.
- Target no horizontal overflow at 390px, 768px, 1440px.
- Respect `prefers-reduced-motion`.
- Keep portrait variants optimized.

---

## File Structure

- Create: `docs/superpowers/concepts/mission-control-design-inventory.md`
  - Records accepted concept image paths, section inventory, colors, typography, components, and fidelity rules.
- Modify: `src/data/site.ts`
  - Owns localized portfolio content, mission definitions, archive items, timeline items, and shared metadata.
- Replace: `src/components/PortfolioPage.astro`
  - Page composition only: passes localized data into focused sections and mounts the experience script.
- Create: `src/components/MissionControl.astro`
  - First viewport: cinematic portrait, mission nodes, navigation chrome, language switch, and contact action.
- Create: `src/components/MissionPanel.astro`
  - Reusable detail layer for one active mission.
- Create: `src/components/WorkArchive.astro`
  - Curated project archive with filters and logos.
- Create: `src/components/ExperienceTimeline.astro`
  - Compact career timeline.
- Create: `src/components/ContactDock.astro`
  - Final contact section and compact fixed/inline call-to-action.
- Replace: `src/styles/global.css`
  - Design tokens, layout system, responsive rules, typography, reduced motion, and interaction states.
- Replace: `src/scripts/experience.ts`
  - Client-side mission state, GSAP reveals, filter behavior, language-aware hash handling, and progressive Three.js hero canvas.
- Keep: `src/pages/index.astro`, `src/pages/en.astro`, `src/pages/es.astro`
  - Route wrappers only.
- Keep: `src/layouts/BaseLayout.astro`
  - SEO shell, localized metadata, asset preload, and script include.
- Keep: `public/service-worker.js`, `service-worker.js`
  - Self-unregister cleanup.

---

### Task 1: Visual Concept Gate

**Files:**
- Create: `docs/superpowers/concepts/mission-control-design-inventory.md`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-08-03-mission-control-portfolio-design.md`
- Produces: Accepted concept references and design tokens used by every later task:
  - `heroConceptPath: string`
  - `missionPanelConceptPath: string`
  - `archiveConceptPath: string`
  - `mobileConceptPath: string`
  - `tokens: { background: string; surface: string; text: string; muted: string; amber: string; cyan: string; red: string; graphite: string }`

- [ ] **Step 1: Read the approved design spec**

Run:

```bash
sed -n '1,240p' docs/superpowers/specs/2026-08-03-mission-control-portfolio-design.md
```

Expected: The output includes the "Juego Editorial / Mission Control" recommendation, interaction model, and acceptance criteria.

- [ ] **Step 2: Generate four section-specific concepts with ImageGen**

Use the `imagegen` skill before calling ImageGen. Generate coordinated concepts for:

```text
1. Desktop first viewport / Mission Control hero at 1440x1000
2. Desktop active mission detail layer at 1440x1000
3. Work archive + timeline continuation at 1440x1000
4. Mobile first viewport at 390x844
```

Use this exact creative brief:

```text
Create a premium bilingual EN/ES personal portfolio concept for Reymundo Tenorio, an Engineering Manager and full-stack product engineer. Direction: "Mission Control / Juego Editorial". It must feel like an elegant playable interface, not a resume template.

Visual references:
- immersive cinematic portrait atmosphere like vshslv.com
- sparse senior editorial restraint like philipreadman.com
- human-first large photography and kinetic typography like juanmora.co
- precise operable UI controls like framer.com
- subtle arcade/dev discovery energy from a developer portfolio shot

Use Reymundo's professional portrait as the key art source. Design dark cinematic base with warm amber, electric cyan, off-white, signal red, and muted graphite. Avoid generic glass cards, AI portfolio tropes, gradient blobs, beige/cream palettes, and default card grids.

Required first viewport content:
- Reymundo Tenorio
- Engineering Manager + Full-stack Product Engineer
- Mission nodes: Leadership, Product Engineering, Career Sites, Automation, Frontend Systems, Contact
- EN/ES language control
- Contact CTA

The UI should feel code-native and implementable: real HTML text, buttons, panels, nav, mission nodes, map markers, status labels, hover/focus states, and clear responsive structure. Keep copy concise. No hero eyebrow or decorative badge above the name.
```

Expected: Four concept images exist with readable text, stable layout, and coherent shared design system.

- [ ] **Step 3: Inspect each concept**

Use `view_image` on each generated path:

```text
hero concept
mission panel concept
archive concept
mobile concept
```

Expected: Concepts are readable and implementable. If any concept is blurry, generic, cropped, or visually inconsistent, regenerate that concept before moving on.

- [ ] **Step 4: Ask Reymundo for visual approval**

Send the four concept images and ask for approval or edits. Stop execution until Reymundo approves the visual concept.

Expected: Reymundo approves one concept set or gives concrete visual edits.

- [ ] **Step 5: Write the design inventory**

After approval, create `docs/superpowers/concepts/mission-control-design-inventory.md` with this structure:

```markdown
# Mission Control Design Inventory

Date: 2026-08-03
Status: Approved visual source

## Concept Images

- Hero: [absolute generated image path]
- Mission panel: [absolute generated image path]
- Archive and timeline: [absolute generated image path]
- Mobile hero: [absolute generated image path]

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
- Hero name: clamp-free responsive CSS using fixed breakpoints, not viewport-width font scaling.
- Chrome labels: 11px to 13px with explicit line-height.

## Component Families

- Mission node buttons
- Mission detail panels
- Work archive rows
- Logo evidence strip
- Timeline rail
- Contact dock
- Language toggle

## Fidelity Rules

- Portrait remains a first-viewport signal.
- No hero eyebrow above the name.
- Canvas is enhancement only.
- All text remains code-native.
- Mobile uses touch-first mission list.
```

Expected: The file records the approved concept paths and enough implementation inventory to compare browser screenshots later.

- [ ] **Step 6: Verify inventory file**

Run:

```bash
rg -n "Hero:|Mission panel:|Archive and timeline:|Mobile hero:|No hero eyebrow" docs/superpowers/concepts/mission-control-design-inventory.md
git diff --check
```

Expected: `rg` finds all listed anchors and `git diff --check` exits 0.

- [ ] **Step 7: Commit visual design inventory**

Run:

```bash
git add docs/superpowers/concepts/mission-control-design-inventory.md
git commit -m "docs: approve mission control visual direction"
```

Expected: A commit is created with only the design inventory doc staged.

---

### Task 2: Localized Content Model

**Files:**
- Modify: `src/data/site.ts`

**Interfaces:**
- Consumes:
  - `Lang` from current `src/data/site.ts`
  - existing `siteMeta`, `logoArchive`, `stack`, and `content`
- Produces:
  - `type MissionId = 'leadership' | 'product' | 'career-sites' | 'automation' | 'frontend' | 'contact'`
  - `missions: Record<Lang, Mission[]>`
  - `archiveFilters: Record<Lang, ArchiveFilter[]>`
  - `archiveItems: ArchiveItem[]`
  - `timelineItems: Record<Lang, TimelineItem[]>`

- [ ] **Step 1: Replace the data model**

Edit `src/data/site.ts` so the top-level types include:

```ts
export type Lang = 'en' | 'es';
export type MissionId = 'leadership' | 'product' | 'career-sites' | 'automation' | 'frontend' | 'contact';
export type ArchiveFilterId = 'all' | 'career-sites' | 'product-systems' | 'automation' | 'web';

export interface Mission {
  id: MissionId;
  label: string;
  title: string;
  summary: string;
  proof: string[];
  stack: string[];
  stat: string;
}

export interface ArchiveFilter {
  id: ArchiveFilterId;
  label: string;
}

export interface ArchiveItem {
  name: string;
  category: Exclude<ArchiveFilterId, 'all'>;
  image?: string;
  url?: string;
  year: string;
  summary: {
    en: string;
    es: string;
  };
}

export interface TimelineItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  signal: string;
}
```

Expected: These exported types are available to Astro components.

- [ ] **Step 2: Add localized hero and mission copy**

Add `content.en.hero` and `content.es.hero` in this shape:

```ts
hero: {
  name: 'Reymundo Tenorio',
  role: 'Engineering Manager + Full-stack Product Engineer',
  summary:
    'I lead teams and ship product systems across React, TypeScript, Node, Firebase, and automation.',
  primaryCta: 'Open missions',
  secondaryCta: 'Contact',
  status: 'Available for selected product engineering and leadership conversations',
}
```

Spanish equivalent:

```ts
hero: {
  name: 'Reymundo Tenorio',
  role: 'Engineering Manager + Ingeniero full-stack de producto',
  summary:
    'Lidero equipos y construyo sistemas de producto con React, TypeScript, Node, Firebase y automatizacion.',
  primaryCta: 'Abrir misiones',
  secondaryCta: 'Contacto',
  status: 'Disponible para conversaciones selectas de producto, ingenieria y liderazgo',
}
```

Expected: EN and ES have native-feeling copy and the same data keys.

- [ ] **Step 3: Add mission arrays**

Add six missions per locale using the same `MissionId` values:

```ts
export const missions: Record<Lang, Mission[]> = {
  en: [
    {
      id: 'leadership',
      label: 'M-01',
      title: 'Leadership',
      summary: 'Mentoring engineers, clarifying delivery, and keeping teams close to production reality.',
      proof: ['Engineering Manager at Nicasource', 'Team lead and mentoring responsibilities', 'Delivery systems and review habits'],
      stack: ['Planning', 'Mentoring', 'Delivery'],
      stat: '2021 - present',
    },
    {
      id: 'product',
      label: 'M-02',
      title: 'Product Engineering',
      summary: 'Building data-rich software with a practical full-stack mindset.',
      proof: ['Scalar product engineering', 'React and TypeScript workflows', 'Backend and integration work'],
      stack: ['React', 'TypeScript', 'Node'],
      stat: 'Full-stack',
    },
    {
      id: 'career-sites',
      label: 'M-03',
      title: 'Career Sites',
      summary: 'A broad archive of branded hiring sites and responsive web builds.',
      proof: ['CareerBuilder Careers', 'Royal Caribbean', 'KeyBank', 'Securitas Canada'],
      stack: ['HTML', 'Sass', 'WordPress'],
      stat: '30+ builds',
    },
    {
      id: 'automation',
      label: 'M-04',
      title: 'Automation',
      summary: 'Workflow tools, scripts, APIs, and AI-enabled systems that remove manual drag.',
      proof: ['OpenAI API workflows', 'Node and Python tooling', 'Internal process automation'],
      stack: ['Node', 'Python', 'OpenAI API'],
      stat: 'Systems',
    },
    {
      id: 'frontend',
      label: 'M-05',
      title: 'Frontend Systems',
      summary: 'Interfaces that stay usable under real product constraints.',
      proof: ['React UI systems', 'Responsive product screens', 'Design-to-code execution'],
      stack: ['React', 'CSS', 'UX'],
      stat: 'UI craft',
    },
    {
      id: 'contact',
      label: 'M-06',
      title: 'Contact',
      summary: 'The shortest route to start a serious technical conversation.',
      proof: ['Email', 'LinkedIn', 'GitHub'],
      stack: ['EN', 'ES', 'Remote'],
      stat: 'Open',
    },
  ],
  es: [
    {
      id: 'leadership',
      label: 'M-01',
      title: 'Liderazgo',
      summary: 'Mentoria, claridad de entrega y decisiones tecnicas conectadas con produccion.',
      proof: ['Engineering Manager en Nicasource', 'Responsabilidades de team lead y mentoring', 'Sistemas de delivery y habitos de review'],
      stack: ['Planificacion', 'Mentoria', 'Delivery'],
      stat: '2021 - presente',
    },
    {
      id: 'product',
      label: 'M-02',
      title: 'Ingenieria de producto',
      summary: 'Construccion de software data-rich con criterio full-stack practico.',
      proof: ['Product engineering en Scalar', 'Flujos con React y TypeScript', 'Backend e integraciones'],
      stack: ['React', 'TypeScript', 'Node'],
      stat: 'Full-stack',
    },
    {
      id: 'career-sites',
      label: 'M-03',
      title: 'Career sites',
      summary: 'Archivo amplio de sitios de reclutamiento, marcas y experiencias responsive.',
      proof: ['CareerBuilder Careers', 'Royal Caribbean', 'KeyBank', 'Securitas Canada'],
      stack: ['HTML', 'Sass', 'WordPress'],
      stat: '30+ builds',
    },
    {
      id: 'automation',
      label: 'M-04',
      title: 'Automatizacion',
      summary: 'Herramientas, scripts, APIs y sistemas con AI que reducen trabajo manual.',
      proof: ['Workflows con OpenAI API', 'Tooling con Node y Python', 'Automatizacion de procesos internos'],
      stack: ['Node', 'Python', 'OpenAI API'],
      stat: 'Sistemas',
    },
    {
      id: 'frontend',
      label: 'M-05',
      title: 'Sistemas frontend',
      summary: 'Interfaces que se mantienen usables bajo restricciones reales de producto.',
      proof: ['Sistemas UI en React', 'Pantallas responsive de producto', 'Ejecucion de diseno a codigo'],
      stack: ['React', 'CSS', 'UX'],
      stat: 'UI craft',
    },
    {
      id: 'contact',
      label: 'M-06',
      title: 'Contacto',
      summary: 'La ruta mas corta para iniciar una conversacion tecnica seria.',
      proof: ['Email', 'LinkedIn', 'GitHub'],
      stack: ['EN', 'ES', 'Remote'],
      stat: 'Abierto',
    },
  ],
};
```

Expected: IDs match the `MissionId` union exactly.

- [ ] **Step 4: Add archive filters and items**

Create `archiveFilters` and reshape `logoArchive` into `archiveItems` while preserving the strongest existing logos and URLs. Include at least these items:

```ts
export const archiveFilters: Record<Lang, ArchiveFilter[]> = {
  en: [
    { id: 'all', label: 'All' },
    { id: 'career-sites', label: 'Career sites' },
    { id: 'product-systems', label: 'Product systems' },
    { id: 'automation', label: 'Automation' },
    { id: 'web', label: 'Web' },
  ],
  es: [
    { id: 'all', label: 'Todo' },
    { id: 'career-sites', label: 'Career sites' },
    { id: 'product-systems', label: 'Sistemas de producto' },
    { id: 'automation', label: 'Automatizacion' },
    { id: 'web', label: 'Web' },
  ],
};
```

Expected: Each archive item exposes localized `summary.en` and `summary.es`.

- [ ] **Step 5: Run build as content validation**

Run:

```bash
pnpm build
```

Expected: Build passes or fails only on imports that will be updated in Task 3.

- [ ] **Step 6: Commit localized content**

Run:

```bash
git add src/data/site.ts
git commit -m "feat: add mission control content model"
```

Expected: A commit contains only `src/data/site.ts`.

---

### Task 3: Astro Component Rebuild

**Files:**
- Replace: `src/components/PortfolioPage.astro`
- Create: `src/components/MissionControl.astro`
- Create: `src/components/MissionPanel.astro`
- Create: `src/components/WorkArchive.astro`
- Create: `src/components/ExperienceTimeline.astro`
- Create: `src/components/ContactDock.astro`

**Interfaces:**
- Consumes:
  - `content[lang]`
  - `missions[lang]`
  - `archiveFilters[lang]`
  - `archiveItems`
  - `timelineItems[lang]`
  - `siteMeta`
- Produces DOM contracts used by `src/scripts/experience.ts`:
  - `[data-experience-root]`
  - `[data-mission-node]` with `data-mission-id`
  - `[data-mission-panel]` with `data-mission-id`
  - `[data-archive-filter]` with `data-filter`
  - `[data-archive-item]` with `data-category`
  - `canvas[data-hero-canvas]`

- [ ] **Step 1: Create `MissionControl.astro`**

Use this component shape:

```astro
---
import type { Lang, Mission } from '../data/site';
import { siteMeta } from '../data/site';

interface Props {
  lang: Lang;
  hero: {
    name: string;
    role: string;
    summary: string;
    primaryCta: string;
    secondaryCta: string;
    status: string;
  };
  missions: Mission[];
}

const { lang, hero, missions } = Astro.props;
const alternateHref = lang === 'en' ? '/es/' : '/en/';
const alternateLabel = lang === 'en' ? 'ES' : 'EN';
---

<section class="mission-control" aria-labelledby="hero-title">
  <canvas class="mission-control__canvas" data-hero-canvas aria-hidden="true"></canvas>
  <header class="mission-control__nav" aria-label="Primary">
    <a class="mission-control__brand" href={lang === 'en' ? '/en/' : '/es/'}>RT</a>
    <nav class="mission-control__links" aria-label="Mission shortcuts">
      {missions.slice(0, 5).map((mission) => (
        <a href={`#${mission.id}`}>{mission.title}</a>
      ))}
    </nav>
    <a class="mission-control__lang" href={alternateHref}>{alternateLabel}</a>
  </header>
  <div class="mission-control__media">
    <img
      src={siteMeta.portrait}
      srcset={siteMeta.portraitSrcSet}
      sizes="(max-width: 760px) 90vw, 52vw"
      alt="Reymundo Tenorio"
      loading="eager"
      decoding="async"
    />
  </div>
  <div class="mission-control__copy">
    <p class="mission-control__status">{hero.status}</p>
    <h1 id="hero-title">{hero.name}</h1>
    <p class="mission-control__role">{hero.role}</p>
    <p class="mission-control__summary">{hero.summary}</p>
    <div class="mission-control__actions">
      <a href="#missions" class="button button--primary">{hero.primaryCta}</a>
      <a href="#contact" class="button button--ghost">{hero.secondaryCta}</a>
    </div>
  </div>
  <div class="mission-control__nodes" id="missions" aria-label="Mission map">
    {missions.map((mission) => (
      <button
        class="mission-node"
        type="button"
        data-mission-node
        data-mission-id={mission.id}
        aria-controls={`panel-${mission.id}`}
        aria-expanded={mission.id === 'leadership' ? 'true' : 'false'}
      >
        <span>{mission.label}</span>
        <strong>{mission.title}</strong>
        <small>{mission.stat}</small>
      </button>
    ))}
  </div>
</section>
```

Expected: The component has one H1 and every mission button has a matching `data-mission-id`.

- [ ] **Step 2: Create `MissionPanel.astro`**

Use this component shape:

```astro
---
import type { Mission } from '../data/site';

interface Props {
  mission: Mission;
  active?: boolean;
}

const { mission, active = false } = Astro.props;
---

<article
  class:list={['mission-panel', active && 'is-active']}
  id={`panel-${mission.id}`}
  data-mission-panel
  data-mission-id={mission.id}
>
  <div class="mission-panel__meta">
    <span>{mission.label}</span>
    <span>{mission.stat}</span>
  </div>
  <h2>{mission.title}</h2>
  <p>{mission.summary}</p>
  <ul class="mission-panel__proof">
    {mission.proof.map((item) => <li>{item}</li>)}
  </ul>
  <div class="mission-panel__stack">
    {mission.stack.map((item) => <span>{item}</span>)}
  </div>
</article>
```

Expected: Panels are readable without JavaScript and the first panel is active in static HTML.

- [ ] **Step 3: Create archive and timeline components**

Use `WorkArchive.astro` for filters and items:

```astro
---
import type { ArchiveFilter, ArchiveItem, Lang } from '../data/site';

interface Props {
  lang: Lang;
  filters: ArchiveFilter[];
  items: ArchiveItem[];
  title: string;
  intro: string;
}

const { lang, filters, items, title, intro } = Astro.props;
---

<section class="work-archive" id="work" aria-labelledby="work-title">
  <div class="section-heading">
    <span>Archive</span>
    <h2 id="work-title">{title}</h2>
    <p>{intro}</p>
  </div>
  <div class="archive-filters" aria-label="Work filters">
    {filters.map((filter) => (
      <button type="button" data-archive-filter data-filter={filter.id} class:list={[filter.id === 'all' && 'is-active']}>
        {filter.label}
      </button>
    ))}
  </div>
  <div class="archive-grid">
    {items.map((item) => (
      <a
        class="archive-item"
        href={item.url ?? '#contact'}
        data-archive-item
        data-category={item.category}
        target={item.url ? '_blank' : undefined}
        rel={item.url ? 'noreferrer' : undefined}
      >
        {item.image && <img src={`/images/logos/${item.image}`} alt="" loading="lazy" />}
        <span>{item.year}</span>
        <strong>{item.name}</strong>
        <p>{item.summary[lang]}</p>
      </a>
    ))}
  </div>
</section>
```

Expected: Filter buttons and item categories use matching IDs.

- [ ] **Step 4: Replace `PortfolioPage.astro` composition**

Use the new focused components:

```astro
---
import type { Lang } from '../data/site';
import { archiveFilters, archiveItems, content, missions, timelineItems } from '../data/site';
import MissionControl from './MissionControl.astro';
import MissionPanel from './MissionPanel.astro';
import WorkArchive from './WorkArchive.astro';
import ExperienceTimeline from './ExperienceTimeline.astro';
import ContactDock from './ContactDock.astro';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const page = content[lang];
---

<main class="portfolio" data-experience-root data-lang={lang}>
  <MissionControl lang={lang} hero={page.hero} missions={missions[lang]} />
  <section class="mission-panels" aria-label="Mission details">
    {missions[lang].map((mission, index) => <MissionPanel mission={mission} active={index === 0} />)}
  </section>
  <WorkArchive lang={lang} filters={archiveFilters[lang]} items={archiveItems} title={page.work.title} intro={page.work.intro} />
  <ExperienceTimeline items={timelineItems[lang]} title={page.experience.title} intro={page.experience.intro} />
  <ContactDock lang={lang} contact={page.contact} />
</main>
<script type="module" src="/src/scripts/experience.ts"></script>
```

Expected: The route pages keep working through the same `PortfolioPage` interface.

- [ ] **Step 5: Run component build**

Run:

```bash
pnpm build
```

Expected: Build passes. If it fails, errors point to missing imports or data properties introduced in Tasks 2 and 3; fix those exact references.

- [ ] **Step 6: Commit component rebuild**

Run:

```bash
git add src/components src/data/site.ts
git commit -m "feat: rebuild portfolio mission interface"
```

Expected: A commit contains component changes and any data shape adjustments needed by the components.

---

### Task 4: Visual System CSS

**Files:**
- Replace: `src/styles/global.css`

**Interfaces:**
- Consumes DOM classes from Task 3.
- Produces responsive, accessible visual system for:
  - `.mission-control`
  - `.mission-node`
  - `.mission-panel`
  - `.work-archive`
  - `.archive-item`
  - `.experience-timeline`
  - `.contact-dock`

- [ ] **Step 1: Define tokens and base reset**

Start `src/styles/global.css` with:

```css
:root {
  color-scheme: dark;
  --color-bg: #050505;
  --color-surface: #111214;
  --color-surface-strong: #1a1b1f;
  --color-text: #f5f1e8;
  --color-muted: #9a9891;
  --color-amber: #ffb35c;
  --color-cyan: #5bdcff;
  --color-red: #ff4d55;
  --color-graphite: #25282b;
  --color-line: rgba(245, 241, 232, 0.16);
  --shadow-soft: 0 24px 80px rgba(0, 0, 0, 0.36);
  --radius-sm: 6px;
  --radius-md: 8px;
  --space-page: clamp(20px, 4vw, 64px);
  --font-body: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display: "Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--color-bg);
  letter-spacing: 0;
}

img,
svg,
canvas {
  display: block;
  max-width: 100%;
}

button,
a {
  color: inherit;
}

button {
  font: inherit;
}
```

Expected: Typography, colors, and box sizing are explicit.

- [ ] **Step 2: Build first viewport layout**

Add CSS for `.mission-control` with stable desktop and mobile structure:

```css
.mission-control {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  isolation: isolate;
  padding: 18px var(--space-page) 36px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background:
    radial-gradient(circle at 72% 70%, rgba(255, 179, 92, 0.28), transparent 31%),
    radial-gradient(circle at 24% 42%, rgba(91, 220, 255, 0.18), transparent 36%),
    linear-gradient(135deg, #050505 0%, #0a0b0d 54%, #17130f 100%);
}

.mission-control__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  opacity: 0.66;
}

.mission-control__nav {
  display: grid;
  grid-template-columns: 72px 1fr 56px;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
}

.mission-control__copy h1 {
  margin: 0;
  max-width: 840px;
  font-family: var(--font-display);
  font-size: 92px;
  line-height: 0.86;
  font-weight: 800;
  letter-spacing: 0;
}

@media (max-width: 760px) {
  .mission-control {
    min-height: 100svh;
    padding: 14px 18px 28px;
    grid-template-rows: auto minmax(260px, 38svh) auto auto;
  }

  .mission-control__copy h1 {
    font-size: 54px;
    line-height: 0.9;
  }
}
```

Expected: No viewport-width font sizing and no horizontal overflow at 390px.

- [ ] **Step 3: Style mission nodes and panels**

Add stable button/panel styles:

```css
.mission-node {
  min-height: 88px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm);
  padding: 12px;
  display: grid;
  gap: 8px;
  text-align: left;
  background: rgba(17, 18, 20, 0.54);
  backdrop-filter: blur(14px);
  cursor: pointer;
  transition: border-color 180ms ease, transform 180ms ease, background 180ms ease;
}

.mission-node:hover,
.mission-node:focus-visible,
.mission-node.is-active {
  border-color: var(--color-cyan);
  background: rgba(91, 220, 255, 0.1);
  transform: translateY(-2px);
  outline: none;
}

.mission-panel {
  display: none;
  border-top: 1px solid var(--color-line);
  padding: 40px var(--space-page);
}

.mission-panel.is-active {
  display: grid;
  gap: 18px;
}
```

Expected: First panel is visible without JavaScript and active states are visually clear.

- [ ] **Step 4: Style archive, timeline, and contact**

Add section layout rules:

```css
.work-archive,
.experience-timeline,
.contact-dock {
  padding: 88px var(--space-page);
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
}

.archive-item {
  grid-column: span 4;
  min-height: 220px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  padding: 18px;
  display: grid;
  align-content: space-between;
  text-decoration: none;
  background: var(--color-surface);
}

@media (max-width: 900px) {
  .archive-item {
    grid-column: span 6;
  }
}

@media (max-width: 620px) {
  .archive-grid {
    grid-template-columns: 1fr;
  }

  .archive-item {
    grid-column: auto;
  }
}
```

Expected: Archive remains a curated grid on desktop and a clean list on mobile.

- [ ] **Step 5: Add reduced-motion rules**

Add:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }

  .mission-control__canvas {
    display: none;
  }
}
```

Expected: Content remains visible and readable when motion is reduced.

- [ ] **Step 6: Run build and visual spot check**

Run:

```bash
pnpm build
pnpm exec astro preview --host 127.0.0.1 --port 4323
```

Expected: Preview opens on port 4323. Capture a desktop and mobile screenshot for comparison in Task 6.

- [ ] **Step 7: Commit visual system**

Run:

```bash
git add src/styles/global.css
git commit -m "feat: style mission control portfolio"
```

Expected: A commit contains only CSS changes unless Task 3 needed tiny class corrections.

---

### Task 5: Motion and Interaction Layer

**Files:**
- Replace: `src/scripts/experience.ts`

**Interfaces:**
- Consumes DOM contracts from Task 3:
  - `[data-experience-root]`
  - `[data-mission-node]`
  - `[data-mission-panel]`
  - `[data-archive-filter]`
  - `[data-archive-item]`
  - `[data-hero-canvas]`
- Produces:
  - Active mission switching
  - Archive filtering
  - GSAP reveal choreography
  - Progressive Three.js canvas with cleanup

- [ ] **Step 1: Write DOM query helpers and motion preference gate**

Use this structure:

```ts
type MissionId = 'leadership' | 'product' | 'career-sites' | 'automation' | 'frontend' | 'contact';
type Cleanup = () => void;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function getRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-experience-root]');
}

function queryAll<T extends Element>(root: ParentNode, selector: string): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}
```

Expected: The script can be imported without throwing when DOM nodes are missing.

- [ ] **Step 2: Implement mission switching**

Add:

```ts
function setActiveMission(root: HTMLElement, id: MissionId): void {
  const nodes = queryAll<HTMLButtonElement>(root, '[data-mission-node]');
  const panels = queryAll<HTMLElement>(root, '[data-mission-panel]');

  for (const node of nodes) {
    const isActive = node.dataset.missionId === id;
    node.classList.toggle('is-active', isActive);
    node.setAttribute('aria-expanded', String(isActive));
  }

  for (const panel of panels) {
    panel.classList.toggle('is-active', panel.dataset.missionId === id);
  }
}

function initMissionControls(root: HTMLElement): Cleanup {
  const nodes = queryAll<HTMLButtonElement>(root, '[data-mission-node]');
  const handlers = nodes.map((node) => {
    const handler = () => setActiveMission(root, node.dataset.missionId as MissionId);
    node.addEventListener('click', handler);
    node.addEventListener('focus', handler);
    return () => {
      node.removeEventListener('click', handler);
      node.removeEventListener('focus', handler);
    };
  });

  return () => handlers.forEach((cleanup) => cleanup());
}
```

Expected: Mouse click and keyboard focus both reveal the matching panel.

- [ ] **Step 3: Implement archive filters**

Add:

```ts
function initArchiveFilters(root: HTMLElement): Cleanup {
  const filters = queryAll<HTMLButtonElement>(root, '[data-archive-filter]');
  const items = queryAll<HTMLElement>(root, '[data-archive-item]');

  const handlers = filters.map((filter) => {
    const handler = () => {
      const activeFilter = filter.dataset.filter ?? 'all';
      for (const button of filters) {
        button.classList.toggle('is-active', button === filter);
      }
      for (const item of items) {
        const visible = activeFilter === 'all' || item.dataset.category === activeFilter;
        item.hidden = !visible;
      }
    };

    filter.addEventListener('click', handler);
    return () => filter.removeEventListener('click', handler);
  });

  return () => handlers.forEach((cleanup) => cleanup());
}
```

Expected: Each filter hides only non-matching archive items and `All` restores the full archive.

- [ ] **Step 4: Implement GSAP reveals**

Use dynamic imports:

```ts
async function initScrollMotion(root: HTMLElement): Promise<Cleanup> {
  if (prefersReducedMotion.matches) {
    root.classList.add('is-reduced-motion');
    return () => undefined;
  }

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {
    gsap.from('[data-mission-node]', {
      autoAlpha: 0,
      y: 18,
      stagger: 0.045,
      duration: 0.7,
      ease: 'power3.out',
    });

    gsap.utils.toArray<HTMLElement>('.work-archive, .experience-timeline, .contact-dock').forEach((section) => {
      gsap.from(section, {
        autoAlpha: 0,
        y: 42,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
        },
      });
    });
  }, root);

  return () => context.revert();
}
```

Expected: Animations are imported after page load and skip under reduced motion.

- [ ] **Step 5: Implement progressive Three.js canvas**

Use dynamic imports and clamp pixel ratio:

```ts
async function initHeroCanvas(root: HTMLElement): Promise<Cleanup> {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  if (!canvas || prefersReducedMotion.matches) {
    return () => undefined;
  }

  const THREE = await import('three');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 8;

  const group = new THREE.Group();
  scene.add(group);

  const material = new THREE.MeshBasicMaterial({
    color: 0x5bdcff,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });

  for (let index = 0; index < 18; index += 1) {
    const geometry = new THREE.IcosahedronGeometry(0.34 + (index % 3) * 0.12, 1);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((index % 6) - 2.5, Math.floor(index / 6) - 1, -index * 0.12);
    group.add(mesh);
  }

  let frame = 0;

  function resize(): void {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  }

  function animate(time: number): void {
    group.rotation.y = time * 0.00008;
    group.rotation.x = Math.sin(time * 0.0002) * 0.08;
    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  frame = window.requestAnimationFrame(animate);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    material.dispose();
    group.children.forEach((child) => {
      if ('geometry' in child && child.geometry instanceof THREE.BufferGeometry) {
        child.geometry.dispose();
      }
    });
  };
}
```

Expected: Canvas renders a subtle mission mesh, resizes with the viewport, and disposes resources.

- [ ] **Step 6: Wire all initializers**

End the file with:

```ts
async function init(): Promise<void> {
  const root = getRoot();
  if (!root) {
    return;
  }

  const cleanups: Cleanup[] = [
    initMissionControls(root),
    initArchiveFilters(root),
  ];

  const asyncCleanups = await Promise.all([
    initScrollMotion(root),
    initHeroCanvas(root),
  ]);

  cleanups.push(...asyncCleanups);

  window.addEventListener('pagehide', () => {
    cleanups.forEach((cleanup) => cleanup());
  }, { once: true });
}

void init();
```

Expected: Initialization is resilient and no global errors occur if pieces are missing.

- [ ] **Step 7: Run build**

Run:

```bash
pnpm build
```

Expected: Build passes. Vite may warn about Three.js chunk size; that warning is acceptable because Three.js is dynamically imported.

- [ ] **Step 8: Commit motion layer**

Run:

```bash
git add src/scripts/experience.ts
git commit -m "feat: add mission control interactions"
```

Expected: A commit contains only the experience script unless CSS hooks required small matching changes.

---

### Task 6: Browser Fidelity, Accessibility, and Static Publish

**Files:**
- Modify: `index.html`
- Modify: `_astro/*`
- Modify: `en/index.html`
- Modify: `es/index.html`
- Modify: `images/portraits/*` only if build output changes these files
- Modify: `service-worker.js` only if build output changes it

**Interfaces:**
- Consumes:
  - Approved concept paths from `docs/superpowers/concepts/mission-control-design-inventory.md`
  - Built Astro output in `dist/`
- Produces:
  - Root GitHub Pages static files synchronized with the verified build
  - Browser verification evidence

- [ ] **Step 1: Build production output**

Run:

```bash
pnpm build
```

Expected: Build exits 0.

- [ ] **Step 2: Start production preview**

Run:

```bash
pnpm exec astro preview --host 127.0.0.1 --port 4323
```

Expected: Preview serves at `http://127.0.0.1:4323/`.

- [ ] **Step 3: Verify core routes**

Use Browser/IAB first. If Browser/IAB is unavailable or unreliable, use Playwright. Check:

```text
http://127.0.0.1:4323/
http://127.0.0.1:4323/en/
http://127.0.0.1:4323/es/
```

Expected: All routes load, language switching works, and the first viewport clearly shows Reymundo's identity.

- [ ] **Step 4: Verify interactions**

Click or focus each mission node:

```text
Leadership
Product Engineering
Career Sites
Automation
Frontend Systems
Contact
```

Expected: The active node and matching panel update together. Archive filters show and hide items correctly. Contact links use the real email, LinkedIn, and GitHub URLs.

- [ ] **Step 5: Verify responsive and reduced motion**

Check these viewport sizes:

```text
390x844
768x1024
1440x1000
```

Also emulate `prefers-reduced-motion: reduce`.

Expected: No horizontal overflow, no text clipping, no overlapping UI, canvas disabled or visually inert under reduced motion, content remains available.

- [ ] **Step 6: Capture and inspect screenshots**

Capture latest implementation screenshots:

```text
desktop first viewport
desktop active mission panel
desktop archive/timeline
mobile first viewport
```

Use `view_image` on:

```text
approved hero concept image
approved mission panel concept image
approved archive concept image
approved mobile concept image
latest matching implementation screenshots
```

Expected: Direct visual comparison supports agency-signoff fidelity.

- [ ] **Step 7: Write a fidelity ledger**

Create or update `docs/superpowers/concepts/mission-control-design-inventory.md` with:

```markdown
## Fidelity Ledger

- Copy: matched approved visible copy; no extra hero eyebrow or badge.
- Layout: first viewport keeps portrait, mission nodes, nav, and contact CTA in the approved hierarchy.
- Typography: display, body, chrome labels, and controls use explicit sizes and line heights.
- Palette: dark base, amber, cyan, signal red, off-white, and graphite match the approved direction.
- Interaction: mission nodes, archive filters, language switch, and contact path work by mouse and keyboard.
- Responsive: checked 390x844, 768x1024, and 1440x1000 with no horizontal overflow.
- Reduced motion: continuous motion disabled and content remains readable.
- Assets: portrait and logo assets load without broken images.
```

Expected: The ledger records at least eight concrete verification points.

- [ ] **Step 8: Publish built files to repo root**

Run these commands from the repo root:

```bash
cp dist/index.html index.html
cp -R dist/_astro .
cp -R dist/en .
cp -R dist/es .
cp -R dist/images .
cp dist/service-worker.js service-worker.js
```

Expected: Root static files match the verified production build.

- [ ] **Step 9: Run final static checks**

Run:

```bash
pnpm build
git diff --check
git status -sb
```

Expected: Build exits 0, whitespace check exits 0, and `git status -sb` shows only intended source, docs, and root static publish changes.

- [ ] **Step 10: Commit verified redesign**

Run:

```bash
git add src docs/superpowers/concepts index.html _astro en es images service-worker.js
git commit -m "feat: launch mission control portfolio"
```

Expected: Final implementation commit includes source, visual inventory updates, and published static output.

---

## Self-Review

### Spec Coverage

- Bilingual EN/ES routes are covered by Tasks 2, 3, and 6.
- Astro static speed is covered by Tasks 3 and 6.
- GSAP motion is covered by Task 5.
- Three.js progressive canvas is covered by Task 5.
- Game-like discovery is covered by Tasks 1, 3, 4, and 5.
- Professional/editorial credibility is covered by Tasks 1, 2, and 4.
- Mobile and reduced motion are covered by Tasks 4 and 6.
- Root GitHub Pages publish is covered by Task 6.

### Placeholder Scan

- No unresolved placeholder markers.
- No deferred-work markers.
- No vague completion instructions.
- No shortcuts that depend on a previous task for missing details.
- Code-facing steps include concrete snippets or exact commands.

### Type Consistency

- `MissionId` values match `data-mission-id` and panel IDs.
- `ArchiveFilterId` values match `data-filter` and `data-category`.
- `Lang` remains `en | es` across pages, components, and data.
- `content[lang].hero`, `content[lang].work`, `content[lang].experience`, and `content[lang].contact` are the component-facing keys.
