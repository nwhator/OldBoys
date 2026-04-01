import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAllBlogPosts, getAllElections, getAllPayments, getPendingUsers } from "@/lib/data";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [pendingUsers, elections, posts, payments] = await Promise.all([
    getPendingUsers(),
    getAllElections(),
    getAllBlogPosts(),
    getAllPayments()
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Admin Dashboard</h1>
      <p className="mt-2 text-slate-600">Old Boys' Association management console.</p>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Pending Users</p>
          <p className="mt-2 text-3xl font-black text-(--primary)">{pendingUsers.length}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Elections</p>
          <p className="mt-2 text-3xl font-black text-(--primary)">{elections.length}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Blog Posts</p>
          <p className="mt-2 text-3xl font-black text-(--primary)">{posts.length}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Payments</p>
          <p className="mt-2 text-3xl font-black text-(--primary)">{payments.length}</p>
        </article>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/admin/approvals" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage User Approvals</Link>
        <Link href="/admin/member-management" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage Members</Link>
        <Link href="/admin/elections" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage Elections</Link>
        <Link href="/admin/elections/setup" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Election Setup</Link>
        <Link href="/admin/elections/center" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Election Center</Link>
        <Link href="/admin/candidates" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage Candidates</Link>
        <Link href="/admin/blog" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage Blog</Link>
        <Link href="/admin/leadership" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage Leadership</Link>
        <Link href="/admin/gallery" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage Gallery</Link>
        <Link href="/admin/email-templates" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage Email Templates</Link>
        <Link href="/admin/audit-settings" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Manage Audit Settings</Link>
        <Link href="/admin/payments" className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-(--primary)">Track Payments</Link>
      </section>
    </main>
  );
}
