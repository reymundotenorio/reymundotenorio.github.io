export type Lang = 'en' | 'es';
export type MissionId = 'leadership' | 'product' | 'career-sites' | 'automation' | 'frontend' | 'contact';
export type ArchiveFilterId = 'all' | 'linkedin-projects' | 'product-systems' | 'web' | 'editorial';

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
  category: Exclude<ArchiveFilterId, 'all'>;
  url?: string;
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
  email: string;
  linkedin: string;
  github: string;
  ogImage?: string;
} = {
  email: 'reymundotenorio@gmail.com',
  linkedin: 'https://www.linkedin.com/in/reymundotenorio/',
  github: 'https://github.com/reymundotenorio'
};

export const navItems = {
  en: [
    { label: 'Missions', href: '#missions' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#work' },
    { label: 'Signals', href: '#signals' },
    { label: 'Contact', href: '#contact' }
  ],
  es: [
    { label: 'Misiones', href: '#missions' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Proyectos', href: '#work' },
    { label: 'Senales', href: '#signals' },
    { label: 'Contacto', href: '#contact' }
  ]
};

export const logoArchive = [
  { name: 'CareerBuilder Careers', image: 'CareerBuilder-Careers.png', url: 'https://www.careerbuildercareers.com/' },
  { name: 'Royal Caribbean Cruises Ltd.', image: 'Royal-Caribbean-Cruises-Ltd.png', url: 'https://jobs.rclcareers.com/' },
  { name: 'KeyBank', image: 'KeyBank.png', url: 'https://careers.key.com/' },
  { name: 'Securitas Canada', image: 'Securitas-Canada.png', url: 'https://www.securitasjobs.ca/' },
  { name: 'TruGreen', image: 'TruGreen.png', url: 'https://jobs.trugreen.com/' },
  { name: 'Spin Master', image: 'Spin-Master.png', url: 'https://www.spinmastercareers.com/' },
  { name: 'Teleperformance Greece', image: 'Teleperformance-Greece.png', url: 'https://careers.teleperformance.gr/' },
  { name: 'PODS', image: 'PODS.png', url: 'https://careers.pods.com/' },
  { name: 'Butterball', image: 'Butterball.png', url: 'https://careers.butterball.com/' },
  { name: 'Nicaragua Tattoos', image: 'Nicaragua-Tattoos.png', url: 'http://www.nicaraguatattoos.com/' },
  { name: 'Dele Peso a sus Pesos', image: 'Dele-Peso-a-sus-Pesos.png', url: 'https://www.delepesoasuspesos.com/' },
  { name: 'Better and Nice Produce Corp.', image: 'BANP.png', url: 'https://banp.herokuapp.com/' }
];

export const stack = [
  'React',
  'TypeScript',
  'Node.js',
  'Firebase',
  'React Native',
  'WordPress',
  'PHP',
  'MySQL',
  'PostgreSQL',
  'AWS',
  'Ruby on Rails',
  'C#',
  'Java',
  'OpenAI API'
];

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
      id: 'career-sites',
      label: 'M-03',
      title: 'Career Sites',
      summary: 'A broad archive of branded hiring sites and responsive web builds.',
      proof: ['CareerBuilder Careers', 'Royal Caribbean', 'KeyBank', 'Securitas Canada'],
      stack: ['HTML', 'Sass', 'WordPress'],
      stat: '30+ builds'
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
      proof: ['Email', 'LinkedIn', 'GitHub'],
      stack: ['EN', 'ES', 'Remote'],
      stat: 'Open'
    }
  ],
  es: [
    {
      id: 'leadership',
      label: 'M-01',
      title: 'Liderazgo',
      summary: 'Mentoria, claridad de entrega y decisiones tecnicas conectadas con produccion.',
      proof: ['Engineering Manager en Nicasource', 'Responsabilidades de team lead y mentoring', 'Sistemas de delivery y habitos de review'],
      stack: ['Planificacion', 'Mentoria', 'Delivery'],
      stat: '2021 - presente'
    },
    {
      id: 'product',
      label: 'M-02',
      title: 'Ingenieria de producto',
      summary: 'Construccion de software data-rich con criterio full-stack practico.',
      proof: ['Product engineering en Scalar', 'Flujos con React y TypeScript', 'Backend e integraciones'],
      stack: ['React', 'TypeScript', 'Node'],
      stat: 'Full-stack'
    },
    {
      id: 'career-sites',
      label: 'M-03',
      title: 'Career sites',
      summary: 'Archivo amplio de sitios de reclutamiento, marcas y experiencias responsive.',
      proof: ['CareerBuilder Careers', 'Royal Caribbean', 'KeyBank', 'Securitas Canada'],
      stack: ['HTML', 'Sass', 'WordPress'],
      stat: '30+ builds'
    },
    {
      id: 'automation',
      label: 'M-04',
      title: 'Automatizacion',
      summary: 'Herramientas, scripts, APIs y sistemas con AI que reducen trabajo manual.',
      proof: ['Workflows con OpenAI API', 'Tooling con Node y Python', 'Automatizacion de procesos internos'],
      stack: ['Node', 'Python', 'OpenAI API'],
      stat: 'Sistemas'
    },
    {
      id: 'frontend',
      label: 'M-05',
      title: 'Sistemas frontend',
      summary: 'Interfaces que se mantienen usables bajo restricciones reales de producto.',
      proof: ['Sistemas UI en React', 'Pantallas responsive de producto', 'Ejecucion de diseno a codigo'],
      stack: ['React', 'CSS', 'UX'],
      stat: 'UI craft'
    },
    {
      id: 'contact',
      label: 'M-06',
      title: 'Contacto',
      summary: 'La ruta mas corta para iniciar una conversacion tecnica seria.',
      proof: ['Email', 'LinkedIn', 'GitHub'],
      stack: ['EN', 'ES', 'Remote'],
      stat: 'Abierto'
    }
  ]
};

