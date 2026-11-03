import type { ArchiveItem, ProjectMedia } from './site';

const concept = (slug: string, subject: { en: string; es: string }): ProjectMedia => ({
  src: `/images/projects/${slug}-concept.webp`, width: 1586, height: 992, type: 'concept',
  alt: { en: `Concept illustration: ${subject.en}`, es: `Ilustración conceptual: ${subject.es}` }
});

const frontend = (slug: string, name: string): ProjectMedia => ({
  src: `/images/projects/${slug}.webp`, width: 1440, height: 1100, type: 'restored',
  alt: { en: `${name} homepage`, es: `Inicio de ${name}` },
  caption: { en: 'Homepage', es: 'Inicio' }
});

const projectVisuals: Record<string, Pick<ArchiveItem, 'preview' | 'gallery'>> = {
  'agency-platform': { preview: concept('agency-platform', { en: 'Headless website architecture and connected content modules', es: 'Arquitectura web headless y módulos de contenido conectados' }) },
  'asher-asher': { preview: frontend('asher-asher', 'Asher & Asher Consulting') },
  'willow-creek': { preview: frontend('willow-creek', 'Willow Creek Productions') },
  microtec: { preview: concept('microtec', { en: 'Website maintenance and modular updates', es: 'Mantenimiento web y actualizaciones modulares' }) },
  myroadmap: { preview: concept('myroadmap', { en: 'A product roadmap with connected milestones', es: 'Una ruta de producto con hitos conectados' }) },
  duepulse: {
    preview: {
      src: '/images/projects/duepulse-home.webp', width: 1440, height: 1000, type: 'current',
      alt: { en: 'DuePulse product website in dark mode', es: 'Website de DuePulse en modo oscuro' },
      caption: { en: 'Product website', es: 'Website del producto' }
    },
    gallery: [{
      src: '/images/projects/duepulse-product.webp', width: 1380, height: 644, type: 'current',
      alt: { en: 'DuePulse public overview of payment review and reminders', es: 'Presentación pública de DuePulse sobre revisión de pagos y avisos' },
      caption: { en: 'Product overview', es: 'Vista del producto' }
    }]
  },
  depsaber: {
    preview: {
      src: '/images/projects/depsaber-console.webp', width: 1440, height: 1100, type: 'demo',
      alt: { en: 'DepSaber report console with its public sample report', es: 'Consola de reportes de DepSaber con su reporte público de ejemplo' },
      caption: { en: 'Report console · sample report', es: 'Consola de reportes · ejemplo' }
    },
    gallery: [{
      src: '/images/projects/depsaber-site.webp', width: 1440, height: 1100, type: 'current',
      alt: { en: 'DepSaber public project website', es: 'Website público del proyecto DepSaber' },
      caption: { en: 'Project website', es: 'Website del proyecto' }
    }]
  },
  'time-weaver': { preview: concept('time-weaver', { en: 'Code and calendar activity flowing into timesheet automation', es: 'Actividad de código y calendario conectada con la automatización de horas' }) },
  'uni-sciences-systems': { preview: concept('uni-sciences-systems', { en: 'Connected knowledge and engineering systems', es: 'Conocimiento conectado y sistemas de ingeniería' }) },
  'tpf-supervisor': { preview: concept('tpf-supervisor', { en: 'Staff shift planning, attendance and hours ledgers', es: 'Planificación de turnos, asistencia y registro de horas' }) },
  'editorial-pwa': { preview: concept('editorial-pwa', { en: 'Editorial publishing transformed into a mobile PWA', es: 'Publicación editorial transformada en una PWA móvil' }) },
  'better-nice-produce': { preview: concept('better-nice-produce', { en: 'Produce inventory, ecommerce and distribution', es: 'Inventario, ecommerce y distribución de productos agrícolas' }) },
  'steps-veterinary': { preview: frontend('steps-veterinary', 'Steps Clínica Veterinaria') },
  'license-key-generator': { preview: concept('license-key-generator', { en: 'Device-bound software licensing and authorization', es: 'Licencias de software y autorización vinculadas a dispositivos' }) },
  'voces-del-sur': { preview: concept('voces-del-sur', { en: 'Regional reporting and press freedom in Latin America', es: 'Reportes regionales y libertad de prensa en América Latina' }) },
  'farmacia-josefina': { preview: concept('farmacia-josefina', { en: 'Pharmacy inventory and billing operations', es: 'Inventario y facturación de farmacia' }) },
  nicaventura: { preview: concept('nicaventura', { en: 'A tourism journey through lakes and volcanic landscapes', es: 'Un recorrido turístico por lagos y paisajes volcánicos' }) }
};

export function withProjectVisuals(items: ArchiveItem[]): ArchiveItem[] {
  return items.map((item) => item.preview ? item : { ...item, ...projectVisuals[item.slug] });
}
