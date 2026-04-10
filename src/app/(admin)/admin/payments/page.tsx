import { requireAdmin } from "@/lib/auth";
import { getAllPayments } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { confirmPayment } from "@/lib/actions";
import FlashMessage from "@/components/ui/FlashMessage";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function AdminPaymentsPage({ searchParams }: Props) {
  await requireAdmin();
  const payments = await getAllPayments();
  const confirmed = typeof searchParams?.confirmed === "string" ? searchParams.confirmed : undefined;
  const tx = typeof searchParams?.tx === "string" ? searchParams.tx : undefined;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Payment Tracking</h1>
      {confirmed === "1" && tx && (
        <div className="mt-4">
          <FlashMessage message={`Payment confirmed — transaction code: ${tx}`} />
        </div>
      )}

      <section className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-600">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">User Id</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{payment.reference}</td>
                <td className="px-4 py-3">{payment.user_id}</td>
                <td className="px-4 py-3">{formatCurrency(payment.amount)}</td>
                <td className="px-4 py-3 capitalize">{payment.status}</td>
                <td className="px-4 py-3">{new Date(payment.created_at).toLocaleString()}</td>
                <td className="px-4 py-3">
                  {payment.status === "pending" ? (
                    <form action={confirmPayment}>
                      <input type="hidden" name="id" value={payment.id} />
                      <button type="submit" className="rounded bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Confirm</button>
                    </form>
                  ) : (
                    <div className="text-sm">
                      <div className="font-medium">{payment.transaction_code ?? "—"}</div>
                      {payment.payer_reference && <div className="text-xs text-slate-500">Payer ref: {payment.payer_reference}</div>}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">No payment records.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
