import type { Metadata } from "next";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of Old Boys' Association events, reunions, and shared memories."
};


  // Images
  const imagesDir = path.join(process.cwd(), "public", "images");
  const imageFiles = (await readdir(imagesDir)).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
  const galleryImages = imageFiles
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: `/images/${file}`,
      title: file
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (part) => part.toUpperCase()),
      type: "image"
    }));

  // Videos
  const videosDir = path.join(process.cwd(), "public", "videos");
  let videoFiles: string[] = [];
  try {
    videoFiles = (await readdir(videosDir)).filter((file) => /\.(mp4)$/i.test(file));
  } catch {}
  const galleryVideos = videoFiles
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: `/videos/${file}`,
      title: file
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (part) => part.toUpperCase()),
      type: "video"
    }));

  const galleryItems = [...galleryImages, ...galleryVideos];

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
