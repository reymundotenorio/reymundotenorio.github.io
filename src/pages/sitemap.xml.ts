import type { APIRoute } from 'astro';
import { archiveItems } from '../data/site';
import { projectPath } from '../lib/project-paths';

export const GET: APIRoute = ({ site }) => {
  const routes = ['en', 'es'];
  const entries = routes.map((lang) => `<url><loc>${new URL(`/${lang}/`, site)}</loc>${routes.map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate}" href="${new URL(`/${alternate}/`, site)}" />`).join('')}</url>`);
  for (const item of archiveItems) for (const lang of ['en', 'es'] as const) {
    entries.push(`<url><loc>${new URL(projectPath(item, lang), site)}</loc>${(['en', 'es'] as const).map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate}" href="${new URL(projectPath(item, alternate), site)}" />`).join('')}</url>`);
  }
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
