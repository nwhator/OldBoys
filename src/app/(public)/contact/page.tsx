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
            <p><strong>Location:</strong> Owerri, Imo State, Nigeria</p>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
