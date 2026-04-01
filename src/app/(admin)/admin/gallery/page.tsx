import { createGalleryItem } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getGalleryItems } from "@/lib/data";

export default async function AdminGalleryPage() {
  await requireAdmin();
  const items = await getGalleryItems();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Gallery Management</h1>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Add Gallery Item</h2>
        <form action={createGalleryItem} className="mt-4 grid gap-3 lg:max-w-2xl">
          <input name="title" required placeholder="Title" className="rounded border border-slate-300 px-3 py-2" />
          <input name="image_url" required placeholder="Image URL" className="rounded border border-slate-300 px-3 py-2" />
          <input name="event_date" type="date" className="rounded border border-slate-300 px-3 py-2" />
          <textarea name="caption" rows={3} placeholder="Caption" className="rounded border border-slate-300 px-3 py-2" />
          <input name="sort_order" type="number" min="1" defaultValue="1" className="rounded border border-slate-300 px-3 py-2" />
          <input type="hidden" name="is_published" value="true" />
          <button type="submit" className="w-fit rounded bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Add</button>
        </form>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-(--primary)">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.caption ?? "-"}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
