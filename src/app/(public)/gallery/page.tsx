import type { Metadata } from "next";
import Image from "next/image";
import { getGalleryItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Visual archive of Old Boys' Association events and milestones."
};

export default async function GalleryPage() {
  const gallery = await getGalleryItems(true);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">The Living Archive</p>
        <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">Alumni Gallery</h1>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <article key={item.id} className="group relative aspect-4/5 overflow-hidden rounded-xl">
            <Image src={item.image_url} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 text-white opacity-0 transition group-hover:opacity-100">
              <p className="text-sm font-semibold">{item.title}</p>
              {item.caption ? <p className="text-xs text-white/90">{item.caption}</p> : null}
            </div>
          </article>
        ))}
        {gallery.length === 0 ? <p className="text-sm text-slate-500">No gallery items published yet.</p> : null}
      </section>
    </main>
  );
}
