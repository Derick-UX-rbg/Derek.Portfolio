import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionProfile } from './config';

export function initParallax(profile: MotionProfile) {
  if (!profile.enableParallax || profile.reduced) return;

  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.to(hero.querySelector('.copy'), {
      y: 56 * profile.parallax,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Soft scale on showcase media while scrolling into view
  gsap.utils.toArray<HTMLElement>('.showcase-media video').forEach((vid) => {
    gsap.fromTo(
      vid,
      { scale: 1.08 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: vid.closest('.showcase-card') || vid,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('.labcard .icon, .skill .icon').forEach((el) => {
    gsap.to(el, {
      y: -12 * profile.parallax,
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
