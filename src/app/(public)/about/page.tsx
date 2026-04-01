import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "About Holy Ghost College Owerri Old Boys' Association."
};

export default async function AboutPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <section className="rounded-2xl bg-(--primary) p-8 text-white md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300">Since 1924</p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">About Our Heritage</h1>
        <p className="mt-4 max-w-3xl text-white/85 md:text-lg">
          The Old Boys' Association of Holy Ghost College Owerri exists to preserve legacy, strengthen alumni bonds,
          and invest in future generations through leadership, mentorship, and service.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Published Updates</p>
          <p className="mt-2 text-3xl font-black text-(--primary)">{posts.length}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Core Mission</p>
          <p className="mt-2 text-sm text-slate-700">Community, continuity, and impact-driven alumni leadership.</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Take Action</p>
          <Link href="/signup" className="mt-2 inline-block text-sm font-bold text-(--primary-container)">Join the registry</Link>
        </article>
      </section>
    </main>
  );
}
