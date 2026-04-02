"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { signOut } from "@/lib/actions";
import { useMenuAccessibility } from "@/hooks/use-menu-accessibility";

type PublicHeaderMobileMenuProps = {
  isAuthenticated: boolean;
};

export function PublicHeaderMobileMenu({ isAuthenticated }: PublicHeaderMobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  function isActivePath(href: string) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

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

  useMenuAccessibility({ open, onClose: closeMenu, panelRef });

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-public-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 transition-colors duration-200 hover:border-(--primary) hover:bg-(--primary) hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-container)"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {rendered ? (
        <>
          <button
            type="button"
            aria-label="Close public menu"
            onClick={closeMenu}
            className={`fixed inset-0 top-18 z-40 bg-black/25 backdrop-blur-[1px] transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
          />
          <div
            id="mobile-public-menu"
            ref={panelRef}
            className={`fixed inset-x-0 top-18 z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-slate-200 bg-white p-4 shadow-lg transition-all duration-200 ease-out ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <nav className="grid grid-cols-1 gap-2 text-sm font-semibold text-slate-800 sm:grid-cols-2">
              <Link href="/" aria-current={isActivePath("/") ? "page" : undefined} onClick={closeMenu} className={`rounded-md border px-3 py-2 text-center transition-colors ${isActivePath("/") ? "border-(--primary) bg-(--primary) text-white" : "border-slate-200 hover:border-(--primary) hover:bg-(--primary) hover:text-white"}`}>Home</Link>
              <Link href="/about" aria-current={isActivePath("/about") ? "page" : undefined} onClick={closeMenu} className={`rounded-md border px-3 py-2 text-center transition-colors ${isActivePath("/about") ? "border-(--primary) bg-(--primary) text-white" : "border-slate-200 hover:border-(--primary) hover:bg-(--primary) hover:text-white"}`}>About</Link>
              <Link href="/blog" aria-current={isActivePath("/blog") ? "page" : undefined} onClick={closeMenu} className={`rounded-md border px-3 py-2 text-center transition-colors ${isActivePath("/blog") ? "border-(--primary) bg-(--primary) text-white" : "border-slate-200 hover:border-(--primary) hover:bg-(--primary) hover:text-white"}`}>Blog</Link>
              <Link href="/leadership" aria-current={isActivePath("/leadership") ? "page" : undefined} onClick={closeMenu} className={`rounded-md border px-3 py-2 text-center transition-colors ${isActivePath("/leadership") ? "border-(--primary) bg-(--primary) text-white" : "border-slate-200 hover:border-(--primary) hover:bg-(--primary) hover:text-white"}`}>Leadership</Link>
              <Link href="/community" aria-current={isActivePath("/community") ? "page" : undefined} onClick={closeMenu} className={`rounded-md border px-3 py-2 text-center transition-colors ${isActivePath("/community") ? "border-(--primary) bg-(--primary) text-white" : "border-slate-200 hover:border-(--primary) hover:bg-(--primary) hover:text-white"}`}>Community</Link>
              <Link href="/contact" aria-current={isActivePath("/contact") ? "page" : undefined} onClick={closeMenu} className={`rounded-md border px-3 py-2 text-center transition-colors ${isActivePath("/contact") ? "border-(--primary) bg-(--primary) text-white" : "border-slate-200 hover:border-(--primary) hover:bg-(--primary) hover:text-white"}`}>Contact</Link>
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
        </>
      ) : null}
    </div>
  );
}
