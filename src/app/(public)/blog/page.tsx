import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Heritage News",
  description: "Association updates, stories, and leadership announcements."
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const featured = posts[0] ?? null;
  const others = featured ? posts.slice(1) : posts;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Heritage News & Blog</h1>
      <p className="mt-3 text-slate-600">Editorial updates, announcements, and alumni spotlight stories.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">Association News</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">School Updates</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">Alumni Spotlight</span>
      </div>

      <section className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          {featured ? (
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-3xl font-black text-(--primary)">{featured.title}</h2>
              <p className="mt-3 line-clamp-4 text-sm text-slate-600">{featured.content}</p>
              <Link href={`/blog/${featured.slug}`} className="mt-4 inline-block font-semibold text-(--primary-container)">
                Read featured story
              </Link>
            </article>
          ) : null}

          {others.map((post) => (
            <article key={post.id} className="editorial-card rounded-xl p-5">
              <h3 className="text-2xl font-bold text-(--primary)">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.content}</p>
              <Link href={`/blog/${post.slug}`} className="mt-3 inline-block font-semibold text-(--primary-container)">
                Read post
              </Link>
            </article>
          ))}

          {posts.length === 0 ? <p className="text-sm text-slate-500">No posts published yet.</p> : null}
        </div>

        <aside className="rounded-xl bg-(--primary) p-6 text-white lg:col-span-4">
          <h2 className="text-xl font-black">Latest Announcements</h2>
          <ul className="mt-4 space-y-4 text-sm text-white/85">
            <li>Membership verification window opens this quarter.</li>
            <li>Annual reunion details will be published soon.</li>
            <li>Chapter leaders forum scheduled for next month.</li>
          </ul>
        </aside>
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-black text-(--primary)">Archive Chronicle</h2>
        <p className="mt-2 text-sm text-slate-600">Receive curated alumni updates and event notices.</p>
      </section>
    </main>
  );
}
