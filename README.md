# Simple Landing

Single-page static-like site inspired by the sections you shared. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. No animations required.

## Getting started

```bash
npm install
npm run dev
```

The main content lives in `src/app/page.tsx`. The three cards in **News & Announcements** link to dynamic routes under `/news/[slug]` (stub page provided).

- Navigation includes an accessible dropdown under **About** with: About Us, Vision, Mission, Values.
- Sections included: Hero, Why choose Simplié?, Crafting Smart Design, Teal Email CTA, News & Announcements, Footer.
- Tailwind is configured with the `content` globs for `app` and `components`.
- Import alias `@/*` points to `src/*`.

> This repo avoids external images; replace gradient placeholders in components with your assets if desired.
