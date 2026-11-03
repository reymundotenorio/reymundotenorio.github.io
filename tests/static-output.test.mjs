import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { archiveItems } from '../src/data/site.ts';
import { projectMediaLabel } from '../src/lib/project-media.ts';

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
    assert(!/isning|lighthouse|bah[ií]a.?nica|\/Users\/|BEGIN PRIVATE KEY|demo@example/i.test(html), path);
  }
});

test('homepages link every case and preserve privacy and progressive enhancement', () => {
  for (const lang of ['en', 'es']) {
    const html = readFileSync(new URL(`../dist/${lang}/index.html`, import.meta.url), 'utf8');
    for (const item of archiveItems) assert(html.includes(`/${lang}/work/${item.slug}/`), item.slug);
    assert(!/mailto:|tel:|blackstone|aisamillen|isning|lighthouse|bah[ií]a.?nica/i.test(html));
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
    assert(!existsSync(new URL(`../dist/${lang}/work/lighthouse/`, import.meta.url)));
    assert(!existsSync(new URL(`../dist/${lang}/work/logistics-operations/`, import.meta.url)));
    const pouch = readFileSync(new URL(`../dist/${lang}/work/pouch/index.html`, import.meta.url), 'utf8');
    assert(pouch.includes('Freelance'));
  }
  assert(!existsSync(new URL('../dist/images/projects/isning-multimedia.webp', import.meta.url)));
  assert(!existsSync(new URL('../dist/images/projects/lighthouse.webp', import.meta.url)));
});

test('historical website captures are rendered with concise screen captions', () => {
  for (const lang of ['en', 'es']) for (const slug of ['nicaragua-tattoos', 'career-site-collection']) {
    const item = archiveItems.find((project) => project.slug === slug);
    const html = readFileSync(new URL(`../dist/${lang}/work/${slug}/index.html`, import.meta.url), 'utf8');
    for (const media of [item.preview, ...(item.gallery ?? [])]) {
      assert(html.includes(media.src));
      assert(html.includes(media.caption[lang]));
      assert(existsSync(new URL(`../dist${media.src}`, import.meta.url)));
    }
    assert(!/rendered locally|renderizado localmente|frontend original|source code remains private/i.test(html));
  }
});

test('every generated case displays its local image and identifies conceptual artwork', () => {
  for (const lang of ['en', 'es']) for (const item of archiveItems) {
    const html = readFileSync(new URL(`../dist/${lang}/work/${item.slug}/index.html`, import.meta.url), 'utf8');
    assert(item.preview, item.slug);
    assert(html.includes(item.preview.src), item.slug);
    assert(existsSync(new URL(`../dist${item.preview.src}`, import.meta.url)), item.slug);
    if (item.preview.type === 'concept') assert(html.includes(projectMediaLabel(item.preview, lang, true)), item.slug);
  }
});

test('DuePulse publishes only local product screenshots without an application link', () => {
  for (const lang of ['en', 'es']) {
    const html = readFileSync(new URL(`../dist/${lang}/work/duepulse/index.html`, import.meta.url), 'utf8');
    assert(html.includes('/images/projects/duepulse-home.webp'));
    assert(html.includes('/images/projects/duepulse-product.webp'));
    assert(!html.includes('duepulse-concept.webp'));
    assert(!html.includes('class="case-external"'));
    assert(!/href="https?:\/\/[^"]*vercel\.app/i.test(html));
  }
});
