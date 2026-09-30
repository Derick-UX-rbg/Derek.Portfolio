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

  const y = (opts.y ?? 48) * profile.strength;
  const stagger = (opts.stagger ?? 0.1) * profile.strength;
  const useClip = Boolean(opts.clip) && !profile.mobile;

  gsap.set(els, {
    opacity: 0,
    y,
    ...(useClip ? { clipPath: 'inset(10% 0 10% 0)' } : {}),
  });

  ScrollTrigger.batch(els, {
    start: 'top 86%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ...(useClip ? { clipPath: 'inset(0% 0 0% 0)' } : {}),
        duration: DUR.reveal * (0.9 + 0.1 * profile.strength),
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
    gsap.set(words, { opacity: 0, y: 36 * profile.strength });
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

function imageReveals(profile: MotionProfile) {
  const media = gsap.utils.toArray<HTMLElement>('[data-reveal="media"], .showcase-media');
  media.forEach((el) => {
    if (profile.mobile) return;
    gsap.set(el, {
      clipPath: 'inset(10% 0 10% 0)',
      scale: 1.03,
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

  revealBatch('.section .head .label', profile, { y: 20, stagger: 0.04 });
  revealBatch('.section .intro', profile, { y: 28, stagger: 0 });
  headingReveals(profile);

  revealBatch('.card', profile, { y: 56, stagger: 0.14 });
  revealBatch('.labcard', profile, { y: 44, stagger: 0.12, clip: true });
  revealBatch('.skill', profile, { y: 36, stagger: 0.09 });
  revealBatch('.stackcard', profile, { y: 30, stagger: 0.07 });
  revealBatch('.principle', profile, { y: 28, stagger: 0.08 });
  revealBatch('.pipeline .step', profile, { y: 22, stagger: 0.05 });
  revealBatch('.nowcard', profile, { y: 36, stagger: 0.1 });
  revealBatch('.service', profile, { y: 24, stagger: 0.06 });
  revealBatch('.contact', profile, { y: 40, stagger: 0 });
  revealBatch('.about > div:first-child', profile, { y: 34, stagger: 0 });
  // Showcase cards stay layout-visible; media gets a soft clip polish only.
  imageReveals(profile);
}
