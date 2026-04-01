import type { Metadata } from "next";
import Image from "next/image";
import { getPublicCommunityMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Community",
  description: "Meet approved members of the Holy Ghost College Owerri Old Boys' Association."
};

function initialsFromName(name: string) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) {
    return "OB";
  }
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
  return initials || "OB";
}

export default async function CommunityPage() {
  const members = await getPublicCommunityMembers(60);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <section className="rounded-2xl bg-(--primary) p-8 text-white md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300">Community Directory</p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">Our Members</h1>
        <p className="mt-4 max-w-3xl text-white/85 md:text-lg">
          A living directory of approved members of the association, celebrating lifelong brotherhood and intergenerational connection.
        </p>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <article key={member.id} className="editorial-card reveal-up rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-200">
                {member.avatar_url ? (
                  <Image src={member.avatar_url} alt={member.full_name} fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-black text-(--primary)">
                    {initialsFromName(member.full_name)}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-base font-black text-(--primary)">{member.full_name}</h2>
                <p className="text-xs uppercase tracking-wider text-slate-500">{member.chapter}</p>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-sm text-slate-600">
              <p><strong>Set:</strong> {member.set_label}</p>
              <p><strong>Status:</strong> Approved</p>
              <p><strong>Joined:</strong> {new Date(member.created_at).toLocaleDateString()}</p>
            </div>
          </article>
        ))}
        {members.length === 0 ? (
          <article className="editorial-card rounded-xl p-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <p className="text-sm text-slate-600">No approved community members are available yet.</p>
          </article>
        ) : null}
      </section>
    </main>
  );
}
