"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/lib/actions";

type PublicHeaderMobileMenuProps = {
  isAuthenticated: boolean;
};

export function PublicHeaderMobileMenu({ isAuthenticated }: PublicHeaderMobileMenuProps) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-public-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {open ? (
        <div id="mobile-public-menu" className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-800">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/about" onClick={closeMenu}>About</Link>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
            <Link href="/leadership" onClick={closeMenu}>Leadership</Link>
            <Link href="/community" onClick={closeMenu}>Community</Link>
            <Link href="/contact" onClick={closeMenu}>Contact</Link>
          </nav>
          <div className="mt-4 border-t border-slate-200 pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="btn-outline rounded-md border border-slate-300 px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Dashboard
                </Link>
                <form action={signOut}>
                  <button className="btn-primary w-full rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider" type="submit">
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="btn-primary block rounded-md px-4 py-2 text-center text-xs font-bold uppercase tracking-wider"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
