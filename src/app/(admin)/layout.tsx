import type { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { BrandMark } from "@/components/layout/brand-mark";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const profile = await requireAdmin();

  return (
    <div className="min-h-screen overflow-x-hidden md:flex">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <BrandMark size={30} compact />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin</p>
              <p className="truncate font-semibold text-(--primary)">{profile.full_name}</p>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/admin" className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold">Home</Link>
              <Link href="/admin/approvals" className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold">Approvals</Link>
            </div>
            <form action={signOut}>
              <button className="rounded-md bg-(--primary) px-3 py-2 text-xs font-bold uppercase tracking-wider text-white" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
