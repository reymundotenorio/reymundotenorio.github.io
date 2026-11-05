const root = document.documentElement;
const layer = document.querySelector<HTMLElement>('[data-site-intro]');
if (layer && root.dataset.introState === 'active') {
  const animations: Animation[] = [];
  const complete = () => document.dispatchEvent(new CustomEvent('portfolio:intro-complete'));
  const exit = () => {
    if (root.dataset.introState !== 'active') return;
    const mark = layer.querySelector<HTMLElement>('[data-intro-mark]')!;
    const target = document.querySelector<HTMLElement>('.brand-mark')!;
    const from = mark.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    root.dataset.introState = 'leaving';
    try {
      const timing = { duration: 600, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' as FillMode };
      animations.push(mark.animate([
        { transform: 'translate(-50%, -50%) scale(1)' },
        { transform: `translate(calc(-50% + ${to.x + to.width / 2 - from.x - from.width / 2}px), calc(-50% + ${to.y + to.height / 2 - from.y - from.height / 2}px)) scale(${to.width / from.width}, ${to.height / from.height})` }
      ], timing));
      for (const selector of ['.intro-backdrop', '.intro-command', '.intro-skip']) {
        animations.push(layer.querySelector<HTMLElement>(selector)!.animate([{ opacity: 1 }, { opacity: 0 }], { ...timing, duration: 420 }));
      }
      animations[0].finished.then(complete).catch(() => {});
    } catch { complete(); }
  };
  // The inline guard owns availability, even when this chunk never arrives.
  const timer = setTimeout(exit, Math.max(0, 1200 - (performance.now() - Number(layer.dataset.introStart))));
  document.addEventListener('portfolio:intro-finished', () => {
    clearTimeout(timer);
    animations.forEach(animation => animation.cancel());
  }, { once: true });
}
export {};
