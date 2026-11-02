import type { Lang, ProjectMedia } from '../data/site';

const labels: Record<Lang, Record<ProjectMedia['type'], string>> = {
  en: { current: 'Current public site', archived: 'Project archive', artwork: 'Original project artwork', demo: 'Original UI · demo data', store: 'Archived promotional screens' },
  es: { current: 'Sitio público actual', archived: 'Archivo del proyecto', artwork: 'Arte original del proyecto', demo: 'Interfaz original · datos ficticios', store: 'Capturas promocionales de archivo' }
};

export function projectMediaLabel(media: ProjectMedia, lang: Lang, detailed = false): string {
  if (detailed && media.caption) return media.caption[lang];
  if (detailed && media.type === 'current') return lang === 'en' ? 'Public website capture · November 2026' : 'Captura del sitio público · noviembre 2026';
  return labels[lang][media.type];
}
