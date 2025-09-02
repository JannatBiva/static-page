export default function About() {
  const features = [
    "Clean & modern UI",
    "Responsive across devices",
    "Content-first approach",
  ];

  return (
    <section id="about-us" className="section bg-white font-sans">
      <div className="container grid items-center md:grid-cols-[1fr_1.15fr] gap-6 md:gap-x-8">

        <div className="flex justify-center">
          <div className="aspect-square w-48 md:w-64 lg:w-72 max-w-[450px] rounded-2xl bg-gradient-to-br from-brand-teal/20 to-brand-accent/30" />
        </div>

        <div className="max-w-[640px]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin">
            Passionate about crafting smart design
          </h2>

          <p className="mt-4 font-thin text-brand-gray">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia magni
            dolores eos qui ratione sequi nesciunt.
          </p>

          <ul className="mt-5 space-y-4 md:space-y-6 text-brand-gray">
            {features.map((item) => (
              <li key={item} className="group flex items-center font-thin gap-6">
                <span
                  aria-hidden="true"
                  className="
                    grid place-items-center 
                    h-12 w-12 rounded-full
                    bg-brand-teal text-white
                    ring-2 ring-brand-teal
                    transition-colors
                    group-hover:bg-white group-hover:text-brand-teal
                  "
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full mt-12 h-[1px] bg-gray-200 shadow-card"></div>

      <div className="container mt-12 grid grid-cols-2 md:grid-cols-6 gap-6 opacity-70">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-14 rounded bg-gradient-to-br from-brand-teal/20 to-brand-accent/30"
          />
        ))}
      </div>
    </section>
  );
}
