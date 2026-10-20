import { STATUS_TONE } from '../status.js';

/** Purely presentational: receives the already-derived status string. */
export default function StatusBadge({ status }) {
  return (
    <p
      className={`my-4 inline-flex items-center gap-1.5 rounded-[3px] px-2 py-0.5 text-sm ${STATUS_TONE[status]}`}
      data-testid="status"
      role="status"
      aria-live="polite"
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {status}
    </p>
  );
}
