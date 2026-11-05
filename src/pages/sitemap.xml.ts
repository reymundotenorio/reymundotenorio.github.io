import type{APIRoute}from'astro';
import corpus from'../data/profile.json';
import{projectHref}from'../lib/project-path';
import type{Lang}from'../types';
export const GET:APIRoute=({site})=>{
 const langs:Lang[]=['en','es'];
 const routes=langs.flatMap(lang=>[{path:`/${lang}/`,alternates:langs.map(code=>({lang:code,path:`/${code}/`}))},...corpus[lang].projects.map(project=>({path:projectHref(lang,project.id),alternates:langs.map(code=>({lang:code,path:projectHref(code,project.id)}))}))]);
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${routes.map(route=>`<url><loc>${new URL(route.path,site)}</loc>${route.alternates.map(alternate=>`<xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${new URL(alternate.path,site)}"/>`).join('')}</url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml'}});
};
