import { ClaudeLogo } from './ClaudeLogo';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-200 dark:border-ink-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6">
        <ClaudeLogo className="h-8 w-8" />
        <p className="font-bold text-ink-800 dark:text-ink-100">
          Learn <span className="gradient-text">Claude</span>
        </p>
        <p className="prose-muted max-w-md text-sm">
          A frontend-only, file-driven course. Drop in a Markdown file and a manifest entry to add a
          lesson — no backend required.
        </p>
        <p className="prose-muted max-w-md text-xs">
          An independent learning course, not affiliated with or endorsed by Anthropic. Claude is a
          trademark of Anthropic.
        </p>
        <div className="gradient-rule mt-2 max-w-24 opacity-60" />
      </div>
    </footer>
  );
}
