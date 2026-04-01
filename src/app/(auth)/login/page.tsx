import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to the Old Boys' Association portal."
};

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-(--primary)">Member Login</h1>
      <p className="mt-2 text-sm text-slate-600">Holy Ghost College Owerri - Old Boys' Association</p>
      <div className="mt-6">
        <LoginForm />
      </div>
      <p className="mt-4 text-sm text-slate-600">
        New here? <Link href="/signup" className="font-semibold text-(--primary)">Create an account</Link>
      </p>
    </main>
  );
}