export const archiveFilters: Record<Lang, ArchiveFilter[]> = {
  en: [
    { id: 'all', label: 'All' },
    { id: 'linkedin-projects', label: 'LinkedIn projects' },
    { id: 'product-systems', label: 'Product systems' },
    { id: 'web', label: 'Web' },
    { id: 'editorial', label: 'Editorial' }
  ],
  es: [
    { id: 'all', label: 'Todo' },
    { id: 'linkedin-projects', label: 'Proyectos LinkedIn' },
    { id: 'product-systems', label: 'Sistemas de producto' },
    { id: 'web', label: 'Web' },
    { id: 'editorial', label: 'Editorial' }
  ]
};

export const archiveItems: ArchiveItem[] = [
  {
    name: 'UNI Faculty of Sciences and Systems',
    category: 'linkedin-projects',
    url: 'http://www.fcys.uni.edu.ni/',
    year: 'Dec 2016 - Present',
    source: {
      en: 'LinkedIn project',
      es: 'Proyecto LinkedIn'
    },
    summary: {
      en: 'Member of the development team for the Faculty of Sciences and Systems website at Universidad Nacional de Ingenieria.',
      es: 'Miembro del equipo de desarrollo del sitio web de la Facultad de Ciencias y Sistemas de la Universidad Nacional de Ingenieria.'
    },
    details: {
      en: ['Associated with Universidad Nacional de Ingenieria.', 'Built with WordPress as content manager.', 'Institutional web presence for an academic faculty.'],
      es: ['Asociado con Universidad Nacional de Ingenieria.', 'Desarrollado con WordPress como gestor de contenido.', 'Presencia web institucional para una facultad academica.']
    },
    stack: ['WordPress', 'PHP', 'HTML', 'CSS']
  },
  {
    name: 'Sistema TPF-Supervisor',
    category: 'linkedin-projects',
    year: 'May 2016 - Present',
    source: {
      en: 'LinkedIn project',
      es: 'Proyecto LinkedIn'
    },
    summary: {
      en: 'Desktop system for TPF operations in Granada, covering places, schedules, shifts, staff, overtime, absences, role creation, and payroll calculations.',
      es: 'Sistema de escritorio para operaciones TPF en Granada: lugares, horarios, turnos, personal, horas extras, ausencias, roles y calculo de planillas.'
    },
    details: {
      en: ['Built in Java with MySQL as database manager.', 'Supports staff scheduling, absences, role generation, timesheet calculations, and reporting.', 'A practical operations system rather than a brochure project.'],
      es: ['Desarrollado en Java con MySQL como gestor de base de datos.', 'Soporta horarios, ausencias, generacion de roles, calculos de planilla y reportes.', 'Sistema operativo practico, no un proyecto de brochure.']
    },
    stack: ['Java', 'MySQL', 'JasperReports', 'Desktop']
  },
  {
    name: 'Editorial PWA systems',
    category: 'editorial',
    year: 'May 2020 - May 2021',
    source: {
      en: 'Editorial role, added from verified experience',
      es: 'Rol Editorial, agregado desde experiencia verificada'
    },
    summary: {
      en: 'Development and maintenance of web applications through custom WordPress themes, plugins, APIs, AWS infrastructure, and PWA transformation.',
      es: 'Desarrollo y mantenimiento de aplicaciones web con temas WordPress custom, plugins, APIs, infraestructura AWS y transformacion a PWAs.'
    },
    details: {
      en: ['Used HTML, CSS, Sass, PHP, JavaScript, jQuery, Node.js, Docker, MySQL, MongoDB, Amazon Aurora, and AWS.', 'Focused on scalable deployments and enhanced performance/user experience.', 'Included because the LinkedIn Projects section does not list this work separately.'],
      es: ['Uso de HTML, CSS, Sass, PHP, JavaScript, jQuery, Node.js, Docker, MySQL, MongoDB, Amazon Aurora y AWS.', 'Enfoque en despliegues escalables y mejoras de performance/UX.', 'Incluido porque la seccion Projects de LinkedIn no lista este trabajo por separado.']
    },
    stack: ['WordPress', 'AWS', 'Docker', 'Amazon Aurora', 'PWA']
  },
  {
    name: 'Dele Peso a sus Pesos financial tools',
    category: 'product-systems',
    url: 'https://www.delepesoasuspesos.com/',
    year: '2016 - 2022',
    source: {
      en: 'LinkedIn experience',
      es: 'Experiencia LinkedIn'
    },
    summary: {
      en: 'Suite of financial tools for severance pay, debt level, alimony, net salary, and retirement age, integrated into WordPress.',
      es: 'Suite de herramientas financieras para liquidacion, deuda, pension alimenticia, salario neto y edad de retiro, integrada en WordPress.'
    },
    details: {
      en: ['Built with HTML, Sass, and jQuery.', 'Turned financial education into calculators users could operate directly.', 'Maintained as part of freelance product work.'],
      es: ['Construido con HTML, Sass y jQuery.', 'Convirtio educacion financiera en calculadoras operables por usuarios.', 'Mantenido como parte del trabajo freelance de producto.']
    },
    stack: ['WordPress', 'HTML', 'Sass', 'jQuery']
  },
  {
    name: 'Better and Nice Produce Corp. operations',
    category: 'product-systems',
    url: 'https://banp.herokuapp.com/',
    year: '2016 - 2022',
    source: {
      en: 'LinkedIn experience',
      es: 'Experiencia LinkedIn'
    },
    summary: {
      en: 'Commercial and ecommerce operations system for a Miami produce business, with real-time features, payments, messaging, and cloud infrastructure.',
      es: 'Sistema comercial y ecommerce para una empresa de produce en Miami, con tiempo real, pagos, mensajeria e infraestructura cloud.'
    },
    details: {
      en: ['Built with Ruby on Rails, jQuery, Sass, Haml, Bootstrap, and MySQL.', 'Integrated Pusher, AWS S3/RDS, PayPal, Stripe, Twilio, and SendGrid.', 'Covered business operations, not only the public site.'],
      es: ['Construido con Ruby on Rails, jQuery, Sass, Haml, Bootstrap y MySQL.', 'Integracion con Pusher, AWS S3/RDS, PayPal, Stripe, Twilio y SendGrid.', 'Cubria operaciones del negocio, no solo el sitio publico.']
    },
    stack: ['Ruby on Rails', 'MySQL', 'AWS', 'Stripe', 'Twilio']
  },
  {
    name: 'Career site production archive',
    category: 'web',
    url: 'https://www.careerbuildercareers.com/',
    year: '2017 - 2020',
    source: {
      en: 'LinkedIn experience',
      es: 'Experiencia LinkedIn'
    },
    summary: {
      en: 'Responsive hiring sites and WordPress/PencilBlue builds produced across Accedo Technologies and Accedo Digital.',
      es: 'Sitios responsive de reclutamiento y builds WordPress/PencilBlue producidos en Accedo Technologies y Accedo Digital.'
    },
    details: {
      en: ['Developed websites with HTML, Sass, Bootstrap, PencilBlue CMS, Photoshop, and Illustrator.', 'Built custom WordPress themes from Adobe XD UI/UX designs.', 'Recognized as Top Web Designer of the Year 2017 at Accedo Technologies.'],
      es: ['Desarrollo con HTML, Sass, Bootstrap, PencilBlue CMS, Photoshop e Illustrator.', 'Temas WordPress custom desde disenos UI/UX en Adobe XD.', 'Reconocido como Top Web Designer of the Year 2017 en Accedo Technologies.']
    },
    stack: ['HTML', 'Sass', 'Bootstrap', 'WordPress', 'PencilBlue']
  }
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
        'Engineering Manager desde Jul 2025, Engineering Team Lead de Jul 2022 a Jul 2025 y Software Engineer desde May 2021. Construccion de apps web/mobile con React, TypeScript, Redux, Firebase, REST APIs, Node.js, MySQL, PostgreSQL y React Native, junto con liderazgo de delivery y mentoring.',
      signal: 'Liderazgo'
    },
    {
      company: 'Scalar',
      role: 'Software Engineer',
      period: 'Aug 2022 - Presente',
      summary: 'Product engineering remoto en flujos frontend y full-stack con React, Tailwind CSS, TypeScript, Python, Django, Next.js, Storybook y Cypress para productos data-rich.',
      signal: 'Producto'
    },
    {
      company: 'Editorial',
      role: 'Senior Web Developer',
      period: 'May 2020 - May 2021',
      summary:
        'Desarrollo y mantenimiento de aplicaciones web con temas, plugins y APIs custom para WordPress, usando HTML, CSS, Sass, PHP, JavaScript, jQuery, Node.js, Docker, MySQL, MongoDB, Amazon Aurora y AWS para transformar sitios tradicionales en PWAs escalables.',
      signal: 'PWAs'
    },
    {
      company: 'Freelancer',
      role: 'Software Developer',
      period: 'Mar 2016 - Mar 2022',
      summary:
        'Construccion de sitios WordPress, herramientas financieras, sistemas ecommerce/operativos, utilidades de licencia en C#, software desktop Java para horarios/planillas, integraciones API y sistemas de negocio.',
      signal: 'Sistemas'
    },
    {
      company: 'Accedo Technologies',
      role: 'Senior Development Trainer / Web Designer',
      period: 'Mar 2017 - May 2020',
      summary:
        'Evaluacion y entrenamiento de equipos, introduccion de tecnologias web y produccion de sitios responsive con HTML, Sass, Bootstrap, PencilBlue CMS, Photoshop e Illustrator. Reconocido como Top Web Designer of the Year 2017.',
      signal: 'Mentoring'
    },
    {
      company: 'Accedo Digital Inc.',
      role: 'Web Developer',
      period: 'Sep 2018 - May 2020',
      summary:
        'Diseno y desarrollo de sitios responsive, temas WordPress custom desde disenos Adobe XD y herramientas internas con Python, Node.js y PHP para operaciones y eficiencia de workflows.',
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
    items: ['Node.js', 'Python', 'Django', 'PHP', 'Ruby on Rails', 'Java', 'C#', 'Kotlin', 'Swift', 'WordPress', 'MySQL', 'MongoDB', 'Microsoft SQL Server', 'AWS', 'Docker']
  },
  {
    title: 'Tools / craft',
    items: ['OpenAI API', 'Git', 'Linux', 'PSD to HTML', 'Adobe Photoshop', 'Firebase', 'PostgreSQL', 'REST APIs', 'Redux', 'Redux-Thunk']
  }
];

