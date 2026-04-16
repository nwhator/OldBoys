"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  // Leadership will be a dropdown
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" }
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicNavLinks() {
  const pathname = usePathname();
  const isLeadershipActive = isActivePath(pathname, "/leadership") || isActivePath(pathname, "/leadership/national-executive-council") || isActivePath(pathname, "/leadership/national-expanded-executive-council");

  return (
    <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
      {publicLinks.map((link) => {
        if (link.label === "Leadership") {
          // handled below
          return null;
        }
        const isActive = isActivePath(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded px-2 py-1 transition-colors ${isActive ? "bg-(--primary) text-white" : "text-slate-800 hover:text-(--primary)"}`}
          >
            {link.label}
          </Link>
        );
      })}
      {/* Leadership Dropdown */}
      <div className="relative group">
        <button
          className={`rounded px-2 py-1 transition-colors flex items-center gap-1 ${isLeadershipActive ? "bg-(--primary) text-white" : "text-slate-800 hover:text-(--primary)"}`}
        >
          Leadership
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <div className="absolute left-0 mt-2 min-w-[220px] rounded-xl border border-slate-200 bg-white py-2 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50 transition-opacity">
          <Link href="/leadership/national-executive-council" className="block px-4 py-2 text-slate-800 hover:bg-(--primary) hover:text-white">National Executive Council</Link>
          <Link href="/leadership/national-expanded-executive-council" className="block px-4 py-2 text-slate-800 hover:bg-(--primary) hover:text-white">National Expanded Executive Council</Link>
        </div>
      </div>
    </nav>
  );
}
