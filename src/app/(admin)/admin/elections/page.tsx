import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAllElections } from "@/lib/data";

export default async function AdminElectionsPage() {
  await requireAdmin();
  const elections = await getAllElections();
  const activeCount = elections.filter((election) => election.is_active).length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Elections</h1>
      <p className="mt-2 text-slate-600">Configure election structure in setup, then run live controls from the center.</p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Total Elections</p>
          <p className="mt-2 text-3xl font-black text-(--primary)">{elections.length}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Active Elections</p>
          <p className="mt-2 text-3xl font-black text-(--primary)">{activeCount}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Inactive Elections</p>
          <p className="mt-2 text-3xl font-black text-(--primary)">{Math.max(elections.length - activeCount, 0)}</p>
        </article>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/admin/elections/setup" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">
          Open Election Setup
        </Link>
        <Link href="/admin/elections/center" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">
          Open Election Center
        </Link>
      </section>

      <section className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Starts</th>
              <th className="px-4 py-3">Ends</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {elections.map((election) => (
              <tr key={election.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{election.title}</td>
                <td className="px-4 py-3">{new Date(election.starts_at).toLocaleString()}</td>
                <td className="px-4 py-3">{new Date(election.ends_at).toLocaleString()}</td>
                <td className="px-4 py-3">{election.is_active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
            {elections.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">No elections yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
