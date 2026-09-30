import gsap from 'gsap';
import type { MotionProfile } from './config';

type Cleanup = () => void;

/**
 * Soft cursor follower — Rejouice-inspired, desktop + fine pointer only.
 */
export function initCursor(profile: MotionProfile): Cleanup {
  if (profile.reduced || profile.mobile || !profile.enableMagnetic) {
    return () => undefined;
  }

  const root = document.createElement('div');
  root.className = 'cursor';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = '<div class="cursor-ball"></div><div class="cursor-label"></div>';
  document.body.appendChild(root);

  const ball = root.querySelector<HTMLElement>('.cursor-ball')!;
  const label = root.querySelector<HTMLElement>('.cursor-label')!;

  document.documentElement.classList.add('has-cursor');

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  let visible = false;
  let hovering = false;

  const setPos = () => {
    gsap.set(root, { x: pos.x, y: pos.y });
  };
  setPos();

  const ticker = () => {
    pos.x += (mouse.x - pos.x) * 0.18;
    pos.y += (mouse.y - pos.y) * 0.18;
    setPos();
  };
  gsap.ticker.add(ticker);

  const onMove = (e: PointerEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!visible) {
      visible = true;
      gsap.to(root, { opacity: 1, duration: 0.35, overwrite: 'auto' });
    }
  };

  const onLeave = () => {
    visible = false;
    gsap.to(root, { opacity: 0, duration: 0.3, overwrite: 'auto' });
  };

  const growTargets =
    'a, button, .cta, .primary, .secondary, .social, .card, .labcard, .showcase-card, .case-toggle, .menub';

  const onOver = (e: Event) => {
    const t = (e.target as HTMLElement | null)?.closest?.(growTargets);
    if (!t) return;
    hovering = true;
    root.classList.add('is-hover');
    const media = t.classList.contains('showcase-card') || t.querySelector?.('.showcase-media');
    if (media && t.classList.contains('showcase-card')) {
      label.textContent = 'Play';
      root.classList.add('has-label');
    }
    gsap.to(ball, { scale: media ? 2.4 : 1.8, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
  };

  const onOut = (e: Event) => {
    const t = (e.target as HTMLElement | null)?.closest?.(growTargets);
    if (!t) return;
    const related = (e as PointerEvent).relatedTarget as HTMLElement | null;
    if (related?.closest?.(growTargets)) return;
    hovering = false;
    root.classList.remove('is-hover', 'has-label');
    label.textContent = '';
    gsap.to(ball, { scale: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  document.addEventListener('pointerover', onOver);
  document.addEventListener('pointerout', onOut);

  return () => {
    gsap.ticker.remove(ticker);
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('pointerover', onOver);
    document.removeEventListener('pointerout', onOut);
    root.remove();
    document.documentElement.classList.remove('has-cursor');
    void hovering;
  };
}
