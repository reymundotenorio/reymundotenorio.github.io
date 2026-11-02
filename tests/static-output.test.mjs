import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { archiveItems } from '../src/data/site.ts';

test('all bilingual cases are generated with matching localized metadata', () => {
  const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  for (const item of archiveItems) for (const lang of ['en', 'es']) {
    const path = `/${lang}/work/${item.slug}/`;
    const html = readFileSync(new URL(`../dist${path}index.html`, import.meta.url), 'utf8');
    assert(html.includes(`data-project-case="${item.slug}"`), path);
    assert(html.includes(`https://reymundotenorio.github.io${path}`), path);
    assert(html.includes(`/${lang === 'en' ? 'es' : 'en'}/work/${item.slug}/`), path);
    assert(sitemap.includes(path), path);
    if (item.status === 'private') assert(!html.includes('class="case-external"'), path);
  }
});

test('homepages link every case and preserve privacy and progressive enhancement', () => {
  for (const lang of ['en', 'es']) {
    const html = readFileSync(new URL(`../dist/${lang}/index.html`, import.meta.url), 'utf8');
    for (const item of archiveItems) assert(html.includes(`/${lang}/work/${item.slug}/`), item.slug);
    assert(!/mailto:|tel:|blackstone|aisamillen/i.test(html));
    assert(html.includes('data-archive-more'));
    assert(html.includes('12851-openclaw-2026'));
    assert(html.includes('12284-claude-code'));
  }
});
