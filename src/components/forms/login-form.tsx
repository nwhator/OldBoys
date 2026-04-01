"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const supabase = createSupabaseBrowserClient();

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-xl bg-white/80 p-6 shadow-sm">
      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">
          Email
        </label>
        <input id="email" name="email" type="email" required className="w-full rounded-md border border-slate-200 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-md border border-slate-200 px-3 py-2"
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        disabled={loading}
        className="w-full rounded-md bg-(--primary) px-4 py-2 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-70"
        type="submit"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
