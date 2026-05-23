"use client";

import Image, { type ImageProps } from "next/image";
import { toCdnMediaUrl } from "@/lib/cdn";

type OptimizedImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"];
};

function isAbsolute(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

export default function OptimizedImage({ src, sizes, priority, loading, unoptimized, ...rest }: OptimizedImageProps) {
  const cdnSrc = typeof src === "string" ? toCdnMediaUrl(src, { resourceType: "image" }) : src;
  const isRemote = typeof cdnSrc === "string" && isAbsolute(cdnSrc);

  return (
    <Image
      src={cdnSrc}
      sizes={sizes ?? "100vw"}
      decoding="async"
      loading={priority ? undefined : (loading ?? "lazy")}
      unoptimized={unoptimized ?? isRemote}
      priority={priority}
      {...rest}
    />
  );
}
