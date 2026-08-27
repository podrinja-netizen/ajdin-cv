import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Microlink screenshot endpoint — live preview thumbs for the web directory. */
export function shotUrl(domain: string) {
  const target = encodeURIComponent(`https://${domain}`);
  return (
    `https://api.microlink.io/?url=${target}` +
    "&screenshot=true&meta=false&embed=screenshot.url" +
    "&screenshot.type=jpeg&viewport.width=1280&viewport.height=800" +
    "&waitUntil=networkidle2"
  );
}
