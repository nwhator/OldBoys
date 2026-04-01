import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getEmailTemplates } from "@/lib/data";
import { sendEmailHook } from "@/lib/email/sender";
import { renderEmailTemplate } from "@/lib/email/templates";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminEmailTemplatesPage() {
  await requireAdmin();
  const templates = await getEmailTemplates();

  async function saveEmailTemplateAction(formData: FormData): Promise<void> {
    "use server";
    await requireAdmin();

    const id = String(formData.get("id") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const body = String(formData.get("body") ?? "").trim();
    const isActive = String(formData.get("is_active") ?? "false") === "true";

    if (!name || !subject || !body) {
      return;
    }

    const supabase = await createSupabaseServerClient();
    if (id) {
      await supabase.from("email_templates").update({ name, subject, body, is_active: isActive }).eq("id", id);
    } else {
      await supabase.from("email_templates").insert({ name, subject, body, is_active: isActive });
    }

    revalidatePath("/admin/email-templates");
  }

  async function sendTemplatedEmailAction(formData: FormData): Promise<void> {
    "use server";
    await requireAdmin();

    const to = String(formData.get("to") ?? "").trim();
    const templateName = String(formData.get("template_name") ?? "").trim();
    const recipientName = String(formData.get("recipient_name") ?? "Member").trim();

    if (!to || !templateName) {
      return;
    }

    const supabase = await createSupabaseServerClient();
    const { data: template } = await supabase
      .from("email_templates")
      .select("subject,body,is_active")
      .eq("name", templateName)
      .single<{ subject: string; body: string; is_active: boolean }>();

    const fileTemplate = renderEmailTemplate(templateName, recipientName);
    if (!template && !fileTemplate) {
      return;
    }

    const useDbTemplate = Boolean(template?.is_active);
    const useFileTemplate = Boolean(fileTemplate);
    if (!useDbTemplate && !useFileTemplate) {
      return;
    }

    const subject = useDbTemplate
      ? template!.subject.replaceAll("{{name}}", recipientName)
      : fileTemplate!.subject;
    const html = useDbTemplate
      ? template!.body.replaceAll("{{name}}", recipientName)
      : fileTemplate!.html;

    await sendEmailHook({ to, subject, html });
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Email Templates</h1>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Create Template</h2>
        <form action={saveEmailTemplateAction} className="mt-4 grid gap-3">
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
            <form action={saveEmailTemplateAction} className="grid gap-3">
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
        <form action={sendTemplatedEmailAction} className="mt-4 grid gap-3 lg:max-w-xl">
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
