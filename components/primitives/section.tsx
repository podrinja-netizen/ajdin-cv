"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Every movement of the page is ruled off at the top and carries its index in
 * the left margin, the way a drawing set numbers its sheets.
 */
export function Section({
  id,
  index,
  srTitle,
  children,
  className,
  wide = false,
}: {
  id?: string;
  index: string;
  /**
   * Accessible heading for movements that carry no visible <SectionTitle>,
   * so the document outline has no gaps and no skipped levels.
   */
  srTitle?: string;
  children: React.ReactNode;
  className?: string;
  /** Let the content use the full width instead of the 10-column body. */
  wide?: boolean;
}) {
  return (
    <section id={id} className={cn("movement scroll-mt-4", className)}>
      <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="min-w-0 lg:col-span-2">
          <p className="label lg:sticky lg:top-24">{index}</p>
        </Reveal>
        <div className={cn("min-w-0", wide ? "lg:col-span-12" : "lg:col-span-10")}>
          {srTitle && <h2 className="sr-only">{srTitle}</h2>}
          {children}
        </div>
      </div>
    </section>
  );
}

/** The standard heading inside a movement. */
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal as="h2" className={cn("display max-w-[22ch] text-[clamp(1.9rem,4.2vw,3.25rem)]", className)}>
      {children}
    </Reveal>
  );
}
