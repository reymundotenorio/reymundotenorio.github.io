import type { MissionId } from '../data/site';

type Cleanup = () => void;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function clearLegacyServiceWorker(): void {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        void registration.unregister();
      });
    })
    .catch(() => undefined);
}

function getRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-experience-root]');
}

function queryAll<T extends Element>(root: ParentNode, selector: string): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

function setActiveMission(root: HTMLElement, id: MissionId): void {
  const nodes = queryAll<HTMLButtonElement>(root, '[data-mission-node]');
  const panels = queryAll<HTMLElement>(root, '[data-mission-panel]');

  for (const node of nodes) {
    const isActive = node.dataset.missionId === id;
    node.classList.toggle('is-active', isActive);
    node.setAttribute('aria-expanded', String(isActive));
  }

  for (const panel of panels) {
    panel.classList.toggle('is-active', panel.dataset.missionId === id);
  }

  const panel = panels.find((item) => item.dataset.missionId === id);
  const command = root.querySelector<HTMLElement>('[data-console-command]');
  const output = root.querySelector<HTMLElement>('[data-console-output]');
  if (panel && command && output) {
    command.textContent = `rt@mission-control:~$ open ${id}`;
    output.textContent = panel.querySelector('h2')?.textContent + ' / ' + panel.querySelector('.mission-panel__meta span:last-child')?.textContent;
  }
}

function initMissionControls(root: HTMLElement): Cleanup {
  const nodes = queryAll<HTMLButtonElement>(root, '[data-mission-node]');
  const handlers = nodes.map((node) => {
    const handler = (event: Event) => {
      setActiveMission(root, node.dataset.missionId as MissionId);
      if (event.type === 'click' && window.matchMedia('(max-width: 760px)').matches) {
        root.querySelector('.mission-panels')?.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
      }
    };
    node.addEventListener('click', handler);
    node.addEventListener('focus', handler);

    return () => {
      node.removeEventListener('click', handler);
      node.removeEventListener('focus', handler);
    };
  });

  return () => handlers.forEach((cleanup) => cleanup());
}

function initArchiveFilters(root: HTMLElement): Cleanup {
  const filters = queryAll<HTMLButtonElement>(root, '[data-archive-filter]');
  const items = queryAll<HTMLElement>(root, '[data-archive-item]');
  const groups = queryAll<HTMLElement>(root, '[data-archive-group]');
  const more = root.querySelector<HTMLDetailsElement>('[data-archive-more]');
  const careers = root.querySelector<HTMLElement>('[data-career-archive]');

  const handlers = filters.map((filter) => {
    const handler = () => {
      const activeFilter = filter.dataset.filter ?? 'all';

      for (const button of filters) {
        button.classList.toggle('is-active', button === filter);
        button.setAttribute('aria-pressed', String(button === filter));
      }

      for (const item of items) {
        const visible = activeFilter === 'all' || item.dataset.category === activeFilter;
        item.hidden = !visible;
      }

      for (const group of groups) {
        group.hidden = !queryAll<HTMLElement>(group, '[data-archive-item]').some((item) => !item.hidden);
      }
      if (more && !more.hidden) {
        more.open = true;
        const count = more.querySelector<HTMLElement>('[data-archive-count]');
        if (count) count.textContent = String(queryAll<HTMLElement>(more, '[data-archive-item]').filter((item) => !item.hidden).length);
      }
      if (careers) careers.hidden = activeFilter !== 'all' && activeFilter !== 'web';

      const count = items.filter((item) => !item.hidden).length;
      const status = root.querySelector<HTMLElement>('[data-archive-status]');
      if (status) {
        status.textContent = root.dataset.lang === 'es' ? `${count} proyectos` : `${count} projects`;
      }
      root.dispatchEvent(new Event('portfolio:layout'));
    };

    filter.addEventListener('click', handler);
    return () => filter.removeEventListener('click', handler);
  });

  return () => handlers.forEach((cleanup) => cleanup());
}

function initAutocomplete(root: HTMLElement): Cleanup {
  const title = root.querySelector<HTMLElement>('[data-typewrite]');
  const role = root.querySelector<HTMLElement>('[data-autocomplete]');

  if (prefersReducedMotion.matches || !title || !role) {
    root.classList.add('is-typing-complete');
    return () => undefined;
  }

  root.classList.add('is-typing');
  const timeout = window.setTimeout(() => {
    root.classList.remove('is-typing');
    root.classList.add('is-typing-complete');
  }, 1800);

  return () => window.clearTimeout(timeout);
}

