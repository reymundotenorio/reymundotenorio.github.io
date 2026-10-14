import type { ArchiveItem } from './site';

export const recentProjects: ArchiveItem[] = [
  {
    name: 'DuePulse',
    category: 'product-systems',
    featured: true,
    status: 'private',
    year: '2026',
    source: { en: 'Personal product · private alpha', es: 'Producto personal · alfa privada' },
    summary: {
      en: 'A household finance PWA that brings bills, statements, due dates, and payment signals into one review workflow.',
      es: 'Una PWA de finanzas del hogar que reúne facturas, estados de cuenta, vencimientos y señales de pago en un flujo de revisión.'
    },
    details: {
      en: ['Gmail ingestion and AI-assisted statement extraction, with suggestions reviewed before they become records.', 'Recurring commitments, household access boundaries, reminders, and browser push notifications.', 'Bilingual application built with Next.js, TypeScript, Supabase, and OpenAI integrations.'],
      es: ['Ingesta desde Gmail y extracción de estados de cuenta asistida por IA, con sugerencias revisadas antes de crear registros.', 'Compromisos recurrentes, separación de acceso por hogar, recordatorios y notificaciones push.', 'Aplicación bilingüe con Next.js, TypeScript, Supabase e integraciones de OpenAI.']
    },
    stack: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI API', 'PWA']
  },
  {
    name: 'DepSaber',
    category: 'developer-tools',
    featured: true,
    url: 'https://github.com/reymundotenorio/depsaber',
    linkKind: 'code',
    year: '2026',
    source: { en: 'Open-source developer tooling', es: 'Herramientas de desarrollo open source' },
    summary: {
      en: 'A local-first supply-chain radar for dependency manifests, package-manager configuration, GitHub Actions, and build artifacts.',
      es: 'Un radar local de cadena de suministro para dependencias, configuración de paquetes, GitHub Actions y artefactos de compilación.'
    },
    details: {
      en: ['Baseline and delta scans surface changes between dependency snapshots.', 'Signed feed verification and CI guardrails connect local checks with delivery workflows.', 'An interactive Go CLI and a Vite report viewer keep analysis local, without uploading project reports.'],
      es: ['Escaneos base y diferenciales para identificar cambios entre versiones de las dependencias.', 'Verificación de feeds firmados y controles de CI conectados con los flujos de entrega.', 'CLI interactiva en Go y visor de reportes con Vite para analizar resultados localmente, sin subirlos a un servicio.']
    },
    stack: ['Go', 'CLI', 'GitHub Actions', 'Vite', 'Supply-chain security']
  },
  {
    name: 'TimeWeaver',
    category: 'automation',
    featured: true,
    status: 'private',
    year: '2025',
    source: { en: 'Personal workflow automation', es: 'Automatización personal de procesos' },
    summary: {
      en: 'An automation pipeline that turns GitHub activity and calendar events into structured timesheet drafts, then assists with browser entry.',
      es: 'Un flujo que convierte actividad de GitHub y eventos del calendario en borradores de horas de trabajo y asiste con su ingreso en el navegador.'
    },
    details: {
      en: ['n8n orchestrates GitHub, Google Calendar, and Google Sheets integrations.', 'OpenAI-assisted summaries normalize activity into weekly work entries.', 'A TypeScript and Playwright layer handles repetitive browser form entry.'],
      es: ['n8n orquesta integraciones con GitHub, Google Calendar y Google Sheets.', 'Resúmenes asistidos por OpenAI normalizan la actividad en registros semanales.', 'Una capa de TypeScript y Playwright automatiza el ingreso repetitivo en formularios web.']
    },
    stack: ['n8n', 'TypeScript', 'Playwright', 'OpenAI API', 'REST APIs']
  }
];

