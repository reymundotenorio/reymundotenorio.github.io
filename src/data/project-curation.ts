export const featuredProjectIds = ['duepulse', 'studio-ivl', 'pouch', 'depsaber'] as const;
const priority = new Map<string, number>([
  ...featuredProjectIds, 'nicasource', 'dele-peso-tools', 'claris-health', 'time-weaver'
].map((id, index) => [id, index]));

export function orderProjects<T extends { id: string }>(projects: readonly T[]): T[] {
  return [...projects].sort((a, b) =>
    (priority.get(a.id) ?? priority.size) - (priority.get(b.id) ?? priority.size)
  );
}
