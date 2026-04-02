import Link from "next/link";
import { signOut } from "@/lib/actions";
import { requireApprovedMember } from "@/lib/auth";
import { BrandMark } from "@/components/layout/brand-mark";
import { MemberMobileMenu } from "@/components/layout/member-mobile-menu";
import { MemberNavLinks } from "@/components/layout/member-nav-links";

export async function MemberHeader() {
  const profile = await requireApprovedMember();

  return (
    <header className="fade-in sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <div className="min-w-0">
          <BrandMark size={34} compact />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Member Portal</p>
          <p className="truncate text-lg font-bold text-(--primary)">{profile.full_name}</p>
        </div>
        <MemberNavLinks />
        <div className="md:hidden">
          <MemberMobileMenu fullName={profile.full_name} />
        </div>
        <form action={signOut} className="hidden md:block">
          <button className="rounded-md bg-(--primary) px-3 py-2 text-xs font-bold uppercase tracking-wider text-white" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
