import { createPaymentRecord } from "@/lib/actions";
import { requireApprovedMember } from "@/lib/auth";
import { getMemberPayments } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default async function MemberPaymentsPage() {
  const profile = await requireApprovedMember();
  const payments = await getMemberPayments(profile.id);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Pay Dues</h1>
      <p className="mt-2 text-slate-600">Payment gateway integration can be connected later (Flutterwave-ready structure).</p>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Create Dues Payment</h2>
        <form action={createPaymentRecord} className="mt-4 flex flex-col gap-3 md:max-w-xs">
          <input name="amount" type="number" min="100" step="100" required placeholder="Amount (NGN)" className="rounded-md border border-slate-300 px-3 py-2" />
          <button type="submit" className="rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
            Save Payment Record
          </button>
        </form>
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
