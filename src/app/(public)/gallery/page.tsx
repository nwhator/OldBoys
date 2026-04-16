import type { Metadata } from "next";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { getGalleryItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of Old Boys' Association events, reunions, and shared memories."
};

export default async function GalleryPage() {
  const galleryData = await getGalleryItems(true);
  const galleryItems = galleryData.map((item) => ({
    src: item.image_url,
    title: item.title,
    bio: item.caption ?? undefined,
    type: /\.(mp4|webm|ogg)$/i.test(item.image_url) ? "video" as const : "image" as const
  }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Photo Gallery</p>
        <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">Our Moments</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          A collection of reunion highlights, school memories, and community events from the association.
        </p>
      </header>
      <MasonryGallery images={galleryItems} />
      {galleryItems.length === 0 ? <p className="mt-8 text-sm text-slate-500">No images or videos found in public/images or public/videos yet.</p> : null}
    </main>
  );
}
