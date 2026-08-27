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

## Still to fill in (search the code for `TODO:`)

| What | Where |
|---|---|
| Real email address | `lib/content.ts` → `IDENTITY.email` |
| Phone (optional) | `lib/content.ts` → `IDENTITY.phone` — leave `null` to hide the row |
| REC admin screenshot | `public/projects/rec-admin.png` |
| Grow CRM screenshot | `public/projects/grow-crm.png` |
| CV PDF | `public/ajdin-podrinja-cv.pdf` |

Until the screenshots exist, those frames show a labelled "screenshot pending" state rather than a broken image — drop the files in and they appear.

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
- `⌘K` / `Ctrl+K` opens the command palette.
- Every animation has a `prefers-reduced-motion` fallback, and the page is fully legible with JavaScript disabled.
