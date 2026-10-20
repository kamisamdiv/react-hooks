/**
 * Shared Tailwind class strings (Notion-style). Colors come from the semantic
 * tokens in index.css (paper, ink, line, brand, tag-*), so nothing here needs
 * per-class dark variants.
 */

export const PAGE = 'mx-auto w-full max-w-[720px] px-6 pb-32';
export const SECTION = 'mt-10';

export const PANEL = 'rounded border border-line bg-paper p-5';
export const CALLOUT = 'mt-4 flex gap-3 rounded bg-callout p-4 text-[15px] leading-[1.65]';

export const BTN =
  'inline-flex min-h-8 items-center justify-center rounded px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40';
export const BTN_PRIMARY = `${BTN} bg-brand text-white hover:bg-brand-hover`;
export const BTN_GHOST = `${BTN} border border-line-strong bg-paper text-ink hover:bg-wash`;

export const CODE =
  'rounded-[3px] bg-code-bg px-1.5 py-px font-mono text-[0.85em] text-code-ink';
export const HEADING = 'text-xl font-semibold tracking-tight';
export const PROSE = 'mt-3 text-[15px] leading-[1.65]';
export const PRE =
  'mt-3 overflow-x-auto rounded bg-pre-bg p-4 font-mono text-[13px] leading-relaxed';
