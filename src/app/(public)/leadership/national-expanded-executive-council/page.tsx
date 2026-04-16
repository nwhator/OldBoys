import type { Metadata } from "next";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";

export const metadata: Metadata = {
  title: "National Expanded Executive Council",
  description: "Explore the National Expanded Executive Council and additional executive committee members."
};

const excos = [
  { src: null, title: "80' Set", bio: "", set: "80' Set" },
  { src: "/excos/dike.jpg", title: "Dr. Dike Anozie Ksji", bio: "Chairman", set: "80' Set" },
  { src: "/excos/felix.jpg", title: "Dr. Felix M. Eke", bio: "Secretary", set: "80' Set" },
  { src: null, title: "81' Set", bio: "", set: "81' Set" },
  { src: "/excos/justin.jpg", title: "Chief Justin K.C. Amadi", bio: "Chairman", set: "81' Set" },
  { src: "/excos/theophilus.jpg", title: "Theophilus Okonkwo", bio: "Secretary", set: "81' Set" },
  { src: null, title: "88' Set", bio: "", set: "88' Set" },
  { src: "/excos/nwachukwu.jpg", title: "Nwachukwu Henry Montel", bio: "Secretary", set: "88' Set" },
  { src: null, title: "99' Set", bio: "", set: "99' Set" },
  { src: "/excos/victor.jpg", title: "Rev. T. Victor Anowey PHD JP.", bio: "Chairman", set: "99' Set" },
  { src: "/excos/obiako.jpg", title: "Obiako Alex Nnaemka", bio: "Secretary", set: "99' Set" }
];

export default function NationalExpandedExecutiveCouncilPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <section className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300">Leadership</p>
        <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">National Expanded Executive Council</h1>
        <p className="mt-4 max-w-3xl text-slate-700 md:text-lg">
          These hardcoded executive committee members represent additional set leadership across the association.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/leadership/national-executive-council"
            className="rounded-md border border-slate-300 px-5 py-2 text-sm font-bold uppercase tracking-wider text-slate-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            View National Executive Council
          </a>
        </div>
      </section>

      <section className="mt-12">
        <MasonryGallery images={excos} grid />
      </section>
    </main>
  );
}
