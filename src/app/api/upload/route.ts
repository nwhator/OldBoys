import { NextResponse } from "next/server";
import { optimizeUpload } from "@/lib/image";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase.from("users").select("role,membership_status").eq("id", user.id).single();
    if (!profile || profile.role !== "admin" || profile.membership_status !== "approved") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const optimized = await optimizeUpload(buffer);
    const adminClient = createSupabaseAdminClient();
    const basePath = `uploads/${Date.now()}`;

    const fullPath = `${basePath}/full.webp`;
    const thumbPath = `${basePath}/thumb.webp`;

    const [fullRes, thumbRes] = await Promise.all([
      adminClient.storage.from("media").upload(fullPath, optimized.full, {
        contentType: optimized.contentType,
        upsert: false
      }),
      adminClient.storage.from("media").upload(thumbPath, optimized.thumbnail, {
        contentType: optimized.contentType,
        upsert: false
      })
    ]);

    if (fullRes.error || thumbRes.error) {
      return NextResponse.json({ error: fullRes.error?.message ?? thumbRes.error?.message ?? "Upload failed" }, { status: 500 });
    }

    const fullUrl = adminClient.storage.from("media").getPublicUrl(fullPath).data.publicUrl;
    const thumbUrl = adminClient.storage.from("media").getPublicUrl(thumbPath).data.publicUrl;

    return NextResponse.json({
      fullUrl,
      thumbnailUrl: thumbUrl
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status: 500 });
  }
}
