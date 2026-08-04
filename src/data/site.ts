export type Lang = 'en' | 'es';
export type MissionId = 'leadership' | 'product' | 'career-sites' | 'automation' | 'frontend' | 'contact';
export type ArchiveFilterId = 'all' | 'career-sites' | 'product-systems' | 'automation' | 'web';

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
  image?: string;
  url?: string;
  year: string;
  summary: {
    en: string;
    es: string;
  };
}

export interface TimelineItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  signal: string;
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
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ],
  es: [
    { label: 'Misiones', href: '#missions' },
    { label: 'Trabajo', href: '#work' },
    { label: 'Experiencia', href: '#experience' },
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
    { id: 'career-sites', label: 'Career sites' },
    { id: 'product-systems', label: 'Product systems' },
    { id: 'automation', label: 'Automation' },
    { id: 'web', label: 'Web' }
  ],
  es: [
    { id: 'all', label: 'Todo' },
    { id: 'career-sites', label: 'Career sites' },
    { id: 'product-systems', label: 'Sistemas de producto' },
    { id: 'automation', label: 'Automatizacion' },
    { id: 'web', label: 'Web' }
  ]
};

export const archiveItems: ArchiveItem[] = [
  {
    name: 'CareerBuilder Careers',
    category: 'career-sites',
    image: 'CareerBuilder-Careers.png',
    url: 'https://www.careerbuildercareers.com/',
    year: '2018 - 2020',
    summary: {
      en: 'Branded career-site ecosystem and responsive hiring experiences.',
      es: 'Ecosistema de career sites y experiencias responsive de reclutamiento.'
    }
  },
  {
    name: 'Royal Caribbean',
    category: 'career-sites',
    image: 'Royal-Caribbean-Cruises-Ltd.png',
    url: 'https://jobs.rclcareers.com/',
    year: '2019',
    summary: {
      en: 'Career platform for a global hospitality and cruise brand.',
      es: 'Plataforma de reclutamiento para una marca global de hospitality y cruises.'
    }
  },
  {
    name: 'KeyBank',
    category: 'career-sites',
    image: 'KeyBank.png',
    url: 'https://careers.key.com/',
    year: '2019',
    summary: {
      en: 'Employer-brand career experience with responsive CMS delivery.',
      es: 'Experiencia de employer brand con entrega responsive y CMS.'
    }
  },
  {
    name: 'Securitas Canada',
    category: 'career-sites',
    image: 'Securitas-Canada.png',
    url: 'https://www.securitasjobs.ca/',
    year: '2019',
    summary: {
      en: 'Localized hiring site for security operations across Canada.',
      es: 'Sitio localizado de reclutamiento para operaciones de seguridad en Canada.'
    }
  },
  {
    name: 'Dele Peso a sus Pesos',
    category: 'product-systems',
    image: 'Dele-Peso-a-sus-Pesos.png',
    url: 'https://www.delepesoasuspesos.com/',
    year: '2016 - 2022',
    summary: {
      en: 'Financial education tools and calculators integrated into WordPress.',
      es: 'Herramientas de educacion financiera y calculadoras integradas en WordPress.'
    }
  },
  {
    name: 'Better and Nice Produce Corp.',
    category: 'product-systems',
    image: 'BANP.png',
    url: 'https://banp.herokuapp.com/',
    year: '2016 - 2022',
    summary: {
      en: 'Commerce and operations system with payments, messaging, and cloud services.',
      es: 'Sistema comercial y operativo con pagos, mensajeria y servicios cloud.'
    }
  },
  {
    name: 'TPF Supervisor System',
    category: 'product-systems',
    image: 'TPF-Supervisor-System.png',
    year: '2016',
    summary: {
      en: 'Java desktop system for schedules, shifts, absences, timesheets, and reports.',
      es: 'Sistema desktop en Java para horarios, turnos, ausencias, timesheets y reportes.'
    }
  },
  {
    name: 'License keys generator',
    category: 'automation',
    image: 'License-generator.png',
    year: '2016',
    summary: {
      en: 'C# utility for machine-bound license generation and key storage.',
      es: 'Utilidad en C# para generar licencias ligadas a maquina y guardar llaves.'
    }
  },
  {
    name: 'UNI Faculty of Sciences and Systems',
    category: 'web',
    image: 'UNI.png',
    url: 'http://www.fcys.uni.edu.ni/',
    year: '2016',
    summary: {
      en: 'Institutional WordPress site for the Faculty of Sciences and Systems.',
      es: 'Sitio institucional WordPress para la Facultad de Ciencias y Sistemas.'
    }
  },
  {
    name: 'Nicaragua Tattoos',
    category: 'web',
    image: 'Nicaragua-Tattoos.png',
    url: 'http://www.nicaraguatattoos.com/',
    year: '2016',
    summary: {
      en: 'Brand website with custom WordPress theme and responsive presentation.',
      es: 'Sitio de marca con tema WordPress custom y presentacion responsive.'
    }
  }
];

