import { requireApprovedMember } from "@/lib/auth";
import { getMemberPayments } from "@/lib/data";

export default async function MemberProfilePage() {
  const profile = await requireApprovedMember();
  const payments = await getMemberPayments(profile.id);
  const paidCount = payments.filter((payment) => payment.status === "success").length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Member Profile</h1>
      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Full Name</p>
          <p className="mt-2 text-2xl font-bold text-(--primary)">{profile.full_name}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Membership Status</p>
          <p className="mt-2 text-2xl font-bold capitalize text-emerald-700">{profile.membership_status}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Role</p>
          <p className="mt-2 text-2xl font-bold capitalize text-(--primary)">{profile.role}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Successful Payments</p>
          <p className="mt-2 text-2xl font-bold text-(--primary)">{paidCount}</p>
        </article>
      </section>
    </main>
  );
}
