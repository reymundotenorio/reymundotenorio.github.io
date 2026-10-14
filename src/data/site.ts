import { additionalProjects, recentProjects } from './projects';

export type Lang = 'en' | 'es';
export type MissionId = 'leadership' | 'product' | 'web-engineering' | 'automation' | 'frontend' | 'contact';
export type ArchiveFilterId = 'all' | 'linkedin-projects' | 'product-systems' | 'developer-tools' | 'automation' | 'web' | 'editorial';

export interface Mission {
  id: MissionId;
  label: string;
  title: string;
  summary: string;
  proof: string[];
  stack: string[];
  stat: string;
}

export interface ArchiveFilter {
  id: ArchiveFilterId;
  label: string;
}

export interface ArchiveItem {
  name: string;
  nameEs?: string;
  category: Exclude<ArchiveFilterId, 'all'>;
  url?: string;
  linkKind?: 'code' | 'website';
  featured?: boolean;
  status?: 'private';
  year: string;
  source: {
    en: string;
    es: string;
  };
  summary: {
    en: string;
    es: string;
  };
  details: {
    en: string[];
    es: string[];
  };
  stack: string[];
}

export interface TimelineItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  signal: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ProfileFact {
  title: string;
  meta: string;
  detail?: string;
  url?: string;
}

export interface ProfileSignalContent {
  eyebrow: string;
  title: string;
  intro: string;
  skillsTitle: string;
  certificationsTitle: string;
  awardsTitle: string;
  educationTitle: string;
  coursesTitle: string;
  languagesTitle: string;
  skillGroups: SkillGroup[];
  certifications: ProfileFact[];
  awards: ProfileFact[];
  education: ProfileFact[];
  courses: ProfileFact[];
  languages: ProfileFact[];
}

export const siteMeta: {
  linkedin: string;
  github: string;
  ogImage?: string;
} = {
  linkedin: 'https://www.linkedin.com/in/reymundotenorio/',
  github: 'https://github.com/reymundotenorio',
  ogImage: '/images/social-card.png'
};

