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

  // Hardcoded Excos content — images come from public/excos/
  const excos = [
    {
      src: "/excos/ugwonali.jpg",
      title: "Ugwonali Chimezie",
      bio: "Chairman 92' Set"
    }
    // Add more excos here as needed, files should be placed in public/excos/
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

      <MasonryGallery images={galleryImages} grid />
      <section className="mt-12">
        <header className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Excos</p>
          <h2 className="mt-3 text-3xl font-black text-(--primary) md:text-4xl">Executive Committee</h2>
          <p className="mt-4 max-w-3xl text-slate-700 md:text-lg">
            Our Executive Committee (Excos) leads operational work and supports the wider leadership in serving the alumni community.
          </p>
        </header>

        <MasonryGallery images={excos} grid />
      </section>
      {leaders.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No leadership profiles published yet.</p>
      ) : null}
    </main>
  );
}
