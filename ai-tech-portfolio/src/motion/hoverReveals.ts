import gsap from 'gsap';
import { DUR, EASE_SOFT, type MotionProfile } from './config';

type Cleanup = () => void;

/**
 * Portfolio / card hover reveals — soft inner motion only.
 * Leaves CSS transform hovers intact; animates children (flow, tags, metas, media).
 */
export function initHoverReveals(profile: MotionProfile): Cleanup {
  if (profile.reduced || profile.mobile) return () => undefined;

  const cleanups: Cleanup[] = [];

  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    const flow = card.querySelector('.flow');
    const tags = card.querySelectorAll('.tag');
    const link = card.querySelector('.link');

    const onEnter = () => {
      if (flow) gsap.to(flow, { y: -4, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
      if (tags.length) {
        gsap.to(tags, {
          y: -4,
          stagger: 0.028,
          duration: DUR.hover,
          ease: EASE_SOFT,
          overwrite: 'auto',
        });
      }
      if (link) gsap.to(link, { x: 7, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    };
    const onLeave = () => {
      gsap.to([flow, ...Array.from(tags), link].filter(Boolean), {
        x: 0,
        y: 0,
        duration: DUR.hover,
        ease: EASE_SOFT,
        overwrite: 'auto',
      });
    };
    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
    });
  });

  document.querySelectorAll<HTMLElement>('.labcard').forEach((card) => {
    const icon = card.querySelector('.icon');
    const metas = card.querySelectorAll('.meta');
    const onEnter = () => {
      if (icon) gsap.to(icon, { rotate: -7, scale: 1.07, duration: DUR.hover, ease: EASE_SOFT });
      if (metas.length) {
        gsap.to(metas, { y: -3, stagger: 0.03, duration: DUR.hover, ease: EASE_SOFT });
      }
    };
    const onLeave = () => {
      if (icon) gsap.to(icon, { rotate: 0, scale: 1, duration: DUR.hover, ease: EASE_SOFT });
      gsap.to(metas, { y: 0, duration: DUR.hover, ease: EASE_SOFT });
    };
    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
    });
  });

  document.querySelectorAll<HTMLElement>('.showcase-card').forEach((card) => {
    const media = card.querySelector('.showcase-media');
    const badge = card.querySelector('.showcase-badge');
    const bodyH = card.querySelector('.showcase-body h3');
    // Avoid fighting scrub parallax on video scale — polish chrome only
    const onEnter = () => {
      if (media) gsap.to(media, { y: -4, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
      if (badge) gsap.to(badge, { scale: 1.08, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
      if (bodyH) gsap.to(bodyH, { x: 4, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    };
    const onLeave = () => {
      if (media) gsap.to(media, { y: 0, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
      if (badge) gsap.to(badge, { scale: 1, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
      if (bodyH) gsap.to(bodyH, { x: 0, duration: DUR.hover, ease: EASE_SOFT, overwrite: 'auto' });
    };
    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
