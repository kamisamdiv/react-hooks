import { FONT_SIZES, usePreferences } from '../context/PreferencesContext.jsx';
import { HEADING, PANEL } from '../ui.js';

/** Changes theme + font size. Sits as a direct child of the provider. */
export default function PreferencesPanel() {
  const { theme, setTheme, fontSize, setFontSize } = usePreferences();

  return (
    <section className={PANEL}>
      <h2 className={HEADING}>Preferences</h2>

      <fieldset className="mt-4">
        <legend className="text-sm text-ink-2">Theme</legend>
        <div className="mt-2 flex gap-2">
          {['light', 'dark'].map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-2 rounded border px-3 py-1.5 text-sm capitalize transition-colors ${
                theme === option
                  ? 'border-brand bg-brand-soft font-medium text-brand-ink'
                  : 'border-line-strong bg-paper hover:bg-wash'
              }`}
            >
              <input
                type="radio"
                name="theme"
                value={option}
                checked={theme === option}
                onChange={() => setTheme(option)}
                className="accent-brand"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm text-ink-2">Font size</legend>
        <div className="mt-2 inline-flex rounded bg-wash p-0.5">
          {FONT_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setFontSize(size)}
              aria-pressed={fontSize === size}
              data-testid={`font-${size}`}
              className={`h-7 min-w-14 rounded-[3px] px-3 text-sm transition-colors ${
                fontSize === size
                  ? 'bg-paper font-medium text-ink shadow-sm'
                  : 'text-ink-2 hover:text-ink'
              }`}
            >
              {size}px
            </button>
          ))}
        </div>
      </fieldset>

      <p className="mt-4 text-sm text-ink-2">
        Neither Dashboard nor ArticlePreview receives these as props — both read the same context.
      </p>
    </section>
  );
}
