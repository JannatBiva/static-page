export default function Cta() {
  return (
    <section id="contact" className="bg-brand-teal text-white">
      <div className="container flex flex-col md:flex-row items-center py-16 md:py-20 gap-8 mt-16">
        <div className="flex items-center justify-center h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40">
          <span className="text-white text-6xl md:text-7xl lg:text-8xl font-bold">✉️</span>
        </div>

        <div className="hidden md:block w-px bg-white/30 h-28" />

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-thin">
            Consed quatur etm magniset nis quitris?
          </h3>

          <p className="mt-4 text-white/90 text-sm md:text-base font-thin max-w-xl">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur sedits aut
            odit fugit, sed quia magni dolores eos qui ratione sequi nesciunt.
          </p>

          <form className="mt-6 flex flex-col md:flex-row items-stretch gap-3 max-w-xl mx-auto md:mx-0">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              aria-label="Email address"
              autoComplete="email"
              inputMode="email"
              className="w-full rounded-lg bg-gray-200 px-3 py-2 text-black text-sm md:text-base
             placeholder:text-gray-500 focus:outline-none"
            />

            <button
              className="w-full md:w-auto shrink-0 rounded-lg bg-yellow-400 px-3 md:px-5 py-2
             text-sm md:text-base text-white font-semibold
             hover:bg-white hover:text-black transition-colors whitespace-nowrap"
            >
              GET STARTED!
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
