import type { Metadata } from "next";
import { content } from "@/lib/content";
import { CvSheet } from "@/components/cv-sheet";

export const metadata: Metadata = {
  title: `${content.en.meta.title} — CV`,
  description: content.en.meta.description,
  robots: { index: false, follow: true },
};

export default function CvPage() {
  return <CvSheet />;
}
