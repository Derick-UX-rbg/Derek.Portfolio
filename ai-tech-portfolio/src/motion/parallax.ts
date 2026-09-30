import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionProfile } from './config';

export function initParallax(profile: MotionProfile) {
  if (!profile.enableParallax || profile.reduced) return;

  const grid = document.querySelector<HTMLElement>('.grid');
  if (grid) {
    gsap.to(grid, {
      yPercent: 12 * profile.parallax,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }

  // Subtle float on hero strip / gradient accent feel without layout shift
  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.to(hero.querySelector('.copy'), {
      y: 40 * profile.parallax,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  gsap.utils.toArray<HTMLElement>('.labcard .icon, .skill .icon').forEach((el) => {
    gsap.to(el, {
      y: -10 * profile.parallax,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('.labcard, .skill') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}
