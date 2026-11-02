import type { ArchiveItem, Lang } from '../data/site';

export function projectPath(item: Pick<ArchiveItem, 'slug'>, lang: Lang): string {
  return `/${lang}/work/${item.slug}/`;
}
