import { saveEmailTemplate, sendTemplatedEmail } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getEmailTemplates } from "@/lib/data";

export default async function AdminEmailTemplatesPage() {
  await requireAdmin();
  const templates = await getEmailTemplates();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Email Templates</h1>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Create Template</h2>
        <form action={saveEmailTemplate} className="mt-4 grid gap-3">
          <input name="name" required placeholder="Template key (e.g. welcome)" className="rounded border border-slate-300 px-3 py-2" />
          <input name="subject" required placeholder="Subject (use {{name}} placeholder)" className="rounded border border-slate-300 px-3 py-2" />
          <textarea name="body" required rows={5} placeholder="HTML body" className="rounded border border-slate-300 px-3 py-2" />
          <input type="hidden" name="is_active" value="true" />
          <button type="submit" className="w-fit rounded bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Create</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {templates.map((template) => (
          <article key={template.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <form action={saveEmailTemplate} className="grid gap-3">
              <input type="hidden" name="id" value={template.id} />
              <input name="name" defaultValue={template.name} className="rounded border border-slate-300 px-3 py-2" />
              <input name="subject" defaultValue={template.subject} className="rounded border border-slate-300 px-3 py-2" />
              <textarea name="body" defaultValue={template.body} rows={4} className="rounded border border-slate-300 px-3 py-2" />
              <select name="is_active" defaultValue={template.is_active ? "true" : "false"} className="w-fit rounded border border-slate-300 px-3 py-2">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <button type="submit" className="w-fit rounded bg-(--primary) px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Save</button>
            </form>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-bold text-(--primary)">Send Test Email</h2>
        <form action={sendTemplatedEmail} className="mt-4 grid gap-3 lg:max-w-xl">
          <input name="to" type="email" required placeholder="Recipient email" className="rounded border border-slate-300 px-3 py-2" />
          <input name="recipient_name" placeholder="Recipient name" className="rounded border border-slate-300 px-3 py-2" />
          <select name="template_name" required className="rounded border border-slate-300 px-3 py-2">
            <option value="">Select template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.name}>{template.name}</option>
            ))}
          </select>
          <button type="submit" className="w-fit rounded bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Send</button>
        </form>
      </section>
    </main>
  );
}