const certifications: ProfileFact[] = [
  { title: 'Curso de OpenAI API', meta: 'Platzi · Issued Jun 2026', detail: 'Credential ID visible on LinkedIn' },
  { title: 'Dale Carnegie Course: Effective Communications and Human Relations', meta: 'Dale Carnegie Nicaragua · Issued Jun 2024', detail: 'Certificate of Achievement' },
  { title: 'Make a Website', meta: 'Codecademy', detail: 'Credential available' },
  { title: 'Introduction to JavaScript', meta: 'Codecademy', detail: 'Credential available' },
  { title: 'Learn Sass', meta: 'Codecademy', detail: 'Credential available' },
  { title: 'Rails for Zombies 2', meta: 'Code School', detail: 'Credential available' },
  { title: 'Deploy a Website', meta: 'Codecademy', detail: 'Credential available' },
  { title: 'Try Ruby', meta: 'Code School', detail: 'Credential available' },
  { title: 'Learn Git', meta: 'Codecademy', detail: 'Credential available' },
  { title: 'Ruby on Rails: Authentication', meta: 'Codecademy', detail: 'Credential available' },
  { title: 'Learn Ruby on Rails', meta: 'Codecademy', detail: 'Credential available' },
  { title: 'Learn Ruby', meta: 'Codecademy', detail: 'Credential available' },
  { title: 'Rails for Zombies Redux', meta: 'Code School', detail: 'Credential available' }
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
    eyebrow: '// linkedin signal',
    title: 'Skills, credentials, and recognition',
    intro: 'A compact view of the profile sections LinkedIn exposes: 69 skills, 13 certifications, 17 honors and awards, courses, education, and languages.',
    skillsTitle: 'Skills matrix',
    certificationsTitle: 'Certifications',
    awardsTitle: 'Honors and awards',
    educationTitle: 'Education',
    coursesTitle: 'Courses',
    languagesTitle: 'Languages',
    skillGroups,
    certifications,
    awards,
    education: educationFacts,
    courses: courseFacts,
    languages: languageFacts
  },
  es: {
    eyebrow: '// senal linkedin',
    title: 'Skills, credenciales y reconocimientos',
    intro: 'Vista compacta de las secciones verificadas en LinkedIn: 69 skills, 13 certificaciones, 17 premios/reconocimientos, cursos, educacion e idiomas.',
    skillsTitle: 'Matriz de skills',
    certificationsTitle: 'Certificaciones',
    awardsTitle: 'Premios y reconocimientos',
    educationTitle: 'Educacion',
    coursesTitle: 'Cursos',
    languagesTitle: 'Idiomas',
    skillGroups,
    certifications,
    awards,
    education: educationFacts,
    courses: courseFacts,
    languages: [
      { title: 'Espanol', meta: 'Nativo o bilingue' },
      { title: 'Ingles', meta: 'Competencia laboral limitada' }
    ]
  }
};

