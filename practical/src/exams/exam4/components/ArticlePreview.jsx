import { usePreferences } from '../context/PreferencesContext.jsx';
import { HEADING, PANEL } from '../ui.js';

/**
 * All three font sizes are written out literally so Tailwind's static scanner
 * can find the `text-[Npx]` classes. Building the class name with a template
 * string (e.g. `text-[${size}px]`) would NOT be detected and would produce no
 * CSS — a classic Tailwind pitfall worth noting.
 */
const FONT_CLASS = {
  14: 'text-[14px]',
  16: 'text-[16px]',
  18: 'text-[18px]',
};

const THEME_VISUAL = {
  light: {
    wrapper: 'bg-white text-[#37352f] ring-1 ring-[#e9e9e7]',
    meta: 'text-[#6f6e69]',
    badge: 'bg-[#fdecc8] text-[#402c1b]',
  },
  dark: {
    wrapper: 'bg-[#202020] text-[#d9d9d8] ring-1 ring-[#404040]',
    meta: 'text-[#9b9b9a]',
    badge: 'bg-[#1f3a52] text-[#a9ceea]',
  },
};

/** A sibling of Dashboard: updates with the same theme/fontSize values. */
export default function ArticlePreview() {
  const { theme, fontSize } = usePreferences();
  const visual = THEME_VISUAL[theme];

  return (
    <section className={PANEL}>
      <div className="flex items-center justify-between gap-3">
        <h2 className={HEADING}>Article preview</h2>
        <span
          className={`rounded-[3px] px-1.5 py-px text-[13px] leading-5 ${visual.badge}`}
          data-testid="preview-theme"
        >
          {theme} · {fontSize}px
        </span>
      </div>

      <article
        className={`mt-4 rounded p-5 ${visual.wrapper} ${FONT_CLASS[fontSize]}`}
        data-testid="preview-article"
        data-font-size={fontSize}
      >
        <h3 className="text-xl font-bold">Why context beats prop drilling</h3>
        <p className={`mt-2 ${visual.meta}`}>
          This paragraph inherits the shared font size and colour palette from context. Change
          either control above and this preview updates instantly, without any component in between
          passing the values along.
        </p>
        <p className={`mt-2 ${visual.meta}`}>
          Every element here is sized by the same <code>fontSize</code> value the Dashboard reports.
        </p>
      </article>
    </section>
  );
}