export const missions: Record<Lang, Mission[]> = {
  en: [
    {
      id: 'leadership',
      label: 'M-01',
      title: 'Leadership',
      summary: 'Mentoring engineers, clarifying delivery, and keeping teams close to production reality.',
      proof: ['Engineering Manager at Nicasource', 'Team lead and mentoring responsibilities', 'Delivery systems and review habits'],
      stack: ['Planning', 'Mentoring', 'Delivery'],
      stat: '2021 - present'
    },
    {
      id: 'product',
      label: 'M-02',
      title: 'Product Engineering',
      summary: 'Building data-rich software with a practical full-stack mindset.',
      proof: ['Scalar product engineering', 'React and TypeScript workflows', 'Backend and integration work'],
      stack: ['React', 'TypeScript', 'Node'],
      stat: 'Full-stack'
    },
    {
      id: 'web-engineering',
      label: 'M-03',
      title: 'Web Engineering',
      summary: 'Custom websites, CMS platforms, and web applications built around real business needs.',
      proof: ['Custom websites and web applications', 'WordPress themes, plugins, and APIs', 'Responsive experiences and PWA delivery'],
      stack: ['WordPress', 'PHP', 'JavaScript'],
      stat: 'Web + CMS'
    },
    {
      id: 'automation',
      label: 'M-04',
      title: 'Automation',
      summary: 'Workflow tools, scripts, APIs, and AI-enabled systems that remove manual drag.',
      proof: ['OpenAI API workflows', 'Node and Python tooling', 'Internal process automation'],
      stack: ['Node', 'Python', 'OpenAI API'],
      stat: 'Systems'
    },
    {
      id: 'frontend',
      label: 'M-05',
      title: 'Frontend Systems',
      summary: 'Interfaces that stay usable under real product constraints.',
      proof: ['React UI systems', 'Responsive product screens', 'Design-to-code execution'],
      stack: ['React', 'CSS', 'UX'],
      stat: 'UI craft'
    },
    {
      id: 'contact',
      label: 'M-06',
      title: 'Contact',
      summary: 'The shortest route to start a serious technical conversation.',
      proof: ['LinkedIn', 'GitHub'],
      stack: ['EN', 'ES', 'Remote'],
      stat: 'Open'
    }
  ],
  es: [
    {
      id: 'leadership',
      label: 'M-01',
      title: 'Liderazgo',
      summary: 'Mentoría, claridad en la entrega y decisiones técnicas conectadas con producción.',
      proof: ['Engineering Manager en Nicasource', 'Liderazgo técnico y mentoría de ingenieros', 'Procesos de entrega y revisión de código'],
      stack: ['Planificación', 'Mentoría', 'Delivery'],
      stat: '2021 - presente'
    },
    {
      id: 'product',
      label: 'M-02',
      title: 'Ingeniería de producto',
      summary: 'Software centrado en datos, construido con criterio full-stack.',
      proof: ['Ingeniería de producto en Scalar', 'Flujos con React y TypeScript', 'Backend e integraciones'],
      stack: ['React', 'TypeScript', 'Node'],
      stat: 'Full-stack'
    },
    {
      id: 'web-engineering',
      label: 'M-03',
      title: 'Ingeniería web',
      summary: 'Sitios a medida, plataformas CMS y aplicaciones web para necesidades reales de negocio.',
      proof: ['Sitios y aplicaciones web a medida', 'Temas, plugins y APIs para WordPress', 'Experiencias responsive y desarrollo de PWAs'],
      stack: ['WordPress', 'PHP', 'JavaScript'],
      stat: 'Web + CMS'
    },
    {
      id: 'automation',
      label: 'M-04',
      title: 'Automatización',
      summary: 'Herramientas, scripts, APIs y sistemas con IA que reducen el trabajo manual.',
      proof: ['Flujos con OpenAI API', 'Herramientas con Node y Python', 'Automatización de procesos internos'],
      stack: ['Node', 'Python', 'OpenAI API'],
      stat: 'Sistemas'
    },
    {
      id: 'frontend',
      label: 'M-05',
      title: 'Sistemas frontend',
      summary: 'Interfaces que se mantienen usables bajo restricciones reales de producto.',
      proof: ['Sistemas UI en React', 'Pantallas responsive de producto', 'Del diseño al código'],
      stack: ['React', 'CSS', 'UX'],
      stat: 'UI craft'
    },
    {
      id: 'contact',
      label: 'M-06',
      title: 'Contacto',
      summary: 'La ruta mas corta para iniciar una conversacion tecnica seria.',
      proof: ['LinkedIn', 'GitHub'],
      stack: ['EN', 'ES', 'Remote'],
      stat: 'Abierto'
    }
  ]
};

export const archiveFilters: Record<Lang, ArchiveFilter[]> = {
  en: [
    { id: 'all', label: 'All' },
    { id: 'linkedin-projects', label: 'Institutional & desktop' },
    { id: 'product-systems', label: 'Product systems' },
    { id: 'developer-tools', label: 'Developer tools' },
    { id: 'automation', label: 'Automation' },
    { id: 'web', label: 'Web' },
    { id: 'editorial', label: 'Editorial' }
  ],
  es: [
    { id: 'all', label: 'Todo' },
    { id: 'linkedin-projects', label: 'Institucional y escritorio' },
    { id: 'product-systems', label: 'Sistemas de producto' },
    { id: 'developer-tools', label: 'Dev tools' },
    { id: 'automation', label: 'Automatización' },
    { id: 'web', label: 'Web' },
    { id: 'editorial', label: 'Editorial' }
  ]
};

