"use client";

import { useState, useTransition } from "react";
import { submitContactMessage } from "@/lib/actions";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await submitContactMessage(formData);
      if (!result?.ok) {
        setError(result?.error ?? "Unable to send message.");
        return;
      }
      setSuccess("Message sent successfully. The association team will respond shortly.");
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Name</label>
          <input id="name" name="name" required className="w-full rounded-md border border-slate-200 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Email</label>
          <input id="email" name="email" type="email" required className="w-full rounded-md border border-slate-200 px-3 py-2" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Subject</label>
        <input id="subject" name="subject" required className="w-full rounded-md border border-slate-200 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Message</label>
        <textarea id="message" name="message" rows={6} required className="w-full rounded-md border border-slate-200 px-3 py-2" />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {success && <p className="text-sm text-emerald-700">{success}</p>}
      <button disabled={pending} className="rounded-md bg-(--primary) px-5 py-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-70" type="submit">
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
