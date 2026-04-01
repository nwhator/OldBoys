import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Access",
  description: "Recover account access for Old Boys' Association portal."
};

export default function ResetAccessPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-(--primary)">Reset Access</h1>
      <p className="mt-2 text-sm text-slate-600">
        For now, password recovery is handled by Supabase auth email recovery flow.
      </p>
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-700">Please return to login and use the recovery option.</p>
        <Link href="/login" className="mt-4 inline-block rounded bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
          Back to Login
        </Link>
      </div>
    </main>
  );
}
