import { BTN_DANGER, BTN_GHOST, HEADING, PANEL_MUTED } from '../ui.js';

/**
 * The case 16 / case 17 proving ground: two buttons that send deliberately bad
 * actions and one that clears persistence. Both bad actions must leave the
 * tracker untouched and must not crash.
 *
 * Presentational: it forwards intent upward and prints whatever state it is
 * given, so it never needs to know how actions are built.
 */
export default function DebugConsole({ state, onMalformed, onUnknownAction, onResetStorage }) {
  return (
    <section className={PANEL_MUTED}>
      <h2 className={HEADING}>Debug console</h2>
      <p className="mt-1 text-sm text-ink-2">
        These buttons deliberately send bad input. Both must leave the tracker unchanged and must
        not crash — that is cases 16 and 17 working defensively.
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button type="button" onClick={onMalformed} data-testid="dispatch-malformed" className={BTN_GHOST}>
          Dispatch malformed ADD_ISSUE (top-level `title`)
        </button>
        <button type="button" onClick={onUnknownAction} data-testid="dispatch-unknown" className={BTN_GHOST}>
          Dispatch unknown action
        </button>
        <button type="button" onClick={onResetStorage} className={BTN_DANGER}>
          Clear saved state &amp; reload
        </button>
      </div>

      <p className="mt-4 overflow-x-auto rounded border border-line bg-paper p-4 font-mono text-[13px] leading-relaxed">
        current state: {JSON.stringify(state)}
      </p>
    </section>
  );
}
