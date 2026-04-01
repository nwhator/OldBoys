import { requireApprovedMember } from "@/lib/auth";
import { getActiveElectionBundle, getMemberPayments } from "@/lib/data";

export default async function MemberDashboardPage() {
  const profile = await requireApprovedMember();
  const electionBundle = await getActiveElectionBundle();
  const payments = await getMemberPayments(profile.id);
  const latestPayment = payments[0] ?? null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Member Dashboard</h1>
      <p className="mt-2 text-slate-600">Welcome back, {profile.full_name}.</p>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Membership Status</p>
          <p className="mt-2 text-2xl font-bold capitalize text-emerald-700">{profile.membership_status}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Active Election</p>
          <p className="mt-2 text-xl font-bold text-(--primary)">{electionBundle?.election.title ?? "None"}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Latest Payment</p>
          <p className="mt-2 text-xl font-bold text-(--primary)">{latestPayment?.status ?? "No payment yet"}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Role</p>
          <p className="mt-2 text-2xl font-bold capitalize text-(--primary)">{profile.role}</p>
        </article>
      </section>
    </main>
  );
}
