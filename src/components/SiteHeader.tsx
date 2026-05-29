"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

const nav = [
  { href: "/#collection", label: "Collection" },
  { href: "/#manifesto", label: "Director’s Profile" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-900/50 bg-[#0a0a0a]/90 backdrop-blur-md supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-10 md:py-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="tap-target -ml-1 px-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-200 transition-colors hover:text-[#e9a31a]"
        >
          Lewis Levent
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:block"
        >
          <ul className="flex items-center gap-x-8 text-[0.65rem] uppercase tracking-[0.18em] text-stone-500">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap-target inline-flex min-h-11 items-center transition-colors hover:text-[#e9a31a]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="tap-target inline-flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 border border-stone-800/80 px-3 text-stone-300 transition hover:border-stone-600 hover:text-stone-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span
            aria-hidden
            className={`block h-px w-5 bg-current transition ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            aria-hidden
            className={`block h-px w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            aria-hidden
            className={`block h-px w-5 bg-current transition ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="Mobile"
          className="border-t border-stone-900/80 bg-[#0a0a0a]/98 md:hidden supports-[padding:max(0px)]:pb-[env(safe-area-inset-bottom)]"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-stone-900/60 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="tap-target flex min-h-[3.25rem] items-center text-sm uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-[#e9a31a]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
