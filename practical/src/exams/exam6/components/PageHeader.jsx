function Property({ label, children }) {
  return (
    <div className="flex min-h-8 items-start gap-3 py-1">
      <dt className="w-20 shrink-0 pt-0.5 text-ink-2">{label}</dt>
      <dd className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 pt-0.5">{children}</dd>
    </div>
  );
}

/**
 * Notion-style page chrome: a breadcrumb bar, the big page icon, the title, and
 * a short "properties" list (exam number and hooks used).
 * Purely presentational -- it renders whatever the app passes in.
 */
export default function PageHeader({ icon, title, exam, hooks }) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="sticky top-0 z-10 flex h-11 items-center gap-1.5 bg-paper/90 px-4 text-sm text-ink-2 backdrop-blur"
      >
        <span>Practical</span>
        <span aria-hidden="true" className="text-ink-3">
          /
        </span>
        <span aria-hidden="true">{icon}</span>
        <span className="truncate text-ink">
          Exam {exam} — {title}
        </span>
      </nav>

      <header className="mx-auto w-full max-w-[720px] px-6 pt-14">
        <div className="text-[64px] leading-none" aria-hidden="true">
          {icon}
        </div>
        <h1 className="mt-5 text-[2.5rem] leading-[1.15] font-bold tracking-tight">{title}</h1>

        <dl className="mt-5 border-b border-line pb-5 text-sm">
          <Property label="Exam">
            <span>{exam}</span>
          </Property>
          <Property label="Hooks">
            {hooks.map((hook) => (
              <span
                key={hook}
                className="inline-flex items-center rounded-[3px] bg-tag-blue px-1.5 py-px text-[13px] leading-5 text-tag-blue-ink"
              >
                {hook}
              </span>
            ))}
          </Property>
        </dl>
      </header>
    </>
  );
}
