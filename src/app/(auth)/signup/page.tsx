import type { Metadata } from "next";
import { SignupForm } from "@/components/forms/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your alumni account. Accounts require admin approval before full access."
};

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-14 md:px-8">
      <h1 className="text-3xl font-black text-(--primary)">Join Old Boy's Association</h1>
      <p className="mt-2 text-sm text-slate-600">Holy Ghost College Owerri alumni registration.</p>
      <div className="mt-6">
        <SignupForm />
      </div>
    </main>
  );
}
