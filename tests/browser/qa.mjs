import{BASE_URL,QA_OUTPUT,launchBrowser}from'./helpers.mjs';
import { chromium,expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
const root=new URL('../../',import.meta.url),out=QA_OUTPUT;await mkdir(out,{recursive:true});
const browser=await launchBrowser();
const results=[],errors=[];
const check=async(name,fn)=>{try{const evidence=await fn();results.push({name,pass:true,evidence});console.log(`PASS ${name}`);}catch(e){results.push({name,pass:false,error:e.message});console.log(`FAIL ${name}: ${e.message.slice(0,400)}`);}};
const open=async(lang='en',options={})=>{const context=await browser.newContext({viewport:{width:1440,height:1000},...options});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await page.goto(`${BASE_URL}/${lang}/`);await page.evaluate(()=>document.fonts.ready);await expect(page.locator('html')).not.toHaveAttribute('data-intro-state',/.+/);await page.waitForTimeout(150);return {page,context};};
const state=page=>page.evaluate(()=>{const scene=document.querySelector('[data-scene]'),frame=document.querySelector('[data-story-frame]');return {y:scrollY,x:scrollX,frameY:frame.getBoundingClientRect().y,trackX:document.querySelector('[data-story-track]').getBoundingClientRect().x,header:document.querySelector('[data-header]').getBoundingClientRect().height,start:Number(scene.dataset.pinStart),end:Number(scene.dataset.pinEnd),active:scene.dataset.activeProject,pinned:scene.dataset.pinned,spacers:document.querySelectorAll('.pin-spacer').length};});
const jump=async(page,y)=>{await page.evaluate(top=>scrollTo({top,behavior:'instant'}),y);await page.waitForTimeout(120);};
const screenshot=async(page,name)=>page.screenshot({path:new URL(`${name}.png`,out).pathname});
const expected={'[data-archive-project]':30,'[data-certificate]':18,'[data-recognition]':17,'[data-recognition][data-kind="award"]':4,'[data-course]':4,'[data-employment]':5,'[data-skill]':76,'[data-language]':12,'[data-framework]':13,'[data-stack-group]':7,'[data-ai-capability]':3,'[data-education]':1,'[data-spoken-language]':2,'[data-public-repository]':56};
for(const lang of ['en','es']){
  const {page,context}=await open(lang);
  await check(`${lang}: identity, complete corpus and valid anchors`,async()=>{
    expect(await page.title()).toContain('Reymundo Tenorio');await expect(page.locator('html')).toHaveAttribute('lang',lang);
    for(const [selector,count] of Object.entries(expected))expect(await page.locator(selector).count(),selector).toBe(count);
    const invalid=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash));expect(invalid).toEqual([]);
    expect(await page.locator('astro-error-overlay,vite-error-overlay').count()).toBe(0);
    expect(await page.locator('meta[name="robots"][content*="noindex"]').count()).toBe(0);
    return expected;
  });
  await check(`${lang}: no prohibited personal or private metadata`,async()=>{
    const text=await page.content();expect(text).not.toMatch(/mailto:|tel:|bahia nica|lighthouse|isning|vercel\.app|\/Users\//i);
    const profile=JSON.parse(await readFile(new URL('../../src/data/profile.json',import.meta.url),'utf8'))[lang];
    const allowlist=new Set([...profile.publicCode.map(repo=>repo.url),...profile.projects.map(project=>project.url).filter(Boolean)].map(url=>url.toLowerCase()));
    const publicLinks=await page.locator('a[href*="github.com/reymundotenorio/"]').evaluateAll(links=>links.map(a=>a.href.toLowerCase()));
    for(const link of publicLinks)expect(allowlist.has(link)).toBe(true);
    return {publicLinksAllowlisted:publicLinks.length};
  });
  await check(`${lang}: theme button, persistence and independent interactions`,async()=>{
    await expect(page.locator('button[data-theme]')).toBeVisible();await page.locator('h1').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
    await page.locator('button[data-theme]').click();await expect(page.locator('html')).toHaveAttribute('data-theme','light');
    await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','light');await expect(page.locator('html')).not.toHaveAttribute('data-intro-state',/.+/);await screenshot(page,`${lang}-light-hero`);
  });
  for(const theme of ['light','dark']){
    if(theme==='dark')await page.locator('button[data-theme]').click();
    await check(`${lang}: axe ${theme}`,async()=>{const scan=await new AxeBuilder({page}).analyze();await writeFile(new URL(`axe-${lang}-${theme}.json`,out),JSON.stringify({violations:scan.violations,incomplete:scan.incomplete.map(i=>({id:i.id,nodes:i.nodes.length}))},null,2));expect(scan.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.slice(0,6).map(n=>n.target)}))).toEqual([]);return {rulesPassed:scan.passes.length,incomplete:scan.incomplete.length};});
  }
  if(lang==='en'){
    await screenshot(page,'desktop-hero');
    await check('Desktop: vertical -> horizontal -> vertical with native wheel',async()=>{
      const before=await state(page);expect(before.pinned).toBe('true');expect(before.spacers).toBe(1);
      await jump(page,before.start+1);const start=await state(page);await screenshot(page,'desktop-project-start');
      await page.mouse.move(800,500);await page.mouse.wheel(0,800);await page.waitForTimeout(200);const middle=await state(page);
      expect(middle.y).toBeGreaterThan(start.y+600);expect(middle.trackX).toBeLessThan(start.trackX-600);expect(Math.abs(middle.frameY-start.frameY)).toBeLessThan(2);expect(middle.x).toBe(0);
      await jump(page,before.end-1);await screenshot(page,'desktop-project-end');
      await page.mouse.wheel(0,500);await page.waitForTimeout(200);const end=await state(page);expect(end.frameY).toBeLessThan(end.header-300);
      const experience=await page.locator('#experience').boundingBox();expect(experience.y).toBeLessThan(1000);expect(experience.y).toBeGreaterThan(0);await screenshot(page,'desktop-vertical-exit');
      return {start,middle,end};
    });
    await check('Desktop: project controls and keyboard access',async()=>{
      const initial=await state(page);await jump(page,initial.start);await page.locator('[data-next]').click();await expect(page.locator('[data-scene]')).toHaveAttribute('data-active-project','studio-ivl');await page.waitForTimeout(900);
      await page.locator('[data-next]').focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(900);await expect(page.locator('[data-scene]')).toHaveAttribute('data-active-project','pouch');
      await page.locator('[data-story-panel]').last().locator('.story-media').focus();await expect(page.locator('[data-scene]')).toHaveAttribute('data-active-project','depsaber');expect((await state(page)).x).toBe(0);
      await page.keyboard.press('Tab');await expect(page.locator('[data-story-panel]').last().locator('.panel-caption a')).toBeFocused();
    });
    await check('Project details open their own complete page; the archive stays compact',async()=>{
      await page.locator('[data-story-panel]').last().locator('.panel-caption a').click();await expect(page.locator('[data-project-case="depsaber"] h1')).toBeInViewport();expect(await page.locator('.case-cover img').count()).toBe(1);await page.locator('[data-project-back]').first().click();await expect(page.locator('[data-scene]')).toHaveAttribute('data-active-project','depsaber');
      await page.locator('[data-archive-rest]>summary').click();expect(await page.locator('[data-archive-project]:visible').count()).toBe(30);
      await page.locator('#code>summary').click();expect(await page.locator('[data-public-repository]:visible').count()).toBe(56);
    });
    await check('Archive filtering, empty state and restoration',async()=>{
      const search=page.locator('#project-search');await search.fill('DuePulse');await expect(page.locator('[data-project-count]')).toHaveText('1 project');
      expect(await page.locator('[data-archive-project]:visible').count()).toBe(1);await search.fill('zz-no-such-project');await expect(page.locator('[data-archive-empty]')).toBeVisible();
      await search.fill('');expect(await page.locator('[data-archive-project]:visible').count()).toBe(6);
    });
    await check('Prompt: typed input is stable; Enter finds topics and projects',async()=>{
      await jump(page,0);const input=page.locator('#command-input');await input.focus();const position=await input.boundingBox(),y=await page.evaluate(()=>scrollY);
      await input.pressSequentially('Languages and tools',{delay:20});expect(Math.abs((await input.boundingBox()).y-position.y)).toBeLessThan(1);expect(await page.evaluate(()=>scrollY)).toBe(y);
      await input.press('Enter');await expect(page.locator('[data-prompt-output]')).toHaveAttribute('data-topic','toolkit');expect(await page.evaluate(()=>scrollY)).toBe(y);
      await jump(page,0);await input.fill('React');await input.press('Enter');await expect(page.locator('[data-prompt-output] .answer-project')).toBeVisible();
      await jump(page,0);await input.fill('unlistedzz');await input.press('Enter');await expect(page.locator('[data-command-status]')).toHaveText('No matching projects found.');
    });
    await check('Motion toggle and breakpoint cleanup: no duplicate pins',async()=>{
      await jump(page,0);await page.locator('input[data-motion]').uncheck();await expect(page.locator('[data-scene]')).toHaveAttribute('data-pinned','false');expect(await page.locator('.pin-spacer').count()).toBe(0);
      await page.locator('input[data-motion]').check();await expect(page.locator('[data-scene]')).toHaveAttribute('data-pinned','true');expect(await page.locator('.pin-spacer').count()).toBe(1);
      await page.setViewportSize({width:768,height:1024});await expect(page.locator('[data-scene]')).toHaveAttribute('data-pinned','false');expect(await page.locator('.pin-spacer').count()).toBe(0);
      await page.setViewportSize({width:1440,height:1000});await expect(page.locator('[data-scene]')).toHaveAttribute('data-pinned','true');expect(await page.locator('.pin-spacer').count()).toBe(1);
    });
    await check('Locale link preserves section',async()=>{await page.evaluate(()=>history.replaceState(null,'','#recognition'));await page.locator('.languages a[lang="es"]').click();expect(page.url()).toBe(`${BASE_URL}/es/#recognition`);});
  }
  await context.close();
}
for(const [name,width,height,lang] of [['mobile',390,844,'es'],['small',320,568,'en'],['tablet',768,1024,'es'],['landscape',844,390,'en'],['wide',1920,1080,'en']]){
  const {page,context}=await open(lang,{viewport:{width,height},isMobile:width<1000,hasTouch:width<1000});
  await check(`${name}: responsive geometry, assets and native navigation`,async()=>{
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
    const top=(await page.locator('#work').boundingBox()).y;expect(top).toBeLessThan(height-30);
    await screenshot(page,`${name}-hero`);
    const pin=await page.locator('[data-scene]').getAttribute('data-pinned');expect(pin).toBe(width>=1000?'true':'false');
    if(width>=1000)await jump(page,(await state(page)).start);else await page.locator('#work').scrollIntoViewIfNeeded();
    await screenshot(page,`${name}-work`);
    const media=await page.locator('[data-scene] img').evaluateAll(images=>images.map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})));expect(media.every(i=>i.loaded)).toBe(true);
    return {width,height,pin,top,media};
  });
  if(name==='mobile'){
    await check('Mobile: real touch swipe, then normal vertical scroll',async()=>{
      const client=await context.newCDPSession(page);const box=await page.locator('[data-story-viewport]').boundingBox();const y=Math.min(height-160,Math.max(230,box.y+160));
      await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:330,y}]});
      for(let x=300;x>=65;x-=25)await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y}]});
      await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(600);
      expect(await page.locator('[data-story-viewport]').evaluate(el=>el.scrollLeft)).toBeGreaterThan(150);expect(await page.evaluate(()=>scrollX)).toBe(0);await screenshot(page,'mobile-swiped');
      await page.locator('.site-nav a[href="#experience"]').click();await expect(page.locator('#experience-title')).toBeInViewport({ratio:1});await screenshot(page,'mobile-experience');
    });
    await check('Mobile: axe and archive projects open dedicated pages',async()=>{
      const scan=await new AxeBuilder({page}).analyze();expect(scan.violations.map(v=>({id:v.id,nodes:v.nodes.slice(0,4).map(n=>n.target)}))).toEqual([]);
      await page.locator('[data-archive-rest]>summary').click();await page.locator('[data-archive-project]').last().locator('[data-project-link]').click();await expect(page.locator('[data-project-case] h1')).toBeInViewport();
    });
  }
  await context.close();
}
const {page:reduced,context:reducedContext}=await open('en',{reducedMotion:'reduce'});
await check('Reduced motion: complete static layout without pin or blinking',async()=>{
  await expect(reduced.locator('[data-scene]')).toHaveAttribute('data-pinned','false');expect(await reduced.locator('.pin-spacer').count()).toBe(0);await expect(reduced.locator('input[data-motion]')).toBeDisabled();
  const positions=await reduced.locator('[data-story-panel]').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().y));expect(positions[1]).toBeGreaterThan(positions[0]+100);
  expect(await reduced.locator('.name-caret').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
});await reducedContext.close();
const {page:nojs,context:nojsContext}=await open('es',{javaScriptEnabled:false});
await check('No JavaScript: all content, projects and native disclosures remain usable',async()=>{for(const [selector,count] of Object.entries(expected))expect(await nojs.locator(selector).count(),selector).toBe(count);await nojs.locator('[data-archive-rest]>summary').click();expect(await nojs.locator('[data-archive-project]:visible').count()).toBe(30);await expect(nojs.locator('[data-command]')).toBeHidden();});await nojsContext.close();
await check('Runtime and console health',async()=>expect(errors).toEqual([]));
const failed=results.filter(r=>!r.pass);await writeFile(new URL('results.json',out),JSON.stringify({browser:browser.version(),browserPlugin:'Browser plugin not available',target:'Vertical document -> pinned horizontal projects -> vertical experience; native mobile rail',results,errors},null,2));
console.log(JSON.stringify({passed:results.length-failed.length,failed:failed.length,failures:failed.map(f=>({name:f.name,error:f.error.slice(0,2000)}))},null,2));await browser.close();process.exitCode=failed.length?1:0;
