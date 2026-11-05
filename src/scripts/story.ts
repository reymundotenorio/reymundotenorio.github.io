import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {initPrompt}from'./prompt';

gsap.registerPlugin(ScrollTrigger);
const html=document.documentElement;
const en=document.body.dataset.lang==='en';
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const abort=new AbortController();
const signal=abort.signal;
type ReturnPoint={y:number;rail:number;query:string;open:boolean;href:string;prompt?:{query:string;topic:string}};
const returnPoint=():ReturnPoint|undefined=>{const point=history.state?.rtProjectReturn;return point&&Number.isFinite(point.y)?point:undefined;};
const returning=performance.getEntriesByType('navigation').some(entry=>(entry as PerformanceNavigationTiming).type==='back_forward')?returnPoint():undefined;
history.scrollRestoration=returning?'manual':'auto';
let restoring=false;
const header=document.querySelector<HTMLElement>('[data-header]')!;
const scene=document.querySelector<HTMLElement>('[data-scene]')!;
const frame=scene.querySelector<HTMLElement>('[data-story-frame]')!;
const viewport=scene.querySelector<HTMLElement>('[data-story-viewport]')!;
const track=scene.querySelector<HTMLElement>('[data-story-track]')!;
const panels=[...scene.querySelectorAll<HTMLElement>('[data-story-panel]')];
const steps=[...scene.querySelectorAll<HTMLElement>('[data-progress]')];
const previous=scene.querySelector<HTMLButtonElement>('[data-prev]')!;
const next=scene.querySelector<HTMLButtonElement>('[data-next]')!;
const motion=scene.querySelector<HTMLInputElement>('[data-motion]')!;
const announce=scene.querySelector<HTMLElement>('[data-slide-announcement]')!;
const buttons=scene.querySelector<HTMLElement>('[data-story-buttons]')!;
const progress=scene.querySelector<HTMLElement>('.story-progress')!;
const theme=document.querySelector<HTMLButtonElement>('button[data-theme]')!;
let current=0;
let trigger: ScrollTrigger | undefined;
let media=gsap.matchMedia();
let refreshFrame=0;
const getStored=(key:string)=>{ try{return localStorage.getItem(key);}catch{return null;} };
const store=(key:string,value:string)=>{ try{localStorage.setItem(key,value);}catch{} };
motion.checked=getStored('rt:story-motion')!=='off';
const allowed=()=>motion.checked&&!reduce.matches;
const refresh=()=>{cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>ScrollTrigger.refresh());};
const update=(index:number)=>{
  current=Math.max(0,Math.min(panels.length-1,index));
  scene.dataset.activeProject=panels[current].dataset.project;
  previous.disabled=current===0;next.disabled=current===panels.length-1;
  steps.forEach((step,i)=>step.classList.toggle('is-active',i===current));
};
const rebuild=()=>{
  media.revert();trigger=undefined;
  scene.dataset.pinned='false';delete scene.dataset.pinStart;delete scene.dataset.pinEnd;
  html.dataset.motion=allowed()?'on':'off';
  motion.disabled=reduce.matches;
  buttons.hidden=!allowed();progress.hidden=!allowed();
  media=gsap.matchMedia();
  media.add('(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)',()=>{
    if(!allowed())return;
    scene.dataset.pinned='true';viewport.scrollLeft=0;
    const distance=()=>Math.max(0,track.scrollWidth-viewport.clientWidth);
    const tween=gsap.to(track,{
      x:()=>-distance(),ease:'none',
      scrollTrigger:{
        trigger:scene,pin:frame,start:()=>`top ${header.getBoundingClientRect().height}px`,
        end:()=>`+=${distance()}`,scrub:true,anticipatePin:1,invalidateOnRefresh:true,
        onUpdate:self=>update(Math.round(self.progress*(panels.length-1))),
        onRefresh:self=>{scene.dataset.pinStart=String(self.start);scene.dataset.pinEnd=String(self.end);}
      }
    });
    trigger=tween.scrollTrigger;
    return()=>{scene.dataset.pinned='false';trigger=undefined;};
  });
  update(current);refresh();
};
const select=(index:number,speak=true)=>{
  index=Math.max(0,Math.min(panels.length-1,index));
  if(trigger){
    const position=trigger.start+(trigger.end-trigger.start)*index/(panels.length-1);
    window.scrollTo({top:position,behavior:speak?'smooth':'instant'});
    if(!speak)ScrollTrigger.update();
  }else if(allowed())viewport.scrollTo({left:panels[index].offsetLeft-parseFloat(getComputedStyle(track).paddingLeft),behavior:speak?'smooth':'instant'});
  update(index);
  if(speak)announce.textContent=panels[index].querySelector('h3')!.textContent;
};
previous.addEventListener('click',()=>select(current-1),{signal});
next.addEventListener('click',()=>select(current+1),{signal});
viewport.addEventListener('scroll',()=>{
  if(trigger||!allowed())return;
  const gap=parseFloat(getComputedStyle(track).columnGap)||0;
  update(Math.round(viewport.scrollLeft/(panels[0].getBoundingClientRect().width+gap)));
},{signal,passive:true});
scene.addEventListener('keydown',event=>{
  if(!allowed()||!['ArrowLeft','ArrowRight'].includes(event.key)||(event.target as Element).matches('input'))return;
  event.preventDefault();select(current+(event.key==='ArrowLeft'?-1:1));
},{signal});
track.addEventListener('focusin',event=>{
  if(!trigger||restoring)return;
  const panel=(event.target as Element).closest<HTMLElement>('[data-story-panel]');
  if(panel){viewport.scrollLeft=0;select(panels.indexOf(panel),false);}
},{signal});
motion.addEventListener('change',()=>{store('rt:story-motion',motion.checked?'on':'off');rebuild();},{signal});
reduce.addEventListener('change',rebuild,{signal});
scene.querySelector<HTMLElement>('[data-motion-controls]')!.hidden=false;
theme.hidden=false;
theme.addEventListener('click',()=>{
  html.dataset.theme=html.dataset.theme==='dark'?'light':'dark';
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!.content=html.dataset.theme==='dark'?'#111214':'#ffffff';
  store('rt:story-theme',html.dataset.theme);
},{signal});
const headerSize=new ResizeObserver(()=>{
  html.style.setProperty('--header-height',`${header.getBoundingClientRect().height}px`);refresh();
});headerSize.observe(header);
const hero=document.querySelector<HTMLElement>('.hero')!;
const visible=new IntersectionObserver(entries=>hero.classList.toggle('is-visible',entries[0].isIntersecting));visible.observe(hero);
document.addEventListener('visibilitychange',()=>html.classList.toggle('is-hidden',document.hidden),{signal});
document.addEventListener('toggle',refresh,{signal,capture:true});
document.fonts.ready.then(refresh);
scene.querySelectorAll('img').forEach(image=>{if(!image.complete)image.addEventListener('load',refresh,{signal,once:true});});
rebuild();

