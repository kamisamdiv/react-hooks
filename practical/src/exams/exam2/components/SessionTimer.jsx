import { useEffect, useState } from 'react';
import { formatClock } from '../lib/format.js';

/**
 * Owns the one-second session timer and NOTHING ELSE, so the effect and its
 * cleanup are self-contained and easy to point at during a demo.
 */
export default function SessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('[SessionTimer] mounted');

    // DEBUGGING CASE 7 — FIXED.
    // Broken version:
    //   const id = setInterval(() => setSeconds(seconds + 1), 1000);
    // `seconds` is captured from the FIRST render (0), so the callback always
    // computes 0 + 1 === 1 and the timer appears stuck at 00:01 forever.
    // Fix: the functional updater reads the latest state instead of the
    // captured value, so each tick genuinely increments.
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);

    // DEBUGGING CASE 6 — FIXED.
    // A version that depended on `[seconds]` would re-run the effect every time
    // it writes `seconds`, creating an unbounded loop. This effect intentionally
    // has an EMPTY dependency array: it must run exactly once per mount.
    return () => {
      clearInterval(id);
      console.log('[SessionTimer] unmounted -> clearInterval');
    };
  }, []);

  return (
    <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-line pb-4">
      <span className="text-sm text-ink-2">Session timer</span>
      <span
        className="text-4xl font-semibold tabular-nums"
        data-testid="clock"
        aria-label="elapsed session time"
      >
        {formatClock(seconds)}
      </span>
    </div>
  );
}
