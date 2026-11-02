import type { ArchiveItem } from './site';

const currentCapture = (slug: string, name: string): ArchiveItem['preview'] => ({
  src: `/images/projects/${slug}.webp`, width: 1440, height: 1080, type: 'current',
  alt: { en: `${name} current public website`, es: `Sitio público actual de ${name}` }
});

const archivedCapture = (slug: string, name: string): ArchiveItem['preview'] => ({
  src: `/images/projects/${slug}.webp`, width: 1000, height: 1200, type: 'archived',
  alt: { en: `Archived ${name} website capture`, es: `Captura histórica del website de ${name}` }
});

const isningCredit = {
  en: 'Development for Isning Multimedia. Visual design credited to Isning Gamez in the original project themes.',
  es: 'Desarrollo para Isning Multimedia. Diseño visual acreditado a Isning Gamez en los temas originales.'
};

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
    source: { en: 'Nicasource · healthcare website', es: 'Nicasource · website de salud' },
    role: { en: 'Website development through Nicasource', es: 'Desarrollo web con Nicasource' },
    summary: { en: 'Website development for Claris Health through Nicasource, supporting its public-facing services and content.', es: 'Desarrollo del website de Claris Health con Nicasource, para presentar sus servicios y contenido público.' },
    details: { en: ['Worked on the Claris Health website as part of the Nicasource engagement.', 'WordPress website work, with services and organization content managed through the CMS.'], es: ['Trabajo en el website de Claris Health como parte del proyecto de Nicasource.', 'Desarrollo en WordPress, con contenido de servicios y de la organización administrado desde el CMS.'] },
    credit: { en: 'Client work delivered through Nicasource.', es: 'Trabajo para cliente realizado con Nicasource.' },
    stack: ['WordPress', 'PHP', 'JavaScript', 'CSS'], preview: currentCapture('claris-health', 'Claris Health')
  },
  {
    slug: 'ariel-law', name: 'Ariel Law Group', kind: 'website', category: 'web', featured: true,
    url: 'https://ariellawgroup.com/', linkKind: 'website',
    source: { en: 'Isning Multimedia · legal website', es: 'Isning Multimedia · website legal' },
    role: { en: 'WordPress website development', es: 'Desarrollo de website WordPress' },
    summary: { en: 'A custom WordPress website developed for Ariel Law Group through Isning Multimedia.', es: 'Website WordPress a medida para Ariel Law Group, desarrollado para Isning Multimedia.' },
    details: { en: ['Implemented the custom Ariel Law Group theme.', 'Built the service and company presentation shown in the archived project capture.'], es: ['Implementación del tema a medida de Ariel Law Group.', 'Desarrollo de la presentación de servicios y del despacho que aparece en la captura histórica.'] },
    credit: isningCredit, stack: ['WordPress', 'PHP', 'HTML', 'CSS'], preview: archivedCapture('ariel-law', 'Ariel Law Group')
  },
  {
    slug: 'hartunian-law', name: 'Hartunian Law Firm', kind: 'website', category: 'web', featured: true,
    url: 'https://hartunianlaw.com/', linkKind: 'website',
    source: { en: 'Isning Multimedia · legal website', es: 'Isning Multimedia · website legal' },
    role: { en: 'Website development', es: 'Desarrollo web' },
    summary: { en: 'Legal-services website work for Hartunian Law Firm through Isning Multimedia.', es: 'Desarrollo del website de servicios legales de Hartunian Law Firm para Isning Multimedia.' },
    details: { en: ['Developed the website represented in the original Isning Multimedia project capture.', 'The archived design presents the firm, practice areas and consultation calls to action.'], es: ['Desarrollo del website mostrado en la captura original del proyecto de Isning Multimedia.', 'La versión histórica presenta el despacho, sus áreas de práctica y las llamadas a consulta.'] },
    credit: isningCredit, stack: ['Web development', 'HTML', 'CSS', 'JavaScript'], preview: archivedCapture('hartunian-law', 'Hartunian Law Firm')
  },
  {
    slug: 'caban-pools', name: 'Caban Pools', kind: 'website', category: 'web', featured: true,
    source: { en: 'Isning Multimedia · services website', es: 'Isning Multimedia · website de servicios' },
    role: { en: 'Custom WordPress development', es: 'Desarrollo WordPress a medida' },
    summary: { en: 'A custom website for a pool-services business, developed for Isning Multimedia.', es: 'Website a medida para una empresa de servicios de piscinas, desarrollado para Isning Multimedia.' },
    details: { en: ['Implemented the custom Caban Pools WordPress theme.', 'Service presentation, project imagery and contact sections are preserved in the archived capture.'], es: ['Implementación del tema WordPress a medida de Caban Pools.', 'La captura histórica conserva la presentación de servicios, imágenes de proyectos y secciones de contacto.'] },
    credit: isningCredit, stack: ['WordPress', 'PHP', 'HTML', 'CSS'], preview: archivedCapture('caban-pools', 'Caban Pools')
  },
  {
    slug: 'fit-factory', name: 'Fit Factory Studio', kind: 'website', category: 'web',
    source: { en: 'Isning Multimedia · fitness website', es: 'Isning Multimedia · website fitness' },
    role: { en: 'Custom WordPress development', es: 'Desarrollo WordPress a medida' },
    summary: { en: 'A custom WordPress website for Fit Factory Studio, built for Isning Multimedia.', es: 'Website WordPress a medida de Fit Factory Studio, desarrollado para Isning Multimedia.' },
    details: { en: ['Developed the FitFactory WordPress theme.', 'Implemented the studio presentation and training-program sections shown in the archived capture.'], es: ['Desarrollo del tema WordPress FitFactory.', 'Implementación de la presentación del estudio y los programas de entrenamiento de la captura histórica.'] },
    credit: isningCredit, stack: ['WordPress', 'PHP', 'HTML', 'CSS'], preview: archivedCapture('fit-factory', 'Fit Factory Studio')
  },
  {
    slug: 'sapetto-law', name: 'Sapetto Law', kind: 'website', category: 'web',
    source: { en: 'Isning Multimedia · legal website', es: 'Isning Multimedia · website legal' },
    role: { en: 'Custom WordPress development', es: 'Desarrollo WordPress a medida' },
    summary: { en: 'A custom legal-services website implemented for Isning Multimedia.', es: 'Website de servicios legales a medida, implementado para Isning Multimedia.' },
    details: { en: ['Developed the SapettoLaw WordPress theme.', 'The project capture preserves the original service, firm and consultation presentation.'], es: ['Desarrollo del tema WordPress SapettoLaw.', 'La captura del proyecto conserva la presentación original de servicios, despacho y consultas.'] },
    credit: isningCredit, stack: ['WordPress', 'PHP', 'HTML', 'CSS'], preview: archivedCapture('sapetto-law', 'Sapetto Law')
  },
  {
    slug: 'isning-multimedia', name: 'Isning Multimedia', kind: 'website', category: 'web',
    url: 'https://isning.com/', linkKind: 'website',
    source: { en: 'Agency website · headless WordPress', es: 'Website de agencia · WordPress headless' },
    role: { en: 'React and headless WordPress development', es: 'Desarrollo React y WordPress headless' },
    summary: { en: 'A headless WordPress implementation for Isning Multimedia using React and Frontity.', es: 'Implementación de WordPress headless para Isning Multimedia con React y Frontity.' },
    details: { en: ['Implemented agency pages and portfolio presentation in a custom Frontity theme.', 'Connected the React frontend to WordPress content.', 'The current public website can include work made after this implementation.'], es: ['Implementación de páginas y portafolio de la agencia en un tema Frontity a medida.', 'Conexión del frontend React con el contenido de WordPress.', 'El website público actual puede incluir cambios posteriores a esta implementación.'] },
    credit: isningCredit, stack: ['React', 'Frontity', 'WordPress', 'Sass'], preview: currentCapture('isning-multimedia', 'Isning Multimedia')
  },
  {
    slug: 'asher-asher', name: 'Asher & Asher Consulting', kind: 'website', category: 'web',
    source: { en: 'Isning Multimedia · consulting website', es: 'Isning Multimedia · website de consultoría' },
    role: { en: 'WordPress theme development', es: 'Desarrollo de tema WordPress' },
    summary: { en: 'A custom WordPress theme for the Asher & Asher Consulting website.', es: 'Tema WordPress a medida para el website de Asher & Asher Consulting.' },
    details: { en: ['Developed the custom Asher theme as part of Isning Multimedia client work.'], es: ['Desarrollo del tema Asher a medida, como parte del trabajo para clientes de Isning Multimedia.'] },
    credit: isningCredit, stack: ['WordPress', 'PHP', 'CSS']
  },
  {
    slug: 'willow-creek', name: 'Willow Creek Productions', kind: 'website', category: 'web',
    source: { en: 'Isning Multimedia · production website', es: 'Isning Multimedia · website de producción' },
    role: { en: 'WordPress theme development', es: 'Desarrollo de tema WordPress' },
    summary: { en: 'Custom WordPress theme development for Willow Creek Productions.', es: 'Desarrollo de un tema WordPress a medida para Willow Creek Productions.' },
    details: { en: ['Implemented the WillowCreekProductions theme for Isning Multimedia.'], es: ['Implementación del tema WillowCreekProductions para Isning Multimedia.'] },
    credit: isningCredit, stack: ['WordPress', 'PHP', 'CSS']
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
    source: { en: 'Nicasource · website contributions', es: 'Nicasource · contribuciones web' },
    role: { en: 'WordPress development and content systems', es: 'Desarrollo WordPress y sistemas de contenido' },
    summary: { en: 'Scoped WordPress development for service pages, reusable content modules and case-study workflows.', es: 'Desarrollo WordPress enfocado en páginas de servicios, módulos reutilizables y flujos de casos de estudio.' },
    details: { en: ['Implemented a reusable service-page builder with ACF modules and editor previews.', 'Worked on service-page rendering, structured data and responsive behavior.', 'These are contributions to an existing team-built website; not authorship of the entire site.'], es: ['Implementación de un constructor de páginas de servicio con módulos ACF y vistas previas en el editor.', 'Trabajo en renderizado, datos estructurados y comportamiento responsive de servicios.', 'Son contribuciones a un website existente desarrollado en equipo, no autoría del sitio completo.'] },
    credit: { en: 'Contributions through Nicasource. Current site and release state may differ from the implementation described.', es: 'Contribuciones con Nicasource. El sitio actual y su estado de publicación pueden diferir de la implementación descrita.' },
    stack: ['WordPress', 'ACF', 'PHP', 'JavaScript', 'Structured data'], preview: currentCapture('column-five', 'Column Five')
  },
  {
    slug: 'super-star-car-wash', name: 'Super Star Car Wash', kind: 'website', category: 'web',
    url: 'https://www.superstarcarwashaz.com/', linkKind: 'website',
    source: { en: 'Nicasource · website contributions', es: 'Nicasource · contribuciones web' },
    role: { en: 'WordPress maintenance and integrations', es: 'Mantenimiento e integraciones WordPress' },
    summary: { en: 'Website maintenance and integration work within the Super Star Car Wash team.', es: 'Mantenimiento e integraciones web como parte del equipo de Super Star Car Wash.' },
    details: { en: ['Worked on WordPress functionality and integrations in the existing website.', 'Implemented form-event integration between an embedded SMS experience and the parent analytics data layer.', 'The contribution is scoped development within the team, not the original design of the whole website.'], es: ['Trabajo en funcionalidad WordPress e integraciones del website existente.', 'Implementación de eventos de formularios entre una experiencia SMS embebida y el data layer de analítica.', 'La contribución es desarrollo dentro del equipo, no el diseño original del sitio completo.'] },
    credit: { en: 'Contributions through Nicasource.', es: 'Contribuciones con Nicasource.' },
    stack: ['WordPress', 'PHP', 'JavaScript', 'Analytics integrations'], preview: currentCapture('super-star-car-wash', 'Super Star Car Wash')
  },
  {
    slug: 'studio-ivl', name: 'Studio IVL · IVL Collective', kind: 'application', category: 'mobile', status: 'private',
    source: { en: 'Nicasource · mobile application', es: 'Nicasource · aplicación móvil' },
    role: { en: 'Mobile application development', es: 'Desarrollo de aplicación móvil' },
    summary: { en: 'A React Native fitness application for IVL Collective, with workout classes, video playback and scheduling.', es: 'Aplicación fitness React Native para IVL Collective, con clases, reproducción de video y agenda.' },
    details: { en: ['Built mobile screens and navigation with React Native and Expo.', 'Class discovery, instructor pages, schedules, favorites and video playback.', 'Profile, membership and notification experiences, with supporting CMS and backend projects.'], es: ['Desarrollo de pantallas y navegación con React Native y Expo.', 'Exploración de clases, instructores, agenda, favoritos y reproducción de video.', 'Experiencias de perfil, membresía y notificaciones, con proyectos de CMS y backend de soporte.'] },
    credit: { en: 'Client application work through Nicasource. Original app artwork; source code remains private.', es: 'Trabajo para cliente con Nicasource. Arte original de la app; código privado.' },
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Video'],
    preview: { src: '/images/projects/studio-ivl.webp', width: 1024, height: 1024, type: 'artwork', alt: { en: 'Studio IVL original application icon', es: 'Ícono original de la aplicación Studio IVL' } }
  },
  {
    slug: 'pouch', name: 'Pouch · Bahía Nica Portal', kind: 'application', category: 'product-systems', status: 'private',
    source: { en: 'Shipping platform · full application', es: 'Plataforma de envíos · aplicación completa' },
    role: { en: 'Full-stack application development', es: 'Desarrollo full-stack de la aplicación' },
    summary: { en: 'The shipping and tracking application originally known as the Bahía Nica Portal, now Pouch.', es: 'La aplicación de envíos y tracking conocida originalmente como Portal de Bahía Nica, hoy Pouch.' },
    details: { en: ['Developed the complete shipping/tracking application and supporting API.', 'Package reception, shipping alerts, invoices, manifests and dispatch receipts.', 'Customer and administrative workflows, package identification and location, and operational statistics.'], es: ['Desarrollo de la aplicación completa de envíos y tracking y su API de soporte.', 'Recepción de paquetes, alertas de envío, facturas, manifiestos y recibos de despacho.', 'Flujos para clientes y administración, identificación y localización de paquetes y estadísticas operativas.'] },
    credit: { en: 'Bahía Nica / Lighthouse engagement. Original Portal identity shown; Pouch is the current name. No customer data is published.', es: 'Proyecto de Bahía Nica / Lighthouse. Se muestra la identidad original del Portal; Pouch es el nombre actual. Sin datos de clientes.' },
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Node.js', 'Express'],
    preview: { src: '/images/projects/pouch.webp', width: 600, height: 600, type: 'artwork', alt: { en: 'Original Bahía Nica Portal brand mark', es: 'Marca original del Portal de Bahía Nica' } }
  },
  {
    slug: 'lighthouse', name: 'Lighthouse F&C', kind: 'application', category: 'product-systems', status: 'private',
    source: { en: 'Lighthouse · logistics platform', es: 'Lighthouse · plataforma logística' },
    role: { en: 'Web application and API development', es: 'Desarrollo de aplicación web y API' },
    summary: { en: 'A logistics application for Lighthouse, covering shipment operations and agency workflows.', es: 'Aplicación logística para Lighthouse, con operaciones de envíos y flujos para agencias.' },
    details: { en: ['Web application and supporting webhook/API services.', 'Shipment history, dispatch receipts, agency management and manifests.', 'Load calculation and import/export declaration workflows with role-based administrative navigation.'], es: ['Aplicación web y servicios de webhook/API de soporte.', 'Historial de envíos, recibos de despacho, gestión de agencias y manifiestos.', 'Cálculo de carga y declaraciones de importación/exportación con navegación administrativa según el rol.'] },
    credit: { en: 'Private operational software; this case contains no production records or account links.', es: 'Software operativo privado; este caso no contiene registros de producción ni enlaces a cuentas.' },
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Node.js', 'Express'],
    preview: { src: '/images/projects/lighthouse.webp', width: 441, height: 431, type: 'artwork', alt: { en: 'Lighthouse F&C original brand mark', es: 'Marca original de Lighthouse F&C' } }
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
