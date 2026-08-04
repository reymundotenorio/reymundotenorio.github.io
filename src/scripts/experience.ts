type MissionId = 'leadership' | 'product' | 'career-sites' | 'automation' | 'frontend' | 'contact';
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
}

function initMissionControls(root: HTMLElement): Cleanup {
  const nodes = queryAll<HTMLButtonElement>(root, '[data-mission-node]');
  const handlers = nodes.map((node) => {
    const handler = () => setActiveMission(root, node.dataset.missionId as MissionId);
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

  const handlers = filters.map((filter) => {
    const handler = () => {
      const activeFilter = filter.dataset.filter ?? 'all';

      for (const button of filters) {
        button.classList.toggle('is-active', button === filter);
      }

      for (const item of items) {
        const visible = activeFilter === 'all' || item.dataset.category === activeFilter;
        item.hidden = !visible;
      }
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

  const timeout = window.setTimeout(() => {
    root.classList.add('is-typing-complete');
  }, 1100);

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

    gsap.utils.toArray<HTMLElement>('.mission-panel, .work-archive, .experience-timeline, .contact-dock').forEach((section) => {
      gsap.from(section, {
        autoAlpha: 0,
        y: 42,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%'
        }
      });
    });
  }, root);

  return () => context.revert();
}

async function initHeroCanvas(root: HTMLElement): Promise<Cleanup> {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-hero-canvas]');

  if (!canvas || prefersReducedMotion.matches) {
    return () => undefined;
  }

  const THREE = await import('three');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance'
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.z = 34;

  const group = new THREE.Group();
  scene.add(group);

  const isSmall = window.matchMedia('(max-width: 760px)').matches;
  const count = isSmall ? 76 : 132;
  const basePositions = new Float32Array(count * 3);
  const pointPositions = new Float32Array(count * 3);
  const pointColors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color('#5bdcff'),
    new THREE.Color('#ffb35c'),
    new THREE.Color('#ff4d55'),
    new THREE.Color('#f5f1e8')
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

  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
  pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

  const pointMaterial = new THREE.PointsMaterial({
    size: isSmall ? 0.16 : 0.13,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false
  });

  const points = new THREE.Points(pointGeometry, pointMaterial);
  group.add(points);

  const linePairs: Array<[number, number]> = [];
  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      const ax = basePositions[i * 3];
      const ay = basePositions[i * 3 + 1];
      const bx = basePositions[j * 3];
      const by = basePositions[j * 3 + 1];
      const dist = Math.hypot(ax - bx, ay - by);

      if (dist < 5.3 && linePairs.length < count * 2.7) {
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

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.24,
    depthWrite: false
  });

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);

  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
    pointer.y = -((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
  };

  root.addEventListener('pointermove', onPointerMove);

  let frame = 0;
  let disposed = false;

  function resize(): void {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    const displayWidth = canvas.width / renderer.getPixelRatio();
    const displayHeight = canvas.height / renderer.getPixelRatio();

    if (Math.abs(displayWidth - width) > 1 || Math.abs(displayHeight - height) > 1) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }

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
    group.rotation.y = pointer.x * 0.045 + Math.sin(t) * 0.035;
    group.rotation.x = pointer.y * 0.025;
    renderer.render(scene, camera);
  }

  function animate(time: number): void {
    if (disposed) {
      return;
    }

    render(time);
    frame = window.requestAnimationFrame(animate);
  }

  resize();
  frame = window.requestAnimationFrame(animate);
  window.addEventListener('resize', resize);

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    root.removeEventListener('pointermove', onPointerMove);
    pointGeometry.dispose();
    lineGeometry.dispose();
    pointMaterial.dispose();
    lineMaterial.dispose();
    renderer.dispose();
  };
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
    initAutocomplete(root)
  ];

  try {
    const asyncCleanups = await Promise.all([
      initScrollMotion(root),
      initHeroCanvas(root)
    ]);
    cleanups.push(...asyncCleanups);
  } catch (error) {
    console.warn('Mission Control enhancement skipped', error);
  }

  window.addEventListener(
    'pagehide',
    () => {
      cleanups.forEach((cleanup) => cleanup());
    },
    { once: true }
  );
}

void init();
