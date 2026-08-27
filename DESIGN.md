# DESIGN.md — ajdin.grow.ba

The world is pinned by the client brief: Grow's orange mark on near-black. This file records how that world is drawn.

## Direction contract

**THESIS.** A CV drawn as a technical schedule — a directory listing, a spec sheet, a drawing set — not a deck of cards. It refuses the portfolio-category default: the 3-up project card grid with icon, heading, blurb.

**OWN-WORLD.** Near-black ground (#0A0A0A) ruled by real 1px hairlines (#262626) that form a visible page grid: full-bleed horizontal rules between movements, a vertical rule down the content edge, mono micro-labels living in the margins the rules create. Geist display, 600–700 weight, -0.03em, clamped to 8rem. Geist Mono, uppercase, 11px, tracking .18em for every index, year, coordinate, and tag. Orange appears no more than four times per viewport: the scroll line, the active dock state, one highlighted word, one rule. No shadows anywhere — depth is drawn with rules and value. A single grain layer at 0.028 opacity over `body`.

**STORY.** Visitor lands on a name at architectural scale with the claim beneath it → reads a first-person manifesto revealed word by word → walks a career schedule → scans a directory of live sites that previews under the cursor → sees the two admin panels that prove the systems are real → reads the numbers → reads the 12-month ambition at full-screen scale → copies the email.

**FIRST VIEWPORT.** Full height. Name set bottom-left on the grid at clamp(3.5rem, 11vw, 9rem); the one-line claim below it in muted body; a mono meta rail on the right edge carrying location, discipline, availability; a single orange hairline drawing itself under the name on load; floating dock resting at the bottom; scroll cue in the lower-right margin.

**FORM.** Client-pinned world — no concept roll. Staging: engineering schedule / directory listing.

## Rules

- **Ground.** `--bg #0A0A0A`, `--bg-elevated #121212`, `--surface #1A1A1A`, `--border #262626`. Light theme exists (next-themes) and inverts to paper: `#FAFAFA` ground, `#111` ink, same orange.
- **Type.** Display Geist Sans 600/700, `-0.03em`, `text-balance` on headings. Body Geist Sans 16–18px, `leading-relaxed`, `--text-muted #A1A1AA`, measure capped at 68ch. Mono Geist Mono, uppercase, `tracking-[0.18em]`, 11–12px, used only for indices, years, counts, and tags — never as costume for prose.
- **Accent.** `#FF5C1A`. Reserved for: scroll progress, active nav state, one highlighted phrase per section at most, the rule under the name, focus rings. Never a fill behind body text, never a gradient, never glowing text.
- **Rules over cards.** Sections divide with a full-bleed 1px top border. Lists are tables with a mono index column and hairline row separators, not cards. Where a container is unavoidable (lifestyle, bento), it is a hairline box with no radius above 12px and no shadow.
- **Motion.** One authored moment repeated in one grammar: a hairline draws itself (`scaleX 0→1`, origin left) and the content above it rises `y 24→0`, `blur(8px)→0`, `opacity 0→1`, `0.6s`, `cubic-bezier(.16,1,.3,1)`, 60ms stagger. All scroll motion is `whileInView` + `once: true`, `margin:-100px`. Everything collapses to a static, fully visible page under `prefers-reduced-motion`.
- **Cursor.** Desktop `pointer:fine` only — a 10px `mix-blend-difference` dot that scales to 40px over interactive elements. Hidden on touch and under reduced motion.
- **Layout.** Content max-width 1200px, gutters `px-6 md:px-10`, movements `py-24 md:py-32`. Mobile at 375px is the first test.
- **Print.** `@media print` and `/cv` render the same content as black-on-white single-page type; all motion, ground, grain, cursor, and chrome removed.

## Prohibitions specific to this build

Progress bars for skills. Auto-rotating carousels. Emoji in UI. Gradient text. Drop shadows. Stock illustration or AI-blob backgrounds. More than three colors on screen at once. Nested cards.