export const archiveItems: ArchiveItem[] = [
  ...recentProjects,
  {
    name: 'UNI · Sciences & Systems',
    nameEs: 'UNI · Ciencias y Sistemas',
    category: 'linkedin-projects',
    year: '2016',
    source: {
      en: 'Institutional web',
      es: 'Web institucional'
    },
    summary: {
      en: 'Member of the development team for the Faculty of Sciences and Systems website at Universidad Nacional de Ingenieria.',
      es: 'Miembro del equipo de desarrollo del sitio web de la Facultad de Ciencias y Sistemas de la Universidad Nacional de Ingeniería.'
    },
    details: {
      en: ['Associated with Universidad Nacional de Ingenieria.', 'Built with WordPress as content manager.', 'Institutional web presence for an academic faculty.'],
      es: ['Proyecto de la Universidad Nacional de Ingeniería.', 'Desarrollado con WordPress como gestor de contenido.', 'Presencia web institucional para una facultad académica.']
    },
    stack: ['WordPress', 'PHP', 'HTML', 'CSS']
  },
  {
    name: 'Sistema TPF-Supervisor',
    category: 'linkedin-projects',
    featured: true,
    year: '2016',
    source: {
      en: 'Operations software',
      es: 'Software de operaciones'
    },
    summary: {
      en: 'Desktop system for TPF operations in Granada, covering places, schedules, shifts, staff, overtime, absences, role creation, and payroll calculations.',
      es: 'Sistema de escritorio para operaciones TPF en Granada: lugares, horarios, turnos, personal, horas extras, ausencias, roles y cálculo de planillas.'
    },
    details: {
      en: ['Built in Java with MySQL as database manager.', 'Staff scheduling, absences, role generation, timesheet calculations, and reports.', 'Payroll calculations and operational reporting with JasperReports.'],
      es: ['Desarrollado en Java con MySQL como gestor de base de datos.', 'Horarios, ausencias, generación de roles, cálculos de planilla y reportes.', 'Cálculos de nómina y reportes operativos con JasperReports.']
    },
    stack: ['Java', 'MySQL', 'JasperReports', 'Desktop']
  },
  {
    name: 'Editorial · Web to PWA',
    nameEs: 'Editorial · De web a PWA',
    category: 'editorial',
    year: 'May 2020 - May 2021',
    source: {
      en: 'Publishing platform',
      es: 'Plataforma editorial'
    },
    summary: {
      en: 'Development and maintenance of web applications through custom WordPress themes, plugins, APIs, AWS infrastructure, and PWA transformation.',
      es: 'Desarrollo y mantenimiento de aplicaciones web con temas WordPress a medida, plugins, APIs, infraestructura AWS y transformación a PWAs.'
    },
    details: {
      en: ['Custom WordPress themes, plugins, and APIs with PHP, JavaScript, Sass, and Node.js.', 'AWS infrastructure with Docker, MySQL, MongoDB, and Amazon Aurora.', 'Progressive Web Apps focused on performance, usability, and scalable deployment.'],
      es: ['Temas, plugins y APIs a medida para WordPress con PHP, JavaScript, Sass y Node.js.', 'Infraestructura AWS con Docker, MySQL, MongoDB y Amazon Aurora.', 'PWAs enfocadas en rendimiento, experiencia de usuario y despliegues escalables.']
    },
    stack: ['WordPress', 'AWS', 'Docker', 'Amazon Aurora', 'PWA']
  },
  {
    name: 'Dele Peso a sus Pesos',
    category: 'product-systems',
    featured: true,
    url: 'https://www.delepesoasuspesos.com/',
    year: '2016 - 2022',
    source: {
      en: 'Financial tools',
      es: 'Herramientas financieras'
    },
    summary: {
      en: 'Suite of financial tools for severance pay, debt level, alimony, net salary, and retirement age, integrated into WordPress.',
      es: 'Herramientas financieras para liquidación, deuda, pensión alimenticia, salario neto y edad de retiro, integradas en WordPress.'
    },
    details: {
      en: ['Built with HTML, Sass, and jQuery.', 'Turned financial education into calculators users could operate directly.', 'Maintained as part of freelance product work.'],
      es: ['Construido con HTML, Sass y jQuery.', 'Educación financiera convertida en calculadoras de uso directo.', 'Mantenido como parte del trabajo freelance de producto.']
    },
    stack: ['WordPress', 'HTML', 'Sass', 'jQuery']
  },
  {
    name: 'Better & Nice Produce',
    category: 'product-systems',
    featured: true,
    url: 'https://github.com/reymundotenorio/BANP',
    linkKind: 'code',
    year: '2016 - 2022',
    source: {
      en: 'Commerce & operations',
      es: 'Comercio y operaciones'
    },
    summary: {
      en: 'Commercial and ecommerce operations system for a Miami produce business, with real-time features, payments, messaging, and cloud infrastructure.',
      es: 'Sistema comercial y ecommerce para una empresa de productos agrícolas en Miami, con actualizaciones en tiempo real, pagos, mensajería e infraestructura cloud.'
    },
    details: {
      en: ['Built with Ruby on Rails, jQuery, Sass, Haml, Bootstrap, and MySQL.', 'Integrated Pusher, AWS S3/RDS, PayPal, Stripe, Twilio, and SendGrid.', 'Covered business operations, not only the public site.'],
      es: ['Construido con Ruby on Rails, jQuery, Sass, Haml, Bootstrap y MySQL.', 'Integración con Pusher, AWS S3/RDS, PayPal, Stripe, Twilio y SendGrid.', 'Operaciones comerciales y ecommerce integrados en un mismo sistema.']
    },
    stack: ['Ruby on Rails', 'MySQL', 'AWS', 'Stripe', 'Twilio']
  },
  {
    name: 'Career site collection',
    nameEs: 'Colección de career sites',
    category: 'web',
    year: '2017 - 2020',
    source: {
      en: '37 historical brands',
      es: '37 marcas históricas'
    },
    summary: {
      en: 'Responsive hiring sites and WordPress/PencilBlue builds produced across Accedo Technologies and Accedo Digital.',
      es: 'Sitios de reclutamiento responsive y proyectos WordPress/PencilBlue desarrollados en Accedo Technologies y Accedo Digital.'
    },
    details: {
      en: ['Developed websites with HTML, Sass, Bootstrap, PencilBlue CMS, Photoshop, and Illustrator.', 'Built custom WordPress themes from Adobe XD UI/UX designs.', 'Recognized as Top Web Designer of the Year 2017 at Accedo Technologies.'],
      es: ['Desarrollo con HTML, Sass, Bootstrap, PencilBlue CMS, Photoshop e Illustrator.', 'Temas WordPress a medida desde diseños UI/UX en Adobe XD.', 'Reconocido como Top Web Designer of the Year 2017 en Accedo Technologies.']
    },
    stack: ['HTML', 'Sass', 'Bootstrap', 'WordPress', 'PencilBlue']
  },
  ...additionalProjects
];

