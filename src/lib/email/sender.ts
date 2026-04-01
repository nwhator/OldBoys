import { env } from "@/lib/env";

export async function sendEmailHook(payload: { to: string; subject: string; html: string }) {
  if (!env.EMAIL_SENDER_HOOK_URL) {
    return { ok: false, reason: "missing_hook" as const };
  }

  const response = await fetch(env.EMAIL_SENDER_HOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return { ok: response.ok };
}
