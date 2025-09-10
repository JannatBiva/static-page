"use client";

import Image from "next/image";
import { useState } from "react";

interface ContentDetail {
  contentID: number;
  contentTitle: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  shortDescription?: string;
  imageUrl?: string;
  imageUrls?: string[];
  initialLikes?: number;
  initialRating?: number;
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="18" cy="5" r="3" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" strokeWidth="2" />
      <path d="M8.59 13.51l6.83 3.98" strokeWidth="2" />
      <path d="M15.41 6.51L8.59 10.49" strokeWidth="2" />
    </svg>
  );
}

function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="8" width="18" height="13" rx="2" strokeWidth="2" />
      <path d="M3 12h18" strokeWidth="2" />
      <path d="M12 21V8" strokeWidth="2" />
      <path d="M12 8c-2 0-6-.5-6-2.5A2.5 2.5 0 0 1 8.5 3C10 3 12 5 12 8Z" strokeWidth="2" />
      <path d="M12 8c2 0 6-.5 6-2.5A2.5 2.5 0 0 0 15.5 3C14 3 12 5 12 8Z" strokeWidth="2" />
    </svg>
  );
}

export default function NewsDetailClient({ content }: { content: ContentDetail }) {
  const gallery = content.imageUrls?.length ? content.imageUrls : [content.imageUrl ?? "/placeholder.png"];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedImg = gallery[selectedIdx];

  const [likes, setLikes] = useState(content.initialLikes ?? 0);
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked((p) => !p);
    setLikes((n) => (liked ? Math.max(0, n - 1) : n + 1));
  };

  const clamp = (n: number) => Math.min(5, Math.max(1, n));
  const [rating, setRating] = useState<number>(clamp(content.initialRating ?? 0) || 0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: content.contentTitle, text: content.shortDescription ?? "", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch {}
  };

  const isAffordableNewItem = content.discountPercentage >= 10;

  return (
    <div className="container mx-auto px-4 py-10 grid gap-6 md:gap-10 md:grid-cols-[96px_minmax(0,560px)_1fr]">
      <div className="order-2 md:order-1 flex md:flex-col gap-3 md:top-24">
        {gallery.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setSelectedIdx(i)}
            className={`relative h-20 w-20 overflow-hidden rounded-xl ring-2 transition ${
              i === selectedIdx ? "ring-green-500" : "ring-transparent hover:ring-gray-300"
            }`}
            aria-label={`View image ${i + 1}`}
            title={`View image ${i + 1}`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>

      <div className="order-1 md:order-2 relative">
        <div className="relative w-full aspect-square">
          <Image
            src={selectedImg}
            alt={content.contentTitle}
            fill
            className="rounded-2xl object-cover"
            sizes="(max-width: 768px) 100vw, 560px"
            priority
          />
        </div>

        {content.discountPercentage > 0 && (
          <span className="absolute top-3 right-3 bg-green-600 text-white px-2 py-0.5 text-xs rounded-md">
            -{content.discountPercentage}%
          </span>
        )}

        <button
          type="button"
          onClick={toggleLike}
          className="absolute top-3 right-16 select-none bg-white/90 backdrop-blur rounded-full px-3 py-1 shadow hover:bg-white active:scale-95 transition"
          aria-pressed={liked}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          title="Favorite"
        >
          <span className="mr-1">{liked ? "❤️" : "🤍"}</span>
          <span className="text-sm">{likes}</span>
        </button>
      </div>

      <div className="order-3 flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold">{content.contentTitle}</h1>

        <div className="flex items-center gap-4 text-lg">
          <span className="text-green-600 font-bold">
            {content.discountedPrice > 0 ? `৳${content.discountedPrice}` : `৳${content.originalPrice}`}
          </span>
          {content.discountedPrice > 0 && <span className="line-through text-gray-500">৳{content.originalPrice}</span>}
        </div>

        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((i) => {
            const filled = (hoverRating || rating) >= i;
            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i)}
                className="text-2xl leading-none"
                aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
                title={`Rate ${i}`}
              >
                {filled ? "★" : "☆"}
              </button>
            );
          })}
          <span className="text-gray-500 text-sm ml-2">({rating || 0})</span>
        </div>

        {isAffordableNewItem && (
          <span className="inline-flex w-auto max-w-fit border border-green-500 text-green-600 px-2 py-0.5 rounded text-xs">
            Affordable New Item
          </span>
        )}

        <p className="text-gray-600 leading-relaxed">{content.shortDescription ?? "No description provided."}</p>

        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <GiftIcon className="h-4 w-4 text-green-600" />
          {Math.round((content.discountedPrice || content.originalPrice) * 0.1)} ৳ is treated as your FY investment too!
        </p>

        <div className="flex gap-3 mt-2 flex-wrap items-center">
          <button
            type="button"
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 active:scale-[.98] transition"
          >
            Buy now
          </button>
          <button
            type="button"
            className="border px-6 py-2 rounded-lg hover:bg-gray-100 active:scale-[.98] transition"
          >
            Add to cart
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border hover:bg-gray-100 active:scale-[.98] transition"
            aria-label="Share"
            title="Share"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
