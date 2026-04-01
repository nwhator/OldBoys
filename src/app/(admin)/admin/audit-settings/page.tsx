import { saveAuditSetting } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getAuditSettings } from "@/lib/data";

export default async function AdminAuditSettingsPage() {
  await requireAdmin();
  const settings = await getAuditSettings();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Audit Settings</h1>
      <section className="mt-8 space-y-4">
        {settings.map((setting) => (
          <article key={setting.key} className="rounded-xl border border-slate-200 bg-white p-5">
            <form action={saveAuditSetting} className="grid gap-3 md:grid-cols-[1fr_2fr_auto] md:items-center">
              <input name="key" defaultValue={setting.key} readOnly className="rounded border border-slate-300 bg-slate-100 px-3 py-2 text-sm" />
              <input name="value" defaultValue={setting.value} className="rounded border border-slate-300 px-3 py-2 text-sm" />
              <button type="submit" className="rounded bg-(--primary) px-3 py-2 text-xs font-bold uppercase tracking-wider text-white">Save</button>
            </form>
          </article>
        ))}
        {settings.length === 0 && <p className="text-sm text-slate-500">No settings found.</p>}
      </section>
    </main>
  );
}
