"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const memberLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/voting", label: "Voting" },
  { href: "/payments", label: "Payments" }
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MemberNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-4 text-sm font-semibold md:flex">
      {memberLinks.map((link) => {
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
