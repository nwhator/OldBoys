"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, requireApprovedMember } from "@/lib/auth";
import { toSlug } from "@/lib/utils";

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function approveUser(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("user_id") ?? "");
  const status = String(formData.get("status") ?? "approved");

  const supabase = await createSupabaseServerClient();
  await supabase.from("users").update({ membership_status: status }).eq("id", userId);

  revalidatePath("/admin/approvals");
}

export async function createElection(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const startsAt = String(formData.get("starts_at") ?? "");
  const endsAt = String(formData.get("ends_at") ?? "");

  if (!title || !startsAt || !endsAt) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("elections").insert({
    title,
    starts_at: startsAt,
    ends_at: endsAt,
    is_active: true
  });

  revalidatePath("/admin/elections");
}

export async function createPosition(formData: FormData) {
  await requireAdmin();
  const electionId = String(formData.get("election_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 1);

  if (!electionId || !name) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("positions").insert({
    election_id: electionId,
    name,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 1
  });

  revalidatePath("/admin/candidates");
  revalidatePath("/admin/elections");
}

export async function createCandidate(formData: FormData) {
  await requireAdmin();
  const positionId = String(formData.get("position_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const manifesto = String(formData.get("manifesto") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();

  if (!positionId || !name) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("candidates").insert({
    position_id: positionId,
    name,
    manifesto: manifesto || null,
    image_url: imageUrl || null
  });

  revalidatePath("/admin/candidates");
  revalidatePath("/voting");
}

export async function castVote(formData: FormData) {
  const profile = await requireApprovedMember();

  const electionId = String(formData.get("election_id") ?? "");
  const positionId = String(formData.get("position_id") ?? "");
  const candidateId = String(formData.get("candidate_id") ?? "");

  if (!electionId || !positionId || !candidateId) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("votes").insert({
    election_id: electionId,
    position_id: positionId,
    candidate_id: candidateId,
    user_id: profile.id
  });

  if (error) {
    // Unique constraint rejects duplicate vote per position for this user.
    if ((error as { code?: string }).code === "23505") {
      return;
    }
    return;
  }

  revalidatePath("/voting");
}

export async function createPaymentRecord(formData: FormData) {
  const profile = await requireApprovedMember();
  const amount = Number(formData.get("amount") ?? 0);

  if (!Number.isFinite(amount) || amount <= 0) {
    return;
  }

  const reference = `dues_${Date.now()}_${profile.id.slice(0, 8)}`;
  const supabase = await createSupabaseServerClient();

  await supabase.from("payments").insert({
    user_id: profile.id,
    amount,
    status: "pending",
    reference
  });

  revalidatePath("/payments");
  revalidatePath("/admin/payments");
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const featuredImageUrl = String(formData.get("featured_image_url") ?? "").trim();
  const published = String(formData.get("published") ?? "") === "on";

  if (!title || !content) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("blog_posts").insert({
    title,
    slug: toSlug(slugInput || title),
    content,
    featured_image_url: featuredImageUrl || null,
    published
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlogPost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = String(formData.get("published") ?? "");

  if (!id || !title || !content) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("blog_posts")
    .update({
      title,
      slug: toSlug(title),
      content,
      published: published === "true"
    })
    .eq("id", id);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("blog_posts").delete().eq("id", id);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function uploadImageToStorage(file: File, pathPrefix: string) {
  await requireAdmin();
  const admin = createSupabaseAdminClient();
  const arrayBuffer = await file.arrayBuffer();
  const fileName = `${pathPrefix}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const { data, error } = await admin.storage.from("media").upload(fileName, arrayBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false
  });

  if (error || !data) {
    return null;
  }

  const { data: publicData } = admin.storage.from("media").getPublicUrl(data.path);
  return publicData.publicUrl;
}
