"use client";

import Script from "next/script";
import { useReveal } from "@/lib/useReveal";

/* Real Google reviews via Elfsight — replaces the earlier "coming soon"
   placeholder now that there's an actual source to embed instead of
   invented quotes. The widget script loads once the page is interactive;
   the widget itself lazy-loads its content (data-elfsight-app-lazy). */

export default function Testimonials() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-paper text-ink py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal max-w-xl mb-14">
          <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-grey-700 mb-4">
            Ce qu&apos;on en dit
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Ce que nos visiteurs <span className="italic">en disent.</span>
          </h2>
        </div>

        <div className="reveal">
          <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
          <div
            className="elfsight-app-c661c44c-1325-48fc-b78c-ffff61fb2005"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}
