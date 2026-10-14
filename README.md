# Reymundo Tenorio

A bilingual Astro portfolio with a progressive Three.js hero and GSAP motion.

Website: [reymundotenorio.github.io](https://reymundotenorio.github.io/).

## Local Development

Use Node.js 22.12+ and pnpm 11.25.0 (pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm preview
```

Routes: `/` and `/en/` in English, `/es/` in Spanish.

Profile and credential content lives in `src/data/site.ts`. Additional project
records live in `src/data/projects.ts`, and the complete historical career-site
index lives in `src/data/career-sites.ts`. Components are in `src/components`,
motion and interaction in `src/scripts/experience.ts`, and styling in
`src/styles/global.css`.

## Content Maintenance

Last source review: October 14, 2026. LinkedIn project listings, freelance
experience attachments, certifications, and selected GitHub repositories were
cross-checked against the original portfolio source archive.

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
