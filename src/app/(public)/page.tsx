import Image from "next/image";
import { QuickLinkCard } from "@/components/cards/quick-link-card";

export default function HomePage() {
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
          </div>
        </div>
      </section>

      <section className="stagger-grid mx-auto grid max-w-7xl gap-6 px-4 py-14 md:grid-cols-3 md:px-8">
        <QuickLinkCard title="Membership" description="Track your status and profile details." href="/dashboard" />
        <QuickLinkCard title="Elections" description="Review active elections and cast your secure vote." href="/voting" />
        <QuickLinkCard title="Dues Payments" description="Pay association dues and view your transaction history." href="/payments" />
      </section>
    </main>
  );
}
