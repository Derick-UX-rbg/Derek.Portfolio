import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DUR, EASE, type MotionProfile } from './config';

function revealBatch(
  selector: string,
  profile: MotionProfile,
  opts: { y?: number; stagger?: number; clip?: boolean } = {},
) {
  const els = gsap.utils.toArray<HTMLElement>(selector);
  if (!els.length) return;

  const y = (opts.y ?? 40) * profile.strength;
  const stagger = (opts.stagger ?? 0.1) * profile.strength;
  const useClip = Boolean(opts.clip) && !profile.mobile;

  gsap.set(els, {
    opacity: 0,
    y,
    ...(useClip ? { clipPath: 'inset(8% 0 8% 0)' } : {}),
  });

  ScrollTrigger.batch(els, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ...(useClip ? { clipPath: 'inset(0% 0 0% 0)' } : {}),
        duration: DUR.reveal * (0.85 + 0.15 * profile.strength),
        stagger,
        ease: EASE,
        overwrite: 'auto',
      });
    },
  });
}

function imageReveals(profile: MotionProfile) {
  const media = gsap.utils.toArray<HTMLElement>('[data-reveal="media"]');
  media.forEach((el) => {
    const y = 28 * profile.strength;
    gsap.set(el, {
      opacity: 0,
      y,
      clipPath: profile.mobile ? 'none' : 'inset(14% 0 14% 0)',
    });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0% 0)',
          duration: DUR.reveal * 1.1,
          ease: EASE,
        });
      },
    });
  });
}

export function initReveals(profile: MotionProfile) {
  if (profile.reduced) return;

  // Section headers as units (includes label + h2)
  revealBatch('.section .head', profile, { y: 28, stagger: 0.05 });
  revealBatch('.section .intro', profile, { y: 24, stagger: 0 });

  revealBatch('.card', profile, { y: 48, stagger: 0.12 });
  revealBatch('.labcard', profile, { y: 36, stagger: 0.1, clip: true });
  // Showcase media must stay visible on #lab land — no opacity:0 hide
  // (ScrollTrigger batch was leaving cards invisible below the fold.)
  revealBatch('.skill', profile, { y: 32, stagger: 0.08 });
  revealBatch('.stackcard', profile, { y: 28, stagger: 0.06 });
  revealBatch('.principle', profile, { y: 24, stagger: 0.07 });
  revealBatch('.pipeline .step', profile, { y: 20, stagger: 0.05 });
  revealBatch('.contact', profile, { y: 36, stagger: 0 });
  // About copy column only (principles animate separately)
  revealBatch('.about > div:first-child', profile, { y: 30, stagger: 0 });

  imageReveals(profile);
}
