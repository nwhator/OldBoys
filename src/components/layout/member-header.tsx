import Link from "next/link";
import { signOut } from "@/lib/actions";
import { requireApprovedMember } from "@/lib/auth";
import { BrandMark } from "@/components/layout/brand-mark";

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
        <nav className="hidden items-center gap-4 text-sm font-semibold md:flex">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/voting">Voting</Link>
          <Link href="/payments">Payments</Link>
        </nav>
        <form action={signOut}>
          <button className="rounded-md bg-(--primary) px-3 py-2 text-xs font-bold uppercase tracking-wider text-white" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