export const content = {
  en: {
    seoTitle: 'Reymundo Tenorio - Engineering Manager and Full-stack Product Engineer',
    seoDescription:
      'Portfolio of Reymundo Tenorio, an Engineering Manager and full-stack engineer building product systems, automation, and frontend experiences.',
    languageLabel: 'ES',
    hero: {
      name: 'Reymundo Tenorio',
      role: 'Engineering Manager + Full-stack Product Engineer',
      summary:
        'I lead teams and ship product systems across React, TypeScript, Node, Firebase, and automation.',
      copy:
        'I lead teams and ship product systems across React, TypeScript, Node, Firebase, and automation.',
      primaryCta: 'Open missions',
      secondaryCta: 'Contact',
      status: 'Available for selected product engineering and leadership conversations',
      suggestion: 'suggested: product systems, teams, automation',
      consoleCommand: 'rt@mission-control:~$ whoami',
      consoleResult: 'Reymundo Tenorio - Engineering Manager + Full-stack Product Engineer',
      meta: ['Granada, Nicaragua', 'Web / mobile / desktop', 'English / Spanish', 'Building since 2016'],
      markers: [
        { title: 'Product systems', detail: 'React / TypeScript / Node' },
        { title: 'Team rhythm', detail: 'Mentoring / delivery / clarity' },
        { title: 'Applied AI', detail: 'OpenAI API / workflow tooling' }
      ],
      railLabel: 'Career timeline',
      rail: [
        { label: 'Foundations', years: '2011 - 2016' },
        { label: 'First products', years: '2016 - 2018' },
        { label: 'Scale and craft', years: '2018 - 2021' },
        { label: 'Leadership', years: '2021 - Present' }
      ]
    },
    missions: {
      label: 'Mission Control',
      consoleTitle: 'Mission Console',
      accept: 'Accept mission'
    },
    work: {
      number: '03',
      title: 'Projects',
      intro:
        'LinkedIn-backed project dossiers first, with the Editorial PWA work added from verified experience because it is not listed as a LinkedIn project.',
      archiveLabel: 'Project dossiers',
      logoNote: 'Text-first project evidence',
      viewCase: 'Open link',
      items: [
        {
          kind: 'Career platforms',
          name: 'Career-site archive',
          year: '2017 - 2020',
          detail: '30+ branded hiring sites built with HTML, Sass, Bootstrap, PencilBlue, Photoshop, and WordPress patterns.',
          url: 'https://www.careerbuildercareers.com/'
        },
        {
          kind: 'Financial tools',
          name: 'Dele Peso a sus Pesos',
          year: '2016 - 2022',
          detail: 'WordPress-integrated calculators for severance pay, debt level, alimony, net salary, and retirement age.',
          url: 'https://www.delepesoasuspesos.com/'
        },
        {
          kind: 'Commerce systems',
          name: 'Better and Nice Produce Corp.',
          year: '2016 - 2022',
          detail: 'Commercial and ecommerce operations system with Rails, MySQL, AWS, Pusher, PayPal, Stripe, Twilio, and SendGrid.',
          url: 'https://banp.herokuapp.com/'
        }
      ]
    },
    experience: {
      number: '01',
      title: 'Experience',
      intro: 'Roles, dates, responsibilities, and technical scope pulled from the current LinkedIn profile, with Editorial kept anonymized.',
      items: timelineItems.en.map((item) => ({
        company: item.company,
        role: item.role,
        period: item.period,
        detail: item.summary
      }))
    },
    stack: {
      number: '03',
      title: 'Stack',
      intro: 'Tools I use to move from product decision to shipped software.'
    },
    principles: {
      number: '04',
      title: 'Operating Principles',
      items: [
        {
          title: 'Clarity before velocity',
          detail: 'A team moves faster when the problem, ownership, and constraints are visible.'
        },
        {
          title: 'Hands-on leadership',
          detail: 'I stay close enough to the code to make technical decisions that hold up in production.'
        },
        {
          title: 'Systems that teach',
          detail: 'Good tooling, review habits, and documentation help engineers grow without slowing the work.'
        }
      ]
    },
    contact: {
      number: '05',
      title: 'Start a mission',
      intro: 'Send the context, the constraint, or the problem. I will answer with a practical next step.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    },
    footer: 'Built fast, bilingual, and intentionally strange.'
  },
  es: {
    seoTitle: 'Reymundo Tenorio - Engineering Manager e Ingeniero full-stack de producto',
    seoDescription:
      'Portfolio de Reymundo Tenorio, Engineering Manager e ingeniero full-stack construyendo sistemas de producto, automatizacion y experiencias frontend.',
    languageLabel: 'EN',
    hero: {
      name: 'Reymundo Tenorio',
      role: 'Engineering Manager + Ingeniero full-stack de producto',
      summary:
        'Lidero equipos y construyo sistemas de producto con React, TypeScript, Node, Firebase y automatizacion.',
      copy:
        'Lidero equipos y construyo sistemas de producto con React, TypeScript, Node, Firebase y automatizacion.',
      primaryCta: 'Abrir misiones',
      secondaryCta: 'Contacto',
      status: 'Disponible para conversaciones selectas de producto, ingenieria y liderazgo',
      suggestion: 'sugerido: sistemas de producto, equipos, automatizacion',
      consoleCommand: 'rt@mission-control:~$ quien-soy',
      consoleResult: 'Reymundo Tenorio - Engineering Manager + Ingeniero full-stack de producto',
      meta: ['Granada, Nicaragua', 'Web / mobile / desktop', 'Ingles / Espanol', 'Construyendo desde 2016'],
      markers: [
        { title: 'Sistemas de producto', detail: 'React / TypeScript / Node' },
        { title: 'Ritmo de equipo', detail: 'Mentoring / delivery / claridad' },
        { title: 'AI aplicada', detail: 'OpenAI API / workflow tooling' }
      ],
      railLabel: 'Timeline profesional',
      rail: [
        { label: 'Base', years: '2011 - 2016' },
        { label: 'Primeros productos', years: '2016 - 2018' },
        { label: 'Escala y craft', years: '2018 - 2021' },
        { label: 'Liderazgo', years: '2021 - Presente' }
      ]
    },
    missions: {
      label: 'Mission Control',
      consoleTitle: 'Consola de mision',
      accept: 'Aceptar mision'
    },
    work: {
      number: '03',
      title: 'Proyectos',
      intro:
        'Dossiers de proyectos basados primero en LinkedIn, con Editorial agregado desde experiencia verificada porque no aparece como proyecto en LinkedIn.',
      archiveLabel: 'Dossiers de proyecto',
      logoNote: 'Evidencia textual de proyectos',
      viewCase: 'Abrir enlace',
      items: [
        {
          kind: 'Career platforms',
          name: 'Career-site archive',
          year: '2017 - 2020',
          detail: '30+ sitios de reclutamiento con HTML, Sass, Bootstrap, PencilBlue, Photoshop y patrones WordPress.',
          url: 'https://www.careerbuildercareers.com/'
        },
        {
          kind: 'Herramientas financieras',
          name: 'Dele Peso a sus Pesos',
          year: '2016 - 2022',
          detail: 'Calculadoras integradas en WordPress para liquidacion, deuda, pension alimenticia, salario neto y retiro.',
          url: 'https://www.delepesoasuspesos.com/'
        },
        {
          kind: 'Sistemas comerciales',
          name: 'Better and Nice Produce Corp.',
          year: '2016 - 2022',
          detail: 'Sistema comercial y ecommerce con Rails, MySQL, AWS, Pusher, PayPal, Stripe, Twilio y SendGrid.',
          url: 'https://banp.herokuapp.com/'
        }
      ]
    },
    experience: {
      number: '01',
      title: 'Experiencia',
      intro: 'Roles, fechas, responsabilidades y alcance tecnico desde el perfil actual de LinkedIn, manteniendo Editorial anonimizado.',
      items: timelineItems.es.map((item) => ({
        company: item.company,
        role: item.role,
        period: item.period,
        detail: item.summary
      }))
    },
    stack: {
      number: '03',
      title: 'Stack',
      intro: 'Herramientas para pasar de decision de producto a software en produccion.'
    },
    principles: {
      number: '04',
      title: 'Principios de trabajo',
      items: [
        {
          title: 'Claridad antes que velocidad',
          detail: 'Un equipo avanza mas rapido cuando el problema, ownership y restricciones estan visibles.'
        },
        {
          title: 'Liderazgo hands-on',
          detail: 'Me mantengo lo suficientemente cerca del codigo para tomar decisiones tecnicas que resistan produccion.'
        },
        {
          title: 'Sistemas que ensenan',
          detail: 'Buen tooling, habitos de review y documentacion ayudan al equipo a crecer sin frenar el trabajo.'
        }
      ]
    },
    contact: {
      number: '05',
      title: 'Iniciar mision',
      intro: 'Enviame el contexto, la restriccion o el problema. Respondo con un siguiente paso practico.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    },
    footer: 'Construido rapido, bilingue e intencionalmente distinto.'
  }
};
