import type { Metadata } from "next";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { getLeadershipProfiles } from "@/lib/data";

export const metadata: Metadata = {
  title: "National Executive Council",
  description: "Meet the National Executive Council leadership team."
};

export default async function NationalExecutiveCouncilPage() {
  const leaders = await getLeadershipProfiles(true);

  const galleryImages = leaders
    .filter((leader) => leader.image_url)
    .map((leader) => ({
      src: leader.image_url!,
      title: leader.name,
      bio: leader.title || leader.bio || undefined
    }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <section className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300">Leadership</p>
        <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">National Executive Council</h1>
        <p className="mt-4 max-w-3xl text-slate-700 md:text-lg">
          The National Executive Council is the primary leadership body guiding strategy, governance, and alumni engagement across the association.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/leadership/national-expanded-executive-council"
            className="rounded-md border border-slate-300 px-5 py-2 text-sm font-bold uppercase tracking-wider text-slate-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            View National Expanded Executive Council
          </a>
        </div>
      </section>

      <section className="mt-12">
        {galleryImages.length === 0 ? (
          <p className="text-sm text-slate-500">No council profiles published yet.</p>
        ) : (
          <MasonryGallery images={galleryImages} grid />
        )}
      </section>
    </main>
  );
}
