/**
 * Shows the evidence for the performance work: how many products are visible,
 * how long the last memoized recalculation took, and what is selected.
 */
export default function ResultSummary({ shown, total, computeMs, selectedName }) {
  return (
    <section className="grid gap-1.5 px-0.5">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[15px]">
        <span className="font-semibold" data-testid="result-count">
          {shown} of {total} products
        </span>
        <span className="text-sm text-ink-2">
          last recompute:{' '}
          <span className="font-medium tabular-nums text-ink" data-testid="compute-ms">
            {computeMs.toFixed(1)}ms
          </span>
        </span>
      </div>

      <p className="text-sm text-ink-2" data-testid="selected-label">
        Selected: <span className="font-medium text-ink">{selectedName ?? 'none'}</span>
      </p>

      <p className="text-sm text-ink-2">
        Click the unrelated counter: this value must stay frozen, and the console must not print a
        new{' '}
        <code className="rounded-[3px] bg-code-bg px-1.5 py-px font-mono text-[0.85em] text-code-ink">
          [render] ProductList
        </code>{' '}
        line.
      </p>
    </section>
  );
}
