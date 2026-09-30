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
      y: -28 * profile.strength,
      opacity: 0,
      duration: DUR.nav,
      ease: EASE,
      delay: 0.04,
    });

    ScrollTrigger.create({
      start: 40,
      onUpdate: (self) => {
        const scrolled = self.scroll() > 24;
        nav.classList.toggle('nav-scrolled', scrolled);
      },
    });
  }

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
