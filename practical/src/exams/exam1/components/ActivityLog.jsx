import { HEADING } from '../ui.js';

/** Visible per-click evidence for the manual validation cases. */
export default function ActivityLog({ entries }) {
  return (
    <section>
      <h2 className={HEADING}>Activity log</h2>
      {entries.length === 0 ? (
        <p className="mt-3 text-sm text-ink-2">No interactions yet.</p>
      ) : (
        <ol className="mt-3 grid list-decimal gap-1 pl-5 text-[15px] marker:text-ink-3">
          {entries.map((entry) => (
            <li key={entry.id}>{entry.message}</li>
          ))}
        </ol>
      )}
    </section>
  );
}
