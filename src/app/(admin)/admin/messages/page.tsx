import { updateContactMessageStatus } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getContactMessages } from "@/lib/data";

export default async function AdminMessagesPage() {
  await requireAdmin();
  const messages = await getContactMessages();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Contact Messages</h1>

      <section className="mt-8 space-y-4">
        {messages.map((message) => (
          <article key={message.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-(--primary)">{message.subject}</p>
                <p className="text-xs text-slate-500">{message.name} ({message.email})</p>
              </div>
              <form action={updateContactMessageStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={message.id} />
                <select name="status" defaultValue={message.status} className="rounded border border-slate-300 px-2 py-1 text-xs">
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="archived">Archived</option>
                </select>
                <button type="submit" className="rounded bg-(--primary) px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Save</button>
              </form>
            </div>
            <p className="mt-3 text-sm text-slate-700">{message.message}</p>
          </article>
        ))}
        {messages.length === 0 && <p className="text-sm text-slate-500">No messages yet.</p>}
      </section>
    </main>
  );
}
