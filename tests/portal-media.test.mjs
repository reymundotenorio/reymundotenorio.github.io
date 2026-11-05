import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import sharp from 'sharp';
const data = JSON.parse(readFileSync(new URL('../src/data/profile.json', import.meta.url), 'utf8'));
test('each portal locale references its own two local demo captures', () => {
  for (const lang of ['en', 'es']) {
    const portal = data[lang].projects.find(project => project.id === 'pouch');
    assert.deepEqual(portal.media.map(media => media.src), ['history', 'details'].map(view => `/images/projects/shipping-portal-${view}-${lang}.webp`));
    assert(portal.media.every(media => media.type === 'demo' && /demo|ejemplo/i.test(media.label)));
  }
});
test('localized portal captures are distinct optimized WebPs with truthful dimensions', async () => {
  for (const view of ['history', 'details']) {
    const images = [];
    for (const lang of ['en', 'es']) {
      const buffer = readFileSync(new URL(`../public/images/projects/shipping-portal-${view}-${lang}.webp`, import.meta.url));
      const metadata = await sharp(buffer).metadata();
      assert.equal(metadata.format, 'webp');
      assert.equal(metadata.width, 1680); assert.equal(metadata.height, 1050);
      assert(!metadata.exif && !metadata.xmp && !metadata.iptc);
      assert(buffer.length < 500 * 1024);
      images.push(buffer);
    }
    assert.notDeepEqual(images[0], images[1]);
  }
});
