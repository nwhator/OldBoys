import { createElection, createPosition } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getAllElections } from "@/lib/data";

export default async function AdminElectionsPage() {
  await requireAdmin();
  const elections = await getAllElections();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Elections Management</h1>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="editorial-card rounded-xl p-5">
          <h2 className="text-xl font-bold text-(--primary)">Create Election</h2>
          <form action={createElection} className="mt-4 grid gap-3">
            <input name="title" required placeholder="Election title" className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="starts_at" required type="datetime-local" className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="ends_at" required type="datetime-local" className="rounded-md border border-slate-300 px-3 py-2" />
            <button type="submit" className="rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Create</button>
          </form>
        </article>

        <article className="editorial-card rounded-xl p-5">
          <h2 className="text-xl font-bold text-(--primary)">Add Position</h2>
          <form action={createPosition} className="mt-4 grid gap-3">
            <select name="election_id" required className="rounded-md border border-slate-300 px-3 py-2">
              <option value="">Select election</option>
              {elections.map((election) => (
                <option key={election.id} value={election.id}>{election.title}</option>
              ))}
            </select>
            <input name="name" required placeholder="Position name (e.g. Chairman)" className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="sort_order" type="number" min="1" defaultValue="1" className="rounded-md border border-slate-300 px-3 py-2" />
            <button type="submit" className="rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Add Position</button>
          </form>
        </article>
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
