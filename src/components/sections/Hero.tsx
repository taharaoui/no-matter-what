export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-ink text-paper-light grain"
    >
      {/* Ambient warmth: a slow, quiet radial glow — the only motion on load */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 20%, rgba(176,141,79,0.18) 0%, rgba(32,28,23,0) 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 pt-40 pb-24 md:pb-32">
        <p className="font-utility text-[11px] uppercase tracking-[0.2em] text-brass mb-6">
          Café · Galerie · Boutique — Montréal
        </p>

        <h1 className="font-display font-light leading-[0.95] text-[15vw] md:text-[7.5vw] lg:text-[6.5vw]">
          No Matter
          <br />
          <span className="italic text-brass">What.</span>
        </h1>

        <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-paper-light/15 pt-8">
          <p className="max-w-md text-paper-light/75 leading-relaxed">
            Un grand-père qui a commencé avec un comptoir et une théière. Trois
            générations plus tard, un même mot d&apos;ordre : peu importe.
            On continue.
          </p>

          <a
            href="#histoire"
            className="group inline-flex items-center gap-3 font-utility text-[11px] uppercase tracking-[0.16em] text-paper-light/85"
          >
            <span className="relative">
              Découvrir l&apos;histoire
              <span className="absolute left-0 -bottom-1 h-px w-full bg-paper-light/40 origin-left scale-x-100 transition-transform group-hover:scale-x-0" />
            </span>
            <span className="inline-block h-8 w-8 rounded-full border border-paper-light/30 grid place-items-center transition-colors group-hover:border-brass group-hover:text-brass">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
