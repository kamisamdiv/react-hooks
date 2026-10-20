import { Component, useContext } from 'react';
import { PreferencesContext, usePreferences } from '../context/PreferencesContext.jsx';
import { CODE, HEADING, PANEL_MUTED } from '../ui.js';

/**
 * DEBUGGING CASE 9 — demonstrated live.
 *
 * This file renders OUTSIDE <PreferencesProvider> on purpose, so you can watch
 * both failure modes:
 *
 *   1. Raw `useContext(PreferencesContext)` returns the context's DEFAULT value
 *      (`null`) and the component silently renders nothing useful. No error, no
 *      hint -- the classic "why is my context empty?" bug.
 *   2. `usePreferences()` throws a clear message instead of failing silently.
 *      We catch that with an error boundary so the demo stays on screen.
 */

/** A consumer that forgot to be wrapped in the provider, using the raw hook. */
function OrphanWithRawContext() {
  const value = useContext(PreferencesContext);

  return (
    <div className="rounded bg-tag-yellow p-4 text-sm text-tag-yellow-ink">
      <p className="font-semibold">
        Raw useContext → {value === null ? 'null (the default)' : 'a real value'}
      </p>
      <p className="mt-1">
        Theme reported: <strong>{value ? value.theme : 'undefined'}</strong>. The component renders
        without error but can never see the app&apos;s preferences.
      </p>
    </div>
  );
}

/** A consumer that used the guarded hook while still outside the provider. */
function OrphanWithUsePreferences() {
  // This line throws during render; the boundary below catches it.
  const { theme } = usePreferences();
  return <p>Theme is {theme}</p>;
}

/**
 * Error boundaries must be class components — there is no hook equivalent.
 * This one exists purely so the thrown error becomes visible instead of
 * white-screening the demo.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="rounded bg-tag-red p-4 text-sm text-tag-red-ink">
          <p className="font-semibold">
            usePreferences() threw as designed
          </p>
          <p className="mt-1 font-mono text-xs">
            {this.state.error.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ProviderDebugDemo() {
  return (
    <section className={PANEL_MUTED}>
      <h2 className={HEADING}>Debug demo — consumers outside the provider</h2>
      <p className="mt-1 text-sm text-ink-2">
        This section is rendered as a <strong>sibling</strong> of{' '}
        <code className={CODE}>PreferencesProvider</code>, not inside it.
      </p>
      <div className="mt-4 grid gap-3">
        <OrphanWithRawContext />
        <ErrorBoundary>
          <OrphanWithUsePreferences />
        </ErrorBoundary>
      </div>
      <p className="mt-3 text-sm text-ink-2">
        Fix for case 9: move the consumer inside the provider (in <code className={CODE}>src/App.jsx</code>) so the
        shared value is actually supplied, and keep <code className={CODE}>usePreferences</code> as the accessor so a
        missing provider fails loudly in future.
      </p>
    </section>
  );
}
