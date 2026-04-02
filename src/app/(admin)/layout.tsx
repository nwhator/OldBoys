import type { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { AdminSidebar, adminLinks } from "@/components/layout/admin-sidebar";
import { BrandMark } from "@/components/layout/brand-mark";
import { AdminMobileMenu } from "@/components/layout/admin-mobile-menu";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const profile = await requireAdmin();

  return (
    <div className="min-h-screen overflow-x-hidden sm:flex">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <BrandMark size={30} compact />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin</p>
              <p className="truncate font-semibold text-(--primary)">{profile.full_name}</p>
            </div>
            <div className="sm:hidden">
              <AdminMobileMenu fullName={profile.full_name} links={adminLinks} />
            </div>
            <form action={signOut} className="hidden md:block">
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
