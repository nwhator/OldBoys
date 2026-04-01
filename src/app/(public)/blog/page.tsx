import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Heritage News",
  description: "Association updates, stories, and leadership announcements."
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Heritage News & Blog</h1>
      <p className="mt-3 text-slate-600">Stories curated by the administrative editorial team.</p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="editorial-card rounded-xl p-5">
            <h2 className="text-2xl font-bold text-(--primary)">{post.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.content}</p>
            <Link href={`/blog/${post.slug}`} className="mt-3 inline-block font-semibold text-(--primary-container)">
              Read post
            </Link>
          </article>
        ))}
        {posts.length === 0 && <p className="text-sm text-slate-500">No posts published yet.</p>}
      </div>
    </main>
  );
}
