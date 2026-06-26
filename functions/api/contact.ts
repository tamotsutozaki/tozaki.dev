// Cloudflare Pages Function: POST /api/contact → envia e-mail via Resend.
// Variáveis (Cloudflare Pages → Settings → Variables and Secrets):
//   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const body = (await context.request.json().catch(() => ({}))) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const website = String(body.website ?? ""); // honeypot — humano não preenche

    if (website) return json({ ok: true }); // provável bot — finge sucesso
    if (!name || name.length > 120) return json({ ok: false, error: "validation" }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return json({ ok: false, error: "validation" }, 400);
    if (!message || message.length > 5000) return json({ ok: false, error: "validation" }, 400);

    const apiKey = context.env.RESEND_API_KEY;
    if (!apiKey) return json({ ok: false, error: "not-configured" }, 500);

    const to = context.env.CONTACT_TO_EMAIL || "pedro@tozaki.dev";
    const from = context.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Portfólio Tozaki <${from}>`,
        to: [to],
        reply_to: email,
        subject: `Novo contato de ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!res.ok) return json({ ok: false, error: "send-failed" }, 502);
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "unexpected" }, 500);
  }
};
