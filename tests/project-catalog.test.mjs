import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { archiveItems, archiveFilters, profileSignals } from '../src/data/site.ts';
import { projectMediaLabel } from '../src/lib/project-media.ts';
import { withProjectVisuals } from '../src/data/project-visuals.ts';

test('every project has a unique stable case URL', () => {
  assert.equal(archiveItems.length, 32);
  assert.equal(new Set(archiveItems.map((item) => item.slug)).size, archiveItems.length);
  for (const item of archiveItems) assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
});

test('confirmed work is included without uncertain client attribution', () => {
  const slugs = archiveItems.map((item) => item.slug);
  for (const slug of ['enerwize', 'nicasource', 'claris-health', 'studio-ivl', 'pouch', 'microtec', 'myroadmap', 'agency-platform']) {
    assert(slugs.includes(slug), slug);
  }
  assert(!JSON.stringify(archiveItems).match(/blackstone|aisa.?mill/i));
  assert.match(archiveItems.find((item) => item.slug === 'microtec').role.en, /maintenance/i);
  assert.match(archiveItems.find((item) => item.slug === 'claris-health').role.en, /Website development/);
  assert.match(archiveItems.find((item) => item.slug === 'pouch').summary.en, /Portal/);
  assert.match(archiveItems.find((item) => item.slug === 'dele-peso-tools').role.en, /Financial tools/);
});

test('private freelance clients are anonymous and logo-only media is omitted', () => {
  const pouch = archiveItems.find((item) => item.slug === 'pouch');
  for (const lang of ['en', 'es']) assert.match(pouch.source[lang], /Freelance/);
  assert.equal(pouch.status, 'private');
  assert.equal(pouch.url, undefined);
  assert(!/lighthouse|bah[ií]a.?nica/i.test(JSON.stringify(archiveItems)));
  assert(!archiveItems.some((item) => item.preview?.type === 'artwork'));
});

test('Portal and logistics operations form one Pouch case without losing application scope', () => {
  assert(!archiveItems.some((item) => ['lighthouse', 'logistics-operations'].includes(item.slug)));
  const pouch = archiveItems.find((item) => item.slug === 'pouch');
  assert.match(pouch.details.en.join(' '), /agency/i);
  assert.match(pouch.details.en.join(' '), /load calculation/i);
  assert.match(pouch.details.en.join(' '), /import\/export/i);
  assert.match(pouch.details.es.join(' '), /agencias/i);
  assert.match(pouch.details.es.join(' '), /carga/i);
});

test('IVL describes the from-scratch mobile implementation without a logo placeholder', () => {
  const ivl = archiveItems.find((item) => item.slug === 'studio-ivl');
  assert.match(ivl.summary.en, /from scratch/);
  assert.match(ivl.summary.es, /desde cero/);
  assert.equal(ivl.preview.type, 'store');
  assert(ivl.gallery.every((media) => media.type === 'store'));
});

test('application captures keep their media types and concise demo disclosure', () => {
  const pouch = archiveItems.find((item) => item.slug === 'pouch');
  const ivl = archiveItems.find((item) => item.slug === 'studio-ivl');
  assert.equal(pouch.preview.type, 'demo');
  assert.equal(pouch.gallery.length, 1);
  assert.match(pouch.credit.en, /example data/i);
  assert.match(pouch.credit.es, /datos de ejemplo/i);
  assert.equal(ivl.preview.type, 'store');
  assert.equal(ivl.gallery.length, 2);
  for (const item of [pouch, ivl]) for (const media of [item.preview, ...item.gallery]) {
    assert(existsSync(new URL(`../public${media.src}`, import.meta.url)), media.src);
    assert(media.alt.en && media.alt.es && media.caption.en && media.caption.es);
  }
});

