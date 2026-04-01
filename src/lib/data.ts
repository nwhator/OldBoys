import type {
  AuditSetting,
  BlogPost,
  Candidate,
  ContactMessage,
  Election,
  EmailTemplate,
  GalleryItem,
  LeadershipProfile,
  Payment,
  Position,
  Profile
} from "@/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getPublishedBlogPosts() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .returns<BlogPost[]>();

  return data ?? [];
}

export async function getLatestPublishedBlogPosts(limit = 3) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<BlogPost[]>();

  return data ?? [];
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single<BlogPost>();

  return data ?? null;
}

export async function getActiveElectionBundle() {
  const supabase = await createSupabaseServerClient();
  const now = new Date().toISOString();

  const { data: election } = await supabase
    .from("elections")
    .select("*")
    .lte("starts_at", now)
    .gte("ends_at", now)
    .eq("is_active", true)
    .order("starts_at", { ascending: false })
    .limit(1)
    .single<Election>();

  if (!election) {
    return null;
  }

  const { data: positions } = await supabase
    .from("positions")
    .select("*")
    .eq("election_id", election.id)
    .order("sort_order", { ascending: true })
    .returns<Position[]>();

  const { data: candidates } = await supabase
    .from("candidates")
    .select("*")
    .in(
      "position_id",
      (positions ?? []).map((p: Position) => p.id)
    )
    .returns<Candidate[]>();

  return {
    election,
    positions: positions ?? [],
    candidates: candidates ?? []
  };
}

export async function getPendingUsers() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("membership_status", "pending")
    .order("created_at", { ascending: true })
    .returns<Profile[]>();

  return data ?? [];
}

export async function getAllUsers() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("users").select("*").order("created_at", { ascending: false }).returns<Profile[]>();
  return data ?? [];
}

export async function getMemberPayments(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<Payment[]>();

  return data ?? [];
}

export async function getVotesByUserInElection(userId: string, electionId: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("votes")
    .select("position_id,candidate_id")
    .eq("user_id", userId)
    .eq("election_id", electionId);

  return data ?? [];
}

export async function getAllElections() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("elections").select("*").order("created_at", { ascending: false }).returns<Election[]>();
  return data ?? [];
}

export async function getAllPayments() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("payments").select("*").order("created_at", { ascending: false }).returns<Payment[]>();
  return data ?? [];
}

export async function getAllBlogPosts() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).returns<BlogPost[]>();
  return data ?? [];
}

export async function getContactMessages() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<ContactMessage[]>();

  return data ?? [];
}

export async function getLeadershipProfiles(isPublic = false) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("leadership_profiles").select("*");

  if (isPublic) {
    query = query.eq("is_active", true);
  }

  const { data } = await query.order("sort_order", { ascending: true }).returns<LeadershipProfile[]>();
  return data ?? [];
}

export async function getGalleryItems(isPublic = false) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("gallery_items").select("*");

  if (isPublic) {
    query = query.eq("is_published", true);
  }

  const { data } = await query.order("sort_order", { ascending: true }).returns<GalleryItem[]>();
  return data ?? [];
}

export async function getAuditSettings() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("audit_settings").select("*").order("key", { ascending: true }).returns<AuditSetting[]>();
  return data ?? [];
}

export async function getEmailTemplates() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("email_templates").select("*").order("name", { ascending: true }).returns<EmailTemplate[]>();
  return data ?? [];
}
