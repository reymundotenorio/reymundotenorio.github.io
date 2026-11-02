import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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
    assert(!/isning|\/Users\/|BEGIN PRIVATE KEY|demo@example/i.test(html), path);
  }
});

test('homepages link every case and preserve privacy and progressive enhancement', () => {
  for (const lang of ['en', 'es']) {
    const html = readFileSync(new URL(`../dist/${lang}/index.html`, import.meta.url), 'utf8');
    for (const item of archiveItems) assert(html.includes(`/${lang}/work/${item.slug}/`), item.slug);
    assert(!/mailto:|tel:|blackstone|aisamillen|isning/i.test(html));
    assert(html.includes('data-archive-more'));
    assert(html.includes('12851-openclaw-2026'));
    assert(html.includes('12284-claude-code'));
  }
});

test('application galleries preserve provenance and obsolete branded routes are absent', () => {
  for (const lang of ['en', 'es']) {
    for (const slug of ['pouch', 'studio-ivl']) {
      const item = archiveItems.find((project) => project.slug === slug);
      const html = readFileSync(new URL(`../dist/${lang}/work/${slug}/index.html`, import.meta.url), 'utf8');
      for (const media of [item.preview, ...item.gallery]) {
        assert(html.includes(media.src));
        assert(html.includes(media.caption[lang]));
        assert(existsSync(new URL(`../dist${media.src}`, import.meta.url)));
      }
    }
    assert(!existsSync(new URL(`../dist/${lang}/work/isning-multimedia/`, import.meta.url)));
  }
  assert(!existsSync(new URL('../dist/images/projects/isning-multimedia.webp', import.meta.url)));
});
