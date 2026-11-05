import { expect } from '@playwright/test';
import { BASE_URL, QA_OUTPUT, launchBrowser } from './helpers.mjs';
import { writeFile } from 'node:fs/promises';

const browser = await launchBrowser();
const results = [];
try {
  for (const [lang, width, height] of [['en', 1440, 1000], ['es', 320, 568]]) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${BASE_URL}/${lang}/`);
    await expect.poll(() => page.locator('[data-prompt-output]').getAttribute('data-cycle')).toBe('1');
    const input = page.locator('#command-input');
    const caret = page.locator('[data-prompt-caret]');
    await expect(caret).toHaveCount(1);
    await expect(caret).toHaveAttribute('aria-hidden', 'true');
    const inputNode = await input.elementHandle();
    const original = await input.boundingBox();
    await expect.poll(() => caret.evaluate(el => getComputedStyle(el).animationName)).toBe('caret-blink');
    const box = await caret.boundingBox();
    const textEnd = await input.evaluate(el => {
      const probe = document.createElement('span');
      probe.style.cssText = 'position:fixed;visibility:hidden;white-space:pre';
      probe.style.font = getComputedStyle(el).font;
      probe.textContent = el.value;
      document.body.append(probe);
      const end = el.getBoundingClientRect().x + probe.getBoundingClientRect().width + 1;
      probe.remove();
      return end;
    });
    expect(box.x).toBeGreaterThan(original.x + 10);
    expect(Math.abs(box.x - textEnd)).toBeLessThan(2);
    expect(box.x + box.width).toBeLessThanOrEqual(original.x + original.width);
    expect(Math.abs(box.y + box.height / 2 - original.y - original.height / 2)).toBeLessThan(2);

    await page.locator('[data-demo-toggle]').click();
    await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-demo-state', 'paused');
    expect(await caret.evaluate(el => getComputedStyle(el).animationName)).toBe('caret-blink');
    await input.fill('TypeScript y aplicaciones móviles '.repeat(5));
    expect(await caret.evaluate(el => getComputedStyle(el).visibility)).toBe('hidden');
    expect(await input.evaluate(el => getComputedStyle(el).caretColor)).not.toBe('rgba(0, 0, 0, 0)');
    await input.evaluate(el => el.setSelectionRange(1, 1));
    await input.press('ArrowRight');
    expect(await input.evaluate(el => el.selectionStart)).toBe(2);
    await page.locator('h1').click();
    await expect.poll(() => input.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
    const tail = await caret.boundingBox();
    const current = await input.boundingBox();
    expect(tail.x + tail.width).toBeLessThanOrEqual(current.x + current.width);
    expect(tail.x).toBeGreaterThan(current.x + current.width - 6);
    expect(current).toEqual(original);
    expect(await inputNode.evaluate(el => el === document.querySelector('#command-input'))).toBe(true);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await page.screenshot({ path: new URL(`prompt-caret-${lang}.png`, QA_OUTPUT).pathname });
    await page.locator('button[data-theme]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(await caret.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
    await page.locator('input[data-motion]').uncheck();
    expect(await caret.evaluate(el => getComputedStyle(el).animationName)).toBe('none');
    expect(errors).toEqual([]);
    results.push({ lang, width, height, pass: true });
    console.log(`PASS ${lang}: visible auto caret, native editing, pause, long text and stable geometry`);
    await context.close();
  }
  const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE_URL}/en/`);
  await page.locator('[data-prompt-query="ai"]').click();
  expect(await page.locator('[data-prompt-caret]').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  results.push({ reducedMotion: true, pass: true });
  console.log('PASS reduced motion: no animated custom caret');
  const blocked = await browser.newPage();
  await blocked.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  await blocked.goto(`${BASE_URL}/en/`);
  await blocked.locator('#command-input').fill('DuePulse');
  await blocked.locator('#command-input').press('Enter');
  await expect(blocked.locator('[data-prompt-output]')).toHaveAttribute('data-topic', 'project-duepulse');
  await expect(blocked.locator('[data-prompt-caret]')).toBeHidden();
  expect(await blocked.locator('[data-prompt-caret]').evaluate(el => el.hidden)).toBe(true);
  results.push({ blockedCanvas: true, pass: true });
  console.log('PASS unavailable measurement: native input and answers still work');
} finally {
  await writeFile(new URL('prompt-caret-results.json', QA_OUTPUT), JSON.stringify(results, null, 2));
  await browser.close();
}
