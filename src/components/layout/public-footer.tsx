import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="fade-in tone-blue px-4 py-12 text-slate-100 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="footer-brand-wrap">
          <BrandMark subtitle="Holy Ghost College Owerri" />
          <p className="mt-2 text-sm text-slate-300">A home for alumni news, reunions, shared memories, and community service.</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-300">© {year} Holy Ghost College Owerri Old Boys' Association</p>
        </div>
        <div className="space-y-2 text-xs uppercase tracking-[0.2em] text-slate-300">
          <p>Association Website</p>
          <div className="flex gap-4 text-[11px]">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/community" className="hover:text-white">Community</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