export const timelineItems: Record<Lang, TimelineItem[]> = {
  en: [
    {
      company: 'Nicasource',
      role: 'Engineering Manager / Engineering Team Lead / Software Engineer',
      period: 'May 2021 - Present',
      summary:
        'Engineering Manager since Jul 2025, Engineering Team Lead from Jul 2022 to Jul 2025, and Software Engineer since May 2021. Built web and mobile applications with React, TypeScript, Redux, Firebase, REST APIs, Node.js, MySQL, PostgreSQL, and React Native while leading delivery and mentoring engineers.',
      signal: 'Leadership'
    },
    {
      company: 'Scalar',
      role: 'Software Engineer',
      period: 'Aug 2022 - Present',
      summary: 'Remote product engineering across modern frontend and full-stack workflows, with React, Tailwind CSS, TypeScript, Python, Django, Next.js, Storybook, and Cypress in data-rich software products.',
      signal: 'Product'
    },
    {
      company: 'Editorial',
      role: 'Senior Web Developer',
      period: 'May 2020 - May 2021',
      summary:
        'Developed and maintained web applications with custom WordPress themes, plugins, and APIs, using HTML, CSS, Sass, PHP, JavaScript, jQuery, Node.js, Docker, MySQL, MongoDB, Amazon Aurora, and AWS to move traditional sites toward scalable PWAs.',
      signal: 'PWAs'
    },
    {
      company: 'Freelancer',
      role: 'Software Developer',
      period: 'Mar 2016 - Mar 2022',
      summary:
        'Built WordPress sites, financial tools, ecommerce operations systems, C# licensing utilities, Java desktop scheduling/payroll software, API integrations, and business systems for clients in Nicaragua and abroad.',
      signal: 'Systems'
    },
    {
      company: 'Accedo Technologies',
      role: 'Senior Development Trainer / Web Designer',
      period: 'Mar 2017 - May 2020',
      summary:
        'Evaluated and trained development teams, introduced web development technologies, and produced responsive websites with HTML, Sass, Bootstrap, PencilBlue CMS, Photoshop, and Illustrator. Recognized as Top Web Designer of the Year 2017.',
      signal: 'Mentoring'
    },
    {
      company: 'Accedo Digital Inc.',
      role: 'Web Developer',
      period: 'Sep 2018 - May 2020',
      summary:
        'Designed and developed responsive websites, custom WordPress themes from Adobe XD designs, and internal tools with Python, Node.js, and PHP to support operations and workflow efficiency.',
      signal: 'Web'
    }
  ],
  es: [
    {
      company: 'Nicasource',
      role: 'Engineering Manager / Engineering Team Lead / Software Engineer',
      period: 'May 2021 - Presente',
      summary:
        'Engineering Manager desde julio de 2025, Engineering Team Lead entre 2022 y 2025 y Software Engineer desde 2021. Desarrollo web y móvil con React, TypeScript, Redux, Firebase, REST APIs, Node.js, MySQL, PostgreSQL y React Native, junto con liderazgo de entrega y mentoría.',
      signal: 'Liderazgo'
    },
    {
      company: 'Scalar',
      role: 'Software Engineer',
      period: 'Ago 2022 - Presente',
      summary: 'Ingeniería de producto en remoto: React, Tailwind CSS, TypeScript, Python, Django, Next.js, Storybook y Cypress para aplicaciones centradas en datos.',
      signal: 'Producto'
    },
    {
      company: 'Editorial',
      role: 'Senior Web Developer',
      period: 'May 2020 - May 2021',
      summary:
        'Desarrollo y mantenimiento de aplicaciones web con temas, plugins y APIs a medida para WordPress. HTML, CSS, Sass, PHP, JavaScript, jQuery, Node.js, Docker, MySQL, MongoDB, Amazon Aurora y AWS para transformar sitios tradicionales en PWAs escalables.',
      signal: 'PWAs'
    },
    {
      company: 'Freelancer',
      role: 'Software Developer',
      period: 'Mar 2016 - Mar 2022',
      summary:
        'Sitios WordPress, herramientas financieras, sistemas de comercio y operaciones, utilidades de licencias en C# y software de escritorio en Java para horarios y planillas. Integraciones de APIs y sistemas a medida para negocios.',
      signal: 'Sistemas'
    },
    {
      company: 'Accedo Technologies',
      role: 'Senior Development Trainer / Web Designer',
      period: 'Mar 2017 - May 2020',
      summary:
        'Evaluación y formación de equipos, introducción de tecnologías web y desarrollo de sitios responsive con HTML, Sass, Bootstrap, PencilBlue CMS, Photoshop e Illustrator. Reconocido como Top Web Designer of the Year 2017.',
      signal: 'Mentoring'
    },
    {
      company: 'Accedo Digital Inc.',
      role: 'Web Developer',
      period: 'Sep 2018 - May 2020',
      summary:
        'Diseño y desarrollo de sitios responsive, temas WordPress a medida desde Adobe XD y herramientas internas con Python, Node.js y PHP para mejorar los procesos de operaciones.',
      signal: 'Web'
    }
  ]
};

