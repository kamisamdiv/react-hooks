import { usePreferences } from '../context/PreferencesContext.jsx';
import { BTN_GHOST } from '../ui.js';

/**
 * Level 3 (leaf). Receives NO props from Dashboard -- it reaches into context
 * for the theme and the toggle function.
 */
export default function Toolbar() {
  const { theme, toggleTheme } = usePreferences();

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded border border-dashed border-line-strong p-3">
      <span className="text-sm font-medium">Toolbar</span>
      <button
        type="button"
        onClick={toggleTheme}
        className={BTN_GHOST}
        data-testid="toolbar-theme-toggle"
      >
        {theme === 'light' ? '☾ Dark mode' : '☀ Light mode'}
      </button>
      <span className="text-sm text-ink-2">No props passed in — the value came from context.</span>
    </div>
  );
}
