import Link from "next/link";
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

export function AdminSidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-[#f8f7f2] p-4 sm:h-screen sm:w-64 sm:shrink-0 sm:border-b-0 sm:border-r sm:sticky sm:top-0">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin Console</p>
      <div className="mt-2">
        <BrandMark subtitle="Holy Ghost College Owerri" />
      </div>
      <nav className="mt-6 grid grid-cols-2 gap-2 sm:block sm:space-y-2">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200/60">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