const skillGroups: SkillGroup[] = [
  {
    title: 'Leadership / product',
    items: ['Engineering Management', 'Engineering Leadership', 'Technology Leadership', 'Leading Development Teams', 'Software Design', 'Software Industry', 'Web Engineering', 'Code Review', 'Scrum']
  },
  {
    title: 'Frontend / app',
    items: ['React.js', 'TypeScript', 'JavaScript', 'React Native', 'Next.js', 'Tailwind CSS', 'Material-UI', 'Storybook', 'Cypress.io', 'Sass', 'HTML5', 'CSS', 'Bootstrap', 'jQuery']
  },
  {
    title: 'Backend / systems',
    items: ['Node.js', 'Python', 'Django', 'PHP', 'Ruby on Rails', 'Go', 'Java', 'C#', 'Kotlin', 'Swift', 'WordPress', 'MySQL', 'MongoDB', 'Microsoft SQL Server', 'AWS', 'Docker', 'Supabase']
  },
  {
    title: 'Tools / craft',
    items: ['OpenAI API', 'Cursor AI', 'Anthropic Claude', 'n8n', 'Playwright', 'GitHub Actions', 'Git', 'Linux', 'PSD to HTML', 'Adobe Photoshop', 'Firebase', 'PostgreSQL', 'REST APIs', 'Redux', 'Redux-Thunk']
  }
];

