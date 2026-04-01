import Image from "next/image";
import Link from "next/link";
import { QuickLinkCard } from "@/components/cards/quick-link-card";
import { getLatestPublishedBlogPosts } from "@/lib/data";

export default async function HomePage() {
  const latestPosts = await getLatestPublishedBlogPosts(3);

  return (
    <main className="overflow-x-hidden">
      <section className="relative isolate min-h-[72vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
          alt="Alumni gathering"
          fill
          priority
          quality={72}
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 py-16 md:px-8">
          <div className="fade-in max-w-3xl text-white">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-amber-300">Holy Ghost College Owerri</p>
            <h1 className="text-4xl font-black leading-tight md:text-7xl">Old Boys' Association</h1>
            <p className="mt-5 max-w-2xl text-white/85 md:text-lg">
              A secure alumni platform to manage membership, vote in elections, pay dues, and preserve our shared legacy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="rounded-md bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-(--primary)">About the Association</Link>
              <Link href="/signup" className="rounded-md border border-white/40 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">Join the Registry</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stagger-grid mx-auto grid max-w-7xl gap-6 px-4 py-14 md:grid-cols-3 md:px-8">
        <QuickLinkCard title="Membership" description="Track your status and profile details." href="/dashboard" />
        <QuickLinkCard title="Elections" description="Review active elections and cast your secure vote." href="/voting" />
        <QuickLinkCard title="Dues Payments" description="Pay association dues and view your transaction history." href="/payments" />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black text-(--primary)">Latest Updates</h2>
          <Link href="/blog" className="text-sm font-bold text-(--primary-container)">View all</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article key={post.id} className="editorial-card rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">{new Date(post.created_at).toLocaleDateString()}</p>
              <h3 className="mt-2 text-xl font-bold text-(--primary)">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.content}</p>
              <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-bold text-(--primary-container)">Read more</Link>
            </article>
          ))}
          {latestPosts.length === 0 && (
            <article className="editorial-card rounded-xl p-5 md:col-span-3">
              <p className="text-sm text-slate-600">No posts published yet.</p>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}
