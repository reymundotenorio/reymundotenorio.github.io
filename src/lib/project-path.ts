import type{Lang}from'../types';
export type ProjectOrigin='work'|'archive'|'prompt'|'ai';
export function projectHref(lang:Lang,id:string,from?:ProjectOrigin){return `/${lang}/work/${encodeURIComponent(id)}/${from?`?${new URLSearchParams({from})}`:''}`;}
