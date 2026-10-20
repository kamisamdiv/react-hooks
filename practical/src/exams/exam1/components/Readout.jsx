function ReadoutCell({ label, value, testId }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3">
      <span className="text-sm text-ink-2">{label}</span>
      <span className="text-5xl font-semibold tabular-nums" data-testid={testId}>
        {value}
      </span>
    </div>
  );
}

/** Shows the two pieces of state side by side. */
export default function Readout({ count, target }) {
  return (
    <div className="grid grid-cols-2 divide-x divide-line rounded border border-line">
      <ReadoutCell label="Completed" value={count} testId="count" />
      <ReadoutCell label="Target" value={target} testId="target" />
    </div>
  );
}