export const additionalProjects: ArchiveItem[] = [
  {
    name: 'Steps Veterinary Clinic',
    nameEs: 'Clínica Veterinaria Steps',
    category: 'web',
    year: '2016 - 2022',
    source: { en: 'Freelance · custom WordPress', es: 'Freelance · WordPress a medida' },
    summary: {
      en: 'The official veterinary clinic website, built around a fully customized WordPress theme rather than a prebuilt template.',
      es: 'Sitio oficial de la clínica veterinaria, desarrollado con un tema de WordPress completamente personalizado.'
    },
    details: {
      en: ['Custom theme development for the clinic website.', 'Part of the freelance client portfolio, with project media included on LinkedIn.'],
      es: ['Desarrollo de un tema a medida para el sitio de la clínica.', 'Parte del trabajo freelance, con material del proyecto en LinkedIn.']
    },
    stack: ['WordPress', 'PHP', 'HTML', 'CSS']
  },
  {
    name: 'Nicaragua Tattoos',
    category: 'web',
    year: '2016 - 2022',
    source: { en: 'Freelance · brand website', es: 'Freelance · sitio de marca' },
    summary: {
      en: 'A custom website combining brand content with YouTube and Instagram integrations.',
      es: 'Un sitio a medida que combina contenido de marca con integraciones de YouTube e Instagram.'
    },
    details: {
      en: ['Website development and maintenance with PHP, HTML, Sass, Bootstrap, and jQuery.', 'YouTube and Instagram APIs brought social and video content into the website.'],
      es: ['Desarrollo y mantenimiento con PHP, HTML, Sass, Bootstrap y jQuery.', 'Integración de contenido social y video mediante las APIs de YouTube e Instagram.']
    },
    stack: ['PHP', 'Sass', 'jQuery', 'YouTube API', 'Instagram API']
  },
  {
    name: 'License key generator',
    nameEs: 'Generador de claves de licencia',
    category: 'linkedin-projects',
    year: '2016 - 2022',
    source: { en: 'Desktop · subscription tooling', es: 'Escritorio · herramientas de suscripción' },
    summary: {
      en: 'A desktop utility for generating unique subscription license keys tied to a device serial number.',
      es: 'Una utilidad de escritorio que genera claves únicas de suscripción vinculadas al número de serie del dispositivo.'
    },
    details: {
      en: ['Implemented in C# with a MySQL database.', 'Device serial numbers and cryptographic algorithms support the license-generation workflow.'],
      es: ['Implementación en C# con una base de datos MySQL.', 'Números de serie y algoritmos criptográficos como base del flujo de generación de licencias.']
    },
    stack: ['C#', 'MySQL', 'Desktop']
  },
  {
    name: 'Reporte Sombra · Voces del Sur',
    category: 'web',
    year: '2021',
    source: { en: 'Freelance · report website', es: 'Freelance · publicación de reportes' },
    summary: {
      en: 'Web work for the Voces del Sur shadow report, included in the freelance project portfolio.',
      es: 'Trabajo web para el Reporte Sombra de Voces del Sur, parte del portafolio de proyectos freelance.'
    },
    details: {
      en: ['A dedicated report website represented in the LinkedIn project media.', 'JavaScript web implementation, with the source repository kept private.'],
      es: ['Un sitio dedicado al reporte, incluido en los proyectos adjuntos de LinkedIn.', 'Implementación web con JavaScript y repositorio de código privado.']
    },
    stack: ['JavaScript', 'Web']
  },
  {
    name: 'Farmacia Josefina',
    category: 'linkedin-projects',
    url: 'https://github.com/reymundotenorio/FarmaciaJosefina',
    linkKind: 'code',
    year: '2013 - 2014',
    source: { en: 'Academic · award-winning system', es: 'Académico · sistema premiado' },
    summary: {
      en: 'A pharmacy inventory and billing system, recognized at university science and technology fairs.',
      es: 'Sistema de inventario y facturación farmacéutica, reconocido en ferias universitarias de ciencia y tecnología.'
    },
    details: {
      en: ['Java desktop application for pharmacy inventory and billing.', 'First-place recognition in 2013 and 2014, with additional science-fair exhibitions.'],
      es: ['Aplicación de escritorio en Java para inventario y facturación de farmacia.', 'Reconocimientos de primer lugar en 2013 y 2014, además de exposiciones científicas.']
    },
    stack: ['Java', 'Desktop']
  },
  {
    name: 'Nicaventura',
    category: 'web',
    url: 'https://github.com/reymundotenorio/Nicaventura',
    linkKind: 'code',
    year: '2014',
    source: { en: 'Academic · award-winning website', es: 'Académico · sitio web premiado' },
    summary: {
      en: 'An early web project awarded first place at the 2014 Science and Technology Fair at UNI.',
      es: 'Uno de mis primeros proyectos web, ganador del primer lugar en la Feria de Ciencia y Tecnología 2014 de la UNI.'
    },
    details: {
      en: ['University web project with a public source archive.', 'Recognized alongside the pharmacy system at the 2014 fair.'],
      es: ['Proyecto web universitario con un archivo público del código.', 'Reconocido junto al sistema farmacéutico en la feria de 2014.']
    },
    stack: ['Web']
  }
];
