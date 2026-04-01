import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { signOut } from "@/lib/actions";
import { BrandMark } from "@/components/layout/brand-mark";

export async function PublicHeader() {
  const profile = await getCurrentProfile();

  return (
    <header className="fade-in sticky top-0 z-50 border-b border-slate-200/60 bg-[#fafaf5]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-8">
        <Link href="/" className="min-w-0">
          <BrandMark compact subtitle="Holy Ghost College Owerri" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/login">Login</Link>
        </nav>
        {profile ? (
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              Dashboard
            </Link>
            <form action={signOut}>
              <button className="rounded-md bg-(--primary) px-3 py-2 text-xs font-bold uppercase tracking-wider text-white" type="submit">
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <Link href="/signup" className="rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
            Join Now
          </Link>
        )}
      </div>
    </header>
  );
}
