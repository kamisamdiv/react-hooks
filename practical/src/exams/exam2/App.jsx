import { useEffect, useState } from 'react';

import { BTN_PRIMARY, CODE, HEADING, PAGE, PANEL, PANEL_PLACEHOLDER, SECTION } from './ui.js';
import PageHeader from './components/PageHeader.jsx';
import SessionWidget from './components/SessionWidget.jsx';

/**
 * Exam 2 — Live Search and Timer
 * Primary hooks: useEffect, useState
 *
 * COMPONENT STRUCTURE
 *   App             -> owns the mount/unmount toggle + document title cleanup
 *     SessionWidget -> groups the two feature components for mounting as a unit
 *       SessionTimer -> owns `seconds` + the interval effect and its cleanup
 *       SearchPanel  -> owns `query`/`results` + debounce and title effects
 *         UserList   -> presentational list
 *
 * Each effect lives in the component that owns the state it reads, so every
 * dependency array is provably complete and every cleanup sits next to the code
 * that needs it.
 */
export default function App() {
  const [mounted, setMounted] = useState(true);

  // Reset any title left over if the demo user unmounts the widget.
  useEffect(() => {
    if (!mounted) document.title = 'Live Search and Timer';
  }, [mounted]);

  return (
    <>
      <PageHeader
        icon="🔎"
        title="Live Search &amp; Session Timer"
        exam={2}
        hooks={['useEffect', 'useState']}
      />

      <main className={PAGE}>
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <button
            type="button"
            onClick={() => setMounted((m) => !m)}
            className={BTN_PRIMARY}
            data-testid="toggle-mount"
          >
            {mounted ? 'Unmount widget' : 'Mount widget'}
          </button>
          <span className="min-w-[220px] flex-1 text-sm text-ink-2">
            Unmount → the timer resets to 00:00 on re-mount and no duplicate interval survives.
            Watch the console for the mount/unmount cleanup logs.
          </span>
        </div>

        <div className="mt-4">
          {mounted ? (
            <section className={PANEL}>
              <SessionWidget />
            </section>
          ) : (
            <section className={PANEL_PLACEHOLDER}>
              Widget unmounted. The timer and search effects have both been cleaned up.
            </section>
          )}
        </div>

        <section className={SECTION}>
          <h2 className={HEADING}>Component map</h2>
          <ul className="mt-3 grid list-disc gap-1.5 pl-5 text-[15px] marker:text-ink-3">
            <li>
              <code className={CODE}>components/SessionTimer.jsx</code> — `seconds`, interval
              effect + `clearInterval`
            </li>
            <li>
              <code className={CODE}>components/SearchPanel.jsx</code> — `query`/`results`,
              debounce effect + `clearTimeout`, document-title effect
            </li>
            <li>
              <code className={CODE}>components/UserList.jsx</code> — presentational list
            </li>
            <li>
              <code className={CODE}>components/SessionWidget.jsx</code> — composes the two so they
              unmount together
            </li>
            <li>
              <code className={CODE}>lib/search.js</code> — `searchUsers` + delay;{' '}
              <code className={CODE}>lib/format.js</code> — clock formatting
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
