# Shiv Interior — Marketing Website

A production marketing site for **Shiv Industries & Construction LLP (SICL)**, an interior design studio crafting premium furniture and workspace solutions since 2000. The site showcases the studio's services, portfolio, products, and process, and captures inquiries through a consultation form.

## ✨ Highlights

- **10-section homepage** — Hero, About, Featured Projects, Services, full-bleed Video showcase, Process, Testimonials, FAQ, CTA, and Consultation form
- **Multi-page IA** — dedicated `/about`, `/products`, `/portfolio` (with dynamic `[slug]` detail pages), `/contact`, plus legal pages (Privacy, Terms)
- **Specialty offering** — PV & LGSF (Pre-Engineered Light Gauge Steel Framing) structure microsite
- **Content-driven** — page copy, FAQs, testimonials, portfolio entries, and products all live in typed JSON under `src/data/`, so editorial updates never touch React
- **Smooth scroll + motion** — `lenis` for buttery scrolling, `framer-motion` for entrance/exit animation
- **Image-aware** — `next/image` allowlist for Pexels, Unsplash, Framer, and the company's own CDN
- **Windows-friendly dev** — webpack persistent cache switched to in-memory in dev so Antivirus/OneDrive locks don't trip rebuilds

## 🧱 Stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org) (App Router, RSC) |
| Language | TypeScript + React 18 |
| Styling | Tailwind CSS 3 + PostCSS |
| Animation | Framer Motion + Lenis |
| Content | Typed JSON (`src/data/`) |

## 🗂 Project structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/            # /about
│   ├── contact/          # /contact
│   ├── portfolio/        # /portfolio + /portfolio/[slug]
│   ├── products/         # /products + /products/[slug], /products/pv-lgst-structure
│   ├── pv-lgst-structure/ # PV & LGSF structure microsite
│   ├── privacy-policy/   # /privacy-policy
│   ├── terms-and-conditions/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── layout/           # Header, footer, navigation, smooth-scroll shell
│   ├── sections/         # Page-section components grouped by route
│   └── ui/               # Small reusable UI primitives (CountUp, SocialIcon)
├── data/                 # JSON content per route + shared (footer, navigation, products)
└── types/                # Shared TS types
```

Sections under `src/components/sections/<route>/` are numbered (e.g. `01_HeroSection.tsx`, `02_AboutSection.tsx`) to mirror the design spec — adding a section means adding the next number in the order it should appear on the page.

## 🚀 Running locally

```bash
npm install
npm run dev        # http://localhost:3000

npm run build      # production build
npm run start      # serve production build
npm run lint       # next lint
```

Requires Node 18.18+ (matches Next 14).

## ✍️ Editing content

Most marketing copy — headings, body text, FAQs, testimonials, portfolio entries, product details, footer, and navigation — lives as JSON in `src/data/`. Edit the file, save, and Next will hot-reload the affected route.

Example: change homepage section order in `src/app/page.tsx`.

## 🌐 Deployment

Optimised for Vercel (zero config). Any Next.js host that supports the App Router will work.

## 📄 License

Proprietary © Shiv Industries & Construction LLP. All rights reserved.
