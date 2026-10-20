/** Purely presentational list. Toggling and deleting bubble up as callbacks. */
export default function IssueList({ issues, onToggle, onDelete, emptyMessage }) {
  if (issues.length === 0) {
    return (
      <p
        className="mt-4 rounded border border-dashed border-line-strong p-8 text-center text-sm text-ink-2"
        data-testid="empty-state"
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="list-none p-0" data-testid="issue-list">
      {issues.map((issue) => (
        <li
          key={issue.id}
          data-testid={`issue-${issue.id}`}
          className="flex items-center gap-3 rounded px-1.5 py-2 transition-colors hover:bg-wash"
        >
          <input
            id={`issue-check-${issue.id}`}
            type="checkbox"
            checked={issue.done}
            onChange={() => onToggle(issue.id)}
            className="size-4 accent-brand"
            aria-label={`Mark "${issue.title}" as ${issue.done ? 'open' : 'done'}`}
          />
          <label
            htmlFor={`issue-check-${issue.id}`}
            className={`flex-1 cursor-pointer text-[15px] ${
              issue.done ? 'text-ink-3 line-through' : ''
            }`}
          >
            {issue.title}
          </label>
          <span className="rounded-[3px] bg-tag-gray px-1.5 py-px text-[13px] leading-5 text-tag-gray-ink">
            #{issue.id}
          </span>
          <button
            type="button"
            onClick={() => onDelete(issue.id)}
            aria-label={`Delete "${issue.title}"`}
            className="rounded px-2 py-1 text-sm text-ink-2 transition-colors hover:bg-line hover:text-ink"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