const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const archive=document.querySelector<HTMLElement>('#archive')!;
const search=archive.querySelector<HTMLInputElement>('#project-search')!;
const entries=[...archive.querySelectorAll<HTMLElement>('[data-archive-project]')];
const rest=archive.querySelector<HTMLDetailsElement>('[data-archive-rest]')!;
const count=archive.querySelector<HTMLElement>('[data-project-count]')!;
const filter=(query:string)=>{
  const words=normalize(query).split(/\s+/).filter(Boolean);
  let matches=0;
  entries.forEach(entry=>{entry.hidden=!words.every(word=>normalize(entry.dataset.search??'').includes(word));if(!entry.hidden)matches++;});
  const hasRest=entries.slice(6).some(entry=>!entry.hidden);
  rest.hidden=!hasRest;rest.open=!!query&&hasRest;
  count.textContent=`${matches} ${en?(matches===1?'project':'projects'):(matches===1?'proyecto':'proyectos')}`;
  archive.querySelector<HTMLElement>('[data-archive-empty]')!.hidden=matches!==0;
  refresh();return matches;
};
archive.querySelector<HTMLElement>('[data-archive-search]')!.hidden=false;
search.addEventListener('input',()=>filter(search.value),{signal});
search.form!.addEventListener('submit',event=>event.preventDefault(),{signal});
search.value=returning?.query||'';filter(search.value);
if(returning)rest.open=returning.open;

const cleanupPrompt=initPrompt({signal,motion,reduce,refresh,restore:returning?.prompt});
// Native history restores before the pinned scene exists; restore after its layout is ready.
const restorePosition=(point:ReturnPoint)=>{
  cancelAnimationFrame(refreshFrame);ScrollTrigger.refresh();
  restoring=true;
  viewport.scrollLeft=point.rail;
  document.querySelectorAll<HTMLAnchorElement>('a').forEach(link=>{if(link.href===point.href&&link.getClientRects().length)link.focus({preventScroll:true});});
  window.scrollTo({top:point.y,behavior:'instant'});ScrollTrigger.update();restoring=false;
};
const initialHash=location.hash;
if(returning||initialHash)Promise.all([document.fonts.ready,...[...scene.querySelectorAll('img')].map(image=>image.decode().catch(()=>{}))]).then(()=>requestAnimationFrame(()=>{
  if(returning){restorePosition(returning);return;}
  const target=document.getElementById(initialHash.slice(1));
  if(target&&location.hash===initialHash){cancelAnimationFrame(refreshFrame);ScrollTrigger.refresh();target.scrollIntoView({block:'start',behavior:'instant'});ScrollTrigger.update();}
}));
window.addEventListener('pageshow',event=>{const point=returnPoint();if(event.persisted&&point)requestAnimationFrame(()=>restorePosition(point));},{signal});
document.addEventListener('click',event=>{
  const link=(event.target as Element).closest<HTMLAnchorElement>('a[href]');
  if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank')return;
  const url=new URL(link.href);if(url.origin!==location.origin||!/^\/(en|es)\/work\/[^/]+\/$/.test(url.pathname))return;
  const output=document.querySelector<HTMLElement>('[data-prompt-output]')!;
  const point:ReturnPoint={y:scrollY,rail:viewport.scrollLeft,query:search.value,open:rest.open,href:link.href};
  if(url.searchParams.get('from')==='prompt'&&output.dataset.query)point.prompt={query:output.dataset.query,topic:output.dataset.topic!};
  history.scrollRestoration='manual';history.replaceState({...history.state,rtProjectReturn:point},'');
},{signal,capture:true});
document.querySelectorAll<HTMLAnchorElement>('.languages a').forEach(anchor=>anchor.addEventListener('click',()=>{anchor.hash=location.hash;},{signal}));
window.addEventListener('pagehide',event=>{
  if(event.persisted)return;
  abort.abort();media.revert();headerSize.disconnect();visible.disconnect();cleanupPrompt();cancelAnimationFrame(refreshFrame);
},{once:true});
