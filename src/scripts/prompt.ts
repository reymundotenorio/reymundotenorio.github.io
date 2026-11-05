import {createDemoTour}from'../data/demo-tour';
type Options={signal:AbortSignal;motion:HTMLInputElement;reduce:MediaQueryList;refresh:()=>void;restore?:{query:string;topic:string}};
export function initPrompt({signal,motion,reduce,refresh,restore}:Options){
  const en=document.body.dataset.lang==='en';
  const form=document.querySelector<HTMLFormElement>('[data-command]')!;
  const input=form.querySelector<HTMLInputElement>('input')!;
  const output=document.querySelector<HTMLElement>('[data-prompt-output]')!;
  const body=output.querySelector<HTMLElement>('[data-answer-body]')!;
  const title=output.querySelector<HTMLElement>('[data-answer-title]')!;
  const more=output.querySelector<HTMLAnchorElement>('[data-answer-more]')!;
  const status=document.querySelector<HTMLElement>('[data-command-status]')!;
  const toggle=output.querySelector<HTMLButtonElement>('[data-demo-toggle]')!;
  const index: {id:string;name:string;stack:string}[]=JSON.parse(document.querySelector('[data-answer-index]')!.textContent!);
  const templates=new Map([...document.querySelectorAll<HTMLTemplateElement>('[data-answer-template]')].map(t=>[t.dataset.answerTemplate!,t]));
  const tour=createDemoTour(en?'en':'es');let round=tour.nextRound();
  const publishRound=()=>{output.dataset.demoDeck=round.map(entry=>entry.key).join(',');};publishRound();
  const normalize=(text:string)=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9+#.]+/g,' ').trim();
  const aliases:[RegExp,string][]=[[/\bdele peso|financial (tools|calculators)|herramientas financieras/,'dele-peso-tools'],[/\bsteps\b|veterinary|clinica veterinaria/,'steps-veterinary'],[/\bivl\b/,'studio-ivl'],[/\bduepulse\b|\bduepluse\b/,'duepulse'],[/\bpouch\b|\bportal\b/,'pouch'],[/\bbanp\b|better.*nice.*produce/,'better-nice-produce']];
  const topics:[RegExp,string][]=[
    [/courses|cursos|certific|learning|formacion|education|educacion/,'learning'],
    [/\b(ai|ia|llm|codex|claude|cursor|openai)\b|artificial intelligence|inteligencia artificial/,'ai'],
    [/experience|experiencia|leadership|liderazgo|career|trayectoria/,'experience'],
    [/skills|stack|languages|lenguajes|tecnologias|habilidades|toolkit|plantillas|templates|databases|bases de datos|tools|herramientas/,'toolkit'],
    [/recognition|reconocimiento|awards|premios|honors|workshops|talleres/,'recognition'],
    [/contact|linkedin|github|contratar|hire/,'contact'],
    [/about|quien|who are|biografia/,'about'],
    [/websites|sitios web|paginas web/,'websites'],
    [/systems|sistemas|automation|automatiza/,'systems'],
    [/apps|applications|aplicaciones|products|productos|projects|proyectos/,'apps']
  ];
  const resolve=(query:string)=>{
    const text=normalize(query);if(/\b(surprise|random|sorprendeme|aleatorio)\b|discover a project|descubrir un proyecto/.test(text))return tour.nextProject().key;
    const alias=aliases.find(([pattern])=>pattern.test(text));if(alias)return `project-${alias[1]}`;
    const named=index.find(project=>{const name=normalize(project.name);return text===name||text.includes(name);});if(named)return `project-${named.id}`;
    const topic=topics.find(([pattern])=>pattern.test(text));if(topic)return topic[1];
    const words=text.replace(/\b(show|me|your|my|the|all|muestrame|tus|todos|todas|los|las|de|con|with|tell|about|what|have|you|done|que|has|hecho|en)\b/g,' ').split(/\s+/).filter(Boolean);
    return words.length?index.find(project=>words.every(word=>normalize(`${project.name} ${project.stack}`).includes(word)))?.id.replace(/^/,'project-'):undefined;
  };
  const render=(query:string,automatic=false,key=resolve(query))=>{
    const template=key?templates.get(key):undefined;
    if(!template){status.textContent=en?'No matching projects found.':'No encontré proyectos que coincidan.';return;}
    body.replaceChildren(template.content.cloneNode(true));title.textContent=template.dataset.title!;
    more.href=template.dataset.href||`#${template.dataset.target}`;more.firstChild!.textContent=en?'Explore in detail ':'Explorar en detalle ';
    output.dataset.topic=key;output.dataset.query=query;status.textContent='';
    if(!automatic)output.querySelector<HTMLElement>('[data-answer-announcement]')!.textContent=title.textContent;
    if(motion.checked&&!reduce.matches)body.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:190,easing:'ease-out'});
    refresh();
  };
  let measureFrame=0;
  const measure=()=>{
    const probe=document.createElement('div');probe.className='answer-probe';probe.setAttribute('aria-hidden','true');probe.style.width=`${body.clientWidth}px`;output.append(probe);
    let height=0;
    for(const entry of tour.allEntries){const template=templates.get(entry.key);if(template){probe.replaceChildren(template.content.cloneNode(true));height=Math.max(height,probe.getBoundingClientRect().height);}}
    probe.remove();output.style.setProperty('--answer-size',`${Math.ceil(height)+8}px`);refresh();
  };
  const measureSoon=()=>{cancelAnimationFrame(measureFrame);measureFrame=requestAnimationFrame(measure);};
  document.fonts.ready.then(measureSoon);window.addEventListener('resize',measureSoon,{signal});
  let manual=false,userPaused=false,offscreen=false,scrolling=false,step=0,characters=0,cycle=0;
  // Passive pauses preserve the pending phase; real input cancels it permanently until Play.
  let timer:ReturnType<typeof setTimeout>|undefined,scrollTimer:ReturnType<typeof setTimeout>|undefined;
  let pending:(()=>void)|undefined,remaining=0,deadline=0;
  const canRun=()=>!manual&&!userPaused&&!offscreen&&!scrolling&&!document.hidden&&motion.checked&&!reduce.matches;
  const sync=()=>{
    const active=canRun();
    output.dataset.demoState=manual?'manual':(!motion.checked||reduce.matches)?'disabled':active?'auto':'paused';
    const paused=!active;toggle.disabled=!motion.checked||reduce.matches;
    const label=paused?(en?'Play demo':'Reproducir demo'):(en?'Pause demo':'Pausar demo');toggle.setAttribute('aria-label',label);toggle.dataset.tooltip=label;
    output.querySelector<HTMLElement>('[data-demo-pause]')!.hidden=paused;output.querySelector<HTMLElement>('[data-demo-play]')!.hidden=!paused;
    output.querySelector<HTMLElement>('[data-demo-label]')!.textContent=manual?(en?'Your query':'Tu consulta'):(en?'Demo':'Demo');
    if(!active&&timer!==undefined){clearTimeout(timer);timer=undefined;remaining=Math.max(0,deadline-performance.now());}
    if(active&&pending&&timer===undefined){deadline=performance.now()+remaining;timer=setTimeout(()=>{timer=undefined;const next=pending;pending=undefined;next?.();},remaining);}
  };
  const schedule=(next:()=>void,delay:number)=>{clearTimeout(timer);timer=undefined;pending=next;remaining=delay;sync();};
  const type=()=>{
    const entry=round[step];input.value=entry.query.slice(0,characters++);
    if(characters<=entry.query.length)schedule(type,24);
    else{form.dataset.enter='true';schedule(()=>{form.dataset.enter='false';render(entry.query,true);output.dataset.cycle=String(++cycle);schedule(()=>{step++;if(step===round.length){step=0;round=tour.nextRound();publishRound();}characters=0;type();},3000);},240);}
  };
  const takeControl=(clear=true)=>{if(!manual){if(clear)input.value='';manual=true;pending=undefined;clearTimeout(timer);timer=undefined;form.dataset.enter='false';sync();}};
  form.addEventListener('focusin',event=>takeControl(event.target===input),{signal});
  input.addEventListener('compositionstart',()=>takeControl(false),{signal});input.addEventListener('input',()=>takeControl(false),{signal});
  form.addEventListener('submit',event=>{event.preventDefault();manual=true;pending=undefined;clearTimeout(timer);timer=undefined;sync();if(input.value.trim())render(input.value);},{signal});
  document.addEventListener('click',event=>{
    const link=(event.target as Element).closest<HTMLAnchorElement>('[data-prompt-query]');
    if(!link||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();takeControl();input.value=link.dataset.promptText||link.dataset.promptQuery!;render(input.value);
  },{signal,capture:true});
  toggle.addEventListener('click',()=>{
    if(manual){manual=false;userPaused=false;characters=0;cycle=0;step=0;round=tour.nextRound();publishRound();schedule(type,200);}
    else{userPaused=!userPaused;sync();}
  },{signal});
  output.addEventListener('click',event=>{if((event.target as Element).closest('a'))takeControl();},{signal});
  motion.addEventListener('change',sync,{signal});reduce.addEventListener('change',sync,{signal});document.addEventListener('visibilitychange',sync,{signal});
  window.addEventListener('scroll',()=>{scrolling=true;sync();clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{scrolling=false;sync();},160);},{signal,passive:true});
  const observer=new IntersectionObserver(entries=>{offscreen=!entries[0].isIntersecting;sync();},{threshold:.2});observer.observe(form);
  form.hidden=false;output.hidden=false;sync();schedule(type,700);
  if(restore){takeControl(false);input.value=restore.query;render(restore.query,false,restore.topic);}
  return()=>{observer.disconnect();clearTimeout(timer);clearTimeout(scrollTimer);cancelAnimationFrame(measureFrame);};
}
