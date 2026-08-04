export type Lang = 'en' | 'es';

export const siteMeta = {
  email: 'reymundotenorio@gmail.com',
  linkedin: 'https://www.linkedin.com/in/reymundotenorio/',
  github: 'https://github.com/reymundotenorio',
  portrait: '/images/portraits/reymundo-editorial.webp',
  portraitSrcSet: '/images/portraits/reymundo-editorial-960.webp 960w, /images/portraits/reymundo-editorial.webp 1536w',
  ogImage: '/images/portraits/reymundo-editorial-og.jpg'
};

export const navItems = {
  en: [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#stack' },
    { label: 'Contact', href: '#contact' }
  ],
  es: [
    { label: 'Trabajo', href: '#work' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Stack', href: '#stack' },
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

export const content = {
  en: {
    seoTitle: 'Reymundo Tenorio - Engineering Manager and Full-stack Product Engineer',
    seoDescription:
      'Portfolio of Reymundo Tenorio, an Engineering Manager and full-stack engineer building high-impact digital products across web, mobile, desktop, and AI-enabled systems.',
    languageLabel: 'ES',
    hero: {
      name: 'Reymundo Tenorio',
      role: 'Engineering Manager / Full-stack product engineer',
      copy:
        'I build high-impact digital products and lead technical teams with clarity and empathy, from idea to production and beyond.',
      primaryCta: 'View work',
      secondaryCta: 'Contact',
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
    work: {
      number: '01',
      title: 'Selected work',
      intro:
        'A cross-section of shipped work across career platforms, custom websites, financial tools, ecommerce systems, mobile apps, desktop utilities, and internal automation.',
      archiveLabel: 'Archive from the original portfolio',
      logoNote: 'Selected logos from historical builds',
      items: [
        {
          kind: 'Career platforms',
          name: 'Career-site archive',
          year: '2017 - 2020',
          detail: '32 branded hiring sites built with HTML, Sass, Bootstrap, PencilBlue, Photoshop, and WordPress patterns.',
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
        },
        {
          kind: 'Institutional / web',
          name: 'UNI Faculty of Sciences and Systems',
          year: '2016',
          detail: 'Institutional WordPress site for the Faculty of Sciences and Systems at Universidad Nacional de Ingeniería.',
          url: 'http://www.fcys.uni.edu.ni/'
        },
        {
          kind: 'Desktop systems',
          name: 'TPF Supervisor System',
          year: '2016',
          detail: 'Java desktop system for staff schedules, shifts, absences, role generation, timesheets, and JasperReports reporting.'
        },
        {
          kind: 'Licensing',
          name: 'License keys generator',
          year: '2016',
          detail: 'C# desktop utility for machine-bound license generation using cryptographic rules and MySQL storage.'
        }
      ]
    },
    experience: {
      number: '02',
      title: 'Experience',
      intro: 'Teams, roles, and responsibilities from hands-on delivery to engineering leadership.',
      items: [
        {
          company: 'Nicasource',
          role: 'Engineering Manager / Engineering Team Lead / Software Engineer',
          period: '2021 - Present',
          detail: 'Leading engineers, mentoring, improving delivery systems, and building production web and mobile applications.'
        },
        {
          company: 'Scalar',
          role: 'Software Engineer',
          period: '2022 - Present',
          detail: 'Product engineering across modern frontend and full-stack workflows for data-rich software products.'
        },
        {
          company: 'Freelancer',
          role: 'Software Developer',
          period: '2016 - 2022',
          detail: 'Custom websites, financial tools, ecommerce operations, desktop systems, and API integrations for varied clients.'
        },
        {
          company: 'Independent Consultant',
          role: 'Senior Web Developer',
          period: '2020 - 2021',
          detail: 'Custom WordPress themes, plugins, APIs, PWAs, and scalable AWS-backed applications.'
        },
        {
          company: 'Accedo Technologies',
          role: 'Senior Development Trainer / Web Designer',
          period: '2017 - 2020',
          detail: 'Training development teams, improving technical skills, and building responsive websites from UI/UX designs.'
        },
        {
          company: 'Accedo Digital Inc.',
          role: 'Web Developer',
          period: '2018 - 2020',
          detail: 'Responsive WordPress themes, internal tools, and workflow automation with Python, Node.js, and PHP.'
        }
      ]
    },
    stack: {
      number: '03',
      title: 'Stack',
      intro: 'Tools I use to move from product decision to shipped software.'
    },
    principles: {
      number: '04',
      title: 'How I work',
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
      title: 'Contact',
      intro: 'Let us build something sharp, useful, and maintainable.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    },
    footer: 'Built with Astro, GSAP, and Three.js. Static by default, animated where it matters.'
  },
  es: {
      seoTitle: 'Reymundo Tenorio - Engineering Manager e Ingeniero Full-stack',
    seoDescription:
      'Portfolio de Reymundo Tenorio, Engineering Manager e ingeniero full-stack creando productos digitales de alto impacto en web, mobile, desktop y sistemas con IA.',
    languageLabel: 'EN',
    hero: {
      name: 'Reymundo Tenorio',
      role: 'Engineering Manager / Ingeniero full-stack de producto',
      copy:
        'Construyo productos digitales de alto impacto y lidero equipos técnicos con claridad y empatía, desde la idea hasta producción y más allá.',
      primaryCta: 'Ver trabajo',
      secondaryCta: 'Contacto',
      meta: ['Granada, Nicaragua', 'Web / mobile / desktop', 'Inglés / Español', 'Construyendo desde 2016'],
      markers: [
        { title: 'Sistemas de producto', detail: 'React / TypeScript / Node' },
        { title: 'Ritmo de equipo', detail: 'Mentoría / delivery / claridad' },
        { title: 'IA aplicada', detail: 'OpenAI API / tooling operativo' }
      ],
      railLabel: 'Línea profesional',
      rail: [
        { label: 'Fundamentos', years: '2011 - 2016' },
        { label: 'Primeros productos', years: '2016 - 2018' },
        { label: 'Escala y oficio', years: '2018 - 2021' },
        { label: 'Liderazgo', years: '2021 - Presente' }
      ]
    },
    work: {
      number: '01',
      title: 'Trabajo seleccionado',
      intro:
        'Una muestra de trabajo real en career sites, sitios a la medida, herramientas financieras, ecommerce, mobile apps, desktop utilities y automatización interna.',
      archiveLabel: 'Archivo del portfolio original',
      logoNote: 'Logos seleccionados de builds históricos',
      items: [
        {
          kind: 'Career platforms',
          name: 'Archivo de career sites',
          year: '2017 - 2020',
          detail: '32 sitios de reclutamiento de marca construidos con HTML, Sass, Bootstrap, PencilBlue, Photoshop y patrones de WordPress.',
          url: 'https://www.careerbuildercareers.com/'
        },
        {
          kind: 'Herramientas financieras',
          name: 'Dele Peso a sus Pesos',
          year: '2016 - 2022',
          detail: 'Calculadoras integradas en WordPress para liquidación, nivel de endeudamiento, pensión alimenticia, salario neto y edad de retiro.',
          url: 'https://www.delepesoasuspesos.com/'
        },
        {
          kind: 'Sistemas comerciales',
          name: 'Better and Nice Produce Corp.',
          year: '2016 - 2022',
          detail: 'Sistema comercial y ecommerce con Rails, MySQL, AWS, Pusher, PayPal, Stripe, Twilio y SendGrid.',
          url: 'https://banp.herokuapp.com/'
        },
        {
          kind: 'Institucional / web',
          name: 'Facultad de Ciencias y Sistemas - UNI',
          year: '2016',
          detail: 'Sitio institucional en WordPress para la Facultad de Ciencias y Sistemas de la Universidad Nacional de Ingeniería.',
          url: 'http://www.fcys.uni.edu.ni/'
        },
        {
          kind: 'Desktop systems',
          name: 'TPF Supervisor System',
          year: '2016',
          detail: 'Sistema Java de escritorio para horarios, turnos, ausencias, generación de roles, planillas y reportes con JasperReports.'
        },
        {
          kind: 'Licenciamiento',
          name: 'License keys generator',
          year: '2016',
          detail: 'Utilidad de escritorio en C# para generar licencias atadas a máquina con reglas criptográficas y almacenamiento MySQL.'
        }
      ]
    },
    experience: {
      number: '02',
      title: 'Experiencia',
      intro: 'Equipos, roles y responsabilidades desde desarrollo hands-on hasta liderazgo técnico.',
      items: [
        {
          company: 'Nicasource',
          role: 'Engineering Manager / Engineering Team Lead / Software Engineer',
          period: '2021 - Presente',
          detail: 'Liderazgo, mentoría, mejora de sistemas de delivery y construcción de aplicaciones web y mobile en producción.'
        },
        {
          company: 'Scalar',
          role: 'Software Engineer',
          period: '2022 - Presente',
          detail: 'Ingeniería de producto en flujos modernos frontend y full-stack para productos de software ricos en datos.'
        },
        {
          company: 'Freelancer',
          role: 'Software Developer',
          period: '2016 - 2022',
          detail: 'Sitios a la medida, herramientas financieras, operaciones ecommerce, sistemas desktop e integraciones API.'
        },
        {
          company: 'Independent Consultant',
          role: 'Senior Web Developer',
          period: '2020 - 2021',
          detail: 'Temas WordPress, plugins, APIs, PWAs y aplicaciones escalables sobre infraestructura AWS.'
        },
        {
          company: 'Accedo Technologies',
          role: 'Senior Development Trainer / Web Designer',
          period: '2017 - 2020',
          detail: 'Formación de equipos, mejora de habilidades técnicas y construcción de sitios responsivos desde diseños UI/UX.'
        },
        {
          company: 'Accedo Digital Inc.',
          role: 'Web Developer',
          period: '2018 - 2020',
          detail: 'Temas WordPress responsivos, herramientas internas y automatización de flujos con Python, Node.js y PHP.'
        }
      ]
    },
    stack: {
      number: '03',
      title: 'Stack',
      intro: 'Herramientas que uso para pasar de decisión de producto a software en producción.'
    },
    principles: {
      number: '04',
      title: 'Cómo trabajo',
      items: [
        {
          title: 'Claridad antes que velocidad',
          detail: 'Un equipo avanza mejor cuando el problema, la propiedad y las restricciones están visibles.'
        },
        {
          title: 'Liderazgo hands-on',
          detail: 'Me mantengo lo bastante cerca del código para tomar decisiones técnicas que aguanten producción.'
        },
        {
          title: 'Sistemas que enseñan',
          detail: 'Buen tooling, hábitos de review y documentación ayudan a que el equipo crezca sin frenar el trabajo.'
        }
      ]
    },
    contact: {
      number: '05',
      title: 'Contacto',
      intro: 'Construyamos algo preciso, útil y mantenible.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    },
    footer: 'Hecho con Astro, GSAP y Three.js. Estático por defecto, animado donde importa.'
  }
} as const;
