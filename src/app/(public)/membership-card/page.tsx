import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership Card",
  description: "Preview of the Old Boys' Association membership card."
};

export default function MembershipCardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Membership Card</h1>
      <p className="mt-3 text-slate-700">Approved members receive a verified association membership card.</p>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <article className="rounded-2xl bg-(--primary) p-8 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Preview</p>
          <h2 className="mt-3 text-2xl font-black">Old Boys' Association</h2>
          <p className="mt-6 text-sm text-white/80">Member Name</p>
          <p className="text-xl font-bold">Approved Alumni</p>
          <p className="mt-4 text-sm text-white/80">Membership ID</p>
          <p className="font-semibold">OBA-XXXX-XXXX</p>
        </article>

        <article className="editorial-card rounded-xl p-6">
          <h3 className="text-xl font-bold text-(--primary)">How it works</h3>
          <p className="mt-3 text-sm text-slate-700">
            After approval, your member profile serves as your card and confirmation of association membership.
          </p>
          <Link href="/signup" className="mt-5 inline-block rounded bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
            Start Registration
          </Link>
        </article>
      </section>
    </main>
  );
}
