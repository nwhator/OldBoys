"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, requireApprovedMember } from "@/lib/auth";
import { sendEmailHook } from "@/lib/email/sender";
import { renderEmailTemplate } from "@/lib/email/templates";
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
  revalidatePath("/admin/elections/setup");
  revalidatePath("/admin/elections/center");
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
  revalidatePath("/admin/elections/setup");
  revalidatePath("/admin/elections/center");
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
  revalidatePath("/admin/elections/center");
  revalidatePath("/voting");
}

export async function createManagedMember(formData: FormData) {
  await requireAdmin();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "member");
  const membershipStatus = String(formData.get("membership_status") ?? "pending");

  if (!fullName || !email || !password || !["admin", "member"].includes(role) || !["pending", "approved", "rejected"].includes(membershipStatus)) {
    return;
  }

  const adminClient = createSupabaseAdminClient();
  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName
    }
  });

  if (error || !data.user) {
    return;
  }

  await adminClient
    .from("users")
    .update({
      full_name: fullName,
      role,
      membership_status: membershipStatus
    })
    .eq("id", data.user.id);

  revalidatePath("/admin/member-management");
  revalidatePath("/admin/approvals");
}

export async function updateManagedMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();
  const role = String(formData.get("role") ?? "member");
  const membershipStatus = String(formData.get("membership_status") ?? "pending");

  if (!id || !fullName || !["admin", "member"].includes(role) || !["pending", "approved", "rejected"].includes(membershipStatus)) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("users")
    .update({
      full_name: fullName,
      role,
      membership_status: membershipStatus
    })
    .eq("id", id);

  revalidatePath("/admin/member-management");
  revalidatePath("/admin/approvals");
}

export async function deleteManagedMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const adminClient = createSupabaseAdminClient();
  await adminClient.auth.admin.deleteUser(id);

  revalidatePath("/admin/member-management");
  revalidatePath("/admin/approvals");
}

export async function setElectionActive(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const isActive = String(formData.get("is_active") ?? "false") === "true";

  if (!id) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("elections").update({ is_active: isActive }).eq("id", id);

  revalidatePath("/admin/elections");
  revalidatePath("/admin/elections/center");
  revalidatePath("/voting");
}

export async function saveAuditSetting(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();

  if (!key) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("audit_settings").upsert({ key, value }, { onConflict: "key" });
  revalidatePath("/admin/audit-settings");
}

export async function saveEmailTemplate(formData: FormData): Promise<void> {
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

export async function createLeadershipProfile(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 1);
  const isActive = String(formData.get("is_active") ?? "true") === "true";

  if (!name || !title) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("leadership_profiles").insert({
    name,
    title,
    bio: bio || null,
    image_url: imageUrl || null,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 1,
    is_active: isActive
  });

  revalidatePath("/leadership");
  revalidatePath("/admin/leadership");
}

export async function createGalleryItem(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim();
  const eventDate = String(formData.get("event_date") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 1);
  const isPublished = String(formData.get("is_published") ?? "true") === "true";

  if (!title || !imageUrl) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("gallery_items").insert({
    title,
    image_url: imageUrl,
    caption: caption || null,
    event_date: eventDate || null,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 1,
    is_published: isPublished
  });

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function castVote(formData: FormData) {
  const profile = await requireApprovedMember();
  if (!profile) {
    return;
  }
  const profileId = profile.id;

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
    user_id: profileId
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
  if (!profile) {
    return;
  }
  const profileId = profile.id;
  const amount = Number(formData.get("amount") ?? 0);

  if (!Number.isFinite(amount) || amount <= 0) {
    return;
  }

  const reference = `dues_${Date.now()}_${profileId.slice(0, 8)}`;
  const supabase = await createSupabaseServerClient();

  await supabase.from("payments").insert({
    user_id: profileId,
    amount,
    status: "pending",
    reference
  });

  revalidatePath("/payments");
  revalidatePath("/admin/payments");
}

export async function updateOwnProfile(formData: FormData) {
  const profile = await requireApprovedMember();
  const graduationSetInput = String(formData.get("graduation_set") ?? "").trim();
  const graduationSet = graduationSetInput ? graduationSetInput.slice(0, 32) : null;
  const avatarFile = formData.get("avatar");
  let avatarUrl = profile.avatar_url;

  if (avatarFile instanceof File && avatarFile.size > 0) {
    if (!avatarFile.type.startsWith("image/")) {
      redirect("/profile?error=avatar_type");
    }

    if (avatarFile.size > 5 * 1024 * 1024) {
      redirect("/profile?error=avatar_size");
    }

    const admin = createSupabaseAdminClient();
    const arrayBuffer = await avatarFile.arrayBuffer();
    const safeName = avatarFile.name.replace(/[^a-zA-Z0-9.-]/g, "-");
    const storagePath = `avatars/${profile.id}/${Date.now()}-${safeName}`;

    const { data, error } = await admin.storage.from("media").upload(storagePath, arrayBuffer, {
      contentType: avatarFile.type || "application/octet-stream",
      upsert: false
    });

    if (error || !data) {
      redirect("/profile?error=avatar_upload");
    }

    avatarUrl = admin.storage.from("media").getPublicUrl(data.path).data.publicUrl;
  }

  const admin = createSupabaseAdminClient();
  await admin
    .from("users")
    .update({
      avatar_url: avatarUrl,
      graduation_set: graduationSet
    })
    .eq("id", profile.id);

  revalidatePath("/profile");
  revalidatePath("/");
  revalidatePath("/community");
  redirect("/profile?updated=profile");
}

export async function changeOwnPassword(formData: FormData) {
  await requireApprovedMember();
  const password = String(formData.get("new_password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (password.length < 8) {
    redirect("/profile?error=password_length");
  }

  if (password !== confirmPassword) {
    redirect("/profile?error=password_mismatch");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect("/profile?error=password_update");
  }

  redirect("/profile?updated=password");
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

export async function submitContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    return { ok: false, error: "All fields are required." };
  }

  if (!email.includes("@")) {
    return { ok: false, error: "Please enter a valid email." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject,
    message,
    status: "new"
  });

  if (error) {
    return { ok: false, error: "Unable to send message right now." };
  }

  revalidatePath("/contact");
  revalidatePath("/admin/messages");
  return { ok: true };
}

export async function updateContactMessageStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "new");

  if (!id || !["new", "read", "archived"].includes(status)) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from("contact_messages").update({ status }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function sendTemplatedEmail(formData: FormData): Promise<void> {
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
  const result = await sendEmailHook({ to, subject, html });
  if (!result.ok) {
    return;
  }
}
