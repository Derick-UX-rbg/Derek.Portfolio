import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DUR, EASE, EASE_EXPO, splitWords, type MotionProfile } from './config';

function revealBatch(
  selector: string,
  profile: MotionProfile,
  opts: { y?: number; stagger?: number; clip?: boolean } = {},
) {
  const els = gsap.utils.toArray<HTMLElement>(selector);
  if (!els.length) return;

  const y = (opts.y ?? 44) * profile.strength;
  const stagger = (opts.stagger ?? 0.1) * profile.strength;
  const useClip = Boolean(opts.clip) && !profile.mobile;

  gsap.set(els, {
    opacity: 0,
    y,
    ...(useClip ? { clipPath: 'inset(9% 0 9% 0)' } : {}),
  });

  ScrollTrigger.batch(els, {
    start: 'top 87%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ...(useClip ? { clipPath: 'inset(0% 0 0% 0)' } : {}),
        duration: DUR.reveal * (0.88 + 0.12 * profile.strength),
        stagger,
        ease: EASE,
        overwrite: 'auto',
      });
    },
  });
}

function headingReveals(profile: MotionProfile) {
  const heads = gsap.utils.toArray<HTMLElement>('.section h2');
  heads.forEach((h2) => {
    const words = splitWords(h2);
    if (!words.length) return;
    gsap.set(words, { opacity: 0, y: 32 * profile.strength });
    ScrollTrigger.create({
      trigger: h2,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: DUR.reveal * 1.05,
          stagger: 0.04 * profile.strength,
          ease: EASE_EXPO,
        });
      },
    });
  });
}

/**
 * Showcase / media reveals — transform + clip only.
 * Never opacity:0 on showcase cards (broke #lab visibility historically).
 */
function imageReveals(profile: MotionProfile) {
  if (profile.mobile) return;

  const media = gsap.utils.toArray<HTMLElement>('[data-reveal="media"], .showcase-media');
  media.forEach((el) => {
    gsap.set(el, {
      clipPath: 'inset(12% 0 12% 0)',
      scale: 1.035,
    });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          scale: 1,
          clipPath: 'inset(0% 0 0% 0)',
          duration: DUR.reveal * 1.15,
          ease: EASE,
        });
      },
    });
  });
}

export function initReveals(profile: MotionProfile) {
  if (profile.reduced) return;

  revealBatch('.section .head .label', profile, { y: 18, stagger: 0.04 });
  revealBatch('.section .intro', profile, { y: 26, stagger: 0 });
  headingReveals(profile);

  revealBatch('.card', profile, { y: 52, stagger: 0.13 });
  revealBatch('.labcard', profile, { y: 40, stagger: 0.11, clip: true });
  // Showcase cards stay layout-visible; media gets soft clip polish only.
  revealBatch('.skill', profile, { y: 34, stagger: 0.08 });
  revealBatch('.stackcard', profile, { y: 28, stagger: 0.06 });
  revealBatch('.principle', profile, { y: 26, stagger: 0.07 });
  revealBatch('.pipeline .step', profile, { y: 20, stagger: 0.05 });
  revealBatch('.nowcard', profile, { y: 34, stagger: 0.09 });
  revealBatch('.service', profile, { y: 22, stagger: 0.05 });
  revealBatch('.contact', profile, { y: 38, stagger: 0 });
  revealBatch('.about > div:first-child', profile, { y: 32, stagger: 0 });

  imageReveals(profile);
}
