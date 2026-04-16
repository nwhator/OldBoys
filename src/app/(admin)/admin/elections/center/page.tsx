
import { setElectionActive } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getElectionVoteCounts } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";


import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export default async function AdminElectionCenterPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  const { data: elections } = await supabase.from("elections").select("id,title,starts_at,ends_at,is_active").order("created_at", { ascending: false });

  // Fetch positions and candidates for all elections
  const positionsByElection: Record<string, any[]> = {};
  const candidatesByPosition: Record<string, any[]> = {};
  if (elections) {
    for (const election of elections) {
      const { data: positions } = await supabase
        .from("positions")
        .select("id,name,sort_order")
        .eq("election_id", election.id)
        .order("sort_order", { ascending: true });
      positionsByElection[election.id] = positions ?? [];
      for (const pos of positions ?? []) {
        const { data: candidates } = await supabase
          .from("candidates")
          .select("id,name,image_url")
          .eq("position_id", pos.id);
        candidatesByPosition[pos.id] = candidates ?? [];
      }
    }
  }

  // Fetch vote counts for all elections
  const voteCountsByElection: Record<string, Record<string, number>> = {};
  if (elections) {
    for (const election of elections) {
      voteCountsByElection[election.id] = await getElectionVoteCounts(election.id);
    }
  }

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

      {/* Vote tally analytics per election */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Vote Tally Analytics</h2>
        {(elections ?? []).map((election) => (
          <div key={election.id} className="mb-10 border rounded-xl p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">{election.title}</h3>
            {(positionsByElection[election.id] ?? []).length === 0 ? (
              <p className="text-slate-500">No positions/candidates for this election.</p>
            ) : (
              <div className="space-y-6">
                {(positionsByElection[election.id] ?? []).map((pos) => (
                  <div key={pos.id}>
                    <h4 className="font-bold mb-1">{pos.name}</h4>
                    {(candidatesByPosition[pos.id] ?? []).length === 0 ? (
                      <p className="text-slate-400 ml-4">No candidates for this position.</p>
                    ) : (
                      <ul className="ml-4 list-disc">
                        {(candidatesByPosition[pos.id] ?? []).map((cand) => (
                          <li key={cand.id} className="flex items-center gap-2">
                            {cand.image_url && (
                              <img src={cand.image_url} alt={cand.name} className="w-6 h-6 rounded-full object-cover" />
                            )}
                            <span>{cand.name}</span>
                            <span className="ml-2 text-xs text-slate-600">(
                              {voteCountsByElection[election.id]?.[cand.id] ?? 0} votes)
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
