import { setElectionActive } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminElectionCenterPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data: elections } = await supabase.from("elections").select("id,title,starts_at,ends_at,is_active").order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Election Center</h1>

      <section className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Starts</th>
              <th className="px-4 py-3">Ends</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(elections ?? []).map((election) => (
              <tr key={election.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{election.title}</td>
                <td className="px-4 py-3">{new Date(election.starts_at).toLocaleString()}</td>
                <td className="px-4 py-3">{new Date(election.ends_at).toLocaleString()}</td>
                <td className="px-4 py-3">{election.is_active ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3">
                  <form action={setElectionActive}>
                    <input type="hidden" name="id" value={election.id} />
                    <input type="hidden" name="is_active" value={String(!election.is_active)} />
                    <button type="submit" className="rounded bg-(--primary) px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {election.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
