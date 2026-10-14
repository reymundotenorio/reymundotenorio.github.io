import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const build = new URL('dist/', root);
const assets = new URL('_astro/', root);
const builtAssets = await readdir(new URL('_astro/', build));

await mkdir(assets, { recursive: true });
for (const filename of await readdir(assets)) {
  if (!builtAssets.includes(filename)) await rm(new URL(filename, assets));
}

for (const filename of ['index.html', 'en', 'es', '_astro', 'fonts', 'favicon.svg', 'robots.txt', 'sitemap.xml', 'service-worker.js']) {
  await cp(new URL(filename, build), new URL(filename, root), { recursive: true });
}
await cp(new URL('images/social-card.png', build), new URL('images/social-card.png', root));
console.log(`Static portfolio synchronized to ${fileURLToPath(root)}`);
