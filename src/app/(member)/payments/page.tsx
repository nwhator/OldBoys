import { createPaymentRecord } from "@/lib/actions";
import { requireApprovedMember } from "@/lib/auth";
import { getMemberPayments, getAuditSettings } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import CopyButton from "@/components/ui/CopyButton";
import CopyAllButton from "@/components/ui/CopyAllButton";
import FlashMessage from "@/components/ui/FlashMessage";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function MemberPaymentsPage({ searchParams }: Props) {
  const profile = await requireApprovedMember();
  const payments = await getMemberPayments(profile.id);
  const auditSettings = await getAuditSettings();
  const getSetting = (key: string) => auditSettings.find((s) => s.key === key)?.value ?? null;
  const bankName = getSetting("payments.bank_name") ?? "First Bank PLC";
  const accountName = getSetting("payments.account_name") ?? "Old Boys' Association";
  const accountNumber = getSetting("payments.account_number") ?? "0123456789";
  const created = typeof searchParams?.created === "string" ? searchParams.created : undefined;
  const ref = typeof searchParams?.ref === "string" ? searchParams.ref : undefined;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Pay Dues</h1>
      <p className="mt-2 text-slate-600">Payment gateway integration can be connected later (Flutterwave-ready structure).</p>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Payment Instructions</h2>
        <p className="mt-2 text-sm text-slate-600">Please transfer your dues to the account below, then confirm the payment so admins can verify and mark it as received.</p>

        {created === "1" && (
          <div className="mb-3">
            <FlashMessage message={`Payment record created (ref: ${ref ?? "—"}). Admin will confirm shortly.`} />
          </div>
        )}

        <div className="mt-4 grid gap-2 md:max-w-md">
            <div className="rounded-md border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">Bank</p>
            <div className="flex items-center">
              <p className="font-semibold">{bankName}</p>
              <CopyButton value={bankName} ariaLabel="Copy bank name" />
            </div>
            <p className="text-xs text-slate-500 mt-2">Account name</p>
            <div className="flex items-center">
              <p className="font-semibold">{accountName}</p>
              <CopyButton value={accountName} ariaLabel="Copy account name" />
            </div>
            <p className="text-xs text-slate-500 mt-2">Account number</p>
            <div className="flex items-center">
              <p className="font-semibold">{accountNumber}</p>
              <CopyButton value={accountNumber} ariaLabel="Copy account number" />
            </div>
            <div className="mt-2">
              <CopyAllButton value={`${bankName} | ${accountName} | ${accountNumber}`} ariaLabel="Copy all payment details" />
            </div>
          </div>

          <form action={createPaymentRecord} className="mt-2 flex flex-col gap-3 md:max-w-xs">
            <input name="amount" type="number" min="100" step="100" required placeholder="Amount (NGN)" className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="payer_reference" placeholder="Bank transaction reference (optional)" pattern="[A-Za-z0-9._-]{4,64}" title="Alphanumeric, 4-64 characters (.-_)" className="rounded-md border border-slate-300 px-3 py-2" />
            <div className="flex items-center gap-2">
              <button type="submit" className="rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                I have paid — Confirm
              </button>
              <CopyAllButton value={`${bankName} | ${accountName} | ${accountNumber}`} ariaLabel="Copy all payment details" />
            </div>
          </form>
        </div>
      </section>

      <section className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-600">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{payment.reference}</td>
                <td className="px-4 py-3">{formatCurrency(payment.amount)}</td>
                <td className="px-4 py-3 capitalize">{payment.status}</td>
                <td className="px-4 py-3">{new Date(payment.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">No payment history yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
