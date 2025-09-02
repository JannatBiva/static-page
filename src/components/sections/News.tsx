import NewsCard from "@/components/NewsCard";

export default function News() {
  return (
    <section id="showcase" className="scroll-mt-24 mt-2 mb-6 bg-gray-200 py-16 text-white">
      <div className="container">

        <h2 className="mt-8 text-4xl font-light text-center text-gray-700">
          News & Announcements
        </h2>


        <div className="relative mx-auto mt-6 h-[1px] w-24 bg-brand-teal">
          <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-teal bg-white"></span>
        </div>


        <p className="mt-4 text-center text-base font-thin italic max-w-[700px] mx-auto text-gray-600">
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration, by injected humour, or new randomised
          words which don't look believable.
        </p>
      </div>


      <div className="container mt-12 grid gap-8 md:grid-cols-3">
        <NewsCard
          slug="lorem-ipsum-1"
          title="Lorem ipsum sit netsum amet."
          excerpt="Quis autem velis reprehenderit etims quiste voluptate velit esse quam nihil ets illum sedit consequat qui voluptas sit aspernatur."
          comments={8}
          color="green"
        />
        <NewsCard
          slug="lorem-ipsum-2"
          title="Lorem ipsum sit netsum amet."
          excerpt="Quis autem velis reprehenderit etims quiste voluptate velit esse quam nihil ets illum sedit consequat qui voluptas sit aspernatur."
          comments={4}
          color="yellow"
        />
        <NewsCard
          slug="lorem-ipsum-3"
          title="Lorem ipsum sit netsum amet."
          excerpt="Quis autem velis reprehenderit etims quiste voluptate velit esse quam nihil ets illum sedit consequat qui voluptas sit aspernatur."
          comments={5}
          color="blue"
        />
      </div>
    </section>
  );
}
