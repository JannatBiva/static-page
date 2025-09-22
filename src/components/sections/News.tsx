import NewsCard from "@/components/NewsCard";
import { apiGet } from "@/lib/api";
import { contentImageUrl } from "@/lib/server/image";

type ApiItem = {
  contentID: number;
  contentTitle: string;
  originalPrice: number;
  discountedPrice: number;
  isDiscountedContent: boolean;
  discountPercentage: number;
  slug?: string;
  channelName: string;
};

export default async function News() {
  const raw = await apiGet<any>("/GetMostRecentContentsAsync");
  const items: ApiItem[] = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];

  return (
    <section id="showcase" className="mt-2 mb-6 bg-dark-grey py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="mt-8 text-4xl font-light text-[#444] text-center">News & Announcements</h2>
        <div className="relative mx-auto mt-6 h-[1px] w-24 bg-brand-teal">
          <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-teal bg-white" />
        </div>
        <p className="mt-4 text-center text-m font-thin italic max-w-[700px] mx-auto">
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration, by injected humour, or new randomised
          words which don't look believable.
        </p>
      </div>

      <div className="container mt-12 grid gap-8 md:grid-cols-3">
        {items.length > 0 ? (
          items.slice(0, 6).map((item) => {
            const priceLine = item.isDiscountedContent
              ? `৳${item.discountedPrice} • ${item.discountPercentage}% off (was ৳${item.originalPrice})`
              : `৳${item.originalPrice}`;

            return (
              <NewsCard
                key={item.contentID}
                slug={String(item.contentID)}
                title={item.contentTitle}
                excerpt={priceLine}
                storeName={item.channelName}
                imageUrl={contentImageUrl(item.contentID)}
                comments={0}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-3">No news available right now.</p>
        )}
      </div>
    </section>
  );
}