const certifications: ProfileFact[] = [
  { title: 'Curso de Cursor AI Code Editor', meta: 'Platzi · Oct 2026', url: 'https://platzi.com/p/reymundot/curso/12166-cursor-2025/diploma/detalle/' },
  { title: 'Curso de Claude AI', meta: 'Platzi · Oct 2026', url: 'https://platzi.com/p/reymundot/curso/12651-claude/diploma/detalle/' },
  { title: 'Curso de OpenAI API', meta: 'Platzi · Jun 2026', url: 'https://platzi.com/p/reymundot/curso/11458-openai-api/diploma/detalle/' },
  { title: 'Dale Carnegie Course: Effective Communications and Human Relations', meta: 'Dale Carnegie Nicaragua · Issued Jun 2024', detail: 'Certificate of Achievement' },
  { title: 'React Native: Aplicaciones nativas para IOS y Android', meta: 'Udemy · Nov 2021' },
  { title: 'Make a Website', meta: 'Codecademy' },
  { title: 'Introduction to JavaScript', meta: 'Codecademy' },
  { title: 'Learn Sass', meta: 'Codecademy' },
  { title: 'Rails for Zombies 2', meta: 'Code School' },
  { title: 'Deploy a Website', meta: 'Codecademy' },
  { title: 'Try Ruby', meta: 'Code School' },
  { title: 'Learn Git', meta: 'Codecademy' },
  { title: 'Ruby on Rails: Authentication', meta: 'Codecademy' },
  { title: 'Learn Ruby on Rails', meta: 'Codecademy' },
  { title: 'Learn Ruby', meta: 'Codecademy' },
  { title: 'Rails for Zombies Redux', meta: 'Code School' }
];

const awards: ProfileFact[] = [
  { title: 'Taller de Introduccion a React JS', meta: 'Comunidad Drupal Nicaragua · Jun 2019', detail: 'Participant in React JS introductory workshop' },
  { title: 'Top performance 2017', meta: 'Accedo Technologies · Dec 2017', detail: 'Recognition for top performance as web designer' },
  { title: 'Designer at the Science and Technology Fair 2016', meta: 'Universidad Nacional de Ingenieria · Sep 2016', detail: 'BiComfort project in manufacturing systems category' },
  { title: 'Participant of the First Exhibition of Projects and Course Tasks 2016', meta: 'Universidad Nacional de Ingenieria · Jun 2016', detail: 'Aggregate Planning desktop application' },
  { title: 'Participant of the WordPress Workshop, Design and Development', meta: 'Universidad Nacional de Ingenieria / Mozilla Nicaragua · Apr 2016' },
  { title: 'Designer at the Science and Technology Fair 2015', meta: 'Universidad Nacional de Ingenieria · Dec 2015', detail: 'Marketing project for furniture advertising improvement' },
  { title: 'Designer at the Science and Technology Fair 2015', meta: 'Universidad Nacional de Ingenieria · Dec 2015', detail: 'InfoNica website project' },
  { title: 'Participant of the Web Application Development Workshop with Ruby on Rails', meta: 'Universidad Nacional de Ingenieria · Oct 2015' },
  { title: 'WordPress Workshop Participant', meta: 'TechCreative · Oct 2015' },
  { title: 'Designer at XV Expociencia and Technology', meta: 'CNU / CONICYT · Nov 2014', detail: 'Inventory and billing system for Josefina pharmacy' },
  { title: 'Designer at the Science and Technology Fair 2014', meta: 'Universidad Nacional de Ingenieria · Nov 2014', detail: 'Integrales application in basic sciences category' },
  { title: 'First place at the 2014 Science and Technology Fair', meta: 'Universidad Nacional de Ingenieria · Nov 2014', detail: 'Pharmaceutical inventory and billing system' },
  { title: 'First place at the 2014 Science and Technology Fair', meta: 'Universidad Nacional de Ingenieria · Nov 2014', detail: 'Nicaventura website project' },
  { title: 'Participant in Hack Fest 2014', meta: 'Universidad Nacional de Ingenieria · Nov 2014' },
  { title: 'Exhibitor at Expociencia and Territorial Technology - Managua 2014', meta: 'CONICYT / CNU / INACTEC / MINED · Sep 2014', detail: 'Inventory and billing system for Josefina pharmacy' },
  { title: 'First place at the Science and Technology Fair 2013', meta: 'Universidad Nacional de Ingenieria · Nov 2013', detail: 'Inventory and billing system in graphic programming category' },
  { title: 'Designer at the Science and Technology Fair 2011', meta: 'Universidad Nacional de Ingenieria · Nov 2011', detail: 'Financial status system in console programming category' }
];

