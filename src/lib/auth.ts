import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";

export async function getCurrentProfile(): Promise<Profile | null> {
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

export async function requireAuth(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login");
    throw new Error("Redirecting to login");
  }
  return profile;
}

export async function requireApprovedMember(): Promise<Profile> {
  const profile = await requireAuth();
  if (profile.membership_status !== "approved") {
    redirect("/pending");
    throw new Error("Redirecting to pending");
  }
  return profile;
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await requireAuth();
  if (profile.role !== "admin") {
    redirect("/dashboard");
    throw new Error("Redirecting to dashboard");
  }
  return profile;
}
