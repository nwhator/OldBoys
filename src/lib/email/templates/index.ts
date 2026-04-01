import { renderDuesNoticeTemplate } from "@/lib/email/templates/dues-notice";
import { renderWelcomeTemplate } from "@/lib/email/templates/welcome";

export function renderEmailTemplate(name: string, recipientName: string) {
  const key = name.trim().toLowerCase();
  if (key === "welcome") {
    return renderWelcomeTemplate(recipientName);
  }

  if (key === "dues_notice" || key === "dues-notice") {
    return renderDuesNoticeTemplate(recipientName);
  }

  return null;
}
