import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Choose between the National Executive Council and National Expanded Executive Council pages."
};

export default function LeadershipPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <section className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300">Leadership</p>
        <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">National Leadership</h1>
        <p className="mt-4 max-w-3xl text-slate-700 md:text-lg">
          Choose which leadership body to view. The National Executive Council page contains the main council members, while the National Expanded Executive Council page contains additional set-based leadership.
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <Link
          href="/leadership/national-executive-council"
          className="group rounded-3xl border border-amber-200 bg-amber-50 p-10 text-left transition hover:-translate-y-1 hover:shadow-lg"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-700">Main Council</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900">National Executive Council</h2>
          <p className="mt-3 text-sm text-slate-600">View the 14 leadership members who lead the association at the national level.</p>
        </Link>

        <Link
          href="/leadership/national-expanded-executive-council"
          className="group rounded-3xl border border-slate-200 bg-slate-50 p-10 text-left transition hover:-translate-y-1 hover:shadow-lg"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Expanded Council</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900">National Expanded Executive Council</h2>
          <p className="mt-3 text-sm text-slate-600">View hardcoded additional executive council members by set.</p>
        </Link>
      </section>
    </main>
  );
}
