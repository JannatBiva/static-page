import "server-only";

const RAW_BASE = process.env.API_BASE ?? process.env.NEXT_PUBLIC_API_BASE;
const API_BASE = RAW_BASE ? RAW_BASE.replace(/\/+$/, "") : "";

if (!API_BASE) {
  throw new Error("API_BASE (or NEXT_PUBLIC_API_BASE) is not defined in environment variables");
}

function buildUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

export async function apiGet<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = buildUrl(path);
  const res = await fetch(url, {
    cache: "no-store",
    headers: { accept: "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} @ ${url}\n${body.slice(0, 200)}`);
  }

  return res.json() as Promise<T>;
}
