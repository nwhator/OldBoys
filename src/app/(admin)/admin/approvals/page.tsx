import { approveUser } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getPendingUsers } from "@/lib/data";

export default async function AdminApprovalsPage() {
  await requireAdmin();
  const pendingUsers = await getPendingUsers();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Member Approvals</h1>

      <section className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{user.full_name}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <form action={approveUser}>
                      <input type="hidden" name="user_id" value={user.id} />
                      <input type="hidden" name="status" value="approved" />
                      <button className="rounded bg-emerald-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white" type="submit">Approve</button>
                    </form>
                    <form action={approveUser}>
                      <input type="hidden" name="user_id" value={user.id} />
                      <input type="hidden" name="status" value="rejected" />
                      <button className="rounded bg-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white" type="submit">Reject</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {pendingUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">No pending users.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
