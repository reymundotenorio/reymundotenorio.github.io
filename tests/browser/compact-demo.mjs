import{expect}from'@playwright/test';
import{BASE_URL,launchBrowser}from'./helpers.mjs';
const browser=await launchBrowser();
try{for(const lang of['en','es']){
 const page=await browser.newPage({viewport:{width:320,height:568}});await page.goto(`${BASE_URL}/${lang}/`);await page.evaluate(()=>document.fonts.ready);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth),`${lang}: no horizontal document overflow`).toBe(320);
 await page.addStyleTag({content:'.answer-experience ul { font-size:13px !important; }'});
 await page.setViewportSize({width:321,height:568});await page.setViewportSize({width:320,height:568});await page.waitForTimeout(200);
 const dimensions=await page.evaluate(()=>{const output=document.querySelector('[data-prompt-output]'),probe=document.createElement('div');probe.className='answer-probe';probe.style.width=document.querySelector('[data-answer-body]').clientWidth+'px';output.append(probe);probe.append(document.querySelector('[data-answer-template="experience"]').content.cloneNode(true));const height=probe.getBoundingClientRect().height;probe.remove();return{experiencePreview:height,sectionTop:document.querySelector('#work').getBoundingClientRect().top};});
 expect(dimensions.experiencePreview).toBeLessThan(100);expect(dimensions.sectionTop).toBeLessThan(548);
 await page.locator('#command-input').fill(lang==='en'?'Your experience':'Tu experiencia');await page.locator('#command-input').press('Enter');await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-topic','experience');expect(await page.locator('[data-answer-body] .answer-experience li:visible').count()).toBe(3);
 console.log(`PASS ${lang}: compact auto experience tolerates larger text; manual answers retain all roles`);await page.close();
}}finally{await browser.close();}
