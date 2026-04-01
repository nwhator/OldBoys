import type { Metadata } from "next";
import Image from "next/image";
import { getLeadershipProfiles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Executive leadership of Old Boys' Association."
};

export default async function LeadershipPage() {
  const leaders = await getLeadershipProfiles(true);
  const advisors = [
    { name: "Prof. B. Lawal", role: "Founding Patron" },
    { name: "Justice M. Abdullahi", role: "Legal Advisor" },
    { name: "Dr. E. Williams", role: "Strategic Advisor" },
    { name: "HRH K. Sanusi", role: "Royal Patron" }
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <header className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Executive Council</p>
        <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">Distinguished Leadership</h1>
        <p className="mt-4 max-w-3xl text-slate-700 md:text-lg">
          Our leadership team stewards strategy, governance, and alumni engagement with integrity and excellence.
        </p>
      </header>

      <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {leaders.map((leader) => (
          <article key={leader.id} className="editorial-card rounded-xl p-5">
            <div className="relative h-48 overflow-hidden rounded-lg bg-slate-200">
              {leader.image_url ? (
                <Image src={leader.image_url} alt={leader.name} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              ) : null}
            </div>
            <h2 className="mt-4 text-xl font-bold text-(--primary)">{leader.name}</h2>
            <p className="text-sm text-slate-600">{leader.title}</p>
            {leader.bio ? <p className="mt-2 text-sm text-slate-600">{leader.bio}</p> : null}
          </article>
        ))}
        {leaders.length === 0 ? <p className="text-sm text-slate-500">No leadership profiles published yet.</p> : null}
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-3xl font-black text-(--primary)">Advisory Council</h2>
        <p className="mt-2 text-sm text-slate-600">Distinguished elders offering strategic guidance to the association.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {advisors.map((advisor) => (
            <article key={advisor.name} className="rounded-lg bg-slate-50 p-4">
              <h3 className="text-lg font-black text-(--primary)">{advisor.name}</h3>
              <p className="text-sm text-slate-600">{advisor.role}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