async function initScrollMotion(root: HTMLElement): Promise<Cleanup> {
  if (prefersReducedMotion.matches) {
    root.classList.add('is-reduced-motion');
    return () => undefined;
  }

  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ]);

  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {
    gsap.from('.mission-control__nav', {
      autoAlpha: 0,
      y: -14,
      duration: 0.65,
      ease: 'power3.out'
    });

    gsap.from('[data-mission-node]', {
      autoAlpha: 0,
      x: 24,
      stagger: 0.055,
      delay: 0.32,
      duration: 0.7,
      ease: 'power3.out'
    });

    gsap.from('.mission-console', {
      autoAlpha: 0,
      y: 24,
      delay: 0.46,
      duration: 0.72,
      ease: 'power3.out'
    });

    gsap.utils.toArray<HTMLElement>('.timeline-item, .signal-panel, .work-archive .section-heading, .contact-dock').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 42,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          once: true
        }
      });
    });
  }, root);

  const refresh = () => ScrollTrigger.refresh();
  root.addEventListener('portfolio:layout', refresh);
  root.addEventListener('toggle', refresh, true);

  return () => {
    root.removeEventListener('portfolio:layout', refresh);
    root.removeEventListener('toggle', refresh, true);
    context.revert();
  };
}

async function initHeroCanvas(root: HTMLElement): Promise<Cleanup> {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-hero-canvas]');

  if (!canvas || prefersReducedMotion.matches) {
    return () => undefined;
  }

  // Let the document paint before loading the decorative WebGL layer.
  await new Promise<void>((resolve) => {
    const scheduleIdle = window.requestIdleCallback;
    if (typeof scheduleIdle === 'function') {
      scheduleIdle.call(window, () => resolve(), { timeout: 1600 });
    } else {
      window.setTimeout(resolve, 350);
    }
  });

  const { WebGLRenderer, Scene, PerspectiveCamera, Group, Color, BufferGeometry, BufferAttribute, PointsMaterial, Points, LineBasicMaterial, LineSegments } = await import('three');
  const isSmall = window.matchMedia('(max-width: 760px)').matches;
  const context = canvas.getContext('webgl2', { alpha: true, antialias: !isSmall, powerPreference: 'low-power' });
  if (!context) return () => undefined;
  const renderer = new WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: !isSmall,
    powerPreference: 'low-power'
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1 : 1.5));

  const scene = new Scene();
  const camera = new PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.z = 34;

  const group = new Group();
  scene.add(group);

  const count = isSmall ? 54 : 108;
  const basePositions = new Float32Array(count * 3);
  const pointPositions = new Float32Array(count * 3);
  const pointColors = new Float32Array(count * 3);
  const palette = [
    new Color('#5bdcff'),
    new Color('#ffb35c'),
    new Color('#ff4d55'),
    new Color('#f5f1e8')
  ];

  let seed = 11;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < count; i += 1) {
    const index = i * 3;
    const ribbon = i / count;
    const radius = 7 + random() * 14;
    const angle = ribbon * Math.PI * 5.4 + random() * 0.9;
    const x = Math.cos(angle) * radius + (ribbon - 0.48) * 30;
    const y = Math.sin(angle) * radius * 0.46 + Math.sin(ribbon * Math.PI * 4) * 4;
    const z = (random() - 0.5) * 18;
    const color = palette[i % palette.length];

    basePositions[index] = x;
    basePositions[index + 1] = y;
    basePositions[index + 2] = z;
    pointPositions[index] = x;
    pointPositions[index + 1] = y;
    pointPositions[index + 2] = z;
    pointColors[index] = color.r;
    pointColors[index + 1] = color.g;
    pointColors[index + 2] = color.b;
  }

  const pointGeometry = new BufferGeometry();
  pointGeometry.setAttribute('position', new BufferAttribute(pointPositions, 3));
  pointGeometry.setAttribute('color', new BufferAttribute(pointColors, 3));

  const pointMaterial = new PointsMaterial({
    size: isSmall ? 0.16 : 0.13,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false
  });

  const points = new Points(pointGeometry, pointMaterial);
  group.add(points);

  const linePairs: Array<[number, number]> = [];
  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      const ax = basePositions[i * 3];
      const ay = basePositions[i * 3 + 1];
      const bx = basePositions[j * 3];
      const by = basePositions[j * 3 + 1];
      const dist = Math.hypot(ax - bx, ay - by);

      if (dist < 4.8 && linePairs.length < count * 2) {
        linePairs.push([i, j]);
      }
    }
  }

  const linePositions = new Float32Array(linePairs.length * 6);
  const lineColors = new Float32Array(linePairs.length * 6);

  linePairs.forEach(([a, b], pairIndex) => {
    const a3 = a * 3;
    const b3 = b * 3;
    const p6 = pairIndex * 6;
    const color = palette[pairIndex % palette.length];

    linePositions[p6] = pointPositions[a3];
    linePositions[p6 + 1] = pointPositions[a3 + 1];
    linePositions[p6 + 2] = pointPositions[a3 + 2];
    linePositions[p6 + 3] = pointPositions[b3];
    linePositions[p6 + 4] = pointPositions[b3 + 1];
    linePositions[p6 + 5] = pointPositions[b3 + 2];

    for (let i = 0; i < 2; i += 1) {
      const c3 = p6 + i * 3;
      lineColors[c3] = color.r;
      lineColors[c3 + 1] = color.g;
      lineColors[c3 + 2] = color.b;
    }
  });

  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new BufferAttribute(lineColors, 3));

  const lineMaterial = new LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.24,
    depthWrite: false
  });

  const lines = new LineSegments(lineGeometry, lineMaterial);
  group.add(lines);

  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
    pointer.y = -((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
  };

  const hero = canvas.closest<HTMLElement>('.mission-control')!;
  hero.addEventListener('pointermove', onPointerMove, { passive: true });

  let frame = 0;
  let disposed = false;
  let inView = true;
  let lastFrame = 0;

  const resize = (): void => {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    const displayWidth = canvas.width / renderer.getPixelRatio();
    const displayHeight = canvas.height / renderer.getPixelRatio();

    if (Math.abs(displayWidth - width) > 1 || Math.abs(displayHeight - height) > 1) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };

  function syncLines(): void {
    linePairs.forEach(([a, b], pairIndex) => {
      const a3 = a * 3;
      const b3 = b * 3;
      const p6 = pairIndex * 6;
      linePositions[p6] = pointPositions[a3];
      linePositions[p6 + 1] = pointPositions[a3 + 1];
      linePositions[p6 + 2] = pointPositions[a3 + 2];
      linePositions[p6 + 3] = pointPositions[b3];
      linePositions[p6 + 4] = pointPositions[b3 + 1];
      linePositions[p6 + 5] = pointPositions[b3 + 2];
    });
    lineGeometry.attributes.position.needsUpdate = true;
  }

  function render(time = 0): void {
    resize();
    const t = time * 0.00035;

    for (let i = 0; i < count; i += 1) {
      const index = i * 3;
      const wave = Math.sin(t * 5 + i * 0.37);
      pointPositions[index] = basePositions[index] + wave * 0.42 + pointer.x * (i % 5) * 0.04;
      pointPositions[index + 1] = basePositions[index + 1] + Math.cos(t * 3 + i * 0.28) * 0.32 + pointer.y * (i % 4) * 0.04;
      pointPositions[index + 2] = basePositions[index + 2] + Math.sin(t * 2 + i * 0.19) * 0.5;
    }

    pointGeometry.attributes.position.needsUpdate = true;
    syncLines();
    group.rotation.y += (pointer.x * 0.08 + Math.sin(t) * 0.035 - group.rotation.y) * 0.06;
    group.rotation.x += (pointer.y * 0.045 - group.rotation.x) * 0.06;
    renderer.render(scene, camera);
  }

  function animate(time: number): void {
    if (disposed || !inView || document.hidden || prefersReducedMotion.matches) {
      frame = 0;
      return;
    }

    if (time - lastFrame >= (isSmall ? 32 : 16)) {
      render(time);
      lastFrame = time;
    }
    frame = window.requestAnimationFrame(animate);
  }

  function syncAnimation(): void {
    window.cancelAnimationFrame(frame);
    frame = 0;
    if (!disposed && inView && !document.hidden && !prefersReducedMotion.matches) {
      frame = window.requestAnimationFrame(animate);
    }
  }

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncAnimation();
  });
  observer.observe(hero);
  document.addEventListener('visibilitychange', syncAnimation);
  prefersReducedMotion.addEventListener('change', syncAnimation);

  resize();
  frame = window.requestAnimationFrame(animate);
  window.addEventListener('resize', resize);

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    hero.removeEventListener('pointermove', onPointerMove);
    observer.disconnect();
    document.removeEventListener('visibilitychange', syncAnimation);
    prefersReducedMotion.removeEventListener('change', syncAnimation);
    pointGeometry.dispose();
    lineGeometry.dispose();
    pointMaterial.dispose();
    lineMaterial.dispose();
    renderer.dispose();
  };
}