test('DuePulse uses real public product screens while its application stays private', () => {
  const duepulse = archiveItems.find((item) => item.slug === 'duepulse');
  assert.equal(duepulse.status, 'private');
  assert.equal(duepulse.url, undefined);
  assert.equal(duepulse.preview.type, 'current');
  assert.equal(duepulse.preview.src, '/images/projects/duepulse-home.webp');
  assert.equal(duepulse.gallery.length, 1);
  assert.equal(duepulse.gallery[0].type, 'current');
  assert.equal(duepulse.gallery[0].src, '/images/projects/duepulse-product.webp');
  assert(!/https?:\/\//.test(JSON.stringify(duepulse)));
  for (const media of [duepulse.preview, ...duepulse.gallery]) {
    assert(existsSync(new URL(`../public${media.src}`, import.meta.url)), media.src);
    for (const lang of ['en', 'es']) assert(media.alt[lang] && media.caption[lang]);
  }
});

test('media labels describe the project or screen instead of the capture process', () => {
  const ivl = archiveItems.find((item) => item.slug === 'studio-ivl');
  assert.equal(projectMediaLabel(ivl.preview, 'en'), 'Mobile app');
  assert.equal(projectMediaLabel(ivl.preview, 'es'), 'App móvil');
  assert.equal(projectMediaLabel(ivl.preview, 'en', true), 'On-demand classes');
  assert.equal(projectMediaLabel(ivl.preview, 'es', true), 'Clases on-demand');
  for (const item of archiveItems) for (const lang of ['en', 'es']) {
    for (const media of [item.preview, ...(item.gallery ?? [])].filter(Boolean)) {
      assert(!/promotional|rendered locally|original frontend|anonymized branding|synthetic|promocional|renderizado localmente|frontend original|marca anonimizada/i.test(projectMediaLabel(media, lang, true)), item.slug);
    }
    assert(!/promotional|watermarks|source code remains|rendered locally|renderizadas localmente|marca del cliente anonimizada/i.test(item.credit?.[lang] ?? ''), item.slug);
  }
});

test('every case has a local visual and generated covers cannot pass as screenshots', () => {
  assert.equal(archiveItems.filter((item) => item.preview).length, 32);
  for (const item of archiveItems) {
    assert.match(item.preview.src, /^\/images\/projects\/[a-z0-9-]+\.webp$/, item.slug);
    assert(existsSync(new URL(`../public${item.preview.src}`, import.meta.url)), item.slug);
    if (item.preview.type === 'concept') {
      assert.equal(projectMediaLabel(item.preview, 'en'), 'Concept');
      assert.equal(projectMediaLabel(item.preview, 'es'), 'Concepto');
      assert.equal(projectMediaLabel({ ...item.preview, caption: { en: 'Dashboard', es: 'Panel' } }, 'en', true), 'Concept illustration');
      assert.equal(projectMediaLabel(item.preview, 'es', true), 'Ilustración conceptual');
    }
  }
  for (const slug of ['asher-asher', 'willow-creek', 'steps-veterinary']) assert.equal(archiveItems.find((item) => item.slug === slug).preview.type, 'restored');
  assert.equal(archiveItems.find((item) => item.slug === 'depsaber').preview.type, 'demo');
});

test('an explicit authentic capture takes priority over a fallback concept cover', () => {
  const item = { ...archiveItems.find((project) => project.slug === 'agency-platform'), preview: archiveItems.find((project) => project.slug === 'nicasource').preview };
  const [result] = withProjectVisuals([item]);
  assert.equal(result, item);
  assert.equal(result.preview.type, 'current');
});

test('recoverable historical websites show source-restored screens, not logo substitutes', () => {
  for (const slug of ['nicaragua-tattoos', 'career-site-collection']) {
    const item = archiveItems.find((project) => project.slug === slug);
    assert.equal(item.preview?.type, 'restored', slug);
    for (const media of [item.preview, ...(item.gallery ?? [])]) {
      assert(existsSync(new URL(`../public${media.src}`, import.meta.url)), media.src);
      assert(media.caption.en && media.caption.es);
      assert.match(projectMediaLabel(media, 'en'), /historical/i);
    }
  }
});

test('project presentation omits intermediaries without claiming original design', () => {
  assert(!/isning/i.test(JSON.stringify(archiveItems)));
  for (const slug of ['ariel-law', 'hartunian-law', 'caban-pools', 'fit-factory', 'sapetto-law']) {
    const item = archiveItems.find((item) => item.slug === slug);
    assert.match(item.source.en, /Freelance/);
    assert.match(item.credit.en, /design supplied/i);
  }
  for (const item of archiveItems.filter((item) => item.slug !== 'nicasource')) {
    assert(!/Nicasource/.test(JSON.stringify(item)), item.slug);
  }
});

test('website selections have authentic local media and conservative links', () => {
  const websites = archiveItems.filter((item) => item.kind === 'website' && item.featured);
  assert.equal(websites.length, 6);
  for (const item of archiveItems) {
    if (item.preview) {
      assert(item.preview.width > 0 && item.preview.height > 0);
      assert(item.preview.alt.en && item.preview.alt.es);
      assert(existsSync(new URL(`../public${item.preview.src}`, import.meta.url)), item.preview.src);
    }
    if (item.status === 'private') assert.equal(item.url, undefined, item.name);
    assert(item.details.en.length > 0 && item.details.es.length > 0);
  }
  assert.equal(archiveItems.find((item) => item.slug === 'myroadmap').url, undefined);
});

test('new credentials and mobile filter are available in both languages', () => {
  for (const lang of ['en', 'es']) {
    assert(archiveFilters[lang].some((filter) => filter.id === 'mobile'));
    const signals = JSON.stringify(profileSignals[lang]);
    assert.match(signals, /12851-openclaw-2026/);
    assert.match(signals, /12284-claude-code/);
    assert.match(signals, /12166-cursor-2025/);
  }
});
