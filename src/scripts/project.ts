const root=document.documentElement,abort=new AbortController(),signal=abort.signal;
const header=document.querySelector<HTMLElement>('[data-header]')!;
const theme=document.querySelector<HTMLButtonElement>('button[data-theme]')!;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const stored=(key:string)=>{try{return localStorage.getItem(key);}catch{return null;}};
const motion=()=>{root.dataset.motion=reduce.matches||stored('rt:story-motion')==='off'?'off':'on';};motion();
reduce.addEventListener('change',motion,{signal});
theme.hidden=false;theme.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!.content=root.dataset.theme==='dark'?'#111214':'#ffffff';try{localStorage.setItem('rt:story-theme',root.dataset.theme);}catch{}},{signal});
document.addEventListener('visibilitychange',()=>root.classList.toggle('is-hidden',document.hidden),{signal});
const size=new ResizeObserver(()=>root.style.setProperty('--header-height',`${header.getBoundingClientRect().height}px`));size.observe(header);
const from=new URL(location.href).searchParams.get('from');
const anchors:Record<string,string>={work:'work',archive:'archive',prompt:'name',ai:'ai-practice'};
let fromHome=false;
try{const referrer=new URL(document.referrer);fromHome=referrer.origin===location.origin&&['/','/en/','/es/'].includes(referrer.pathname);}catch{}
document.querySelectorAll<HTMLAnchorElement>('[data-project-back]').forEach(link=>{
  link.href=`/${document.body.dataset.lang}/#${from&&anchors[from]?anchors[from]:'archive'}`;
  link.addEventListener('click',event=>{if(from&&anchors[from]&&fromHome&&history.length>1&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();history.back();}},{signal});
});
document.querySelectorAll<HTMLAnchorElement>('.languages a').forEach(link=>{if(from&&anchors[from]){const url=new URL(link.href);url.searchParams.set('from',from);link.href=url.href;}});
window.addEventListener('pagehide',event=>{if(event.persisted)return;abort.abort();size.disconnect();},{once:true});
export{};
