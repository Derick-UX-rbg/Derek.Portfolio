import gsap from 'gsap';
import { DUR, EASE, EASE_SOFT, EASE_EXPO, splitWords, type MotionProfile } from './config';

export function initHero(profile: MotionProfile): gsap.core.Timeline | null {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero || profile.reduced) return null;

  const kicker = hero.querySelector('.kicker');
  const h1 = hero.querySelector('h1');
  const p = hero.querySelector('p');
  const actions = hero.querySelector('.actions');
  const stats = hero.querySelectorAll('.stat');
  const strip = hero.querySelectorAll('.strip span');
  const systemsStrip = hero.querySelector('.systems-strip');

  const words = h1 ? splitWords(h1 as HTMLElement) : [];
  const y = 42 * profile.strength;

  const tl = gsap.timeline({ defaults: { ease: EASE } });

  gsap.set(
    [kicker, p, actions, stats, strip, systemsStrip].flatMap((x) =>
      x ? Array.from(x instanceof NodeList ? x : [x]) : [],
    ),
    { opacity: 0, y },
  );
  if (words.length) {
    gsap.set(words, {
      opacity: 0,
      y: 56 * profile.strength,
      rotateX: -12 * profile.strength,
    });
  }

  if (kicker) {
    tl.to(kicker, { opacity: 1, y: 0, duration: DUR.hero * 0.65 }, 0.08);
  }
  if (words.length) {
    tl.to(
      words,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: DUR.hero,
        stagger: DUR.stagger * 0.85 * profile.strength,
        ease: EASE_EXPO,
      },
      0.16,
    );
  }
  if (p) tl.to(p, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE_SOFT }, '-=0.55');
  if (actions) tl.to(actions, { opacity: 1, y: 0, duration: DUR.reveal }, '-=0.5');
  if (stats.length) {
    tl.to(stats, { opacity: 1, y: 0, duration: DUR.reveal, stagger: 0.07 }, '-=0.45');
  }
  if (strip.length) {
    tl.to(strip, { opacity: 1, y: 0, duration: 0.6, stagger: 0.045 }, '-=0.4');
  }
  if (systemsStrip) {
    tl.to(systemsStrip, { opacity: 1, y: 0, duration: DUR.reveal }, '-=0.35');
  }

  return tl;
}
