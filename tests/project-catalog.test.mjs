import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { archiveItems, archiveFilters, profileSignals } from '../src/data/site.ts';

test('every project has a unique stable case URL', () => {
  assert.equal(archiveItems.length, 33);
  assert.equal(new Set(archiveItems.map((item) => item.slug)).size, archiveItems.length);
  for (const item of archiveItems) assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
});

test('confirmed work is included without uncertain client attribution', () => {
  const slugs = archiveItems.map((item) => item.slug);
  for (const slug of ['enerwize', 'nicasource', 'claris-health', 'studio-ivl', 'pouch', 'lighthouse', 'microtec', 'myroadmap', 'agency-platform']) {
    assert(slugs.includes(slug), slug);
  }
  assert(!JSON.stringify(archiveItems).match(/blackstone|aisa.?mill/i));
  assert.match(archiveItems.find((item) => item.slug === 'microtec').role.en, /maintenance/i);
  assert.match(archiveItems.find((item) => item.slug === 'claris-health').role.en, /Website development/);
  assert.match(archiveItems.find((item) => item.slug === 'pouch').summary.en, /Portal|Bah[ií]a/);
  assert.match(archiveItems.find((item) => item.slug === 'dele-peso-tools').role.en, /Financial tools/);
});

test('application captures show real interfaces with explicit safe provenance', () => {
  const pouch = archiveItems.find((item) => item.slug === 'pouch');
  const ivl = archiveItems.find((item) => item.slug === 'studio-ivl');
  assert.equal(pouch.preview.type, 'demo');
  assert.equal(pouch.gallery.length, 1);
  assert.match(pouch.preview.caption.en, /synthetic/i);
  assert.match(pouch.preview.caption.es, /ficticios/i);
  assert.equal(ivl.preview.type, 'store');
  assert.equal(ivl.gallery.length, 2);
  assert.match(ivl.preview.caption.en, /promotional/i);
  for (const item of [pouch, ivl]) for (const media of [item.preview, ...item.gallery]) {
    assert(existsSync(new URL(`../public${media.src}`, import.meta.url)), media.src);
    assert(media.alt.en && media.alt.es && media.caption.en && media.caption.es);
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
