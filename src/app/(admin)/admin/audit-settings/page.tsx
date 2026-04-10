import { saveAuditSetting, saveAuditSettingsBulk } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getAuditSettings } from "@/lib/data";
import CopyButton from "@/components/ui/CopyButton";
import CopyAllButton from "@/components/ui/CopyAllButton";
import FlashMessage from "@/components/ui/FlashMessage";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function AdminAuditSettingsPage({ searchParams }: Props) {
  await requireAdmin();
  const settings = await getAuditSettings();
  const updated = typeof searchParams?.updated === "string" ? searchParams?.updated : undefined;
  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value ?? "";
  const bankName = getSetting("payments.bank_name");
  const accountName = getSetting("payments.account_name");
  const accountNumber = getSetting("payments.account_number");

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Audit Settings</h1>
      <section className="mt-8 space-y-4">
        {updated === "payments" && (
          <div className="mb-2">
            <FlashMessage message="Payment account details saved." />
          </div>
        )}
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold">Payment Account Details</h2>
          <p className="mt-1 text-sm text-slate-600">Edit the bank details members should use to pay dues.</p>
          <form action={saveAuditSettingsBulk} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr]">
            <div>
              <label className="text-xs text-slate-500">Bank name</label>
              <div className="mt-1 flex items-center">
                <input name="bank_name" defaultValue={bankName} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                <CopyButton value={bankName} ariaLabel="Copy bank name" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500">Account name</label>
              <div className="mt-1 flex items-center">
                <input name="account_name" defaultValue={accountName} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                <CopyButton value={accountName} ariaLabel="Copy account name" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-slate-500">Account number</label>
              <div className="mt-1 flex items-center">
                <input name="account_number" defaultValue={accountNumber} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                <CopyButton value={accountNumber} ariaLabel="Copy account number" />
              </div>
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <button type="submit" className="rounded bg-(--primary) px-3 py-2 text-xs font-bold uppercase tracking-wider text-white">Save payment details</button>
              <CopyAllButton value={`${bankName} | ${accountName} | ${accountNumber}`} ariaLabel="Copy all payment details" />
            </div>
          </form>
        </article>

        {settings.filter((s) => !s.key.startsWith("payments."))
          .map((setting) => (
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
