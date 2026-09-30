/** Shared motion tokens — agency, editorial, never layout-shifting. */

export const EASE = 'power3.out';
export const EASE_INOUT = 'power2.inOut';
export const EASE_SOFT = 'power2.out';
export const EASE_EXPO = 'expo.out';

export const DUR = {
  hero: 1.2,
  reveal: 0.95,
  stagger: 0.07,
  nav: 0.55,
  magnetic: 0.6,
  hover: 0.4,
} as const;

export type MotionProfile = {
  reduced: boolean;
  mobile: boolean;
  strength: number;
  parallax: number;
  magnetic: number;
  enableLenis: boolean;
  enableMagnetic: boolean;
  enableParallax: boolean;
};

export function getMotionProfile(): MotionProfile {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 820px)').matches ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches);

  if (reduced) {
    return {
      reduced: true,
      mobile,
      strength: 0,
      parallax: 0,
      magnetic: 0,
      enableLenis: false,
      enableMagnetic: false,
      enableParallax: false,
    };
  }

  if (mobile) {
    return {
      reduced: false,
      mobile: true,
      strength: 0.55,
      parallax: 0.25,
      magnetic: 0,
      enableLenis: false,
      enableMagnetic: false,
      enableParallax: true,
    };
  }

  return {
    reduced: false,
    mobile: false,
    strength: 1,
    parallax: 1,
    magnetic: 1,
    enableLenis: true,
    enableMagnetic: true,
    enableParallax: true,
  };
}

/** Split text nodes into word spans for stagger without changing layout intent. */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === '1') {
    return Array.from(el.querySelectorAll<HTMLElement>('.m-word'));
  }
  const html = el.innerHTML;
  const walk = (node: Node, parent: HTMLElement) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      const frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement('span');
        span.className = 'm-word';
        span.style.display = 'inline-block';
        span.style.willChange = 'transform, opacity';
        span.textContent = part;
        frag.appendChild(span);
      });
      parent.replaceChild(frag, node);
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes);
      children.forEach((c) => walk(c, node as HTMLElement));
    }
  };
  Array.from(el.childNodes).forEach((c) => walk(c, el));
  el.dataset.split = '1';
  if (!el.querySelector('.m-word') && html) {
    el.innerHTML = html;
    return [];
  }
  return Array.from(el.querySelectorAll<HTMLElement>('.m-word'));
}

/** Wrap each line-ish block (existing children) for staggered line reveals. */
export function splitLines(el: HTMLElement): HTMLElement[] {
  if (el.dataset.lines === '1') {
    return Array.from(el.querySelectorAll<HTMLElement>('.m-line'));
  }
  const words = splitWords(el);
  if (!words.length) return [];
  // Wrap whole heading content in a line clip for a single editorial reveal
  const line = document.createElement('span');
  line.className = 'm-line';
  line.style.display = 'inline-block';
  line.style.overflow = 'hidden';
  line.style.verticalAlign = 'top';
  while (el.firstChild) line.appendChild(el.firstChild);
  el.appendChild(line);
  el.dataset.lines = '1';
  return [line];
}
