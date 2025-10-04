import NewsDetailClient from "@/components/NewsDetailClient";
import { apiGet } from "@/lib/api";
import { contentImageUrl } from "@/lib/server/image";

type RouteParams = { id: string };

export default async function NewsDetailPage({
  params,
}: { params: Promise<RouteParams> }) {
  const { id } = await params;

  const raw = await apiGet<any>(`/ContentView?contentId=${encodeURIComponent(id)}`);

  const content = {
    contentID: raw.contentID ?? raw.contentId ?? Number(id),
    contentTitle: raw.contentTitle ?? raw.title ?? "Untitled",
    originalPrice: raw.originalPrice ?? 0,
    discountedPrice: raw.discountedPrice ?? 0,
    discountPercentage: raw.discountPercentage ?? 0,
    shortDescription: raw.shortDescription ?? raw.contentDescription ?? "",
    imageUrl: contentImageUrl(Number(id)),
    imageUrls: [contentImageUrl(Number(id))],
  };

  return <NewsDetailClient content={content} />;
}
