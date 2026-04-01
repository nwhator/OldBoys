import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";

export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single<Profile>();
  return profile ?? null;
}

export async function requireAuth() {
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login");
  }
  return profile;
}

export async function requireApprovedMember() {
  const profile = await requireAuth();
  if (profile.membership_status !== "approved") {
    redirect("/pending");
  }
  return profile;
}

export async function requireAdmin() {
  const profile = await requireAuth();
  if (profile.role !== "admin") {
    redirect("/dashboard");
  }
  return profile;
}
