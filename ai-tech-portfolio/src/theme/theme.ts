export const THEME_STORAGE_KEY = 'derek-portfolio-theme';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_MODES: readonly ThemeMode[] = ['light', 'dark', 'system'] as const;

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

export function readStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(raw) ? raw : 'system';
  } catch {
    return 'system';
  }
}

export function applyResolvedTheme(resolved: ResolvedTheme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);
  root.style.colorScheme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', resolved === 'dark' ? '#050810' : '#f2f5f8');
}

export function persistTheme(mode: ThemeMode): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore quota / private mode */
  }
}

export function nextThemeMode(current: ThemeMode): ThemeMode {
  const i = THEME_MODES.indexOf(current);
  return THEME_MODES[(i + 1) % THEME_MODES.length]!;
}

/** Inline blocking script — keep in sync with helpers above. Default: system. */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"&&t!=="system")t="system";var d=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;var r=document.documentElement;r.setAttribute("data-theme",d);r.style.colorScheme=d;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",d==="dark"?"#050810":"#f2f5f8");}catch(e){}})();`;
