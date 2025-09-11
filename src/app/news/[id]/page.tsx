import NewsDetailClient from "@/components/NewsDetailClient";

type RouteParams = { id: string };

export default async function NewsDetailPage({
  params,
}: { params: Promise<RouteParams> }) {
  const { id } = await params;

  const res = await fetch(
    `https://api.wediscount.org/api/v1/ContentView?contentId=${encodeURIComponent(id)}`,
    { cache: "no-store", headers: { accept: "application/json" } }
  );
  if (!res.ok) throw new Error("Failed to fetch content details");
  const raw = await res.json();

  const content = {
    contentID: raw.contentID ?? raw.contentId ?? Number(id),
    contentTitle: raw.contentTitle ?? raw.title ?? "Untitled",
    originalPrice: raw.originalPrice ?? 0,
    discountedPrice: raw.discountedPrice ?? 0,
    discountPercentage: raw.discountPercentage ?? 0,
    shortDescription: raw.shortDescription ?? raw.contentDescription ?? "",
    imageUrl: undefined,
    imageUrls: [],
  };

  return <NewsDetailClient content={content} />;
}
