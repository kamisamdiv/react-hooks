import { useEffect, useState } from 'react';
import { SEARCH_DELAY_MS, searchUsers } from '../lib/search.js';
import UserList from './UserList.jsx';

/**
 * Owns the search state and the two effects that keep it honest:
 *   1. a debounced "request" with cancellation (clearTimeout)
 *   2. a document-title sync derived from the result count
 */
export default function SearchPanel() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // --- Debounced search ----------------------------------------------------
  useEffect(() => {
    setSearching(true);

    // A short delay simulates a search request. Every time `query` changes,
    // React first runs the previous effect's cleanup, cancelling the pending
    // timeout, so only the LATEST keystroke can commit a result.
    const id = setTimeout(() => {
      const next = searchUsers(query);
      setResults(next);
      setSearching(false);
      console.log(`[search] query="${query}" -> ${next.length} result(s)`);
    }, SEARCH_DELAY_MS);

    // DEBUGGING CASE 8 — clearTimeout cancels the outdated "request" whenever
    // `query` changes again, and when this component unmounts.
    return () => {
      clearTimeout(id);
    };
  }, [query]);

  // --- Document title stays in sync with the result count -------------------
  useEffect(() => {
    const label = `${results.length} result${results.length === 1 ? '' : 's'}`;
    document.title = `${label} · Live Search`;
  }, [results.length]);

  const trimmed = query.trim();
  const noMatches = trimmed && results.length === 0 && !searching;

  return (
    <>
      <label className="grid gap-1.5 text-sm text-ink-2" htmlFor="search">
        <span>Search by name or role</span>
        <input
          id="search"
          type="search"
          autoComplete="off"
          placeholder="e.g. ana, developer, tester"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-9 rounded border border-line-strong bg-paper px-3 text-[15px] text-ink outline-none placeholder:text-ink-3 focus:border-brand focus:ring-2 focus:ring-brand/25"
        />
      </label>

      <p className="mt-4 mb-1 text-sm text-ink-2" role="status" aria-live="polite">
        {searching ? 'Searching…' : `${results.length} result${results.length === 1 ? '' : 's'}`}
      </p>

      {noMatches && <p className="mb-2 text-sm text-warn">No users match “{trimmed}”.</p>}

      <UserList users={results} />
    </>
  );
}
