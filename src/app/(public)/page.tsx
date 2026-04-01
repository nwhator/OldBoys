import Image from "next/image";
import Link from "next/link";
import { getLatestPublishedBlogPosts, getPublicCommunityMembers } from "@/lib/data";

export default async function HomePage() {
  const latestPosts = await getLatestPublishedBlogPosts(3);
  const communityPreview = await getPublicCommunityMembers(6);
  const highlights = [
    { label: "Scholarships Supported", value: "160", note: "Students funded through alumni initiatives" },
    { label: "Active Chapters", value: "24", note: "Coordinated chapter leadership structure" },
    { label: "Years of Legacy", value: "90+", note: "Generations of brotherhood and service" }
  ];

  const pillars = [
    {
      title: "Membership & Welfare",
      description:
        "Keep your profile current, verify member status, access your digital membership card, and connect with chapter welfare officers."
    },
    {
      title: "Civic Leadership",
      description:
        "Participate in transparent elections, monitor candidate manifestos, and contribute to accountable governance of the association."
    },
    {
      title: "Mentorship & Scholarships",
      description:
        "Support students and young alumni with career guidance, internship pathways, and targeted scholarship opportunities."
    },
    {
      title: "Heritage Preservation",
      description:
        "Archive institutional stories, preserve class memories, and document milestones that shape our shared identity."
    }
  ];

  const timeline = [
    { period: "Q2", title: "Member Verification Drive", detail: "Digital profile cleanup and chapter-level records reconciliation." },
    { period: "Q3", title: "Election Cycle", detail: "Nomination, manifesto publishing, debates, and secure online voting." },
    { period: "Q4", title: "Founders Week", detail: "Commemorative events, mentorship roundtables, and alumni recognition." }
  ];

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

      <section className="section-cobalt py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-6 md:grid-cols-12">
          <article className="editorial-card reveal-up tone-cream rounded-xl p-8 md:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Membership</p>
            <h3 className="mt-3 text-3xl font-black text-(--primary)">Member Status</h3>
            <p className="mt-3 text-sm text-slate-600">Access your profile, verify standing, and manage your association records.</p>
            <Link href="/dashboard" className="mt-6 inline-block text-sm font-bold text-(--primary-container)">Check Status</Link>
          </article>

          <article className="reveal-up rounded-xl tone-blue p-8 text-white md:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Elections</p>
            <h3 className="mt-3 text-3xl font-black">Upcoming Elections</h3>
            <p className="mt-3 text-sm text-white/80">Review candidates, manifestos, and timelines for transparent alumni leadership transitions.</p>
            <div className="mt-6 flex items-center justify-between rounded-lg bg-(--primary) px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Election Center</span>
              <Link href="/voting" className="text-sm font-bold text-amber-300">Details</Link>
            </div>
          </article>

          <article className="reveal-up rounded-xl border border-slate-200 bg-white p-2 md:col-span-4">
            <div className="mb-2 rounded-lg p-4">
              <h3 className="text-2xl font-black text-(--primary)">Gallery Updates</h3>
              <p className="mt-1 text-sm text-slate-600">Moments from chapter events, reunions, and service projects.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative h-28 overflow-hidden rounded">
                <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952" alt="Alumni event" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative h-28 overflow-hidden rounded">
                <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Seminar" fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          </article>
        </div>
        </div>
      </section>

      <section className="section-honey py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.label} className="editorial-card reveal-up rounded-xl p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-4xl font-black text-(--primary)">{item.value}</p>
              <p className="mt-2 text-sm text-slate-600">{item.note}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="section-mint py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">What We Stand For</p>
            <h2 className="mt-2 text-3xl font-black text-(--primary)">Association Pillars</h2>
          </div>
          <Link href="/about" className="text-sm font-bold text-(--primary-container)">
            Learn more
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="editorial-card reveal-up rounded-xl p-6">
              <h3 className="text-2xl font-black text-(--primary)">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="section-rose py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {timeline.map((item) => (
            <article key={item.title} className="reveal-up rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">{item.period}</p>
              <h3 className="mt-2 text-2xl font-black text-(--primary)">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="section-lilac py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black text-(--primary)">Dispatch from the Heritage</h2>
          <Link href="/blog" className="text-sm font-bold text-(--primary-container)">View all</Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <article className="lg:col-span-2">
            {latestPosts[0] ? (
              <div className="group rounded-xl border border-slate-200 bg-white p-5">
                <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={latestPosts[0].featured_image_url || "https://images.unsplash.com/photo-1497215842964-222b430dc094"}
                    alt={latestPosts[0].title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                <p className="text-xs uppercase tracking-widest text-slate-500">{new Date(latestPosts[0].created_at).toLocaleDateString()}</p>
                <h3 className="mt-2 text-3xl font-black text-(--primary)">{latestPosts[0].title}</h3>
                <p className="mt-3 line-clamp-4 text-sm text-slate-600">{latestPosts[0].content}</p>
                <Link href={`/blog/${latestPosts[0].slug}`} className="mt-4 inline-block text-sm font-bold text-(--primary-container)">Read full report</Link>
              </div>
            ) : (
              <article className="editorial-card rounded-xl p-5">
                <p className="text-sm text-slate-600">No posts published yet.</p>
              </article>
            )}
          </article>

          <aside className="space-y-4">
            {latestPosts.slice(1, 4).map((post) => (
              <article key={post.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700">News</p>
                <h4 className="mt-2 text-lg font-bold text-(--primary)">{post.title}</h4>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-(--primary-container)">Read</Link>
              </article>
            ))}
          </aside>
        </div>
        </div>
      </section>

      <section className="section-peach py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black text-(--primary)">Community Members</h2>
          <Link href="/community" className="text-sm font-bold text-(--primary-container)">Open directory</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communityPreview.map((member) => (
            <article key={member.id} className="editorial-card reveal-up rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--primary-container) text-sm font-black text-white">
                  {member.full_name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() ?? "")
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-black text-(--primary)">{member.full_name}</h3>
                  <p className="text-xs uppercase tracking-wider text-slate-500">{member.set_label}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{member.chapter}</p>
            </article>
          ))}
          {communityPreview.length === 0 ? <p className="text-sm text-slate-600">Community members will appear after approvals.</p> : null}
        </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 pb-2 md:px-8">
        <div className="rounded-2xl tone-blue px-6 py-10 text-center text-white md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300">Join The Network</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Reconnect, Contribute, and Build Legacy</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/85 md:text-base">
            Become part of a trusted Old Boys platform for engagement, service, and intergenerational impact. Membership onboarding is controlled and approval-based.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="rounded-md bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-(--primary)">
              Start Registration
            </Link>
            <Link href="/contact" className="rounded-md border border-white/40 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
              Contact Secretariat
            </Link>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
