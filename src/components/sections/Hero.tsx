import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-ink text-paper-light grain"
    >
      {/* The room itself, behind the mark — the barista, the gallery wall,
          the space the rest of the copy is talking about. */}
      <Image
        src="/images/equipe-cappuccino.jpg"
        alt="Le café NMW, préparation d'un cappuccino devant les œuvres de la galerie"
        fill
        priority
        className="object-cover object-[70%_30%]"
      />

      {/* Ink scrim so the mark and copy stay legible over the photo —
          darkest at the bottom where the text sits, lighter toward the top. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />

      {/* Ambient light: a slow, quiet radial glow, re-aimed at where the
          mark actually sits so it lights it rather than the empty middle.
          Paper-toned, not accent-toned — the only "warmth" left is light. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(55% 45% at 28% 55%, rgba(247,246,242,0.08) 0%, rgba(21,19,15,0) 70%)",
        }}
      />

      {/* A pinned photo, not a second background — proof the mark on the
          wall is a real storefront. Kept small and off to the side so the
          room behind the mark stays the dominant image. */}
      <div className="hidden md:block absolute top-28 right-6 lg:right-10 w-44 lg:w-52 rotate-[2deg] shadow-2xl">
        <div className="relative aspect-[4/3] bg-paper-light p-2 pb-6">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/images/pancarte-exterieure.jpg"
              alt="La pancarte NMW café ♥ galerie, en façade"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* The signature moment: the mark itself, at scale, in the material
          it is printed on. The page previously set "No Matter What" as a
          display headline — type imitating a logo that already existed.
          The real signature does that job better, and says caffè · galerie ·
          boutique in the same breath, so the eyebrow line it used to need
          is gone.

          It keeps the bottom-left anchor the hero was already built on
          rather than centring: a mark floating in the middle of a dark
          field is a logo presentation, not a storefront. */}
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 pt-40 pb-14 md:pb-20">
        <h1 className="w-[min(64vw,460px)] mb-14 md:mb-20">
          <Logo variant="lockup" className="w-full h-auto" />
        </h1>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-paper-light/20 pt-8">
          <p className="max-w-md text-paper-light/75 leading-relaxed">
            Un grand-père qui a commencé avec un comptoir et une théière. Trois
            générations plus tard, un même mot d&apos;ordre : peu importe.
            On continue.
          </p>

          <Link
            href="/histoire"
            className="group inline-flex items-center gap-3 font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light/85"
          >
            <span className="relative">
              Découvrir l&apos;histoire
              <span className="absolute left-0 -bottom-1 h-px w-full bg-paper-light/40 origin-left scale-x-100 transition-transform group-hover:scale-x-0" />
            </span>
            <span className="inline-block h-8 w-8 rounded-full border border-paper-light/30 grid place-items-center transition-all duration-300 group-hover:border-paper-light group-hover:text-paper-light group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