export const timelineItems: Record<Lang, TimelineItem[]> = {
  en: [
    {
      company: 'Nicasource',
      role: 'Engineering Manager / Engineering Team Lead / Software Engineer',
      period: '2021 - Present',
      summary: 'Leading engineers, mentoring, improving delivery systems, and building production web and mobile applications.',
      signal: 'Leadership'
    },
    {
      company: 'Scalar',
      role: 'Software Engineer',
      period: '2022 - Present',
      summary: 'Product engineering across modern frontend and full-stack workflows for data-rich software products.',
      signal: 'Product'
    },
    {
      company: 'Editorial',
      role: 'Web Applications Developer',
      period: '2020 - 2021',
      summary:
        'Developed and maintained web applications with custom WordPress themes, plugins, and APIs, using HTML, CSS, Sass, PHP, JavaScript, jQuery, Node.js, Docker, MySQL, MongoDB, Amazon Aurora, and AWS to move traditional sites toward scalable PWAs.',
      signal: 'PWAs'
    },
    {
      company: 'Freelancer',
      role: 'Software Developer',
      period: '2016 - 2022',
      summary: 'Custom websites, financial tools, ecommerce operations, desktop systems, and API integrations for varied clients.',
      signal: 'Systems'
    },
    {
      company: 'Accedo Technologies',
      role: 'Senior Development Trainer / Web Designer',
      period: '2017 - 2020',
      summary: 'Training development teams, improving technical skills, and building responsive websites from UI/UX designs.',
      signal: 'Mentoring'
    }
  ],
  es: [
    {
      company: 'Nicasource',
      role: 'Engineering Manager / Engineering Team Lead / Software Engineer',
      period: '2021 - Presente',
      summary: 'Liderazgo de ingenieros, mentoring, mejora de sistemas de delivery y construccion de apps web/mobile en produccion.',
      signal: 'Liderazgo'
    },
    {
      company: 'Scalar',
      role: 'Software Engineer',
      period: '2022 - Presente',
      summary: 'Product engineering en flujos modernos frontend y full-stack para productos data-rich.',
      signal: 'Producto'
    },
    {
      company: 'Editorial',
      role: 'Web Applications Developer',
      period: '2020 - 2021',
      summary:
        'Desarrollo y mantenimiento de aplicaciones web con temas, plugins y APIs custom para WordPress, usando HTML, CSS, Sass, PHP, JavaScript, jQuery, Node.js, Docker, MySQL, MongoDB, Amazon Aurora y AWS para transformar sitios tradicionales en PWAs escalables.',
      signal: 'PWAs'
    },
    {
      company: 'Freelancer',
      role: 'Software Developer',
      period: '2016 - 2022',
      summary: 'Websites custom, herramientas financieras, operaciones ecommerce, sistemas desktop e integraciones API.',
      signal: 'Sistemas'
    },
    {
      company: 'Accedo Technologies',
      role: 'Senior Development Trainer / Web Designer',
      period: '2017 - 2020',
      summary: 'Entrenamiento tecnico de equipos y construccion de sitios responsive desde disenos UI/UX.',
      signal: 'Mentoring'
    }
  ]
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
      number: '01',
      title: 'Selected Work',
      intro:
        'A curated archive of shipped systems, career platforms, web builds, desktop tools, integrations, and automation.',
      archiveLabel: 'Curated archive',
      logoNote: 'Selected logos from historical builds',
      viewCase: 'View case',
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
      number: '02',
      title: 'Experience',
      intro: 'Teams, roles, and responsibilities from hands-on delivery to engineering leadership.',
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
      number: '01',
      title: 'Trabajo seleccionado',
      intro:
        'Un archivo curado de sistemas en produccion, career platforms, sitios web, herramientas desktop, integraciones y automatizacion.',
      archiveLabel: 'Archivo curado',
      logoNote: 'Logos seleccionados del historico',
      viewCase: 'Ver caso',
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
      number: '02',
      title: 'Experiencia',
      intro: 'Equipos, roles y responsabilidades desde ejecucion hands-on hasta liderazgo tecnico.',
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
