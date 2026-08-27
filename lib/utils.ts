import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Microlink screenshot endpoint — live preview thumbs.
 * Accepts a bare domain or a full URL (some sites redirect to www./app.).
 */
export function shotUrl(domainOrUrl: string) {
  const href = domainOrUrl.startsWith("http")
    ? domainOrUrl
    : `https://${domainOrUrl}`;
  const target = encodeURIComponent(href);
  return (
    `https://api.microlink.io/?url=${target}` +
    "&screenshot=true&meta=false&embed=screenshot.url" +
    "&screenshot.type=jpeg&viewport.width=1280&viewport.height=800" +
    "&waitUntil=networkidle2"
  );
}
