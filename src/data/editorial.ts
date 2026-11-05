export const about = {
  en: [
    'Engineer at heart, with a strong focus on building high-impact digital products and leading technical teams with clarity and empathy. I combine hands-on experience across the full stack with a constant drive for learning, mentoring, and improving systems, both human and technical.',
    'My background includes web, mobile, and desktop applications using React, TypeScript, Node.js, Firebase, and other technologies. I value simplicity, performance, and clean architecture, aiming to deliver solutions that are robust and user-friendly.',
    'I believe in creating environments where engineers can grow, ideas can scale, and code can empower.'
  ],
  es: [
    'Ingeniero de vocación, enfocado en construir productos digitales de impacto y liderar equipos técnicos con claridad y empatía. Combino experiencia práctica en todo el stack con el aprendizaje constante, la mentoría y la mejora de sistemas, tanto humanos como técnicos.',
    'Mi trayectoria incluye aplicaciones web, móviles y de escritorio con React, TypeScript, Node.js, Firebase y otras tecnologías. Valoro la simplicidad, el rendimiento y una arquitectura clara para crear soluciones robustas y fáciles de usar.',
    'Creo en crear entornos donde los ingenieros puedan crecer, las ideas puedan escalar y el código pueda abrir posibilidades.'
  ]
};

export const recognitionDetails = {
  en: [
    'Participant in the introductory React JS workshop organized by Comunidad Drupal Nicaragua.',
    'Recognized for the top performance of 2017 as a web designer at Accedo Technologies.',
    'Designer of BiComfort, a sofa that transforms into a bunk bed, presented in the manufacturing systems category.',
    'Presented the Aggregate Planning desktop application at the first exhibition of projects and course tasks.',
    'Participated in the WordPress Design and Development workshop organized by the Faculty of Sciences and Systems and the Mozilla Nicaragua community.',
    'Presented a marketing proposal to improve advertising for Muebleria El Paisa.',
    'Presented the InfoNica website in the web page category.',
    'Participated in the Ruby on Rails web application development workshop organized by the Faculty of Sciences and Systems.',
    'Participated in the WordPress workshop organized by the Faculty of Sciences and Systems and TechCreative.',
    'Presented the Josefina pharmacy inventory and billing application at the XV Expociencia and Technology.',
    'Presented Integrales in the basic sciences category at the 2014 Science and Technology Fair.',
    'First place in client-server programming for the pharmaceutical inventory and billing system.',
    'First place in the web page category for the Nicaventura website.',
    'Participated in Hack Fest 2014, organized by the Faculty of Sciences and Systems.',
    'Exhibited the Josefina pharmacy inventory and billing system at the first Territorial Expociencia and Technology.',
    'First place in graphic programming for an inventory and billing system.',
    'Presented a financial status system in the console programming category.'
  ],
  es: [
    'Participante del taller introductorio de React JS organizado por Comunidad Drupal Nicaragua.',
    'Reconocimiento al mejor rendimiento de 2017 como diseñador web en Accedo Technologies.',
    'Diseñador de BiComfort, un sofá que se transforma en litera, presentado en la categoría de sistemas de manufactura.',
    'Presentación de la aplicación de escritorio de Planeación Agregada en la primera exposición de proyectos y tareas de curso.',
    'Participación en el taller de Diseño y Desarrollo con WordPress, organizado por la Facultad de Ciencias y Sistemas y la comunidad Mozilla Nicaragua.',
    'Presentación de una propuesta de marketing para mejorar la publicidad de Mueblería El Paisa.',
    'Presentación del sitio InfoNica en la categoría de páginas web.',
    'Participación en el taller de desarrollo de aplicaciones web con Ruby on Rails de la Facultad de Ciencias y Sistemas.',
    'Participación en el taller de WordPress organizado por la Facultad de Ciencias y Sistemas y TechCreative.',
    'Presentación del sistema de inventario y facturación de farmacia Josefina en la XV Expociencia y Tecnología.',
    'Presentación de Integrales en la categoría de ciencias básicas de la Feria de Ciencia y Tecnología 2014.',
    'Primer lugar en programación cliente-servidor por el sistema de inventario y facturación farmacéutica.',
    'Primer lugar en la categoría de páginas web por el sitio Nicaventura.',
    'Participación en Hack Fest 2014, organizado por la Facultad de Ciencias y Sistemas.',
    'Exposición del sistema de inventario y facturación de farmacia Josefina en la primera Expociencia y Tecnología Territorial.',
    'Primer lugar en programación gráfica por un sistema de inventario y facturación.',
    'Presentación de un sistema de estados financieros en la categoría de programación en consola.'
  ]
};

