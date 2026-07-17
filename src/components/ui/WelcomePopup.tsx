"use client";

import { useEffect, useState } from "react";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("welcome-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleDismiss() {
    setOpen(false);
    localStorage.setItem("welcome-dismissed", "true");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl md:p-10">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close welcome message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-700">WELCOME &ndash; HGC OBA</p>
          <h2 className="mt-2 text-xl font-black text-(--primary) md:text-2xl">Prof. Martins Uchenna Nwankwo</h2>
          <p className="text-sm font-semibold text-slate-500">National President</p>
        </div>

        <p className="mb-4 text-center text-lg font-bold text-(--primary)">Welcome home.</p>

        <p className="mb-4 text-sm leading-relaxed text-slate-700">
          This is not just a website. It is a gathering place for every Old Boy of Holy Ghost College, Owerri &mdash; wherever you are in the world.
        </p>

        <p className="mb-4 text-sm leading-relaxed text-slate-700">
          We have won the election. Now we deliver.
        </p>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Our promise to you is CARDSOR:</p>

        <ul className="mb-4 space-y-1 text-sm text-slate-700">
          <li><span className="font-bold text-(--primary)">Account</span> &ndash; Every kobo tracked. Quarterly reports published.</li>
          <li><span className="font-bold text-(--primary)">Activate</span> &ndash; Global alumni. Reconnect international stakeholders.</li>
          <li><span className="font-bold text-(--primary)">Restore</span> &ndash; Institutional excellence. Return HOGOSCO to historic standards.</li>
          <li><span className="font-bold text-(--primary)">Dignify</span> &ndash; Infrastructure. Modern, dignified learning environments.</li>
          <li><span className="font-bold text-(--primary)">Serve</span> &ndash; Welfare of every alumnus. No old boy left behind.</li>
          <li><span className="font-bold text-(--primary)">Open</span> &ndash; Zero off-budget spending. Public project dashboard.</li>
          <li><span className="font-bold text-(--primary)">Renew</span> &ndash; HOGOSCO. From managing decline to rebuilding prestige.</li>
        </ul>

        <div className="border-t border-slate-200 pt-4 text-center">
          <p className="italic text-slate-600">
            &ldquo;I don&apos;t ask for your trust. I invite your audit.&rdquo;
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Explore. Engage. Hold us accountable.
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-(--primary)">Recta Sapere!</p>
          <p className="mt-4 text-xs text-slate-400">&mdash; Prof. Martins Uchenna Nwankwo</p>
        </div>
      </div>
    </div>
  );
}
