import { useRef, useState } from 'react';

import { FIELD_ORDER, validate } from './lib/validation.js';
import { BTN_GHOST, BTN_PRIMARY, PAGE, PANEL, SECTION } from './ui.js';

import PageHeader from './components/PageHeader.jsx';
import TextField from './components/TextField.jsx';
import SubmissionHistory from './components/SubmissionHistory.jsx';
import RefVsStateDemo from './components/RefVsStateDemo.jsx';

/**
 * Exam 3 — Accessible Form Toolkit
 * Primary hooks: useRef, useState
 *
 * COMPONENT STRUCTURE
 *   App                  -> owns form state, the four refs, and the submit logic
 *     TextField x3       -> reusable controlled field (receives its ref as a prop)
 *     SubmissionHistory  -> presentational: ref-held history
 *     RefVsStateDemo     -> self-contained live demo of case 18
 *
 * Restriction honoured throughout: `ref.current` is never read or written during
 * render. Refs are created in App, attached by TextField, and only *read* inside
 * App's submit handler.
 */
export default function App() {
  // Controlled values live in state so they stay visible and editable.
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [previousEmail, setPreviousEmail] = useState('');

  // Refs on the three inputs, attached via the `inputRef` prop -> `ref` attribute.
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Tracks the last successfully submitted email WITHOUT causing a render.
  // It is only ever read/written inside handlers.
  const submittedEmailRef = useRef('');

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Clear that field's error as soon as the user edits it.
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    // Focus the FIRST invalid field, in the order name -> email -> password.
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);

    if (firstInvalid) {
      setSubmitted(null);
      const domRefs = { name: nameRef, email: emailRef, password: passwordRef };
      domRefs[firstInvalid].current?.focus();
      return;
    }

    // Success. Show the PREVIOUS successful email, then remember this one.
    setPreviousEmail(submittedEmailRef.current); // last time's value ('' the first time)
    submittedEmailRef.current = form.email.trim(); // mutation -> no re-render by itself
    setSubmitted({ name: form.name.trim(), email: form.email.trim() });
  }

  function handleReset() {
    setForm({ name: '', email: '', password: '' });
    setErrors({});
    setSubmitted(null);
    // previousEmail and the ref are intentionally preserved between resets.
  }

  return (
    <>
      <PageHeader
        icon="📝"
        title="Accessible Form Toolkit"
        exam={3}
        hooks={['useRef', 'useState']}
      />

      <main className={PAGE}>
        <section className={`${PANEL} mt-8`}>
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
          <TextField
            id="name"
            label="Name"
            value={form.name}
            onChange={(value) => updateField('name', value)}
            inputRef={nameRef}
            error={errors.name}
            placeholder="Ada Lovelace"
            autoComplete="name"
          />

          <TextField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) => updateField('email', value)}
            inputRef={emailRef}
            error={errors.email}
            placeholder="ada@example.com"
            autoComplete="email"
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={(value) => updateField('password', value)}
            inputRef={passwordRef}
            error={errors.password}
            hint={`${form.password.length} / 8 characters`}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />

          <div className="flex flex-wrap items-center gap-2.5">
            <button type="submit" className={BTN_PRIMARY} data-testid="submit">
              Create account
            </button>
            <button type="button" onClick={handleReset} className={BTN_GHOST}>
              Reset form
            </button>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {Object.keys(errors).length > 0
              ? `${Object.keys(errors).length} field(s) need attention.`
              : ''}
          </p>
        </form>
      </section>

        <div className={SECTION}>
          <SubmissionHistory previousEmail={previousEmail} submitted={submitted} />
        </div>
        <div className={SECTION}>
          <RefVsStateDemo />
        </div>
      </main>
    </>
  );
}
