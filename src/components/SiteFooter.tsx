export function SiteFooter() {
  return (
    <footer className="border-t border-stone-900/80 px-4 py-10 sm:px-6 sm:py-12 md:px-10 supports-[padding:max(0px)]:pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center text-xs uppercase tracking-[0.2em] text-stone-600 sm:gap-4 sm:text-[0.65rem] md:flex-row md:items-center md:justify-between md:text-left">
        <p>Lewis Levent © 2026 · All rights reserved</p>
        <p className="text-stone-700">Directorial debut collection · 2021–2026</p>
      </div>
    </footer>
  );
}
