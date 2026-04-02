"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/layout/brand-mark";

export const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/approvals", label: "Approve Voters" },
  { href: "/admin/member-management", label: "Members" },
  { href: "/admin/elections", label: "Elections" },
  { href: "/admin/elections/setup", label: "Election Setup" },
  { href: "/admin/elections/center", label: "Election Center" },
  { href: "/admin/candidates", label: "Add Candidates (People to Vote)" },
  { href: "/admin/blog", label: "Add Blog Post" },
  { href: "/admin/leadership", label: "Leadership" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/email-templates", label: "Email Templates" },
  { href: "/admin/audit-settings", label: "Audit Settings" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/payments", label: "Payments" }
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <aside className="w-full border-b border-slate-200 bg-[#f8f7f2] p-4 sm:h-screen sm:w-64 sm:shrink-0 sm:border-b-0 sm:border-r sm:sticky sm:top-0">
      <div className="flex items-center justify-between sm:block">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin Console</p>
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 sm:hidden"
          aria-expanded={mobileExpanded}
          aria-controls="admin-sidebar-nav"
          onClick={() => setMobileExpanded((value) => !value)}
        >
          {mobileExpanded ? "Hide Menu" : "Show Menu"}
        </button>
      </div>
      <div className="mt-2">
        <BrandMark subtitle="Holy Ghost College Owerri" />
      </div>
      <nav id="admin-sidebar-nav" className={`mt-6 grid grid-cols-2 gap-2 sm:block sm:space-y-2 ${mobileExpanded ? "block" : "hidden sm:block"}`}>
        {adminLinks.map((link) => {
          const isActive = isActivePath(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                isActive ? "bg-(--primary) text-white" : "text-slate-700 hover:bg-slate-200/60"
              }`}
              onClick={() => setMobileExpanded(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
