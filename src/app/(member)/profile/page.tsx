import Image from "next/image";
import { changeOwnPassword, updateOwnProfile } from "@/lib/actions";
import { requireApprovedMember } from "@/lib/auth";
import { getMemberPayments } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProfilePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getMessage(params: Record<string, string | string[] | undefined>) {
  const updated = typeof params.updated === "string" ? params.updated : "";
  const error = typeof params.error === "string" ? params.error : "";

  if (updated === "profile") {
    return { type: "success", text: "Profile details updated successfully." };
  }
  if (updated === "password") {
    return { type: "success", text: "Password changed successfully." };
  }
  if (error === "avatar_type") {
    return { type: "error", text: "Avatar must be an image file." };
  }
  if (error === "avatar_size") {
    return { type: "error", text: "Avatar file is too large. Use a file under 5MB." };
  }
  if (error === "avatar_upload") {
    return { type: "error", text: "Avatar upload failed. Please try again." };
  }
  if (error === "password_length") {
    return { type: "error", text: "New password must be at least 8 characters." };
  }
  if (error === "password_mismatch") {
    return { type: "error", text: "Passwords do not match." };
  }
  if (error === "password_update") {
    return { type: "error", text: "Unable to update password right now." };
  }

  return null;
}

export default async function MemberProfilePage({ searchParams }: ProfilePageProps) {
  const params = (await searchParams) ?? {};
  const profile = await requireApprovedMember();
  const payments = await getMemberPayments(profile.id);
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const paidCount = payments.filter((payment) => payment.status === "success").length;
  const message = getMessage(params);
  const initials = profile.full_name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-black text-(--primary)">Member Profile</h1>
      {message ? (
        <p className={`mt-4 rounded-lg px-4 py-3 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
          {message.text}
        </p>
      ) : null}
      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="editorial-card rounded-xl p-5 md:col-span-2">
          <h2 className="text-xl font-black text-(--primary)">Profile Details</h2>
          <form action={updateOwnProfile} className="mt-5 grid gap-5 md:grid-cols-2" encType="multipart/form-data">
            <div className="md:col-span-2 flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-200">
                {profile.avatar_url ? (
                  <Image src={profile.avatar_url} alt={profile.full_name} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-black text-(--primary)">{initials || "OB"}</div>
                )}
              </div>
              <div>
                <label htmlFor="avatar" className="block text-xs font-bold uppercase tracking-widest text-slate-500">Avatar</label>
                <input id="avatar" name="avatar" type="file" accept="image/*" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="full_name" className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
              <input id="full_name" value={profile.full_name} readOnly className="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-600" />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
              <input id="email" value={user?.email ?? ""} readOnly className="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-600" />
            </div>
            <div>
              <label htmlFor="graduation_set" className="text-xs font-bold uppercase tracking-widest text-slate-500">Graduation Set</label>
              <input
                id="graduation_set"
                name="graduation_set"
                defaultValue={profile.graduation_set ?? ""}
                placeholder="e.g. 1998"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider">
                Save Profile
              </button>
            </div>
          </form>
        </article>

        <article className="editorial-card rounded-xl p-5 md:col-span-2">
          <h2 className="text-xl font-black text-(--primary)">Change Password</h2>
          <form action={changeOwnPassword} className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="new_password" className="text-xs font-bold uppercase tracking-widest text-slate-500">New Password</label>
              <input id="new_password" name="new_password" type="password" minLength={8} required className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="confirm_password" className="text-xs font-bold uppercase tracking-widest text-slate-500">Confirm New Password</label>
              <input id="confirm_password" name="confirm_password" type="password" minLength={8} required className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider">
                Update Password
              </button>
            </div>
          </form>
        </article>

        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Full Name</p>
          <p className="mt-2 text-2xl font-bold text-(--primary)">{profile.full_name}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Membership Status</p>
          <p className="mt-2 text-2xl font-bold capitalize text-emerald-700">{profile.membership_status}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Role</p>
          <p className="mt-2 text-2xl font-bold capitalize text-(--primary)">{profile.role}</p>
        </article>
        <article className="editorial-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Successful Payments</p>
          <p className="mt-2 text-2xl font-bold text-(--primary)">{paidCount}</p>
        </article>
      </section>
    </main>
  );
}
