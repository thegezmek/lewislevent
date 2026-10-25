"use client";

import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-stone-900/50 bg-[#0a0a0a]/90 backdrop-blur-md supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="site-header-inner mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-10 md:py-4">
        <Link
          href="/"
          className="tap-target -ml-1 inline-flex min-h-11 items-center px-1 text-[0.8125rem] font-semibold uppercase tracking-[0.17em] text-stone-200 transition-colors hover:text-[#e9a31a] md:min-h-0 md:text-[0.65rem] md:tracking-[0.2em]"
        >
          Lewis Levent
        </Link>
      </div>
    </header>
  );
}
