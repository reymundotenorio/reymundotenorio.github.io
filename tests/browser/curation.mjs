import { expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { BASE_URL, QA_OUTPUT, launchBrowser } from './helpers.mjs';
const browser = await launchBrowser();
const results = [];
const featured = ['duepulse', 'studio-ivl', 'pouch', 'depsaber'];
try {
  for (const lang of ['en', 'es']) for (const width of [1440, 320]) {
    const context = await browser.newContext({ viewport: { width, height: width === 320 ? 568 : 1000 }, isMobile: width === 320, hasTouch: width === 320 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(lang => localStorage.setItem('rt:story-theme', lang === 'es' ? 'light' : 'dark'), lang);
    await page.goto(`${BASE_URL}/${lang}/`);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.locator('[data-story-panel]').evaluateAll(nodes => nodes.map(node => node.dataset.project))).toEqual(featured);
    expect(await page.locator('[data-archive-project]').evaluateAll(nodes => nodes.slice(0, 6).map(node => node.id.replace('project-', '')))).toEqual([...featured, 'nicasource', 'dele-peso-tools']);
    const name = lang === 'en' ? 'Shipping Portal' : 'Portal de envíos';
    for (const query of ['Pouch', lang === 'en' ? 'shipping portal' : 'portal de envíos']) {
      await page.locator('#command-input').fill(query);
      await page.locator('#command-input').press('Enter');
      await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-topic', 'project-pouch');
      await expect(page.locator('[data-answer-title]')).toHaveText(name);
    }
    await page.locator('[data-answer-body]').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished.catch(() => {}))));
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await page.screenshot({ path: new URL(`curation-${lang}-${width}-home.png`, QA_OUTPUT).pathname });
    await page.locator('[data-answer-more]').click();
    await expect(page).toHaveURL(`${BASE_URL}/${lang}/work/pouch/?from=prompt`);
    await expect(page.locator('button[data-theme]')).toBeVisible();
    await expect(page.locator('h1')).toHaveText(name);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://reymundotenorio.github.io/${lang}/work/pouch/`);
    expect(await page.locator('main').innerText()).not.toContain('Pouch');
    await expect(page.locator('.case-meta')).toContainText(/full-stack/i);
    await expect(page.locator('.case-scope')).toContainText('webhook');
    expect(await page.locator('main img').evaluateAll(images => images.map(image => image.getAttribute('src')))).toEqual(['history', 'details'].map(view => `/images/projects/shipping-portal-${view}-${lang}.webp`));
    expect(await page.locator('.case-cover img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await page.screenshot({ path: new URL(`curation-${lang}-${width}-case.png`, QA_OUTPUT).pathname, fullPage: true });
    await page.locator('[data-project-back]').first().click();
    await expect(page.locator('[data-answer-title]')).toHaveText(name);
    expect(await page.locator('html').getAttribute('data-intro-state')).toBe(null);
    expect(errors).toEqual([]);
    results.push({ lang, width, name, pass: true });
    console.log(`PASS ${lang} ${width}: shared curation, localized portal, compatibility lookup and project Back`);
    await context.close();
  }
} finally {
  await writeFile(new URL('curation-results.json', QA_OUTPUT), JSON.stringify(results, null, 2));
  await browser.close();
}
