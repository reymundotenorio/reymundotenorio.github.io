import type { ArchiveItem } from './site';

const currentCapture = (slug: string, name: string): ArchiveItem['preview'] => ({
  src: `/images/projects/${slug}.webp`, width: 1440, height: 1080, type: 'current',
  alt: { en: `${name} current public website`, es: `Sitio público actual de ${name}` }
});

const archivedCapture = (slug: string, name: string): ArchiveItem['preview'] => ({
  src: `/images/projects/${slug}.webp`, width: 1000, height: 1200, type: 'archived',
  alt: { en: `${name} website`, es: `Website de ${name}` }
});

const freelanceCredit = {
  en: 'Freelance website development, with visual design supplied for implementation.',
  es: 'Desarrollo web freelance, a partir de un diseño visual proporcionado para su implementación.'
};

const ivlCapture = (file: string, screen: { en: string; es: string }): NonNullable<ArchiveItem['preview']> => ({
  src: `/images/projects/${file}.webp`, width: 780, height: 1387, type: 'store',
  alt: { en: `Studio IVL app · ${screen.en}`, es: `App Studio IVL · ${screen.es}` },
  caption: screen
});

const pouchCapture = (file: string, screen: { en: string; es: string }): NonNullable<ArchiveItem['preview']> => ({
  src: `/images/projects/${file}.webp`, width: 1680, height: 1050, type: 'demo',
  alt: { en: `Pouch Portal · ${screen.en} with example data`, es: `Pouch Portal · ${screen.es} con datos de ejemplo` },
  caption: screen
});

