import { expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { BASE_URL, QA_OUTPUT, launchBrowser } from './helpers.mjs';

const browser = await launchBrowser();
const results = [];
const record = name => { results.push({ name, pass: true }); console.log(`PASS intro: ${name}`); };
const trace = () => {
  window.introDocument = Math.random().toString(36);
  window.introTrace = [];
  new MutationObserver(records => {
    for (const record of records) if (record.attributeName === 'data-intro-state') {
      window.introTrace.push({ state: record.target.getAttribute('data-intro-state'), at: performance.now() });
    }
  }).observe(document, { attributes: true, subtree: true });
};
const complete = page => expect(page.locator('html')).not.toHaveAttribute('data-intro-state', /.+/);
try {
  for (const [lang, width, height, theme] of [['en', 1440, 1000, 'dark'], ['es', 390, 844, 'light']]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(trace);
    await page.addInitScript(theme => {
      localStorage.setItem('rt:story-theme', theme);
      sessionStorage.setItem('rt:intro-seen:v1', '1');
    }, theme);
    await page.goto(`${BASE_URL}/${lang}/`, { waitUntil: 'domcontentloaded' });
    await expect.poll(() => page.evaluate(() => window.introTrace.some(entry => entry.state === 'active'))).toBe(true);
    expect(await page.locator('#command-input').inputValue()).toBe('');
    const heading = await page.locator('h1').boundingBox();
    await complete(page);
    await expect(page.locator('html')).toHaveAttribute('data-intro-finished', 'complete');
    const duration = await page.evaluate(() => window.introTrace.find(entry => entry.state === null).at - window.introTrace[0].at);
    expect(duration).toBeGreaterThanOrEqual(1700);
    expect(duration).toBeLessThan(2500);
    expect(await page.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id).filter((id, index, all) => all.indexOf(id) !== index))).toEqual([]);
    expect(await page.locator('h1').boundingBox()).toEqual(heading);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    expect(await page.evaluate(() => document.activeElement.tagName)).toBe('BODY');
    await expect.poll(() => page.locator('[data-prompt-output]').getAttribute('data-cycle')).toBe('1');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect.poll(() => page.evaluate(() => window.introTrace.some(entry => entry.state === 'active'))).toBe(true);
    await complete(page);
    expect(errors).toEqual([]);
    record(`${lang} ${theme}: every load and reload, legacy seen flag ignored, stable geometry and demo handoff`);
    await page.close();
  }

  for (const action of ['skip-button', 'keyboard', 'pointer', 'focus', 'wheel']) {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/en/`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-intro-state', 'active');
    if (action === 'skip-button') await page.locator('[data-intro-skip]').evaluate(button => button.click());
    if (action === 'keyboard') await page.keyboard.press('Escape');
    if (action === 'pointer') await page.mouse.click(10, 200);
    if (action === 'focus') await page.locator('#command-input').focus();
    if (action === 'wheel') await page.mouse.wheel(0, 100);
    await complete(page);
    await expect(page.locator('html')).toHaveAttribute('data-intro-finished', 'interaction');
    await page.locator('#command-input').fill('DuePulse');
    await page.locator('#command-input').press('Enter');
    await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-topic', 'project-duepulse');
    await page.waitForTimeout(1600);
    await expect(page.locator('#command-input')).toHaveValue('DuePulse');
    await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-demo-state', 'manual');
    record(`${action}: immediate dismissal, no late takeover`);
    await page.close();
  }

  for (const mode of ['reduced', 'motion-off', 'blocked-storage', 'blocked-modules', 'no-js']) {
    const context = await browser.newContext({ javaScriptEnabled: mode !== 'no-js' });
    const page = await context.newPage();
    if (mode === 'reduced') await page.emulateMedia({ reducedMotion: 'reduce' });
    if (mode === 'motion-off') await page.addInitScript(() => localStorage.setItem('rt:story-motion', 'off'));
    if (mode === 'blocked-storage') await page.addInitScript(() => {
      Storage.prototype.getItem = () => { throw new Error('disabled'); };
      Storage.prototype.setItem = () => { throw new Error('disabled'); };
    });
    if (mode === 'blocked-modules') await page.route('**/*.js', route => route.abort());
    await page.goto(`${BASE_URL}/en/`, { waitUntil: 'domcontentloaded' });
    await complete(page);
    await expect(page.locator('[data-site-intro]')).toBeHidden();
    await expect(page.locator('h1')).toBeVisible();
    if (mode === 'blocked-modules') await expect(page.locator('html')).toHaveAttribute('data-intro-finished', 'watchdog');
    if (mode === 'blocked-storage') await expect(page.locator('html')).toHaveAttribute('data-intro-finished', 'complete');
    record(`${mode}: content remains available`);
    await context.close();
  }

  const page = await browser.newPage();
  await page.addInitScript(trace);
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await expect.poll(() => page.evaluate(() => window.introTrace.some(entry => entry.state === 'active'))).toBe(true);
  await complete(page);
  await page.goto(`${BASE_URL}/en/#work`);
  expect(await page.evaluate(() => window.introTrace.some(entry => entry.state === 'active'))).toBe(false);
  await page.goto(`${BASE_URL}/en/work/duepulse/`);
  await expect(page.locator('[data-site-intro]')).toHaveCount(0);
  await page.goto(`${BASE_URL}/en/`);
  await complete(page);
  await page.locator('#command-input').fill('DuePulse');
  await page.locator('#command-input').press('Enter');
  const original = await page.evaluate(() => ({ id: window.introDocument, entries: window.introTrace.length }));
  await page.locator('[data-answer-body] a').first().click();
  await expect(page).toHaveURL(/\/en\/work\/duepulse\//);
  await expect(page.locator('button[data-theme]')).toBeVisible();
  await page.goBack();
  await expect(page.locator('#command-input')).toHaveValue('DuePulse');
  await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-topic', 'project-duepulse');
  expect(await page.locator('html').getAttribute('data-intro-state')).toBe(null);
  expect(await page.evaluate(original => {
    const entries = window.introDocument === original.id ? window.introTrace.slice(original.entries) : window.introTrace;
    return entries.some(entry => entry.state === 'active');
  }, original)).toBe(false);
  record('root entry animates; deep links, case pages and Back skip it and preserve the query');
} finally {
  await writeFile(new URL('intro-results.json', QA_OUTPUT), JSON.stringify(results, null, 2));
  await browser.close();
}
