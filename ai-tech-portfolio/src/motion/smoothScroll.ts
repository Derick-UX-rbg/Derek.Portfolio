import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionProfile } from './config';

export type SmoothScrollHandle = {
  lenis: Lenis | null;
  destroy: () => void;
};

export function initSmoothScroll(profile: MotionProfile): SmoothScrollHandle {
  if (!profile.enableLenis) {
    return { lenis: null, destroy: () => undefined };
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
    wheelMultiplier: 0.95,
    autoRaf: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const ticker = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  document.documentElement.classList.add('has-smooth-scroll');
  // Prefer Lenis over CSS smooth scroll to avoid double-smoothing.
  document.documentElement.style.scrollBehavior = 'auto';

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      document.documentElement.classList.remove('has-smooth-scroll');
      document.documentElement.style.scrollBehavior = '';
    },
  };
}

export function scrollToHash(lenis: Lenis | null, hash: string) {
  const id = hash.replace('#', '');
  const target = document.getElementById(id) || document.querySelector(hash);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.2 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
