export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative isolate bg-brand-teal text-white w-full
        flex items-center
        scroll-mt-24               /* lands below sticky navbar */
        min-h-[320px] sm:min-h-[420px] /* prevents 'too short' on tiny screens */
        aspect-[16/6] md:aspect-[16/8] lg:aspect-[16/6]
      "
    >
      <div className="container py-6">
        <div className="max-w-lg break-words text-balance">
          <h1 className="font-semibold leading-tight text-[clamp(1.3rem,3vw,2.5rem)]">
            Passion For Design
          </h1>

          <p className="mt-4 leading-relaxed text-[clamp(0.8rem,1.8vw,1rem)] text-white/90">
            Design and style should work toward making you look good and feel good —
            without a lot of effort — so you can get on with the things that matter.
          </p>

          <div className="mt-6">
            <a
              href="#services"
              className="
                inline-flex items-center gap-2 rounded-lg bg-white/10
                px-[clamp(0.8rem,2vw,1.2rem)]
                py-[clamp(0.4rem,1.2vw,0.6rem)]
                text-[clamp(0.75rem,1.5vw,0.9rem)]
                ring-1 ring-inset ring-white/30 hover:bg-white/20 transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal
              "
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
