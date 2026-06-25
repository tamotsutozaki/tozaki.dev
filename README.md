# tozaki.dev — Portfólio

Portfólio pessoal do **Pedro Tozaki** — Full-Stack Developer.
Single-page, **bilíngue (PT/EN)**, com **dark/light mode**, scroll suave com inércia e
uma camada generosa de micro-interações e animações de entrada.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Lenis · react-icons

> ⚠️ Em desenvolvimento — ainda há ajustes em andamento.

---

## 🚀 Rodar localmente

```bash
npm install
npm run dev
```

Abra **http://localhost:3000**. Requer Node 18.17+.

Build de produção:

```bash
npm run build && npm start
```

---

## ✨ Funcionalidades

### Tema (dark / light)
- **Padrão inteligente:** na 1ª visita segue o **`prefers-color-scheme`** do sistema/navegador
  (e acompanha ao vivo enquanto o usuário não escolher manualmente).
- **Escolha manual** é persistida (`localStorage`) e respeitada no F5.
- **Transição em "onda circular"** via **View Transitions API**: o novo tema é revelado por
  um círculo que cresce a partir do ponto clicado. Fallback suave (gradiente) em navegadores
  sem suporte.
- Script anti-flash no `<head>` aplica o tema antes da página pintar (sem FOUC).

### Idioma (PT / EN)
- Toggle PT/EN na navbar. O botão também **rola pra home** e **replica a intro**, já com as
  palavras no idioma novo.
- Todo o texto vive em `lib/content.ts`.

### Scroll suave com inércia
- **Lenis** dá aquele deslize "amanteigado". Navegação por âncora (menu/footer) usa
  `lenis.scrollTo` com offset da navbar.

### Animações de entrada (intro)
- Ao abrir/recarregar **e** ao clicar no logo "pedro tozaki", o conteúdo **nasce**: um respiro
  curto e então um **reveal**. Ordem: itens do header → TOZAKI → tagline → cantos.
- **Reveal mascarado** nos títulos (o texto emerge de baixo, dentro do próprio espaço) e
  **fade + rise** nos blocos/cards, com **stagger** (cascata).
- O Hero tem um efeito de **distanciamento** no scroll (encolhe, desce e some, ligado à posição).

### Micro-interações nos botões
- Padrão unificado: **preenchimento** subindo de baixo + **swap** do texto/ícone no próprio
  lugar + **respirada** (scale) no hover.
- Aplicado em: navbar (CTA, PT/EN, tema), botões dos projetos, contato (enviar, Cal.com,
  copiar) e ícones sociais do footer.

### Outros
- Navbar que **some ao rolar pra baixo** e **reaparece ao rolar pra cima**.
- Tudo respeita **`prefers-reduced-motion`**.
- Ícones via `react-icons` (sem SVG inline/CDN).

---

## 📁 Estrutura

```
tozaki-portfolio/
├── app/
│   ├── layout.tsx        # fontes, metadata, providers, script anti-flash
│   ├── page.tsx          # monta as seções
│   ├── actions.ts        # server action do formulário (stub → Resend)
│   └── globals.css       # tokens de tema, keyframes, reveals, efeitos de botão
├── components/
│   ├── Providers.tsx     # contexto: tema (View Transitions) + idioma + intro (useApp)
│   ├── SmoothScroll.tsx  # provider do Lenis (useLenis)
│   ├── Nav.tsx           # navbar, scroll-spy, hide-on-scroll, intro dos itens
│   ├── Hero.tsx          # "TOZAKI" + tagline + parallax + intro
│   ├── About.tsx         # foto + bio + grid de info cards + contador
│   ├── Skills.tsx        # grid de tecnologias + marquee
│   ├── Projects.tsx      # Liriun / ToMore / Eternize
│   ├── Contact.tsx       # formulário + canais diretos + Cal.com
│   ├── Footer.tsx        # wordmark gigante + redes
│   ├── InfoCard.tsx      # card de info (ícone + rótulo + valor) usado no About
│   ├── Reveal.tsx        # reveal no scroll (IntersectionObserver) — fade e mask
│   ├── SwapText.tsx      # efeito de troca de texto no hover
│   └── SectionHeader.tsx # cabeçalho de seção reutilizável
└── lib/
    ├── content.ts        # 🟢 TODO O TEXTO (PT/EN)
    ├── projects.ts       # 🟢 dados dos projetos
    ├── skills.ts         # 🟢 lista de skills
    └── site.ts           # 🟢 links, e-mail, contadores
```

🟢 = onde se edita conteúdo no dia a dia.

---

## ✏️ Editar conteúdo

- **Textos / traduções:** `lib/content.ts` (`CONTENT.pt` / `CONTENT.en`).
- **Projetos:** `lib/projects.ts` (imagem, links, tags, bullets — PT/EN).
- **Skills:** `lib/skills.ts` (ícones de `react-icons/si`).
- **Links / e-mail:** `lib/site.ts`.
- **Imagens:** `public/assets/`.

---

## 🎨 Design

- **Tema:** CSS variables em `app/globals.css`. Base (`:root`) é dark; `html.light` sobrescreve.
- **Tipografia:** Inter (corpo), JetBrains Mono (labels/mono), Archivo Black (nome gigante) —
  via `next/font/google`.
- **Paleta (dark / light):** fundo `#0a0a0a` / `#f7f6f2` · texto `#f7f6f2` / `#0a0a0a`.

---

## ⚠️ Partes a finalizar (`TODO`)

1. **Formulário → Resend.** `app/actions.ts` está em stub. Para ativar: `npm i resend zod`,
   configurar `.env.local` (ver `.env.example`) e descomentar o bloco real.
2. **Cal.com / WhatsApp / LeetCode / CV / GitHub:** links em `lib/site.ts`.
3. **SEO / OG image:** `metadata` em `app/layout.tsx` (adicionar `/og.png`).

---

## 📦 Deploy

Pronto para **Vercel** (zero config). Configurar as env vars do `.env.example` no painel.
Também roda em qualquer host com suporte a Next 14.
