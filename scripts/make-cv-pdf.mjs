/**
 * Regenerates the two PDF CVs from the /cv route, so the PDFs can never drift
 * from lib/content.ts.
 *
 *   npm run dev          (in one terminal)
 *   npm run cv:pdf       (in another)
 *
 * Pass a different origin as the first argument if the dev server is on
 * another port: `npm run cv:pdf -- http://localhost:3001`
 */
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const ORIGIN = process.argv[2] ?? "http://localhost:3000";

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error(
    "Could not find Chrome. Set CHROME_PATH to the browser executable.",
  );
  process.exit(1);
}

const targets = [
  { lang: "en", out: "public/ajdin-podrinja-cv.pdf" },
  { lang: "bs", out: "public/ajdin-podrinja-cv-bs.pdf" },
];

for (const { lang, out } of targets) {
  const abs = resolve(process.cwd(), out).replaceAll("\\", "/");
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=15000",
      "--no-pdf-header-footer",
      `--print-to-pdf=${abs}`,
      `${ORIGIN}/cv?lang=${lang}`,
    ],
    { stdio: "ignore" },
  );

  if (!existsSync(abs)) {
    console.error(`FAILED  ${out} — is the dev server running on ${ORIGIN}?`);
    process.exit(1);
  }
  console.log(`${out}  ${(statSync(abs).size / 1024).toFixed(0)} KB`);
}
