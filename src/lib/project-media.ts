import type { Lang, ProjectMedia } from '../data/site';

const labels: Record<Lang, Record<ProjectMedia['type'], string>> = {
  en: { current: 'Website', archived: 'Historical website', restored: 'Historical website', demo: 'App · demo data', store: 'Mobile app', concept: 'Concept' },
  es: { current: 'Sitio web', archived: 'Website histórico', restored: 'Website histórico', demo: 'App · datos de ejemplo', store: 'App móvil', concept: 'Concepto' }
};

export function projectMediaLabel(media: ProjectMedia, lang: Lang, detailed = false): string {
  if (media.type === 'concept' && detailed) return lang === 'en' ? 'Concept illustration' : 'Ilustración conceptual';
  if (detailed && media.caption) return media.caption[lang];
  return labels[lang][media.type];
}
