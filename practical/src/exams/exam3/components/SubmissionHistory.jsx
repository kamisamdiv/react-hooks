import { HEADING } from '../ui.js';

/**
 * Shows the ref-held submission history. Presentational only: App owns the
 * `submittedEmailRef` and the mirrored state that feeds this component.
 */
export default function SubmissionHistory({ previousEmail, submitted }) {
  return (
    <section>
      <h2 className={HEADING}>Submission history (ref-held)</h2>

      <dl className="mt-3 divide-y divide-line border-y border-line text-[15px]">
        <div className="flex justify-between gap-3 py-2.5">
          <dt className="text-ink-2">Previous successful email</dt>
          <dd className="font-medium" data-testid="previous-email">
            {previousEmail || '— none yet —'}
          </dd>
        </div>
        <div className="flex justify-between gap-3 py-2.5">
          <dt className="text-ink-2">Current submission</dt>
          <dd className="font-medium" data-testid="current-email">
            {submitted ? `${submitted.name} · ${submitted.email}` : '—'}
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        Submit once: “Previous” stays empty and the ref now holds that email. Edit the email and
        submit again: the first email appears as the previous value. The ref write itself never
        rendered anything — we only mirror it into state during a submit that was already going to
        re-render.
      </p>
    </section>
  );
}
