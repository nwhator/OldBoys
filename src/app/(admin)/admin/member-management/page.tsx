import { createManagedMember, deleteManagedMember, updateManagedMember } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getAllUsers } from "@/lib/data";

export default async function AdminMemberManagementPage() {
  await requireAdmin();
  const users = await getAllUsers();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Member Management</h1>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Create Member</h2>
        <form action={createManagedMember} className="mt-4 grid gap-3 lg:max-w-2xl lg:grid-cols-2">
          <input name="full_name" required placeholder="Full name" className="rounded-md border border-slate-300 px-3 py-2" />
          <input name="email" type="email" required placeholder="Email" className="rounded-md border border-slate-300 px-3 py-2" />
          <input name="password" type="password" required minLength={8} placeholder="Temporary password" className="rounded-md border border-slate-300 px-3 py-2" />
          <select name="role" defaultValue="member" className="rounded-md border border-slate-300 px-3 py-2">
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <select name="membership_status" defaultValue="approved" className="rounded-md border border-slate-300 px-3 py-2">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button type="submit" className="w-fit rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Create</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {users.map((user) => (
          <article key={user.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <form action={updateManagedMember} className="grid gap-3 lg:grid-cols-4">
              <input type="hidden" name="id" value={user.id} />
              <input name="full_name" defaultValue={user.full_name} className="rounded-md border border-slate-300 px-3 py-2" />
              <select name="role" defaultValue={user.role} className="rounded-md border border-slate-300 px-3 py-2">
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <select name="membership_status" defaultValue={user.membership_status} className="rounded-md border border-slate-300 px-3 py-2">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button type="submit" className="rounded bg-(--primary) px-3 py-2 text-xs font-bold uppercase tracking-wider text-white">Save</button>
            </form>
            <form action={deleteManagedMember} className="mt-3">
              <input type="hidden" name="id" value={user.id} />
              <button type="submit" className="rounded bg-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Delete Member</button>
            </form>
          </article>
        ))}
      </section>
    </main>
  );
}
