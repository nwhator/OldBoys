import type { Metadata } from "next";
import path from "node:path";
import { readdir } from "node:fs/promises";
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

  const imagesDir = path.join(process.cwd(), "public", "images");
  const videosDir = path.join(process.cwd(), "public", "videos");
  let localImages: string[] = [];
  let localVideos: string[] = [];

  try {
    localImages = (await readdir(imagesDir)).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
  } catch {
    localImages = [];
  }

  try {
    localVideos = (await readdir(videosDir)).filter((file) => /\.(mp4|webm|ogg)$/i.test(file));
  } catch {
    localVideos = [];
  }

  const localGalleryItems = [
    ...localImages.map((fileName) => ({
      src: `/images/${fileName}`,
      title: fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\b\w/g, (part) => part.toUpperCase()),
      bio: undefined,
      type: "image" as const
    })),
    ...localVideos.map((fileName) => ({
      src: `/videos/${fileName}`,
      title: fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\b\w/g, (part) => part.toUpperCase()),
      bio: undefined,
      type: "video" as const
    }))
  ];

  const allGalleryItems = galleryItems.length > 0 ? galleryItems : localGalleryItems;

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Photo Gallery</p>
        <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">Our Moments</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          A collection of reunion highlights, school memories, and community events from the association.
        </p>
      </header>
      <MasonryGallery images={allGalleryItems} />
      {allGalleryItems.length === 0 ? <p className="mt-8 text-sm text-slate-500">No gallery items found yet.</p> : null}
    </main>
  );
}
