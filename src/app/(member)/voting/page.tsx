import { castVote } from "@/lib/actions";
import { requireApprovedMember } from "@/lib/auth";
import { getActiveElectionBundle, getVotesByUserInElection } from "@/lib/data";

export default async function VotingPage() {
  const profile = await requireApprovedMember();
  const bundle = await getActiveElectionBundle();

  if (!bundle) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <h1 className="text-4xl font-black text-(--primary)">Voting</h1>
        <p className="mt-4 text-slate-600">No voting is active.</p>
      </main>
    );
  }

  const votes = await getVotesByUserInElection(profile.id, bundle.election.id);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">{bundle.election.title}</h1>
      <p className="mt-2 text-slate-600">Cast one vote per position.</p>

      <div className="mt-8 space-y-8">
        {bundle.positions.map((position) => {
          const alreadyVoted = votes.find((vote) => vote.position_id === position.id);
          const candidates = bundle.candidates.filter((candidate) => candidate.position_id === position.id);

          return (
            <section key={position.id} className="editorial-card rounded-xl p-5">
              <h2 className="text-2xl font-bold text-(--primary)">{position.name}</h2>
              {alreadyVoted && <p className="mt-2 text-sm font-semibold text-emerald-700">You already voted for this position.</p>}

              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {candidates.map((candidate) => {
                  const isSelected = alreadyVoted?.candidate_id === candidate.id;
                  return (
                    <article key={candidate.id} className="rounded-lg border border-slate-200 bg-white p-4">
                      <h3 className="text-lg font-bold text-(--primary)">{candidate.name}</h3>
                      <p className="mt-2 text-sm text-slate-600">{candidate.manifesto ?? "No manifesto provided."}</p>

                      <form action={castVote} className="mt-4">
                        <input type="hidden" name="election_id" value={bundle.election.id} />
                        <input type="hidden" name="position_id" value={position.id} />
                        <input type="hidden" name="candidate_id" value={candidate.id} />
                        <button
                          disabled={Boolean(alreadyVoted)}
                          className="rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                          type="submit"
                        >
                          {isSelected ? "Voted" : "Vote"}
                        </button>
                      </form>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
