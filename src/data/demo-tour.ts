import { featuredProjectIds } from './project-curation.ts';
type Lang='en'|'es';
export type DemoEntry={key:string;query:string};
const appIds=[...featuredProjectIds.slice(1),'time-weaver'];
const webIds=['nicasource','claris-health','enerwize','better-nice-produce'];
const queries:Record<Lang,Record<string,string>>={
 en:{duepulse:'Show me DuePulse','studio-ivl':'What did you build for IVL Collective?',pouch:'Show me the shipping portal',depsaber:'Show me DepSaber','time-weaver':'How does TimeWeaver automate work?',nicasource:'Show me the Nicasource website','claris-health':'Show me Claris Health',enerwize:'Show me Enerwize','better-nice-produce':'Show me Better & Nice Produce',toolkit:'Your full tech stack',ai:'How do you use AI in your work?',experience:'Your engineering experience'},
 es:{duepulse:'Muéstrame DuePulse','studio-ivl':'¿Qué creaste para IVL Collective?',pouch:'Muéstrame el portal de envíos',depsaber:'Muéstrame DepSaber','time-weaver':'¿Cómo automatiza el trabajo TimeWeaver?',nicasource:'Muéstrame el sitio de Nicasource','claris-health':'Muéstrame Claris Health',enerwize:'Muéstrame Enerwize','better-nice-produce':'Muéstrame Better & Nice Produce',toolkit:'Tu stack tecnológico completo',ai:'¿Cómo aplicas IA en tu trabajo?',experience:'Tu experiencia en ingeniería'}
};
function bag(values:string[],random:()=>number){
 let queue:string[]=[...values],last='';
 return()=>{if(!queue.length){queue=[...values];for(let i=queue.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[queue[i],queue[j]]=[queue[j],queue[i]];}if(queue[0]===last)[queue[0],queue[1]]=[queue[1],queue[0]];}last=queue.shift()!;return last;};
}
export function createDemoTour(lang:Lang,random:()=>number=Math.random){
 const app=bag(appIds,random),web=bag(webIds,random);let pickApp=true;
 const entry=(id:string):DemoEntry=>({key:['toolkit','ai','experience'].includes(id)?id:`project-${id}`,query:queries[lang][id]});
 return{
  allEntries:Object.keys(queries[lang]).map(entry),
  nextRound:()=>['duepulse',app(),'toolkit','ai',web(),'experience'].map(entry),
  nextProject:()=>{const id=pickApp?app():web();pickApp=!pickApp;return entry(id);}
 };
}
