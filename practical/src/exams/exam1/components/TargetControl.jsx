const PRESETS = [3, 5, 10];

/** Lets the `target` state value be exercised from the UI. */
export default function TargetControl({ target, onChange }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
      <label htmlFor="target-input" className="text-sm text-ink-2">
        Target
      </label>
      <input
        id="target-input"
        type="number"
        min="1"
        value={target}
        onChange={(event) => onChange(Math.max(1, Number(event.target.value) || 1))}
        className="h-8 w-20 rounded border border-line-strong bg-paper px-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
      />
      <div className="inline-flex rounded bg-wash p-0.5">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            aria-pressed={target === preset}
            className={`h-7 min-w-9 rounded-[3px] px-2.5 text-sm transition-colors ${
              target === preset
                ? 'bg-paper font-medium text-ink shadow-sm'
                : 'text-ink-2 hover:text-ink'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
