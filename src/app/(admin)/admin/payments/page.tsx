import { requireAdmin } from "@/lib/auth";
import { getAllPayments } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default async function AdminPaymentsPage() {
  await requireAdmin();
  const payments = await getAllPayments();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Payment Tracking</h1>

      <section className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-600">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">User Id</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
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
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">No payment records.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
