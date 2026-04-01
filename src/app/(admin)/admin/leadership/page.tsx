import { createLeadershipProfile } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getLeadershipProfiles } from "@/lib/data";

export default async function AdminLeadershipPage() {
  await requireAdmin();
  const leaders = await getLeadershipProfiles();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Leadership Profiles</h1>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Add Leader</h2>
        <form action={createLeadershipProfile} className="mt-4 grid gap-3 lg:max-w-2xl">
          <input name="name" required placeholder="Name" className="rounded border border-slate-300 px-3 py-2" />
          <input name="title" required placeholder="Title" className="rounded border border-slate-300 px-3 py-2" />
          <input name="image_url" placeholder="Image URL" className="rounded border border-slate-300 px-3 py-2" />
          <textarea name="bio" rows={4} placeholder="Bio" className="rounded border border-slate-300 px-3 py-2" />
          <input name="sort_order" type="number" min="1" defaultValue="1" className="rounded border border-slate-300 px-3 py-2" />
          <input type="hidden" name="is_active" value="true" />
          <button type="submit" className="w-fit rounded bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Add</button>
        </form>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader) => (
          <article key={leader.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-(--primary)">{leader.name}</h3>
            <p className="text-sm text-slate-600">{leader.title}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
