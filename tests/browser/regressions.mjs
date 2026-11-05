import{BASE_URL,QA_OUTPUT,launchBrowser}from'./helpers.mjs';
import { chromium, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
const browser=await launchBrowser();
const checks=[];
async function check(name,fn){try{await fn();checks.push({name,pass:true});}catch(e){checks.push({name,pass:false,error:e.message.split('\n').slice(0,10).join('\n')});}}
const page=await browser.newPage({viewport:{width:1440,height:1000}});await page.goto(`${BASE_URL}/en/`);await page.waitForTimeout(250);
await check('Theme control is visible',()=>expect(page.locator('button[data-theme]')).toBeVisible({timeout:1000}));
await check('Unrelated clicks do not change theme',async()=>{await page.locator('h1').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark',{timeout:1000});});
await page.setViewportSize({width:320,height:568});await page.goto(`${BASE_URL}/en/`);await page.evaluate(()=>document.fonts.ready);
await check('Small first viewport includes next-section signal',async()=>{const top=await page.locator('#work').evaluate(el=>el.getBoundingClientRect().top);expect(top).toBeLessThan(568-30);});
await check('Demo media has an explicit visible provenance label in both locales',async()=>{const data=JSON.parse(await readFile(new URL('../../src/data/profile.json',import.meta.url),'utf8'));for(const lang of ['en','es'])for(const project of data[lang].projects)for(const media of project.media)if(media.type==='demo')expect(media.label).toMatch(/demo|example|ejemplo/i);});
console.log(JSON.stringify(checks,null,2));await browser.close();process.exitCode=checks.some(c=>!c.pass)?1:0;
