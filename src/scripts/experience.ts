const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clearLegacyServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        void registration.unregister();
      });
    })
    .catch(() => undefined);
}

async function initScrollMotion() {
  const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

  if (reduceMotion) {
    revealItems.forEach((item) => {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });
    return;
  }

  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    '[data-header]',
    { y: -18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
  );

  revealItems.forEach((item) => {
    gsap.fromTo(
      item,
      { y: 26, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

  gsap.to('.portrait', {
    y: -26,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8
    }
  });
}

async function initAtlasCanvas() {
  const canvas = document.querySelector<HTMLCanvasElement>('#atlas-canvas');
  const host = canvas?.parentElement;
  if (!canvas || !host) return;

  const THREE = await import('three');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.z = 38;

  let renderer: InstanceType<typeof THREE.WebGLRenderer>;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
  } catch {
    host.classList.add('webgl-fallback');
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const isSmall = window.matchMedia('(max-width: 760px)').matches;
  const count = isSmall ? 48 : 86;
  const basePositions = new Float32Array(count * 3);
  const pointPositions = new Float32Array(count * 3);
  const pointColors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color('#16d8e8'),
    new THREE.Color('#ff4e36'),
    new THREE.Color('#b8f13d'),
    new THREE.Color('#f5f6f3')
  ];

  let seed = 7;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < count; i += 1) {
    const group = i / count;
    const radius = 11 + random() * 22;
    const angle = random() * Math.PI * 2;
    const x = Math.cos(angle) * radius + (group - 0.5) * 24;
    const y = Math.sin(angle) * radius * 0.58 + (random() - 0.5) * 8;
    const z = (random() - 0.5) * 16;
    const index = i * 3;
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
    size: isSmall ? 0.22 : 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });

  const points = new THREE.Points(pointGeometry, pointMaterial);
  scene.add(points);

  const linePairs: Array<[number, number]> = [];
  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      const ax = basePositions[i * 3];
      const ay = basePositions[i * 3 + 1];
      const bx = basePositions[j * 3];
      const by = basePositions[j * 3 + 1];
      const dist = Math.hypot(ax - bx, ay - by);
      if (dist < 8.4 && linePairs.length < count * 2.4) {
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
    opacity: 0.22,
    depthWrite: false
  });

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  host.addEventListener('pointermove', onPointerMove);

  let frame = 0;
  let disposed = false;

  const resize = () => {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    const canvasWidth = canvas.width / renderer.getPixelRatio();
    const canvasHeight = canvas.height / renderer.getPixelRatio();

    if (Math.abs(canvasWidth - width) > 1 || Math.abs(canvasHeight - height) > 1) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };

  const syncLines = () => {
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
  };

  const render = (time = 0) => {
    resize();
    const t = time * 0.00025;

    for (let i = 0; i < count; i += 1) {
      const index = i * 3;
      const drift = reduceMotion ? 0 : Math.sin(t * 4 + i * 0.55) * 0.45;
      pointPositions[index] = basePositions[index] + drift + pointer.x * (i % 5) * 0.035;
      pointPositions[index + 1] = basePositions[index + 1] + Math.cos(t * 3 + i) * 0.28 + pointer.y * (i % 4) * 0.04;
      pointPositions[index + 2] = basePositions[index + 2] + Math.sin(t * 2 + i) * 0.4;
    }

    pointGeometry.attributes.position.needsUpdate = true;
    syncLines();
    points.rotation.y = pointer.x * 0.04 + Math.sin(t) * 0.04;
    points.rotation.x = pointer.y * 0.03;
    lines.rotation.copy(points.rotation);
    renderer.render(scene, camera);
  };

  const animate = (time: number) => {
    if (disposed) return;
    render(time);
    if (!reduceMotion) {
      frame = window.requestAnimationFrame(animate);
    }
  };

  render();
  if (!reduceMotion) {
    frame = window.requestAnimationFrame(animate);
  }

  const dispose = () => {
    disposed = true;
    if (frame) window.cancelAnimationFrame(frame);
    host.removeEventListener('pointermove', onPointerMove);
    pointGeometry.dispose();
    lineGeometry.dispose();
    pointMaterial.dispose();
    lineMaterial.dispose();
    renderer.dispose();
  };

  window.addEventListener('pagehide', dispose, { once: true });
}

clearLegacyServiceWorker();
void initScrollMotion();
void initAtlasCanvas();
