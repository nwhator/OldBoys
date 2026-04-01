export function renderWelcomeTemplate(name: string) {
  return {
    subject: `Welcome to Old Boys, ${name}`,
    html: `<h2>Welcome, ${name}</h2><p>Your Old Boys account is now active. We are glad to have you in the community.</p>`
  };
}
