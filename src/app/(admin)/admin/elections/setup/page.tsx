import { createElection, createPosition } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getAllElections } from "@/lib/data";

export default async function AdminElectionSetupPage() {
  await requireAdmin();
  const elections = await getAllElections();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Election Setup</h1>

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
            <input name="name" required placeholder="Position name" className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="sort_order" type="number" min="1" defaultValue="1" className="rounded-md border border-slate-300 px-3 py-2" />
            <button type="submit" className="rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Add Position</button>
          </form>
        </article>
      </section>
    </main>
  );
}
