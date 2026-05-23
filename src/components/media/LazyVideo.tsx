"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toCdnMediaUrl } from "@/lib/cdn";

type VideoSource = { src: string; type: string };

type LazyVideoProps = {
  className?: string;
  poster?: string;
  sources: VideoSource[];
  rootMargin?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
};

export default function LazyVideo({
  className,
  poster,
  sources,
  rootMargin = "200px",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const optimizedPoster = useMemo(() => (poster ? toCdnMediaUrl(poster, { resourceType: "image" }) : undefined), [poster]);
  const optimizedSources = useMemo(
    () => sources.map((source) => ({ ...source, src: toCdnMediaUrl(source.src, { resourceType: "video" }) })),
    [sources],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!shouldLoad) return;
    ref.current?.load();
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload="metadata"
      poster={optimizedPoster}
      className={className}
    >
      {shouldLoad &&
        optimizedSources.map((source) => (
          <source key={`${source.type}-${source.src}`} src={source.src} type={source.type} />
        ))}
    </video>
  );
}
