import { FILTERS } from '../state/reducer.js';
import { BTN_DANGER } from '../ui.js';

const LABELS = { all: 'All', open: 'Open', done: 'Done' };

/**
 * Presentational only: it renders the counts it is given and reports clicks.
 * All state changes go back through App's `dispatch`.
 */
export default function FilterBar({ filter, counts, onFilter, onClearDone }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line">
      <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter issues">
        {FILTERS.map((option) => {
          const isActive = filter === option;
          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilter(option)}
              data-testid={`filter-${option}`}
              className={`-mb-px rounded-t border-b-2 px-2.5 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'border-ink font-medium text-ink'
                  : 'border-transparent text-ink-2 hover:bg-wash'
              }`}
            >
              {LABELS[option]}
              <span className="ml-1.5 tabular-nums text-ink-3">{counts[option]}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onClearDone}
        disabled={counts.done === 0}
        data-testid="clear-done"
        className={`${BTN_DANGER} mb-1`}
      >
        Clear completed ({counts.done})
      </button>
    </div>
  );
}
