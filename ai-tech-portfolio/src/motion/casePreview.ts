import type { MotionProfile } from './config';

type Cleanup = () => void;

/**
 * Centered floating portrait preview on showcase hover (Rejouice-inspired).
 * Desktop + fine pointer only; respects reduced motion.
 */
export function initCasePreview(profile: MotionProfile): Cleanup {
  if (profile.reduced || profile.mobile) return () => undefined;

  const floatEl = document.querySelector<HTMLElement>('.case-float');
  const img = floatEl?.querySelector<HTMLImageElement>('img');
  if (!floatEl || !img) return () => undefined;

  const cleanups: Cleanup[] = [];

  document.querySelectorAll<HTMLElement>('[data-case-preview]').forEach((card) => {
    const src = card.dataset.casePreview;
    if (!src) return;

    const onEnter = () => {
      img.src = src;
      floatEl.classList.add('is-on');
    };
    const onLeave = () => {
      floatEl.classList.remove('is-on');
    };

    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
    floatEl.classList.remove('is-on');
  };
}
