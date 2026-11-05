import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://reymundotenorio.github.io',
  output: 'static',
  trailingSlash: 'always',
  redirects: Object.fromEntries(['en','es'].flatMap(lang=>[
    [`/${lang}/portfolio/`,`/${lang}/#archive`],
    ...['column-five','microtec'].map(id=>[`/${lang}/work/${id}/`,`/${lang}/#experience`])
  ])),
  devToolbar: {
    enabled: false
  }
});
