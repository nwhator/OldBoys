export function renderDuesNoticeTemplate(name: string) {
  return {
    subject: `Dues Notice for ${name}`,
    html: `<h2>Hello ${name},</h2><p>This is a friendly reminder to complete your dues payment for the current cycle.</p>`
  };
}
