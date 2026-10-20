import { useRef, useState } from 'react';
import { BTN_GHOST, BTN_PRIMARY, HEADING } from '../ui.js';

/**
 * DEBUGGING CASE 18 — ref vs state, demonstrated live.
 *
 * The starter code rendered `clicks.current` directly. A ref lives in a mutable
 * box that survives renders, but writing to `ref.current` does NOT schedule a
 * re-render, so React never re-evaluated the JSX and the screen never changed.
 *
 * Anything that must appear on screen belongs in state. The ref stays here only
 * to hold a value we read on demand inside handlers (and to prove it was
 * changing silently all along).
 */
export default function RefVsStateDemo() {
  const [stateClicks, setStateClicks] = useState(0);
  const [revealedRefValue, setRevealedRefValue] = useState(null);

  const silentClicksRef = useRef(0);

  function handleStateClick() {
    // Goes through state -> React schedules a re-render -> UI updates.
    setStateClicks((c) => c + 1);
  }

  function handleRefClick() {
    // Mutates the ref -> no re-render -> nothing on screen changes.
    silentClicksRef.current += 1;
    console.log('[RefVsStateDemo] ref.current is now', silentClicksRef.current, '(no render)');
  }

  function revealRefValue() {
    // Reading a ref inside an event handler is fine; we push it into STATE so
    // the revealed number can be displayed.
    setRevealedRefValue(silentClicksRef.current);
  }

  return (
    <section>
      <h2 className={HEADING}>Debugging case — a ref cannot drive the UI</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">
        Click both buttons the same number of times. The state counter updates on screen; the ref
        counter only writes to the console. &quot;Reveal&quot; reads the ref in a handler and pushes
        it into state so you can prove it was incrementing the whole time.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded bg-tag-blue/50 p-4">
          <p className="text-sm text-ink-2">useState</p>
          <p className="mt-1 text-4xl font-semibold tabular-nums" data-testid="state-clicks">
            {stateClicks}
          </p>
          <button type="button" onClick={handleStateClick} className={`${BTN_PRIMARY} mt-3 w-full`}>
            +1 state click
          </button>
        </div>

        <div className="rounded bg-tag-yellow/50 p-4">
          <p className="text-sm text-ink-2">useRef (rendered value)</p>
          <p className="mt-1 text-4xl font-semibold tabular-nums text-ink-2" data-testid="ref-clicks">
            {revealedRefValue === null ? '—' : revealedRefValue}
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={handleRefClick} className={`${BTN_GHOST} flex-1`}>
              +1 ref click
            </button>
            <button type="button" onClick={revealRefValue} className={`${BTN_GHOST} flex-1`}>
              Reveal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
