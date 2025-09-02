import Link from "next/link";

type CardColor = "green" | "yellow" | "blue";

type NewsCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  author?: string;
  comments?: number;
  color?: CardColor;
};

const HEADER_BG: Record<CardColor, string> = {
  green: "bg-green-600",
  yellow: "bg-yellow-400",
  blue: "bg-blue-800",
};

export default function NewsCard({
  slug,
  title,
  excerpt,
  author = "John Doe",
  comments = 0,
  color = "green",
}: NewsCardProps) {
  return (
    <article className="flex flex-col overflow-hidden bg-white ring-1 ring-gray-200 shadow-sm rounded-md">
      {/* Colored header */}
      <div
        className={`w-full h-48 sm:h-56 md:h-64 ${HEADER_BG[color]} transition-all`}
        aria-hidden="true"
      />

      {/* Divider */}
      <div className="h-px w-full bg-gray-200" />

      {/* Content */}
      <div className="flex-1 p-6">
        <h3 className="mb-2 text-[20px] font-semibold text-slate-600">
          {title}
        </h3>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>👤 By {author}</span>
          <span>|</span>
          <span>🏷️ Marketing, Design</span>
        </div>

        <p className="leading-relaxed text-slate-500">{excerpt}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 pb-6">
        <Link
          href={`/news/${slug}`}
          aria-label={`Read more about ${title}`}
          className="inline-flex items-center justify-center rounded-md border border-sky-500 px-3 py-1.5
                     text-sm text-sky-600 transition-colors hover:bg-sky-50"
        >
          Read More
        </Link>

        <span className="inline-flex items-center gap-1.5 text-slate-500">
          💬 {comments}
        </span>
      </div>
    </article>
  );
}
