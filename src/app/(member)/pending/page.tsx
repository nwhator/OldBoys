import { requireAuth } from "@/lib/auth";

export default async function PendingApprovalPage() {
  const profile = await requireAuth();

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-black text-(--primary)">Approval Pending</h1>
      <p className="mt-4 text-slate-700">
        Hi {profile.full_name}, your account is awaiting admin approval. You will gain access to dashboard, voting, and payments once approved.
      </p>
    </main>
  );
}
