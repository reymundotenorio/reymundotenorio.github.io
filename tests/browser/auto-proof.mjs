import{BASE_URL,QA_OUTPUT,launchBrowser}from'./helpers.mjs';
import {chromium,expect}from'@playwright/test';
import {mkdir,writeFile,rename}from'node:fs/promises';
const out=QA_OUTPUT;await mkdir(new URL('videos/',out),{recursive:true});
const browser=await launchBrowser();
const results=[];
try{
for(const [name,width,height,lang]of[['desktop',1440,1000,'en'],['mobile',320,568,'es']]){
 if(process.env.PROOF_VIEW&&process.env.PROOF_VIEW!==name)continue;
 const context=await browser.newContext({viewport:{width,height},recordVideo:{dir:new URL('videos/',out).pathname,size:{width,height}}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(`${BASE_URL}/${lang}/`);await page.evaluate(()=>document.fonts.ready);await page.mouse.move(width/2,50);
 const before=await page.locator('[data-command]').boundingBox();const samples=[];const deck=(await page.locator('[data-prompt-output]').getAttribute('data-demo-deck')).split(',');
 for(let cycle=1;cycle<=6;cycle++){
  await expect.poll(()=>page.locator('[data-prompt-output]').getAttribute('data-cycle'),{timeout:9000}).toBe(String(cycle));
  const sample=await page.evaluate(()=>{const output=document.querySelector('[data-prompt-output]'),body=output.querySelector('[data-answer-body]'),more=output.querySelector('[data-answer-more]');const children=[...body.children];return {cycle:Number(output.dataset.cycle),topic:output.dataset.topic,pageY:scrollY,formY:document.querySelector('[data-command]').getBoundingClientRect().y,outputHeight:output.getBoundingClientRect().height,contentBottom:Math.max(...children.map(el=>el.getBoundingClientRect().bottom)),moreTop:more.getBoundingClientRect().top,sectionTop:document.querySelector('#work').getBoundingClientRect().top};});
  console.log(JSON.stringify({name,...sample}));
  if(sample.contentBottom>sample.moreTop+1||sample.sectionTop>=height-20){console.log(await page.locator('[data-answer-body]').evaluate(el=>{const output=el.closest('[data-prompt-output]'),probe=document.createElement('div');probe.className='answer-probe';probe.style.width=el.clientWidth+'px';output.append(probe);const measurements=[...document.querySelectorAll('[data-answer-template]')].map(template=>{probe.replaceChildren(template.content.cloneNode(true));return{key:template.dataset.answerTemplate,height:probe.getBoundingClientRect().height};});probe.remove();return{width:el.clientWidth,reserved:output.style.getPropertyValue('--answer-size'),fonts:[...document.fonts].map(font=>({family:font.family,status:font.status})),measurements};}));await page.screenshot({path:new URL(`${name}-overflow.png`,out).pathname});}
  expect(sample.topic).toBe(deck[cycle-1]);expect(sample.pageY).toBe(0);expect(sample.formY).toBe(before.y);expect(sample.contentBottom).toBeLessThanOrEqual(sample.moreTop+1);expect(sample.sectionTop).toBeLessThan(height-20);samples.push(sample);
  await page.screenshot({path:new URL(`${name}-auto-${cycle}.png`,out).pathname});
 }
 const cycle=await page.locator('[data-prompt-output]').getAttribute('data-cycle');await page.locator('.site-nav a[href="#work"]').click();await page.waitForTimeout(1000);await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-cycle',cycle);await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await expect.poll(()=>page.locator('[data-prompt-output]').getAttribute('data-cycle'),{timeout:7000}).not.toBe(cycle);
 await page.locator('[data-prompt-query="ai"]').click();await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-topic','ai');expect(await page.evaluate(()=>scrollY)).toBe(0);expect(errors).toEqual([]);
 const video=await page.video().path();await context.close();const target=new URL(`${name}-automatic-output.webm`,out);await rename(video,target);results.push({name,width,height,samples,video:target.pathname,errors});console.log(`PASS ${name}: six curated submissions, stable geometry, offscreen pause/resume and applied-AI option`);
}
}catch(error){console.error(error);process.exitCode=1;results.push({failure:error.message});}
await writeFile(new URL('automatic-output-evidence.json',out),JSON.stringify(results,null,2));await browser.close();
