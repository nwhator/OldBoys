import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Old Boys' Association."
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-8">
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Reach Out</p>
          <h1 className="mt-3 text-4xl font-black text-(--primary) md:text-6xl">Contact Us</h1>
          <p className="mt-4 text-slate-700 md:text-lg">
            Contact the association secretariat for membership, events, partnerships, and support.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-700">
            <p><strong>Email:</strong> contact@oldboys-hgco.org</p>
            <p><strong>Phone:</strong> +234 (0) 802 123 4567</p>
            <p><strong>Location:</strong> Owerri, Imo State, Nigeria</p>
          </div>
        </div>
        <ContactForm />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <article className="rounded-xl bg-(--primary) p-6 text-white lg:col-span-1">
          <h2 className="text-2xl font-black">Secretariat Office</h2>
          <p className="mt-3 text-sm text-white/85">Heritage House, Secretariat Desk, Holy Ghost College Owerri alumni complex.</p>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-amber-300">Office Hours</p>
          <p className="mt-1 text-sm text-white/85">Mon - Fri, 9:00am - 4:00pm</p>
        </article>
        <article className="overflow-hidden rounded-xl lg:col-span-2">
          <div className="relative h-72">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              alt="Alumni secretariat"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        </article>
      </section>
    </main>
  );
}
