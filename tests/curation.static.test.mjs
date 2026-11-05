import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const read = path => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const featured = ['duepulse', 'studio-ivl', 'pouch', 'depsaber'];
test('featured work and the first archive projects share the approved engineering priority', () => {
  for (const lang of ['en', 'es']) {
    const html = read(`${lang}/index.html`);
    assert.deepEqual([...html.matchAll(/data-story-panel[^>]*data-project="([^"]+)"/g)].map(match => match[1]), featured);
    const archive = [...html.matchAll(/id="project-([^"]+)" data-archive-project/g)].map(match => match[1]);
    assert.deepEqual(archive.slice(0, 6), [...featured, 'nicasource', 'dele-peso-tools']);
    assert.equal(archive.length, 30);
    assert(archive.includes('steps-veterinary'));
  }
});
test('shipping portal is localized everywhere without breaking its existing case URL', () => {
  for (const [lang, name] of [['en', 'Shipping Portal'], ['es', 'Portal de envíos']]) {
    const html = read(`${lang}/work/pouch/index.html`);
    assert(html.includes(`<h1>${name}</h1>`));
    assert(html.includes(`rel="canonical" href="https://reymundotenorio.github.io/${lang}/work/pouch/"`));
    assert.doesNotMatch(html, /\bPouch\b/);
    assert.doesNotMatch(read(`${lang}/index.html`), /\bPouch\b/);
    assert.match(html, /webhook/i);
    assert.match(html, /Demo data|Datos de ejemplo/);
  }
});
test('portal images follow the page locale without leaking the other locale into home or case markup', () => {
  for (const lang of ['en', 'es']) {
    const other = lang === 'en' ? 'es' : 'en';
    const home = read(`${lang}/index.html`);
    const detail = read(`${lang}/work/pouch/index.html`);
    for (const view of ['history', 'details']) {
      assert(detail.includes(`/images/projects/shipping-portal-${view}-${lang}.webp`));
      assert(!detail.includes(`/images/projects/shipping-portal-${view}-${other}.webp`));
      assert(!home.includes(`/images/projects/shipping-portal-${view}-${other}.webp`));
    }
    assert(home.includes(`/images/projects/shipping-portal-history-${lang}.webp`));
  }
});
