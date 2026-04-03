"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/leadership", label: "Leadership" },
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

  return (
    <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
      {publicLinks.map((link) => {
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
    </nav>
  );
}
