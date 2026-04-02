"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "@/lib/actions";

type AdminMobileMenuProps = {
  fullName: string;
  links: Array<{ href: string; label: string }>;
};

export function AdminMobileMenu({ fullName, links }: AdminMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      return;
    }

    const timer = setTimeout(() => setRendered(false), 180);
    return () => clearTimeout(timer);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="admin-mobile-menu"
        aria-label={open ? "Close admin menu" : "Open admin menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {rendered ? (
        <>
          <button
            type="button"
            aria-label="Close admin menu"
            onClick={closeMenu}
            className={`fixed inset-0 top-18 z-40 bg-black/25 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
          />
          <div
            id="admin-mobile-menu"
            className={`fixed inset-x-0 top-18 z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-slate-200 bg-white p-4 shadow-lg transition-all duration-200 ease-out ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <p className="truncate text-sm font-bold text-(--primary)">{fullName}</p>
            <nav className="mt-4 grid grid-cols-1 gap-2 text-sm font-semibold text-slate-800 sm:grid-cols-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className="rounded-md border border-slate-200 px-3 py-2 text-center">
                  {link.label}
                </Link>
              ))}
            </nav>
            <form action={signOut} className="mt-4">
              <button className="btn-primary w-full rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
}
