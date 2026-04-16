"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  title: string;
  bio?: string;
  type?: "image" | "video";
};

type MasonryGalleryProps = {
  images: GalleryImage[];
  grid?: boolean;
};

export function MasonryGallery({ images, grid = false }: MasonryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) => {
          if (prev === null) {
            return prev;
          }
          return (prev + 1) % images.length;
        });
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          if (prev === null) {
            return prev;
          }
          return prev === 0 ? images.length - 1 : prev - 1;
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, images.length]);

  function openAt(index: number) {
    setActiveIndex(index);
  }

  function closePreview() {
    setActiveIndex(null);
  }

  function nextImage() {
    setActiveIndex((prev) => {
      if (prev === null) {
        return prev;
      }
      return (prev + 1) % images.length;
    });
  }

  function previousImage() {
    setActiveIndex((prev) => {
      if (prev === null) {
        return prev;
      }
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }

  return (
    <>
      <section
        className={
          grid
            ? "mt-8 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3"
        }
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => openAt(index)}
            className="group mb-6 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-md transition-all duration-300 hover:scale-97 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-(--primary)"
          >
            <div className={`relative ${grid ? "h-48" : "min-h-48"} w-full bg-slate-100 flex items-center justify-center`}>
              {image.type === "video" ? (
                <video
                  src={image.src}
                  controls
                  className="h-auto w-full object-cover transition duration-500 rounded-t-2xl"
                  poster="/images/video-placeholder.png"
                />
              ) : grid ? (
                <Image src={image.src} alt={image.title} fill unoptimized className="object-cover transition duration-500 rounded-t-2xl" />
              ) : (
                <Image src={image.src} alt={image.title} unoptimized className="object-cover transition duration-500 rounded-t-2xl" />
              )}
            </div>
            <div className="px-5 py-4 flex flex-col gap-2">
              <p className="text-base font-extrabold text-(--primary) tracking-tight leading-snug line-clamp-2">{image.title}</p>
              {image.bio ? (
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-200 rounded px-2 py-1 w-fit shadow-sm">
                  {image.bio}
                </p>
              ) : null}
            </div>
          </button>
        ))}
      </section>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-100 bg-black/90 p-4 md:p-8">
          <button type="button" className="absolute inset-0" aria-label="Close preview" onClick={closePreview} />
          <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center">
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-2 z-10 rounded-full bg-white/15 px-3 py-2 text-sm font-bold text-white backdrop-blur hover:bg-white/25"
              aria-label="Previous image"
            >
              Prev
            </button>

            <div className="relative z-10 w-full max-w-4xl">
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].title}
                width={1400}
                height={1800}
                className="max-h-[80vh] w-full rounded-xl object-contain"
                priority
              />
              <div className="mt-3 flex items-center justify-between text-white">
                <p className="text-sm font-semibold">{images[activeIndex].title}</p>
                <p className="text-xs text-white/80">
                  {activeIndex + 1} / {images.length}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 z-10 rounded-full bg-white/15 px-3 py-2 text-sm font-bold text-white backdrop-blur hover:bg-white/25"
              aria-label="Next image"
            >
              Next
            </button>

            <button
              type="button"
              onClick={closePreview}
              className="absolute right-2 top-2 z-10 rounded-full bg-white/15 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/25"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
