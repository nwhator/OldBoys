import type { Metadata } from "next";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { getLeadershipProfiles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Executive leadership of Old Boys' Association."
};

export default async function LeadershipPage() {
  const leaders = await getLeadershipProfiles(true);

  const galleryImages = leaders
    .filter((leader) => leader.image_url)
    .map((leader) => ({
      src: leader.image_url!,
      title: leader.name + (leader.title ? ` — ${leader.title}` : ""),
      bio: leader.bio || undefined
    }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <header className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Executive Council</p>
        <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">Distinguished Leadership</h1>
        <p className="mt-4 max-w-3xl text-slate-700 md:text-lg">
          Our leadership team stewards strategy, governance, and alumni engagement with integrity and excellence.
        </p>
      </header>

      <MasonryGallery images={galleryImages} grid />
      {leaders.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No leadership profiles published yet.</p>
      ) : null}
    </main>
  );
}
