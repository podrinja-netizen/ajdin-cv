/**
 * Pulls the preview image out of public Instagram posts and stores it locally.
 *
 *   node scripts/fetch-instagram.mjs https://www.instagram.com/p/XXXX/ https://www.instagram.com/reel/YYYY/
 *
 * Why this exists: Instagram's profile page is behind a login wall and its
 * oEmbed API needs a Meta app token, but the per-post /embed/ page is public.
 * Rendering that page in headless Chrome exposes the post image, which we then
 * download so the site never depends on a signed CDN URL that expires.
 *
 * Prints a ready-to-paste INSTAGRAM entry for lib/content.ts.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean).find((p) => existsSync(p));

if (!CHROME) {
  console.error("Chrome not found. Set CHROME_PATH.");
  process.exit(1);
}

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error("Pass one or more Instagram post URLs.");
  process.exit(1);
}

const OUT = resolve(process.cwd(), "public/instagram");
mkdirSync(OUT, { recursive: true });

/** instagram.com/p/CODE/ or /reel/CODE/ -> CODE */
const codeOf = (u) => u.match(/\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/)?.[1];

const entries = [];

for (const [i, url] of urls.entries()) {
  const code = codeOf(url);
  if (!code) {
    console.error(`SKIP  not an Instagram post URL: ${url}`);
    continue;
  }

  const dom = execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--virtual-time-budget=12000",
      "--dump-dom",
      `https://www.instagram.com/p/${code}/embed/captioned/`,
    ],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] },
  );

  // The post media is the large fbcdn image; profile avatars are the small
  // scontent .../t51.2885-19/ ones, so prefer t39/t51 media entries by size.
  const candidates = [...dom.matchAll(/src="(https:\/\/[^"]*(?:fbcdn|cdninstagram)[^"]*)"/g)]
    .map((m) => m[1].replaceAll("&amp;", "&"))
    .filter((u) => !u.includes("t51.2885-19") && !u.includes("static.cdninstagram"));

  const media = candidates[0];
  if (!media) {
    console.error(`FAILED ${code} — no media found (private or removed post?)`);
    continue;
  }

  const res = await fetch(media, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122" },
  });
  if (!res.ok) {
    console.error(`FAILED ${code} — image fetch ${res.status}`);
    continue;
  }

  const file = `ig-${i + 1}.jpg`;
  writeFileSync(resolve(OUT, file), Buffer.from(await res.arrayBuffer()));
  console.log(`public/instagram/${file}  <-  ${code}`);

  entries.push({ url: `https://www.instagram.com/p/${code}/`, image: `/instagram/${file}` });
}

if (entries.length) {
  console.log("\nPaste into lib/content.ts:\n");
  console.log("export const INSTAGRAM = [");
  for (const e of entries) {
    console.log(`  { url: "${e.url}", image: "${e.image}", en: "", bs: "" },`);
  }
  console.log("];");
  console.log("\n(fill in en/bs with a short caption for each, or leave empty)");
}
