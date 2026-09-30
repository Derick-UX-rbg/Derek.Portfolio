import { useCallback, useEffect, useState } from 'react';
import {
  applyResolvedTheme,
  nextThemeMode,
  persistTheme,
  readStoredTheme,
  resolveTheme,
  type ResolvedTheme,
  type ThemeMode,
} from './theme';

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [resolved, setResolved] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStoredTheme();
    const next = resolveTheme(stored);
    setModeState(stored);
    setResolved(next);
    applyResolvedTheme(next);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (mode !== 'system') return;
      const next = resolveTheme('system');
      setResolved(next);
      applyResolvedTheme(next);
    };

    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mode, mounted]);

  const setTheme = useCallback((next: ThemeMode) => {
    const resolvedNext = resolveTheme(next);
    setModeState(next);
    setResolved(resolvedNext);
    persistTheme(next);
    applyResolvedTheme(resolvedNext);
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme(nextThemeMode(mode));
  }, [mode, setTheme]);

  return { mode, resolved, setTheme, cycleTheme, mounted };
}
