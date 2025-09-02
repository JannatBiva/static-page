export default function WhyChoose() {
  const cards = [
    {
      title: "WEB DESIGN & DEVELOPMENT",
      desc: "You are a great netsum who do not know how to follow reason. Nor is there any further reason, because pleasure is the very reason.",
      color: "bg-yellow-400",
    },
    {
      title: "ADOBE PHOTOSHOP / ILLUSTRATOR",
      desc: "You are a great netsum who do not know how to follow reason. Nor is there any further reason, because pleasure is the very reason.",
      color: "bg-red-400",
    },
    {
      title: "SEARCH ENGINE OPTIMIZATION",
      desc: "You are a great netsum who do not know how to follow reason. Nor is there any further reason, because pleasure is the very reason.",
      color: "bg-sky-400",
    },
  ];

  return (
    <section id="services" className="bg-white py-16 scroll-mt-24">
      <div className="container">
       
        <h2 className="mt-8 text-4xl font-light text-[#444] text-center">
          Why choose Simplé?
        </h2>

        <div className="relative mx-auto mt-6 h-[1px] w-24 bg-brand-teal">
          <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-teal bg-white"></span>
        </div>

        <p className="mt-4 text-center text-base font-thin italic max-w-[700px] mx-auto text-brand-gray">
          There are many variations of passages of Lorem Ipsum available, but the majority have
          suffered alteration, by injected humour, or new randomised words which don't look believable.
        </p>

   
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          {cards.map((c) => (
            <article key={c.title} className="w-full max-w-[350px] rounded-md overflow-hidden">
            
              <div
                className={`relative aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-[320px] ${c.color} overflow-hidden`}
              ></div>

              <div className="border border-gray-300 bg-gray-100 px-6 py-6 rounded-b-md md:h-[250px]">
                <h3 className="pt-3 text-center text-[16px] font-bold text-brand-dark">
                  {c.title}
                </h3>
                <p className="mt-3 text-center text-[15px] font-thin text-brand-gray leading-relaxed">
                  {c.desc}
                </p>
                <div className="mt-4 flex justify-center">
                  <a
                    href="#"
                    role="button"
                    className="px-4 py-2 text-[12px] uppercase font-bold text-brand-blue border border-brand-blue rounded-md hover:bg-brand-teal hover:text-white transition-colors"
                  >
                    Discover More
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
