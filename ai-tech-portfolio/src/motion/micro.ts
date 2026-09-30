import gsap from 'gsap';
import { DUR, EASE_SOFT, type MotionProfile } from './config';

type Cleanup = () => void;

/**
 * Restrained micro-interactions — press feedback, link nudges, menu fade.
 * Desktop-first; skipped on reduced-motion / coarse pointers where noted.
 */
export function initMicro(profile: MotionProfile): Cleanup {
  if (profile.reduced) return () => undefined;

  const cleanups: Cleanup[] = [];

  // CTA / primary press scale (works on touch too — no magnetic required)
  document.querySelectorAll<HTMLElement>('.cta, .primary').forEach((el) => {
    const down = () =>
      gsap.to(el, { scale: 0.97, duration: 0.14, ease: EASE_SOFT, overwrite: 'auto' });
    const up = () =>
      gsap.to(el, { scale: 1, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointerleave', up);
    el.addEventListener('pointercancel', up);
    cleanups.push(() => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointerleave', up);
      el.removeEventListener('pointercancel', up);
      gsap.set(el, { clearProps: 'scale' });
    });
  });

  if (profile.mobile) {
    return () => cleanups.forEach((fn) => fn());
  }

  // Secondary / social — soft lift on hover (magnetic already handles x/y pull)
  document.querySelectorAll<HTMLElement>('.secondary, .social').forEach((el) => {
    const onEnter = () =>
      gsap.to(el, { y: -2, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    const onLeave = () =>
      gsap.to(el, { y: 0, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { clearProps: 'y' });
    });
  });

  // Case-study toggles — arrow nudge + color pulse without fighting CSS rotate
  document.querySelectorAll<HTMLElement>('.case-toggle').forEach((btn) => {
    const onEnter = () =>
      gsap.to(btn, { x: 3, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    const onLeave = () =>
      gsap.to(btn, { x: 0, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    btn.addEventListener('pointerenter', onEnter);
    btn.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      btn.removeEventListener('pointerenter', onEnter);
      btn.removeEventListener('pointerleave', onLeave);
      gsap.set(btn, { clearProps: 'x' });
    });
  });

  // Skill / nowcard / service — soft icon or title nudge (CSS already lifts card)
  document.querySelectorAll<HTMLElement>('.skill, .nowcard, .service').forEach((card) => {
    const icon = card.querySelector('.icon');
    const title = card.querySelector('h3, b');
    const onEnter = () => {
      if (icon) gsap.to(icon, { y: -3, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
      if (title) gsap.to(title, { x: 2, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    };
    const onLeave = () => {
      if (icon) gsap.to(icon, { y: 0, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
      if (title) gsap.to(title, { x: 0, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    };
    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
    });
  });

  // Brand mark — tiny rotate on hover
  const mark = document.querySelector<HTMLElement>('.brand .mark');
  if (mark) {
    const brand = mark.closest('.brand') || mark;
    const onEnter = () =>
      gsap.to(mark, { rotate: -6, scale: 1.04, duration: DUR.hover, ease: EASE_SOFT });
    const onLeave = () =>
      gsap.to(mark, { rotate: 0, scale: 1, duration: DUR.hover, ease: EASE_SOFT });
    brand.addEventListener('pointerenter', onEnter);
    brand.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      brand.removeEventListener('pointerenter', onEnter);
      brand.removeEventListener('pointerleave', onLeave);
      gsap.set(mark, { clearProps: 'rotate,scale' });
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
