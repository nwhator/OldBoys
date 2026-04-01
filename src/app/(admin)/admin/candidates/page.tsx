import { createCandidate } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminCandidatesPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data: positions } = await supabase.from("positions").select("id,name").order("name", { ascending: true });
  const { data: candidates } = await supabase.from("candidates").select("id,name,manifesto,image_url,position_id").order("name", { ascending: true });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Candidates Management</h1>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Add Candidate</h2>
        <p className="mt-1 text-sm text-slate-600">Use /api/upload to upload candidate images, then paste public URL.</p>
        <form action={createCandidate} className="mt-4 grid gap-3 lg:max-w-xl">
          <select name="position_id" required className="rounded-md border border-slate-300 px-3 py-2">
            <option value="">Select position</option>
            {(positions ?? []).map((position) => (
              <option key={position.id} value={position.id}>{position.name}</option>
            ))}
          </select>
          <input name="name" required placeholder="Candidate name" className="rounded-md border border-slate-300 px-3 py-2" />
          <input name="image_url" placeholder="Image URL" className="rounded-md border border-slate-300 px-3 py-2" />
          <textarea name="manifesto" placeholder="Manifesto" rows={4} className="rounded-md border border-slate-300 px-3 py-2" />
          <button type="submit" className="rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Add Candidate</button>
        </form>
      </section>

      <section className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Position Id</th>
              <th className="px-4 py-3">Manifesto</th>
            </tr>
          </thead>
          <tbody>
            {(candidates ?? []).map((candidate) => (
              <tr key={candidate.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{candidate.name}</td>
                <td className="px-4 py-3">{candidate.position_id}</td>
                <td className="px-4 py-3 line-clamp-2">{candidate.manifesto ?? "-"}</td>
              </tr>
            ))}
            {(candidates ?? []).length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-slate-500">No candidates yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
