# ajdin.grow.ba — interactive CV

Next.js 15 (App Router) · TypeScript strict · Tailwind v3 · Motion · next-themes.
Dark by default, light available. EN default, BS toggle. No template, no page builder.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (stop `npm run dev` first — they share .next)
```

## Editing the content

**Everything you'd ever want to change lives in one file: `lib/content.ts`.**

1. `IDENTITY` at the top holds the email, phone, Instagram, domain and CV filename.
2. `WEB_PROJECTS` is the list of live sites — add a `{ domain, en, bs }` object and the row, the number and the hover preview all appear on their own.
3. `SYSTEMS` is the custom-platform list; set `shot` to an image path in `/public` or `null` for a typographic plate.
4. `content.en` and `content.bs` hold every line of copy, side by side. Change the string, save — nothing else needs touching.
5. Both languages must have the same shape; if you add a key to `en`, add it to `bs` too or TypeScript will tell you.

## Assets

| What | Where |
|---|---|
| Portrait | `public/ajdin.jpg` |
| REC admin screenshot | `public/projects/rec-admin.png` |
| Grow CRM screenshot | `public/projects/grow-crm.png` — **client names and phone numbers are blurred into the file itself.** If you ever replace it, redact it again before committing. |
| Instagram posts | `public/instagram/` — pulled by `node scripts/fetch-instagram.mjs <post urls>`, which reads each post's public `/embed/` page in headless Chrome and stores the image locally. Instagram's profile page is login-walled and its oEmbed needs a Meta token, so the per-post embed is the only public route. |
| TikTok thumbnails | `public/video/` — from TikTok oEmbed, stored locally because their CDN URLs are signed and expire |
| CV PDFs | `public/ajdin-podrinja-cv.pdf` (EN) and `-bs.pdf` (BS) |

The PDFs are printed from the `/cv` route, so they can never drift from the
copy. To regenerate after changing `lib/content.ts`:

```bash
npm run dev                       # terminal 1
npm run cv:pdf -- http://localhost:3000   # terminal 2
```

## Structure

```
app/           routes, metadata, OG image, sitemap, robots, /cv print sheet
components/
  sections/    one file per movement of the page, in scroll order
  primitives/  reveal, word reveal, ticker, marquee, browser frame, cursor preview
  chrome/      custom cursor, scroll progress, dock, ⌘K command palette
  providers/   theme + language context
lib/content.ts all copy, both languages
```

`DESIGN.md` records the visual system and the rules the build follows.
`PRODUCT.md` records the product truth — do not invent past it.

## Notes

- Hover previews on the web list come from Microlink's public screenshot API. It is free and cached per URL; if it ever rate-limits, the preview falls back to showing the domain.
- `/cv` and `Ctrl/⌘+P` produce the same one-page black-on-white sheet from the same content.
- `?lang=bs` on any URL pins the language for that visit — used to print the Bosnian PDF.
- `⌘K` / `Ctrl+K` opens the command palette.
- Every animation has a `prefers-reduced-motion` fallback, and the page is fully legible with JavaScript disabled.
