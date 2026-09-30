/** Shared motion tokens — cinematic, minimal, never layout-shifting. */

export const EASE = 'power3.out';
export const EASE_INOUT = 'power2.inOut';
export const EASE_SOFT = 'power2.out';

export const DUR = {
  hero: 1.05,
  reveal: 0.85,
  stagger: 0.08,
  nav: 0.45,
  magnetic: 0.55,
  hover: 0.35,
} as const;

export type MotionProfile = {
  reduced: boolean;
  mobile: boolean;
  /** Scale factors applied on mobile / reduced. */
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
      strength: 0.65,
      parallax: 0.35,
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

/** Split text nodes into word/char spans for stagger without changing layout intent. */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === '1') {
    return Array.from(el.querySelectorAll<HTMLElement>('.m-word'));
  }
  const html = el.innerHTML;
  // Preserve existing nested tags (e.g. .grad) by walking child nodes.
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
  // Restore if empty somehow
  if (!el.querySelector('.m-word') && html) {
    el.innerHTML = html;
    return [];
  }
  return Array.from(el.querySelectorAll<HTMLElement>('.m-word'));
}
