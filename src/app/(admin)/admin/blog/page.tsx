import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";
import { getAllBlogPosts } from "@/lib/data";

export default async function AdminBlogPage() {
  await requireAdmin();
  const posts = await getAllBlogPosts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Blog Management</h1>

      <section className="mt-6 editorial-card rounded-xl p-5">
        <h2 className="text-xl font-bold text-(--primary)">Create Post</h2>
        <form action={createBlogPost} className="mt-4 grid gap-3">
          <input name="title" required placeholder="Title" className="rounded-md border border-slate-300 px-3 py-2" />
          <input name="slug" placeholder="Slug (optional)" className="rounded-md border border-slate-300 px-3 py-2" />
          <input name="featured_image_url" placeholder="Featured image URL" className="rounded-md border border-slate-300 px-3 py-2" />
          <textarea name="content" required rows={6} placeholder="Markdown or rich text content" className="rounded-md border border-slate-300 px-3 py-2" />
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="published" /> Publish now
          </label>
          <button type="submit" className="w-fit rounded-md bg-(--primary) px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Create Post</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <form action={updateBlogPost} className="grid gap-3">
              <input type="hidden" name="id" value={post.id} />
              <input name="title" defaultValue={post.title} className="rounded-md border border-slate-300 px-3 py-2" />
              <textarea name="content" defaultValue={post.content} rows={5} className="rounded-md border border-slate-300 px-3 py-2" />
              <select name="published" defaultValue={post.published ? "true" : "false"} className="w-fit rounded-md border border-slate-300 px-3 py-2">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="rounded bg-(--primary) px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Save</button>
              </div>
            </form>
            <form action={deleteBlogPost} className="mt-3">
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" className="rounded bg-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Delete</button>
            </form>
          </article>
        ))}
        {posts.length === 0 && <p className="text-sm text-slate-500">No posts yet.</p>}
      </section>
    </main>
  );
}
