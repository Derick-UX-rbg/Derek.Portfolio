import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DUR, EASE, type MotionProfile } from './config';
import type Lenis from 'lenis';
import { scrollToHash } from './smoothScroll';

export function initNav(profile: MotionProfile, lenis: Lenis | null): () => void {
  const nav = document.querySelector<HTMLElement>('.nav');
  if (!nav) return () => undefined;

  const cleanups: Array<() => void> = [];

  if (!profile.reduced) {
    gsap.from(nav, {
      y: -24 * profile.strength,
      opacity: 0,
      duration: DUR.nav,
      ease: EASE,
      delay: 0.05,
    });

    ScrollTrigger.create({
      start: 40,
      onUpdate: (self) => {
        const scrolled = self.scroll() > 24;
        nav.classList.toggle('nav-scrolled', scrolled);
      },
    });

    // Soft underline / color polish on nav links
    nav.querySelectorAll<HTMLElement>('.links a').forEach((a) => {
      const onEnter = () => gsap.to(a, { color: '#67e8f9', duration: 0.25, overwrite: 'auto' });
      const onLeave = () => gsap.to(a, { color: '#94a3b8', duration: 0.3, overwrite: 'auto' });
      a.addEventListener('pointerenter', onEnter);
      a.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        a.removeEventListener('pointerenter', onEnter);
        a.removeEventListener('pointerleave', onLeave);
        gsap.set(a, { clearProps: 'color' });
      });
    });
  }

  // Smooth in-page anchors via Lenis when available
  const onClick = (e: Event) => {
    const t = e.target as HTMLElement | null;
    const a = t?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    scrollToHash(lenis, href);
  };
  document.addEventListener('click', onClick);
  cleanups.push(() => document.removeEventListener('click', onClick));

  return () => cleanups.forEach((fn) => fn());
}
