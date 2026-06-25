"use client";

import React, { useState } from "react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { SwapText } from "./SwapText";
import { SITE, getEmail } from "@/lib/site";
import { sendMessage } from "@/app/actions";
import { FiArrowUpRight, FiCalendar, FiCheck, FiCopy, FiDownload } from "react-icons/fi";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const { t } = useApp();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const email = getEmail();

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await sendMessage(form);
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section id="contato" className="relative overflow-hidden" style={{ scrollMarginTop: 80, padding: "clamp(80px,12vh,150px) clamp(18px,5vw,72px)" }}>
      <span className="watermark" style={{ fontSize: "clamp(4.5rem,9vw,8.5rem)" }}>{t.contact.label}</span>

      <div className="relative z-[1] mx-auto" style={{ maxWidth: 1240 }}>
        {/* Header */}
        <div className="flex items-start" style={{ gap: "clamp(12px,3vw,38px)", marginBottom: "clamp(40px,6vh,72px)" }}>
          <Reveal className="flex-none"><span className="section-num">04</span></Reveal>
          <div style={{ paddingTop: "clamp(4px,1.2vw,16px)" }}>
            <Reveal delay={90} className="mb-[18px]">
              <span className="inline-block font-mono text-[10.5px] font-medium tracking-[0.22em] uppercase text-fg2 border border-line2 rounded-[5px] px-[11px] py-[5px]">{t.contact.label}</span>
            </Reveal>
            <Reveal mask delay={160}>
              <h2 className="m-0 font-extrabold uppercase text-fg" style={{ fontSize: "clamp(2rem,6.4vw,4.6rem)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "22ch" }}>{t.contact.heading}</h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-[18px] text-fg2" style={{ fontSize: "15.5px", lineHeight: 1.55 }}>{t.contact.sub}</p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch md:grid-cols-[7fr_3fr]" style={{ gap: "clamp(20px,3vw,40px)" }}>
          {/* Esquerda: formulário */}
          <Reveal className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col bg-bg-elev border border-line rounded-2xl" style={{ padding: "clamp(20px,3vw,30px)" }}>
              {status === "sent" ? (
                <div className="flex flex-col items-center text-center gap-3 px-1.5 py-[18px]">
                  <span className="grid place-items-center w-[50px] h-[50px] rounded-full border-[1.5px] border-fg text-fg"><FiCheck size={24} /></span>
                  <div className="font-semibold text-[17px] text-fg">{t.contact.fSent}</div>
                  <div className="text-[13.5px] text-fg3" style={{ maxWidth: "34ch", lineHeight: 1.5 }}>{t.contact.fSentSub}</div>
                  <button onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus("idle"); }} className="mt-1.5 px-[18px] py-2.5 rounded-lg bg-transparent border border-line2 text-fg font-medium text-[13px] cursor-pointer hover:bg-bg transition-colors">{t.contact.fAgain}</button>
                </div>
              ) : (
                <>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-fg3 mb-3.5">{t.contact.formLabel}</div>
                <form onSubmit={submit} className="flex flex-1 flex-col gap-[13px]">
                  <Input value={form.name} onChange={onChange("name")} placeholder={t.contact.fName} required />
                  <Input type="email" value={form.email} onChange={onChange("email")} placeholder={t.contact.fEmail} required />
                  <textarea
                    value={form.message}
                    onChange={onChange("message")}
                    rows={4}
                    required
                    placeholder={t.contact.fMessage}
                    className="w-full flex-1 px-[15px] py-[13px] bg-bg border border-line2 rounded-[9px] text-fg text-[14.5px] outline-none resize-y focus:border-fg transition-colors font-sans"
                    style={{ minHeight: 108 }}
                  />
                  {status === "error" && <div className="text-[12.5px] text-fg2">{t.contact.fError}</div>}
                  <button type="submit" disabled={status === "sending"} className="fillbtn tswap-trigger inline-flex items-center justify-center w-full p-3.5 rounded-[9px] border border-fg text-fg font-semibold text-[14.5px] cursor-pointer disabled:opacity-60 disabled:pointer-events-none">
                    <span className="fillbtn-fill" aria-hidden />
                    <span className="tswap relative z-[1]">
                      <span className="tswap-orig inline-flex items-center justify-center gap-2">{status === "sending" ? t.contact.fSending : t.contact.fSend}<span>→</span></span>
                      <span className="tswap-copy text-bg inline-flex items-center justify-center gap-2" aria-hidden>{status === "sending" ? t.contact.fSending : t.contact.fSend}<span>→</span></span>
                    </span>
                  </button>
                </form>
                </>
              )}
            </div>
          </Reveal>

          {/* Direita: canais diretos + Cal.com */}
          <Reveal delay={140} className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col bg-bg-elev border border-line rounded-2xl" style={{ padding: "clamp(18px,2.4vw,24px) clamp(20px,3vw,28px)" }}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-fg3 mb-1.5">{t.contact.directLabel}</div>
              <div className="flex items-center justify-between gap-3 py-3.5 border-t border-line">
                <a href={`mailto:${email}`} className="tswap-trigger font-mono text-[13.5px] text-fg cursor-pointer"><SwapText>{email}</SwapText></a>
                <button onClick={copyEmail} aria-label={copied ? t.contact.copied : t.contact.copy} className="fillbtn tswap-trigger flex-none grid place-items-center w-[34px] h-[34px] rounded-md border border-line2 text-fg3 cursor-pointer">
                  <span className="fillbtn-fill" aria-hidden />
                  <span className="tswap relative z-[1]">
                    <span className="tswap-orig">{copied ? <FiCheck size={14} /> : <FiCopy size={14} />}</span>
                    <span className="tswap-copy text-bg" aria-hidden>{copied ? <FiCheck size={14} /> : <FiCopy size={14} />}</span>
                  </span>
                </button>
              </div>
              <ChannelLink href={SITE.whatsapp} label={t.contact.whatsapp} symbol="↗" />
              <ChannelLink href={SITE.linkedin} label="LinkedIn" symbol="↗" />
              <ChannelLink href={SITE.github} label="GitHub" symbol="↗" />
              {/* LeetCode — descomente quando tiver: <ChannelLink href={SITE.leetcode} label="LeetCode" symbol="↗" /> */}
              <a href={SITE.cvUrl} download className="tswap-trigger flex items-center justify-between py-3.5 border-t border-line text-fg text-[14.5px] cursor-pointer">
                <SwapText>{t.contact.cv}</SwapText>
                <span className="text-fg3"><FiDownload size={14} /></span>
              </a>

              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-fg3 mt-6 mb-3.5">{t.contact.orBook}</div>
              {/* TODO: trocar pelo embed oficial do Cal.com (@calcom/embed-react) ou pelo link real */}
              <a href={SITE.calLink} target="_blank" rel="noopener noreferrer" className="fillbtn tswap-trigger flex items-center justify-center w-full p-3.5 rounded-[10px] border border-line2 text-fg font-medium text-sm cursor-pointer">
                <span className="fillbtn-fill" aria-hidden />
                <span className="tswap relative z-[1]">
                  <span className="tswap-orig inline-flex items-center justify-center gap-2.5"><FiCalendar size={16} aria-hidden />{t.contact.book}<span className="text-fg3">↗</span></span>
                  <span className="tswap-copy text-bg inline-flex items-center justify-center gap-2.5" aria-hidden><FiCalendar size={16} />{t.contact.book}<span>↗</span></span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-[15px] py-[13px] bg-bg border border-line2 rounded-[9px] text-fg text-[14.5px] outline-none focus:border-fg transition-colors"
    />
  );
}

function ChannelLink({ href, label, symbol }: { href: string; label: string; symbol: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="tswap-trigger flex items-center justify-between py-3.5 border-t border-line text-fg text-[14.5px] cursor-pointer">
      <SwapText>{label}</SwapText>
      <span className="text-fg3">{symbol}</span>
    </a>
  );
}