const educationFacts: ProfileFact[] = [
  { title: 'Universidad Nacional de Ingenieria', meta: 'Degree in Engineering, Systems Engineering · 2011 - 2017' }
];

const courseFacts: ProfileFact[] = [
  { title: 'English language (VI Level)', meta: 'English Language Academy' },
  { title: 'Technical in maintenance and repair of PC', meta: 'Universidad Nacional de Ingenieria' },
  { title: 'Technical in maintenance and repair of computers', meta: 'Computers of Granada' },
  { title: 'Training of entrepreneurs and creation of business plans', meta: 'Emprende Training Center' }
];

const languageFacts: ProfileFact[] = [
  { title: 'Spanish', meta: 'Native or bilingual proficiency' },
  { title: 'English', meta: 'Limited working proficiency' }
];

export const profileSignals: Record<Lang, ProfileSignalContent> = {
  en: {
    eyebrow: '03 / Continuous learning',
    title: 'Craft & credentials',
    intro: 'Engineering, leadership, and the learning behind the work.',
    skillsTitle: 'Technical range',
    certificationsTitle: 'Certifications',
    awardsTitle: 'Honors and awards',
    educationTitle: 'Education',
    coursesTitle: 'Courses',
    languagesTitle: 'Languages',
    skillGroups,
    certifications: certifications.map(({ detail, ...fact }) => ({ ...fact, ...(detail === 'Certificate of Achievement' ? { detail } : {}) })),
    awards,
    education: educationFacts,
    courses: courseFacts,
    languages: languageFacts
  },
  es: {
    eyebrow: '03 / Aprendizaje continuo',
    title: 'Oficio y credenciales',
    intro: 'Ingeniería, liderazgo y el aprendizaje detrás del trabajo.',
    skillsTitle: 'Habilidades técnicas',
    certificationsTitle: 'Certificaciones',
    awardsTitle: 'Premios y reconocimientos',
    educationTitle: 'Educación',
    coursesTitle: 'Cursos',
    languagesTitle: 'Idiomas',
    skillGroups: skillGroups.map((group, index) => ({ ...group, title: ['Liderazgo y producto', 'Frontend y aplicaciones', 'Backend y sistemas', 'Herramientas e integraciones'][index] })),
    certifications: certifications.map(({ detail, ...fact }) => ({ ...fact, meta: fact.meta.replace('Issued ', ''), ...(detail === 'Certificate of Achievement' ? { detail: 'Certificado de reconocimiento' } : {}) })),
    awards: awards.map((fact, index) => ({ ...fact, title: [
      'Taller de introducción a React JS', 'Top performance 2017',
      'Diseñador en la Feria de Ciencia y Tecnología 2016',
      'Primera exposición de proyectos y tareas de curso 2016',
      'Taller de diseño y desarrollo con WordPress',
      'Diseñador en la Feria de Ciencia y Tecnología 2015',
      'Diseñador en la Feria de Ciencia y Tecnología 2015',
      'Taller de desarrollo web con Ruby on Rails', 'Taller de WordPress',
      'Diseñador en XV Expociencia y Tecnología',
      'Diseñador en la Feria de Ciencia y Tecnología 2014',
      'Primer lugar · Feria de Ciencia y Tecnología 2014',
      'Primer lugar · Feria de Ciencia y Tecnología 2014',
      'Participante en Hack Fest 2014',
      'Expositor en Expociencia y Tecnología Territorial · Managua 2014',
      'Primer lugar · Feria de Ciencia y Tecnología 2013',
      'Diseñador en la Feria de Ciencia y Tecnología 2011'
    ][index], detail: [
      'Participante en taller introductorio de React JS',
      'Reconocimiento por desempeño como diseñador web',
      'Proyecto BiComfort en sistemas de manufactura',
      'Aplicación de escritorio para planificación agregada', undefined,
      'Proyecto de marketing para publicidad de muebles', 'Proyecto web InfoNica',
      undefined, undefined, 'Inventario y facturación para farmacia Josefina',
      'Aplicación Integrales en ciencias básicas',
      'Inventario y facturación farmacéutica', 'Proyecto web Nicaventura', undefined,
      'Inventario y facturación para farmacia Josefina',
      'Sistema de inventario y facturación en programación gráfica',
      'Sistema financiero en programación de consola'
    ][index] })),
    education: [{ title: 'Universidad Nacional de Ingeniería', meta: 'Ingeniería de Sistemas · 2011 - 2017' }],
    courses: [
      { title: 'Inglés · Nivel VI', meta: 'English Language Academy' },
      { title: 'Técnico en mantenimiento y reparación de PC', meta: 'Universidad Nacional de Ingeniería' },
      { title: 'Técnico en mantenimiento y reparación de computadoras', meta: 'Computers of Granada' },
      { title: 'Emprendimiento y creación de planes de negocio', meta: 'Emprende Training Center' }
    ],
    languages: [
      { title: 'Español', meta: 'Nativo o bilingüe' },
      { title: 'Inglés', meta: 'Competencia laboral limitada' }
    ]
  }
};

