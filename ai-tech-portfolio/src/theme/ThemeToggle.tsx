import { useEffect, useId, useRef, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from './useTheme';
import type { ThemeMode } from './theme';

const OPTIONS: { mode: ThemeMode; label: string }[] = [
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
  { mode: 'system', label: 'System' },
];

function ModeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === 'light') return <Sun size={15} aria-hidden="true" />;
  if (mode === 'dark') return <Moon size={15} aria-hidden="true" />;
  return <Monitor size={15} aria-hidden="true" />;
}

export function ThemeToggle() {
  const { mode, setTheme, mounted } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const currentLabel = OPTIONS.find((o) => o.mode === mode)?.label ?? 'System';

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="theme-toggle" ref={rootRef}>
      <button
        type="button"
        className="theme-btn"
        aria-label={`Theme: ${currentLabel}. Choose theme`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <ModeIcon mode={mounted ? mode : 'system'} />
        <span className="theme-btn-label">{mounted ? currentLabel : 'Theme'}</span>
      </button>
      {open ? (
        <div id={menuId} role="menu" aria-label="Theme" className="theme-menu">
          {OPTIONS.map((opt) => {
            const selected = mounted && mode === opt.mode;
            return (
              <button
                key={opt.mode}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                className={`theme-option${selected ? ' is-selected' : ''}`}
                onClick={() => {
                  setTheme(opt.mode);
                  setOpen(false);
                }}
              >
                <ModeIcon mode={opt.mode} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
