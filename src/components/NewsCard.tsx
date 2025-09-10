import Image from "next/image";
import Link from "next/link";

export type NewsCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  comments?: number;
  imageUrl?: string;
  storeName?: string;
};

export default function NewsCard({
  slug,
  title,
  excerpt,
  comments = 0,
  imageUrl,
  storeName = "Unknown Store",
}: NewsCardProps) {
  return (
    <article className="flex flex-col overflow-hidden bg-white ring-1 ring-gray-200 shadow-sm rounded-md">
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex-1 p-6">
        <h3 className="mb-2 text-[20px] font-semibold text-slate-600">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mb-2">👤 {storeName}</p>
        <p className="leading-relaxed text-slate-500">{excerpt}</p>
      </div>

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
