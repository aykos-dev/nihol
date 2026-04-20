import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import patternBg from "@/assets/pattern-bg.png";

type GalleryImage = { src: string; alt: string };

const galleryModules = import.meta.glob<string>("../assets/gallery/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
  eager: true,
  import: "default",
});

const galleryImages: GalleryImage[] = Object.entries(galleryModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: "base" }))
  .map(([path, src], index) => {
    const stem = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? `gallery-${index + 1}`;
    return { src, alt: `Galereya ${stem}` };
  });

function rotateImages(offset: number): GalleryImage[] {
  if (galleryImages.length === 0) return [];
  const normalized = ((offset % galleryImages.length) + galleryImages.length) % galleryImages.length;
  return [...galleryImages.slice(normalized), ...galleryImages.slice(0, normalized)];
}

const featuredImages = rotateImages(0);
const small1 = rotateImages(1);
const small2 = rotateImages(2);
const small3 = rotateImages(3);
const small4 = rotateImages(4);

function GalleryCard({
  images,
  className,
  isPlaying,
  autoMs,
  eager,
  startIndex = 0,
}: {
  images: GalleryImage[];
  className: string;
  isPlaying: boolean;
  autoMs: number;
  eager?: boolean;
  startIndex?: number;
}) {
  const [idx, setIdx] = useState(startIndex % Math.max(images.length, 1));
  const current = images[idx] ?? images[0];

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const timer = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, autoMs);

    return () => window.clearInterval(timer);
  }, [autoMs, images, isPlaying]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="w-full h-full object-cover rounded-sm"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          initial={{ opacity: 0, y: 10, scale: 1.01 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.99 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      </AnimatePresence>
    </div>
  );
}

const GallerySection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream-dark relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url(${patternBg})`, backgroundSize: "400px", backgroundRepeat: "repeat" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10" ref={ref as React.RefObject<HTMLDivElement>}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">Vizual sayohat</span>
          <div className="gold-separator mx-auto mt-4 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-foreground">Galereya</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-5 md:gap-7 items-start">
          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 }}
              whileHover={{ y: -4 }}
            >
              <GalleryCard
                images={featuredImages}
                isPlaying={inView}
                autoMs={7600}
                startIndex={0}
                eager
                className="relative overflow-hidden rounded-sm border border-gold/25 shadow-2xl bg-forest-dark aspect-[16/9]"
              />
            </motion.div>
          </div>

          <div className="md:col-span-4">
            <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 }}
                whileHover={{ y: -3 }}
              >
                <GalleryCard
                  images={small1}
                  isPlaying={inView}
                  autoMs={8400}
                  startIndex={1}
                  className="relative overflow-hidden rounded-sm border border-gold/25 bg-forest-dark shadow-xl aspect-[4/3]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.28 }}
                whileHover={{ y: -3 }}
              >
                <GalleryCard
                  images={small2}
                  isPlaying={inView}
                  autoMs={9000}
                  startIndex={2}
                  className="relative overflow-hidden rounded-sm border border-gold/25 bg-forest-dark shadow-xl aspect-[4/3]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.36 }}
                whileHover={{ y: -3 }}
              >
                <GalleryCard
                  images={small3}
                  isPlaying={inView}
                  autoMs={9600}
                  startIndex={0}
                  className="relative overflow-hidden rounded-sm border border-gold/25 bg-forest-dark shadow-xl aspect-[4/3]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.44 }}
                whileHover={{ y: -3 }}
              >
                <GalleryCard
                  images={small4}
                  isPlaying={inView}
                  autoMs={10200}
                  startIndex={1}
                  className="relative overflow-hidden rounded-sm border border-gold/25 bg-forest-dark shadow-xl aspect-[4/3]"
                />
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
