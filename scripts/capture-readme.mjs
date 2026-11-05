import{mkdir}from'node:fs/promises';
import sharp from'sharp';
import{BASE_URL,QA_OUTPUT,launchBrowser}from'../tests/browser/helpers.mjs';
const browser=await launchBrowser();
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(`${BASE_URL}/en/`);await page.evaluate(()=>document.fonts.ready);
 await page.locator('#command-input').fill('Show me DuePulse');await page.locator('#command-input').press('Enter');
 await page.mouse.move(1400,950);await page.waitForTimeout(300);
 const image=await page.screenshot({path:new URL('readme-preview.png',QA_OUTPUT).pathname});
 const destination=new URL('../docs/',import.meta.url);await mkdir(destination,{recursive:true});
 await sharp(image).webp({quality:84}).toFile(new URL('portfolio-preview.webp',destination).pathname);
 console.log('Captured the actual portfolio for the README.');
}finally{await browser.close();}