export const clientProjects: ArchiveItem[] = [
  {
    slug: 'nicasource', name: 'Nicasource', kind: 'website', category: 'web', featured: true,
    url: 'https://nicasource.com/', linkKind: 'website',
    source: { en: 'Nicasource · team project', es: 'Nicasource · trabajo en equipo' },
    role: { en: 'Website development', es: 'Desarrollo web' },
    summary: { en: 'A company website built with a custom WordPress and React theme, as part of the Nicasource team.', es: 'Website corporativo con un tema WordPress y React a medida, como parte del equipo de Nicasource.' },
    details: { en: ['Custom website implementation combining WordPress-managed content and React components.', 'Reusable page modules and a frontend workflow using Vite and Tailwind CSS.', 'Delivered as part of the Nicasource development team.'], es: ['Implementación a medida que combina contenido administrado en WordPress y componentes React.', 'Módulos reutilizables y flujo frontend con Vite y Tailwind CSS.', 'Desarrollo como parte del equipo de Nicasource.'] },
    credit: { en: 'Built with the Nicasource team.', es: 'Desarrollado con el equipo de Nicasource.' },
    stack: ['WordPress', 'React', 'Vite', 'Tailwind CSS', 'PHP'], preview: currentCapture('nicasource', 'Nicasource')
  },
  {
    slug: 'enerwize', name: 'Enerwize', kind: 'website', category: 'web', featured: true,
    url: 'https://enerwize.agency/', linkKind: 'website',
    source: { en: 'Agency website · custom theme', es: 'Website de agencia · tema a medida' },
    role: { en: 'Custom WordPress development', es: 'Desarrollo WordPress a medida' },
    summary: { en: 'A custom WordPress website for a branding, web development and SEO agency.', es: 'Website WordPress a medida para una agencia de branding, desarrollo web y SEO.' },
    details: { en: ['Developed the Enerwize WordPress theme.', 'Implemented the agency website around its branding, services, process and contact sections.'], es: ['Desarrollo del tema WordPress de Enerwize.', 'Implementación del website con secciones de marca, servicios, proceso y contacto.'] },
    stack: ['WordPress', 'PHP', 'JavaScript', 'CSS'], preview: currentCapture('enerwize', 'Enerwize')
  },
  {
    slug: 'claris-health', name: 'Claris Health', kind: 'website', category: 'web', featured: true,
    url: 'https://www.clarishealth.org/', linkKind: 'website',
    source: { en: 'Healthcare website', es: 'Website de salud' },
    role: { en: 'Website development', es: 'Desarrollo web' },
    summary: { en: 'Website development for Claris Health, supporting its public-facing services and content.', es: 'Desarrollo del website de Claris Health, para presentar sus servicios y contenido público.' },
    details: { en: ['Contributed to the development of the Claris Health website.', 'WordPress website work, with services and organization content managed through the CMS.'], es: ['Contribución al desarrollo del website de Claris Health.', 'Desarrollo en WordPress, con contenido de servicios y de la organización administrado desde el CMS.'] },
    stack: ['WordPress', 'PHP', 'JavaScript', 'CSS'], preview: currentCapture('claris-health', 'Claris Health')
  },
  {
    slug: 'ariel-law', name: 'Ariel Law Group', kind: 'website', category: 'web', featured: true,
    url: 'https://ariellawgroup.com/', linkKind: 'website',
    source: { en: 'Freelance · legal website', es: 'Freelance · website legal' },
    role: { en: 'WordPress website development', es: 'Desarrollo de website WordPress' },
    summary: { en: 'A custom WordPress website developed for Ariel Law Group.', es: 'Website WordPress a medida desarrollado para Ariel Law Group.' },
    details: { en: ['Implemented the custom Ariel Law Group theme.', 'Built pages for legal services, firm information and consultation requests.'], es: ['Implementación del tema a medida de Ariel Law Group.', 'Desarrollo de páginas de servicios legales, información del despacho y solicitudes de consulta.'] },
    credit: freelanceCredit, stack: ['WordPress', 'PHP', 'HTML', 'CSS'], preview: archivedCapture('ariel-law', 'Ariel Law Group')
  },
  {
    slug: 'hartunian-law', name: 'Hartunian Law Firm', kind: 'website', category: 'web', featured: true,
    url: 'https://hartunianlaw.com/', linkKind: 'website',
    source: { en: 'Freelance · legal website', es: 'Freelance · website legal' },
    role: { en: 'Website development', es: 'Desarrollo web' },
    summary: { en: 'Legal-services website development for Hartunian Law Firm.', es: 'Desarrollo del website de servicios legales de Hartunian Law Firm.' },
    details: { en: ['Developed the legal-services website.', 'Implemented the firm presentation, practice areas and consultation calls to action.'], es: ['Desarrollo del website de servicios legales.', 'Implementación de la presentación del despacho, sus áreas de práctica y las llamadas a consulta.'] },
    credit: freelanceCredit, stack: ['Web development', 'HTML', 'CSS', 'JavaScript'], preview: archivedCapture('hartunian-law', 'Hartunian Law Firm')
  },
  {
    slug: 'caban-pools', name: 'Caban Pools', kind: 'website', category: 'web', featured: true,
    source: { en: 'Freelance · services website', es: 'Freelance · website de servicios' },
    role: { en: 'Custom WordPress development', es: 'Desarrollo WordPress a medida' },
    summary: { en: 'A custom WordPress website for a pool-services business.', es: 'Website WordPress a medida para una empresa de servicios de piscinas.' },
    details: { en: ['Implemented the custom Caban Pools WordPress theme.', 'Built service pages, project galleries and contact sections.'], es: ['Implementación del tema WordPress a medida de Caban Pools.', 'Desarrollo de páginas de servicios, galerías de proyectos y secciones de contacto.'] },
    credit: freelanceCredit, stack: ['WordPress', 'PHP', 'HTML', 'CSS'], preview: archivedCapture('caban-pools', 'Caban Pools')
  },
  {
    slug: 'fit-factory', name: 'Fit Factory Studio', kind: 'website', category: 'web',
    source: { en: 'Freelance · fitness website', es: 'Freelance · website fitness' },
    role: { en: 'Custom WordPress development', es: 'Desarrollo WordPress a medida' },
    summary: { en: 'A custom WordPress website for Fit Factory Studio.', es: 'Website WordPress a medida de Fit Factory Studio.' },
    details: { en: ['Developed the FitFactory WordPress theme.', 'Implemented studio and training-program pages.'], es: ['Desarrollo del tema WordPress FitFactory.', 'Implementación de páginas del estudio y de sus programas de entrenamiento.'] },
    credit: freelanceCredit, stack: ['WordPress', 'PHP', 'HTML', 'CSS'], preview: archivedCapture('fit-factory', 'Fit Factory Studio')
  },
  {
    slug: 'sapetto-law', name: 'Sapetto Law', kind: 'website', category: 'web',
    source: { en: 'Freelance · legal website', es: 'Freelance · website legal' },
    role: { en: 'Custom WordPress development', es: 'Desarrollo WordPress a medida' },
    summary: { en: 'A custom WordPress website for Sapetto Law.', es: 'Website WordPress a medida para Sapetto Law.' },
    details: { en: ['Developed the SapettoLaw WordPress theme.', 'Implemented service pages, firm information and consultation sections.'], es: ['Desarrollo del tema WordPress SapettoLaw.', 'Implementación de páginas de servicios, información del despacho y secciones de consulta.'] },
    credit: freelanceCredit, stack: ['WordPress', 'PHP', 'HTML', 'CSS'], preview: archivedCapture('sapetto-law', 'Sapetto Law')
  },
  {
    slug: 'agency-platform', name: 'Agency website · Headless WordPress', nameEs: 'Website de agencia · WordPress headless', kind: 'website', category: 'web',
    source: { en: 'Freelance · agency website', es: 'Freelance · website de agencia' },
    role: { en: 'React and headless WordPress development', es: 'Desarrollo React y WordPress headless' },
    summary: { en: 'A headless agency website built with React, Frontity and WordPress.', es: 'Website headless de agencia desarrollado con React, Frontity y WordPress.' },
    details: { en: ['Implemented agency pages and portfolio presentation in a custom Frontity theme.', 'Connected the React frontend to WordPress content.'], es: ['Implementación de páginas y portafolio de la agencia en un tema Frontity a medida.', 'Conexión del frontend React con el contenido de WordPress.'] },
    credit: freelanceCredit, stack: ['React', 'Frontity', 'WordPress', 'Sass']
  },
  {
    slug: 'asher-asher', name: 'Asher & Asher Consulting', kind: 'website', category: 'web',
    source: { en: 'Freelance · consulting website', es: 'Freelance · website de consultoría' },
    role: { en: 'WordPress theme development', es: 'Desarrollo de tema WordPress' },
    summary: { en: 'A custom WordPress theme for the Asher & Asher Consulting website.', es: 'Tema WordPress a medida para el website de Asher & Asher Consulting.' },
    details: { en: ['Developed the custom Asher WordPress theme.'], es: ['Desarrollo del tema WordPress Asher a medida.'] },
    credit: freelanceCredit, stack: ['WordPress', 'PHP', 'CSS']
  },
  {
    slug: 'willow-creek', name: 'Willow Creek Productions', kind: 'website', category: 'web',
    source: { en: 'Freelance · production website', es: 'Freelance · website de producción' },
    role: { en: 'WordPress theme development', es: 'Desarrollo de tema WordPress' },
    summary: { en: 'Custom WordPress theme development for Willow Creek Productions.', es: 'Desarrollo de un tema WordPress a medida para Willow Creek Productions.' },
    details: { en: ['Implemented the custom WillowCreekProductions WordPress theme.'], es: ['Implementación del tema WordPress WillowCreekProductions a medida.'] },
    credit: freelanceCredit, stack: ['WordPress', 'PHP', 'CSS']
  },
  {
    slug: 'microtec', name: 'Microtec', kind: 'website', category: 'web',
    source: { en: 'Client work · website maintenance', es: 'Trabajo para cliente · mantenimiento web' },
    role: { en: 'Website updates and maintenance', es: 'Actualizaciones y mantenimiento web' },
    summary: { en: 'Updates and maintenance on an existing WordPress website.', es: 'Actualizaciones y mantenimiento de un website WordPress existente.' },
    details: { en: ['Maintained and updated the existing site within its established theme and content structure.', 'The contribution is website maintenance, not the original visual design.'], es: ['Mantenimiento y actualizaciones dentro del tema y la estructura de contenido existentes.', 'La contribución corresponde al mantenimiento web, no al diseño visual original.'] },
    stack: ['WordPress', 'PHP', 'CSS']
  },
  {
    slug: 'column-five', name: 'Column Five', kind: 'website', category: 'web',
    url: 'https://www.columnfivemedia.com/', linkKind: 'website',
    source: { en: 'Website contributions', es: 'Contribuciones web' },
    role: { en: 'WordPress development and content systems', es: 'Desarrollo WordPress y sistemas de contenido' },
    summary: { en: 'Scoped WordPress development for service pages, reusable content modules and case-study workflows.', es: 'Desarrollo WordPress enfocado en páginas de servicios, módulos reutilizables y flujos de casos de estudio.' },
    details: { en: ['Implemented a reusable service-page builder with ACF modules and editor previews.', 'Worked on service-page rendering, structured data and responsive behavior.', 'These are contributions to an existing team-built website; not authorship of the entire site.'], es: ['Implementación de un constructor de páginas de servicio con módulos ACF y vistas previas en el editor.', 'Trabajo en renderizado, datos estructurados y comportamiento responsive de servicios.', 'Son contribuciones a un website existente desarrollado en equipo, no autoría del sitio completo.'] },
    credit: { en: 'Current site and release state may differ from the implementation described.', es: 'El sitio actual y su estado de publicación pueden diferir de la implementación descrita.' },
    stack: ['WordPress', 'ACF', 'PHP', 'JavaScript', 'Structured data'], preview: currentCapture('column-five', 'Column Five')
  },
  {
    slug: 'super-star-car-wash', name: 'Super Star Car Wash', kind: 'website', category: 'web',
    url: 'https://www.superstarcarwashaz.com/', linkKind: 'website',
    source: { en: 'Website contributions', es: 'Contribuciones web' },
    role: { en: 'WordPress maintenance and integrations', es: 'Mantenimiento e integraciones WordPress' },
    summary: { en: 'Website maintenance and integration work within the Super Star Car Wash team.', es: 'Mantenimiento e integraciones web como parte del equipo de Super Star Car Wash.' },
    details: { en: ['Worked on WordPress functionality and integrations in the existing website.', 'Implemented form-event integration between an embedded SMS experience and the parent analytics data layer.', 'The contribution is scoped development within the team, not the original design of the whole website.'], es: ['Trabajo en funcionalidad WordPress e integraciones del website existente.', 'Implementación de eventos de formularios entre una experiencia SMS embebida y el data layer de analítica.', 'La contribución es desarrollo dentro del equipo, no el diseño original del sitio completo.'] },
    stack: ['WordPress', 'PHP', 'JavaScript', 'Analytics integrations'], preview: currentCapture('super-star-car-wash', 'Super Star Car Wash')
  },
  {
    slug: 'studio-ivl', name: 'Studio IVL · IVL Collective', kind: 'application', category: 'mobile', status: 'private',
    source: { en: 'Mobile application · built from scratch', es: 'Aplicación móvil · creada desde cero' },
    role: { en: 'Mobile application development from scratch', es: 'Desarrollo de la aplicación móvil desde cero' },
    summary: { en: 'Built the IVL Collective fitness app from scratch with React Native, bringing workout discovery, video classes and scheduling into one mobile experience.', es: 'Creé la app fitness de IVL Collective desde cero con React Native, integrando exploración de entrenamientos, clases en video y agenda en una experiencia móvil.' },
    details: { en: ['Built the mobile application from the ground up with React Native and Expo, including its screen structure and navigation.', 'Class discovery, instructor pages, schedules, favorites and video playback.', 'Profile, membership and notification experiences, with supporting CMS and backend projects.'], es: ['Desarrollo de la aplicación móvil desde cero con React Native y Expo, incluyendo la estructura de pantallas y la navegación.', 'Exploración de clases, instructores, agenda, favoritos y reproducción de video.', 'Experiencias de perfil, membresía y notificaciones, con proyectos de CMS y backend de soporte.'] },
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Video'],
    preview: ivlCapture('ivl-classes', { en: 'On-demand classes', es: 'Clases on-demand' }),
    gallery: [ivlCapture('ivl-class-details', { en: 'Class details', es: 'Detalle de clase' }), ivlCapture('ivl-favorites', { en: 'Favorite classes', es: 'Clases favoritas' })]
  },
  {
    slug: 'pouch', name: 'Pouch · Shipping & tracking', nameEs: 'Pouch · Envíos y seguimiento', kind: 'application', category: 'product-systems', status: 'private',
    source: { en: 'Freelance · shipping platform', es: 'Freelance · plataforma de envíos' },
    role: { en: 'Full-stack application development', es: 'Desarrollo full-stack de la aplicación' },
    summary: { en: 'A complete shipping and tracking application built as a freelance engagement. Originally called Portal, the product is now known as Pouch.', es: 'Aplicación completa de envíos y seguimiento desarrollada como proyecto freelance. El producto, antes llamado Portal, hoy se conoce como Pouch.' },
    details: { en: ['Developed the complete shipping and tracking application, supporting API and webhook services.', 'Package reception, shipping alerts, invoices, manifests and dispatch receipts.', 'Customer and agency management, role-based administration, package identification and location, and operational statistics.', 'Load calculation and import/export declaration workflows.'], es: ['Desarrollo de la aplicación completa de envíos y seguimiento, su API y servicios webhook.', 'Recepción de paquetes, alertas de envío, facturas, manifiestos y recibos de despacho.', 'Gestión de clientes y agencias, administración por roles, identificación y localización de paquetes y estadísticas operativas.', 'Cálculo de carga y flujos de declaraciones de importación y exportación.'] },
    credit: { en: 'Screens from Portal, the earlier version of Pouch. Example data only.', es: 'Pantallas de Portal, la versión anterior de Pouch. Solo datos de ejemplo.' },
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Node.js', 'Express'],
    preview: pouchCapture('pouch-receptions', { en: 'Shipment history', es: 'Historial de envíos' }),
    gallery: [pouchCapture('pouch-details', { en: 'Package details', es: 'Detalle de paquete' })]
  },
  {
    slug: 'myroadmap', name: 'MyRoadmap', category: 'product-systems', kind: 'archive',
    source: { en: 'Historical product work', es: 'Trabajo histórico de producto' },
    role: { en: 'Development contribution', es: 'Contribución de desarrollo' },
    summary: { en: 'Development contribution to the former MyRoadmap product.', es: 'Contribución de desarrollo al producto MyRoadmap.' },
    details: { en: ['A historical product engagement. The original public service is no longer available.'], es: ['Proyecto histórico de producto. El servicio público original ya no está disponible.'] },
    stack: []
  }
];
