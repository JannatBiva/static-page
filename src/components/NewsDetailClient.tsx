"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { BsGift } from "react-icons/bs";

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
  storeName?: string;
  followers?: number;
}

export default function NewsDetailClient({ content }: { content: ContentDetail }) {
  const BRAND = "#13BC2E";

  const gallery = useMemo(
    () => (content.imageUrls?.length ? content.imageUrls : [content.imageUrl ?? "/placeholder.png"]),
    [content.imageUrl, content.imageUrls]
  );
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedImg = gallery[selectedIdx];

  const [likes, setLikes] = useState(content.initialLikes ?? 0);
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked(v => !v);
    setLikes(n => (liked ? Math.max(0, n - 1) : n + 1));
  };

  const clamp = (n: number) => Math.min(5, Math.max(0, n));
  const [rating, setRating] = useState<number>(clamp(content.initialRating ?? 0));
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

  const isReasonableNewItem = content.discountPercentage >= 10;
  const showPrice = content.discountedPrice > 0 ? content.discountedPrice : content.originalPrice;
  const fy = Math.round((showPrice || 0) * 0.1 * 10) / 10;

  return (
    <div className="w-full px-3 sm:px-6 md:px-8 py-8 grid gap-1 md:gap-2 md:grid-cols-[78px_minmax(0,500px)_1fr]">
      <div className="order-2 md:order-1 flex md:flex-col gap-2 md:sticky md:top-24 self-start md:pr-1">
        {gallery.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setSelectedIdx(i)}
            className={`relative h-[68px] w-[68px] rounded-lg overflow-hidden transition
              ${i === selectedIdx
                ? "border-2 border-blue-500 shadow-sm"
                : "border border-gray-200 hover:border-blue-400"
              }`}
            aria-label={`View image ${i + 1}`}
            title={`View image ${i + 1}`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="68px" />
          </button>
        ))}
      </div>

      <div className="order-1 md:order-2 relative">
        <div className="relative w-full max-w-[480px] aspect-square overflow-hidden group">
          <Image
            src={selectedImg}
            alt={content.contentTitle}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
          />
          <div className="absolute top-3 right-3 z-10 flex flex-col items-center gap-2">
            {content.discountPercentage > 0 && (
              <span
                className="px-2 py-1 rounded-md text-white text-xs leading-none"
                style={{ backgroundColor: BRAND }}
              >
                -{content.discountPercentage}%
              </span>
            )}
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={toggleLike}
                className="flex items-center justify-center w-9 h-9 rounded-md bg-white/95 shadow-md ring-1 ring-black/5"
                title="Favorite"
                aria-pressed={liked}
              >
                <span
                  className={`text-[18px] ${liked ? "" : "text-green-600"}`}
                  style={liked ? { color: BRAND } : undefined}
                >
                  ♡
                </span>
              </button>
              <span className="text-xs text-white drop-shadow-[0_1px_2px_rgba(0,0,0,.8)]">
                {likes}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-3 flex flex-col gap-4">
        <h1 className="text-[26px] md:text-[28px] font-medium">{content.contentTitle}</h1>

        <div className="flex items-baseline gap-3">
          <span className="text-[24px] font-semibold text-black">
            {showPrice} ৳
          </span>
          {content.discountedPrice > 0 && (
            <span className="text-gray-400 line-through">{content.originalPrice} ৳</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[18px]">
          {[1, 2, 3, 4, 5].map(i => {
            const filled = (hoverRating || rating) >= i;
            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i)}
                aria-label={`Rate ${i}`}
                className="leading-none"
                style={{ color: BRAND }}
              >
                {filled ? "★" : "☆"}
              </button>
            );
          })}
          <span className="text-gray-600 text-sm ml-1">(0)</span>
        </div>

        {isReasonableNewItem && (
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-2 max-w-fit rounded-full px-3 py-1 text-sm border"
              style={{ color: BRAND, borderColor: BRAND }}
            >
              ↘ Reasonable New Item
            </span>
            <div className="relative flex-shrink-0">
              <span className="group inline-flex items-center justify-center w-5 h-5 rounded-full border text-xs text-gray-500 cursor-pointer">
                ?
                <div
                  className="absolute top-full mt-1 -left-40 w-64 p-2 text-xs text-white bg-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-20 pointer-events-none"
                >
                  This item is marked as a reasonable new product based on Wetopian standards.
                </div>
              </span>
            </div>
          </div>
        )}

        <p className="text-gray-700">Discount ends in '37 days'</p>

        <div className="flex items-center gap-2 relative">
          <BsGift className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-gray-800">
            {fy} ৳ is treated as your FY investment too!
          </span>
          <div className="relative flex-shrink-0">
            <span className="group inline-flex items-center justify-center w-5 h-5 rounded-full border text-xs text-gray-500 cursor-pointer">
              ?
              <div
                className="absolute top-full right-0 mt-1 w-64 p-2 text-xs text-white bg-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-20 pointer-events-none"
              >
                You will get the product and {fy} ৳ is treated as your investment in our
                business for the fiscal year, making you eligible to receive a share of
                our annual profits. Learn more about Wetopian Business Model.
              </div>
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-1 flex-wrap items-center">
          <button
            type="button"
            className="px-20 h-10 rounded-md text-white font-medium"
            style={{ backgroundColor: BRAND }}
          >
            Buy now
          </button>
          <button
            type="button"
            className="px-20 h-10 rounded-md border font-medium hover:bg-gray-200"
          >
            Add to cart
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center rounded-full justify-center h-10 w-10 hover:bg-gray-100"
              aria-label="Share"
              title="Share"
            >
              <FiShare2 className="h-5 w-5" />
            </button>
            <span
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-white text-[12px] leading-6 text-center"
              style={{ backgroundColor: BRAND }}
            >
              ৳
            </span>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{content.shortDescription ?? "No description provided."}</p>

        <div className="mt-10 rounded-xl border border-gray-300 bg-gray-100 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-[18px] font-semibold"
              style={{ color: BRAND }}
            >
              ET
            </div>
            <div>
              <div className="text-[18px] font-medium">{content.storeName ?? "Elegant Terra"}</div>
              <div className="text-gray-500 text-sm">Traditional Business</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="px-6 h-10 rounded-md border font-medium hover:bg-white">
              Follow
            </button>
            <div className="text-gray-500 text-sm">
              {content.followers ?? 0} followers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