export const stackGroups = [
  {id:'languages',title:{en:'Languages',es:'Lenguajes'},items:['TypeScript','JavaScript','Python','PHP','Ruby','Go','Java','C#','Kotlin','Swift','SQL','Shell']},
  {id:'frameworks',title:{en:'Frameworks & runtimes',es:'Frameworks y runtimes'},items:['React','React Native','Next.js','Node.js','Ruby on Rails','Django','Laravel','Express.js','WordPress','Vue.js','Frontity','PencilBlue','Astro']},
  {id:'databases',title:{en:'Databases & backend services',es:'Bases de datos y servicios backend'},items:['PostgreSQL','MySQL','Microsoft SQL Server','MongoDB','Amazon Aurora','Supabase','Firebase']},
  {id:'interface',title:{en:'UI & rendering',es:'Interfaz y estilos'},items:['HTML','CSS','Sass / SCSS','Tailwind CSS','Bootstrap','Material-UI','ERB','Haml','Jade / Pug']},
  {id:'cloud',title:{en:'Cloud & delivery',es:'Cloud y despliegue'},items:['AWS','Docker','GitHub Actions','Linux']},
  {id:'tools',title:{en:'Development & testing',es:'Desarrollo y testing'},items:['Git','GitHub','Playwright','Cypress','Storybook','Visual Studio']},
  {id:'ai',title:{en:'AI & automation',es:'IA y automatización'},items:['Codex','Claude Code','Cursor','OpenAI API','Anthropic Claude','OpenClaw','n8n']}
];

export const aiCapabilities = [
  {id:'engineering',title:{en:'AI-assisted engineering',es:'Desarrollo asistido por IA'},description:{en:'AI coding tools for implementation, debugging, refactoring and tests, with code review and verification.',es:'Herramientas de IA para implementar, depurar, refactorizar y crear pruebas, con revisión de código y verificación.'},tools:['Codex','Claude Code','Cursor'],target:'toolkit',link:{en:'Development toolkit',es:'Herramientas de desarrollo'}},
  {id:'integrations',title:{en:'AI product integrations',es:'Integraciones de IA en productos'},description:{en:'DuePulse uses AI-assisted document extraction, structured output validation and a review step before suggestions become records.',es:'DuePulse usa extracción de documentos asistida por IA, validación de resultados estructurados y revisión antes de convertir sugerencias en registros.'},tools:['OpenAI API','Structured output','Validation'],target:'project-duepulse',link:{en:'DuePulse',es:'DuePulse'}},
  {id:'automation',title:{en:'Workflow automation',es:'Automatización de flujos de trabajo'},description:{en:'TimeWeaver combines AI-assisted activity summaries with n8n, API integrations and browser automation for timesheet drafts.',es:'TimeWeaver combina resúmenes de actividad asistidos por IA con n8n, integraciones de APIs y automatización del navegador para preparar borradores de timesheets.'},tools:['n8n','OpenAI API','Playwright'],target:'project-time-weaver',link:{en:'TimeWeaver',es:'TimeWeaver'}}
];

export const roleHistory = {
  en: [
    { title: 'Engineering Manager', dates: 'Jul 2025 - Present' },
    { title: 'Engineering Team Lead', dates: 'Jul 2022 - Jul 2025' },
    { title: 'Software Engineer', dates: 'May 2021 - Present' }
  ],
  es: [
    { title: 'Engineering Manager', dates: 'Jul 2025 - Actualidad' },
    { title: 'Líder de equipo de ingeniería', dates: 'Jul 2022 - Jul 2025' },
    { title: 'Ingeniero de software', dates: 'May 2021 - Actualidad' }
  ]
};
