import { BrandMark } from "@/components/layout/brand-mark";

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="fade-in mt-20 bg-(--primary) px-4 py-10 text-slate-100 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="footer-brand-wrap">
          <BrandMark subtitle="Holy Ghost College Owerri" />
          <p className="mt-2 text-sm text-slate-300">Secure alumni platform for membership, voting, and payments.</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-300">© {year} Holy Ghost College Owerri Old Boys' Association</p>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Public Portal</p>
      </div>
    </footer>
  );
}
