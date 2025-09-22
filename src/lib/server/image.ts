const BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_CONTENT
  ?? (process.env.IMAGE_CDN_BASE ? `${process.env.IMAGE_CDN_BASE}/Contents` : "https://pub-9f3006068d46453b82913f81f7877447.r2.dev/Contents");

const CHANNEL_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_CHANNEL
  ?? (process.env.IMAGE_CDN_BASE ? `${process.env.IMAGE_CDN_BASE}/Channels` : "https://pub-9f3006068d46453b82913f81f7877447.r2.dev/Channels");

export const contentImageUrl = (contentID: number | string) => `${BASE}/${contentID}.png`;
export const channelImageUrl = (channelID: number | string) => `${CHANNEL_BASE}/${channelID}.png`;
