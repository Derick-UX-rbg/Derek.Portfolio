import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionProfile } from './config';

export function initParallax(profile: MotionProfile) {
  if (!profile.enableParallax || profile.reduced) return;

  const grid = document.querySelector<HTMLElement>('.grid');
  if (grid) {
    gsap.to(grid, {
      yPercent: 10 * profile.parallax,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }

  const hero = document.querySelector('.hero');
  if (hero) {
    gsap.to(hero.querySelector('.copy'), {
      y: 48 * profile.parallax,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Soft cinematic settle on showcase video while scrolling into view (desktop)
  if (!profile.mobile) {
    gsap.utils.toArray<HTMLElement>('.showcase-media video').forEach((vid) => {
      gsap.fromTo(
        vid,
        { scale: 1.06 },
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

  // Soft section-head drift (desktop) — restrained
  if (!profile.mobile) {
    gsap.utils.toArray<HTMLElement>('.section .head').forEach((head) => {
      gsap.to(head, {
        y: 18 * profile.parallax,
        ease: 'none',
        scrollTrigger: {
          trigger: head.closest('.section') || head,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }
}
