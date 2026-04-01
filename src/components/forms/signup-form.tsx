"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function SignupForm() {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(formData: FormData) {
		setLoading(true);
		setError(null);
		setSuccess(null);

		const fullName = String(formData.get("full_name") ?? "").trim();
		const email = String(formData.get("email") ?? "").trim();
		const password = String(formData.get("password") ?? "");

		const supabase = createSupabaseBrowserClient();
		const { error: signUpError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					full_name: fullName
				}
			}
		});

		if (signUpError) {
			setError(signUpError.message);
			setLoading(false);
			return;
		}

		setSuccess("Signup successful. Your account is pending admin approval.");
		setLoading(false);
	}

	return (
		<form action={handleSubmit} className="space-y-4 rounded-xl bg-white/80 p-6 shadow-sm">
			<div>
				<label htmlFor="full_name" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">
					Full name
				</label>
				<input id="full_name" name="full_name" required className="w-full rounded-md border border-slate-200 px-3 py-2" />
			</div>
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
				<input id="password" name="password" type="password" minLength={8} required className="w-full rounded-md border border-slate-200 px-3 py-2" />
			</div>
			{error && <p className="text-sm text-red-700">{error}</p>}
			{success && <p className="text-sm text-emerald-700">{success}</p>}
			<button disabled={loading} className="w-full rounded-md bg-(--primary) px-4 py-2 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-70" type="submit">
				{loading ? "Creating account..." : "Create account"}
			</button>
			<p className="text-center text-sm text-slate-600">
				Already have an account? <Link href="/login" className="font-semibold text-(--primary)">Sign in</Link>
			</p>
		</form>
	);
}
