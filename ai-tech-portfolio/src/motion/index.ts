import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import { getMotionProfile } from './config';
import { initSmoothScroll } from './smoothScroll';
import { initHero } from './hero';
import { initReveals } from './reveals';
import { initParallax } from './parallax';
import { initMagnetic } from './magnetic';
import { initNav } from './nav';
import { initHoverReveals } from './hoverReveals';
import { initMicro } from './micro';

gsap.registerPlugin(ScrollTrigger);

export type MotionHandle = {
  destroy: () => void;
};

/**
 * Premium cinematic motion system for Derek.Portfolio.
 * Motion/interaction only — does not alter layout, branding, or copy.
 */
export function initMotion(root?: HTMLElement | null): MotionHandle {
  const profile = getMotionProfile();
  const cleanups: Array<() => void> = [];

  document.documentElement.classList.add('has-motion');
  if (profile.reduced) document.documentElement.classList.add('motion-reduced');
  if (profile.mobile) document.documentElement.classList.add('motion-mobile');

  const smooth = initSmoothScroll(profile);
  cleanups.push(smooth.destroy);

  initHero(profile);
  initReveals(profile);
  initParallax(profile);
  cleanups.push(initMagnetic(profile));
  cleanups.push(initHoverReveals(profile));
  cleanups.push(initMicro(profile));
  cleanups.push(initNav(profile, smooth.lenis));

  // Refresh after fonts/layout settle
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  requestAnimationFrame(refresh);

  const settleTimer = window.setTimeout(() => {
    document.documentElement.classList.add('motion-settled');
  }, 4200);
  cleanups.push(() => window.clearTimeout(settleTimer));

  // Re-evaluate on resize (mobile ↔ desktop)
  let resizeTimer = 0;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
  };
  window.addEventListener('resize', onResize);
  cleanups.push(() => window.removeEventListener('resize', onResize));

  // Respect live preference changes
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMq = () => {
    // Soft kill animations if user enables reduced motion mid-session
    if (mq.matches) {
      gsap.globalTimeline.clear();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.documentElement.classList.add('motion-reduced');
      smooth.destroy();
    }
  };
  mq.addEventListener?.('change', onMq);
  cleanups.push(() => mq.removeEventListener?.('change', onMq));

  void root;

  return {
    destroy: () => {
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf('*');
      document.documentElement.classList.remove(
        'has-motion',
        'motion-reduced',
        'motion-mobile',
        'has-smooth-scroll',
        'motion-settled',
      );
    },
  };
}

export { getMotionProfile } from './config';
