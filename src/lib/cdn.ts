type CdnProvider = "none" | "cloudflare-r2" | "cloudinary" | "imagekit" | "bunnycdn";
type MediaResourceType = "image" | "video";

const provider = (process.env.NEXT_PUBLIC_MEDIA_CDN_PROVIDER ?? "none").toLowerCase() as CdnProvider;
const baseUrl = (process.env.NEXT_PUBLIC_MEDIA_CDN_BASE_URL ?? "").trim();
const cloudinaryCloud = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "").trim();

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

function normalizeToPath(value: string): string {
  if (!value) return "";
  if (isAbsoluteUrl(value)) {
    const url = new URL(value);
    return `${url.pathname}${url.search}`;
  }
  return value.startsWith("/") ? value : `/${value}`;
}

export function getMediaCdnProvider(): CdnProvider {
  return provider;
}

export function toCdnMediaUrl(src: string, opts?: { resourceType?: MediaResourceType }): string {
  const resourceType = opts?.resourceType ?? "image";
  if (!src) return src;

  if (provider === "none") return src;

  if (provider === "cloudinary" && cloudinaryCloud) {
    const origin =
      process.env.NEXT_PUBLIC_SITE_ORIGIN?.trim() ||
      process.env.NEXT_PUBLIC_APP_URL?.trim() ||
      "http://localhost:3000";
    const absolute = isAbsoluteUrl(src) ? src : new URL(src.startsWith("/") ? src : `/${src}`, origin).toString();
    const encoded = encodeURIComponent(absolute);
    const kind = resourceType === "video" ? "video" : "image";
    return `https://res.cloudinary.com/${cloudinaryCloud}/${kind}/fetch/f_auto,q_auto/${encoded}`;
  }

  if (!baseUrl) return src;
  const normalizedBase = baseUrl.replace(/\/+$/g, "");
  const path = normalizeToPath(src);

  if (provider === "imagekit") {
    const [pathname, query = ""] = path.split("?");
    const tr = "tr=f-auto,q-auto";
    const joiner = query ? "&" : "";
    return `${normalizedBase}${pathname}?${tr}${joiner}${query}`;
  }

  if (provider === "cloudflare-r2" || provider === "bunnycdn") {
    const safePath = trimSlashes(path);
    return `${normalizedBase}/${safePath}`;
  }

  return `${normalizedBase}${path}`;
}