function initSectionNavigation(root: HTMLElement): Cleanup {
  const links = queryAll<HTMLAnchorElement>(document, '[data-section-link]');
  const language = root.querySelector<HTMLAnchorElement>('[data-language-switch]');
  const sections = links.map((link) => root.querySelector<HTMLElement>(link.hash)).filter((section): section is HTMLElement => !!section);
  const alternatePath = language?.pathname;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const active = sections.filter((section) => section.getBoundingClientRect().top <= window.innerHeight * 0.4).at(-1);
    for (const link of links) {
      if (active && link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    if (language && alternatePath) language.href = `${alternatePath}${active ? '#' + active.id : window.location.hash}`;
  };
  const onScroll = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
  return () => window.removeEventListener('scroll', onScroll);
}

async function init(): Promise<void> {
  clearLegacyServiceWorker();

  const root = getRoot();
  if (!root) {
    return;
  }

  const cleanups: Cleanup[] = [
    initMissionControls(root),
    initArchiveFilters(root),
    initAutocomplete(root),
    initSectionNavigation(root)
  ];

  const asyncCleanups = await Promise.allSettled([
    initScrollMotion(root),
    initHeroCanvas(root)
  ]);
  for (const result of asyncCleanups) {
    if (result.status === 'fulfilled') cleanups.push(result.value);
  }

  window.addEventListener(
    'pagehide',
    (event) => {
      if (event.persisted) return;
      cleanups.forEach((cleanup) => cleanup());
    },
    { once: true }
  );
}

void init();
