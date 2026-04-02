"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions";
import { useMenuAccessibility } from "@/hooks/use-menu-accessibility";

type AdminMobileMenuProps = {
  fullName: string;
  links: Array<{ href: string; label: string }>;
};

export function AdminMobileMenu({ fullName, links }: AdminMobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  function isActivePath(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
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

  const quickActions = [
    { href: "/admin/blog", label: "Add Blog Post" },
    { href: "/admin/candidates", label: "Add Candidates" },
    { href: "/admin/approvals", label: "Approve Voters" }
  ];

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="admin-mobile-menu"
        aria-label={open ? "Close admin menu" : "Open admin menu"}
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
            aria-label="Close admin menu"
            onClick={closeMenu}
            className={`fixed inset-0 top-18 z-40 bg-black/25 backdrop-blur-[1px] transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
          />
          <div
            id="admin-mobile-menu"
            ref={panelRef}
            className={`fixed inset-x-0 top-18 z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-slate-200 bg-white p-4 shadow-lg transition-all duration-200 ease-out ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <p className="truncate text-sm font-bold text-(--primary)">{fullName}</p>
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Quick Actions</p>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {quickActions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActivePath(item.href) ? "page" : undefined}
                    onClick={closeMenu}
                    className={`rounded-md px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white transition-colors ${
                      isActivePath(item.href) ? "bg-(--primary-container)" : "bg-(--primary) hover:bg-(--primary-container)"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <nav className="mt-4 grid grid-cols-1 gap-2 text-sm font-semibold text-slate-800 sm:grid-cols-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActivePath(link.href) ? "page" : undefined}
                  onClick={closeMenu}
                  className={`rounded-md border px-3 py-2 text-center transition-colors ${
                    isActivePath(link.href)
                      ? "border-(--primary) bg-(--primary) text-white"
                      : "border-slate-200 hover:border-(--primary) hover:bg-(--primary) hover:text-white"
                  }`}
                >
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
