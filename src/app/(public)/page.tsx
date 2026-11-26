import Image from "next/image";
import Link from "next/link";

const priorities = [
  {
    title: "Stay connected",
    description: "Reconnect with classmates and build stronger ties across our alumni community."
  },
  {
    title: "Give back",
    description: "Support students and young alumni through mentorship, scholarships, and service."
  },
  {
    title: "Keep our story alive",
    description: "Preserve the memories, traditions, and achievements that unite generations."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[min(680px,78vh)] overflow-hidden bg-(--primary)">
        <Image
          src="/images/school.jpg"
          alt="Holy Ghost College Owerri"
          fill
          priority
          quality={78}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00113a]/90 via-[#00113a]/65 to-[#00113a]/20" />
        <div className="relative mx-auto flex min-h-[min(680px,78vh)] max-w-7xl items-center px-5 py-20 md:px-8">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
              Holy Ghost College Owerri
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              One school. A lifetime of brotherhood.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Welcome to the Old Boys&apos; Association — bringing generations together to reconnect,
              support one another, and give back to our school.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="btn-primary rounded-lg px-5 py-3 text-sm font-bold"
              >
                Join the community
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-white/60 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" aria-labelledby="oldboys-film-heading">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Our school, our story</p>
            <h2 id="oldboys-film-heading" className="mt-3 text-3xl font-black text-(--primary) md:text-4xl">
              A look back at where it all began
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Relive the memories and spirit of Holy Ghost College Owerri. This film is here for every
              Old Boy to watch and share.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
            <video
              className="aspect-video w-full"
              controls
              playsInline
              preload="none"
              poster="/images/group_pic.jpg"
              aria-label="Holy Ghost College Owerri Old Boys"
            >
              <source src="/videos/oldboys.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8ff] py-16 md:py-20" aria-labelledby="association-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Stronger together</p>
            <h2 id="association-heading" className="mt-3 text-3xl font-black text-(--primary) md:text-4xl">
              What brings us together
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {priorities.map((priority, index) => (
              <article key={priority.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff4d1] text-sm font-black text-(--primary)">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold text-(--primary)">{priority.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{priority.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl rounded-2xl bg-(--primary) px-6 py-10 text-center text-white md:px-12 md:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Your place in the story</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black md:text-4xl">
            Reconnect with the people who will always feel like family.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Find your community, share your story, and help build a lasting legacy for the next generation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="btn-primary rounded-lg px-5 py-3 text-sm font-bold">
              Become a member
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/50 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
