import gsap from 'gsap';
import { DUR, EASE_SOFT, type MotionProfile } from './config';

type Cleanup = () => void;

function bindMagnetic(el: HTMLElement, strength: number): Cleanup {
  const max = 12 * strength;
  let hovering = false;

  const onMove = (e: PointerEvent) => {
    if (!hovering) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: gsap.utils.clamp(-max, max, x * 0.25),
      y: gsap.utils.clamp(-max, max, y * 0.25),
      duration: DUR.magnetic,
      ease: EASE_SOFT,
      overwrite: 'auto',
    });
  };

  const onEnter = () => {
    hovering = true;
  };

  const onLeave = () => {
    hovering = false;
    gsap.to(el, { x: 0, y: 0, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
  };

  el.classList.add('is-magnetic');
  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);

  return () => {
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerleave', onLeave);
    gsap.set(el, { clearProps: 'x,y' });
    el.classList.remove('is-magnetic');
  };
}

export function initMagnetic(profile: MotionProfile): Cleanup {
  if (!profile.enableMagnetic || profile.reduced) return () => undefined;

  const cleanups: Cleanup[] = [];
  const strength = profile.magnetic;

  document
    .querySelectorAll<HTMLElement>('.cta, .primary, .secondary, .social, a.link')
    .forEach((el) => cleanups.push(bindMagnetic(el, strength)));

  return () => cleanups.forEach((fn) => fn());
}