export const content = {
  en: {
    seoTitle: 'Reymundo Tenorio - Engineering Manager and Full-stack Product Engineer',
    seoDescription:
      'Portfolio of Reymundo Tenorio, an Engineering Manager and full-stack engineer building product systems, automation, and frontend experiences.',
    hero: {
      name: 'Reymundo Tenorio',
      role: 'Engineering Manager + Full-stack Product Engineer',
      summary:
        'I lead teams and ship product systems across React, TypeScript, Node, Firebase, and automation.',
      primaryCta: 'Explore my work',
      secondaryCta: 'Contact',
      suggestion: 'teams · product systems · applied AI',
      consoleCommand: 'rt@mission-control:~$ whoami'
    },
    missions: {
      label: 'Mission Control',
      consoleTitle: 'Mission Console'
    },
    work: {
      title: 'Projects',
      intro:
        'Products, developer tools, automation, and a decade of client work. Different problems, the same attention to how things work.',
      viewCase: 'Visit website'
    },
    experience: {
      title: 'Experience',
      intro: 'From building the first systems to leading the teams behind them.'
    },
    contact: {
      title: "Let's talk about what's next.",
      intro: 'A product, a team, or a problem to solve. The conversation starts here.',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    },
    footer: 'EN / ES'
  },
  es: {
    seoTitle: 'Reymundo Tenorio - Engineering Manager e Ingeniero full-stack de producto',
    seoDescription:
      'Portfolio de Reymundo Tenorio, Engineering Manager e ingeniero full-stack: sistemas de producto, automatización y experiencias frontend.',
    hero: {
      name: 'Reymundo Tenorio',
      role: 'Engineering Manager + Ingeniero full-stack de producto',
      summary:
        'Lidero equipos y construyo sistemas de producto con React, TypeScript, Node, Firebase y automatización.',
      primaryCta: 'Explorar mi trabajo',
      secondaryCta: 'Contacto',
      suggestion: 'equipos · sistemas de producto · IA aplicada',
      consoleCommand: 'rt@mission-control:~$ quien-soy'
    },
    missions: {
      label: 'Mission Control',
      consoleTitle: 'Consola de misión'
    },
    work: {
      title: 'Proyectos',
      intro:
        'Productos, herramientas de desarrollo, automatización y una década de trabajo con clientes. Distintos problemas, la misma atención a cómo funcionan las cosas.',
      viewCase: 'Visitar sitio'
    },
    experience: {
      title: 'Experiencia',
      intro: 'De construir los primeros sistemas a liderar los equipos que los hacen posibles.'
    },
    contact: {
      title: 'Hablemos de lo que sigue.',
      intro: 'Un producto, un equipo o un problema por resolver. La conversación empieza aquí.',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    },
    footer: 'EN / ES'
  }
};
