import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/approvals", label: "Approvals" },
  { href: "/admin/member-management", label: "Members" },
  { href: "/admin/elections", label: "Elections" },
  { href: "/admin/elections/setup", label: "Election Setup" },
  { href: "/admin/elections/center", label: "Election Center" },
  { href: "/admin/candidates", label: "Candidates" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/leadership", label: "Leadership" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/email-templates", label: "Email Templates" },
  { href: "/admin/audit-settings", label: "Audit Settings" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/payments", label: "Payments" }
];

export function AdminSidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-[#f8f7f2] p-4 md:sticky md:top-0 md:block">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin Console</p>
      <div className="mt-2">
        <BrandMark subtitle="Holy Ghost College Owerri" />
      </div>
      <nav className="mt-6 space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200/60">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
