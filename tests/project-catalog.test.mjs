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
  for (const slug of ['enerwize', 'nicasource', 'claris-health', 'studio-ivl', 'pouch', 'lighthouse', 'microtec', 'myroadmap', 'isning-multimedia']) {
    assert(slugs.includes(slug), slug);
  }
  assert(!JSON.stringify(archiveItems).match(/blackstone|aisa.?mill/i));
  assert.match(archiveItems.find((item) => item.slug === 'microtec').role.en, /maintenance/i);
  assert.match(archiveItems.find((item) => item.slug === 'claris-health').source.en, /Nicasource/);
  assert.match(archiveItems.find((item) => item.slug === 'pouch').summary.en, /Portal|Bah[ií]a/);
  assert.match(archiveItems.find((item) => item.slug === 'dele-peso-tools').role.en, /Financial tools/);
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
