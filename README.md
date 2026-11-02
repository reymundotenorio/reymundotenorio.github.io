# Reymundo Tenorio

A bilingual Astro portfolio with a progressive Three.js hero and GSAP motion.

Website: [reymundotenorio.github.io](https://reymundotenorio.github.io/).

## Local Development

Use Node.js 22.12+ and pnpm 11.25.0 (pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm test:static
pnpm preview
```

Routes: `/` and `/en/` in English, `/es/` in Spanish. Every project has
localized static cases at `/en/work/<slug>/` and `/es/work/<slug>/`.

Profile and credential content lives in `src/data/site.ts`. Additional project
records live in `src/data/projects.ts`, client work in `src/data/client-projects.ts`,
and the complete historical career-site index lives in `src/data/career-sites.ts`.
Components are in `src/components`,
motion and interaction in `src/scripts/experience.ts`, and styling in
`src/styles/global.css` and `src/styles/projects.css`.

## Content Maintenance

Last source review: November 2, 2026. LinkedIn project listings, freelance
experience attachments, certifications, and selected GitHub repositories were
cross-checked against the original portfolio source archive.

- 33 curated projects with bilingual cases: websites first, apps/platforms
  separately, and earlier work in a native disclosure. Six websites are featured.
- 18 credentials include the October 2026 OpenClaw and Claude Code diplomas.
- Media in `public/images/projects` is optimized from supplied Isning captures,
  current public website captures (November 2026), or original brand artwork.
  Captures are labeled by source; current websites can contain later work.
- Microtec is maintenance, Dele Peso a sus Pesos is financial-tool development,
  and Claris is work through Nicasource. Column Five/Super Star are scoped
  contributions. Blackstone and AISA are excluded due to uncertain scope.
- Pouch is the former Bahia Nica Portal. Private cases use high-level descriptions
  and brand artwork, never reconstructed production screenshots or records.
- The 37 career-site brands identify historical development work through Accedo,
  not current site implementations or direct employment by those brands.
- Freelance project date ranges describe the engagement period where a more
  specific project date is not documented. Institutional and desktop projects
  show their start year, not a claim of ongoing maintenance.
- Private products have high-level descriptions only. Do not add private source
  links, internal documentation, credentials, or customer data.
- Credential URLs should point to individual diplomas, not generic course pages.
  The Udemy React Native certificate is documented in LinkedIn experience media.
- Updates are curated at build time, not automatically synchronized with LinkedIn.
- The root route always opens in English. Spanish is an explicit language choice.
- Personal city, coordinates, email, and telephone are not published as contact
  details. Contact links point to LinkedIn and GitHub.

## Publishing

GitHub Actions builds `dist/` and deploys through GitHub Pages after a push to
`master`. Pages uses GitHub Actions as the build source and publishes only the
generated `dist/` artifact, not the original portfolio's legacy static assets.

The repository also keeps a root-level static snapshot for compatibility with
its original publishing setup. Run `pnpm publish:static` after changing the
source to regenerate that snapshot and remove outdated hashed bundles.

JetBrains Mono is self-hosted under its SIL Open Font License in
`public/fonts/OFL.txt`. WebGL is decorative: content and native disclosures work
without JavaScript, and reduced motion disables continuous animation.
