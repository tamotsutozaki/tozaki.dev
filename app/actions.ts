"use server";

// ===================== SERVER ACTION: envio de mensagem =====================
// Estado atual: STUB. Loga no servidor e retorna { ok: true }.
//
// >>> PARA ATIVAR O ENVIO REAL VIA RESEND <<<
// 1. npm i resend zod
// 2. Crie uma API key em https://resend.com e ponha em .env.local:
//      RESEND_API_KEY=re_xxxxxxxx
//      CONTACT_TO_EMAIL=voce@seudominio.com
// 3. Descomente o bloco abaixo e remova o stub.

// import { Resend } from "resend";
// import { z } from "zod";
//
// const schema = z.object({
//   name: z.string().min(1).max(120),
//   email: z.string().email(),
//   message: z.string().min(1).max(5000),
// });

export type ContactInput = { name: string; email: string; message: string };
export type ContactResult = { ok: boolean; error?: string };

export async function sendMessage(input: ContactInput): Promise<ContactResult> {
  // ----- STUB (remova ao integrar o Resend) -----
  if (!input.name?.trim() || !input.email?.trim() || !input.message?.trim()) {
    return { ok: false, error: "missing-fields" };
  }
  console.log("[contato] nova mensagem (stub):", input);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };

  // ----- IMPLEMENTAÇÃO REAL (Resend) -----
  // const parsed = schema.safeParse(input);
  // if (!parsed.success) return { ok: false, error: "validation" };
  //
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // try {
  //   await resend.emails.send({
  //     from: "Portfolio <onboarding@resend.dev>", // troque por um domínio verificado
  //     to: process.env.CONTACT_TO_EMAIL!,
  //     replyTo: parsed.data.email,
  //     subject: `Novo contato de ${parsed.data.name}`,
  //     text: `${parsed.data.name} (${parsed.data.email})\n\n${parsed.data.message}`,
  //   });
  //   return { ok: true };
  // } catch (e) {
  //   console.error(e);
  //   return { ok: false, error: "send-failed" };
  // }
}
