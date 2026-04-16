import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import interiorImg from "@/assets/nihol-interior.png";
import buildingImg from "@/assets/nihol-building.jpg";
import coasterImg from "@/assets/nihol-coaster.png";
import dish1 from "@/assets/dish-1.jpg";
import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";
import room4 from "@/assets/room-4.jpg";
import room5 from "@/assets/room-5.jpg";
import patternBg from "@/assets/pattern-bg.png";

const allImages = [
  { src: buildingImg, alt: "Nihol binosi" },
  { src: interiorImg, alt: "Restoran ichki ko'rinishi" },
  { src: dish1, alt: "Taom" },
  { src: coasterImg, alt: "Nihol brendi" },
  { src: room1, alt: "Xona 1" },
  { src: room2, alt: "Xona 2" },
  { src: room3, alt: "Xona 3" },
  { src: room4, alt: "Xona 4" },
  { src: room5, alt: "Xona 5" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 5;

  const advance = useCallback(() => {
    setStartIdx((prev) => (prev + 1) % allImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 3000);
    return () => clearInterval(timer);
  }, [advance]);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIdx + i) % allImages.length;
      items.push({ ...allImages[idx], key: `${startIdx}-${i}` });
    }
    return items;
  };

  const visible = getVisible();

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream-dark relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url(${patternBg})`, backgroundSize: "400px", backgroundRepeat: "repeat" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10" ref={ref}>
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

        {/* 5 images with individual rotation animation */}
        <div className="flex gap-4 justify-center items-center">
          {visible.map((img, i) => {
            const isCenter = i === 2;
            const rotations = [-4, -2, 0, 2, 4];
            return (
              <motion.div
                key={img.key}
                className={`relative overflow-hidden rounded-sm flex-shrink-0 ${
                  isCenter ? "w-1/4 z-10" : "w-1/5"
                }`}
                initial={{ opacity: 0, rotate: rotations[i] * 2, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  rotate: rotations[i],
                  scale: isCenter ? 1.05 : 1,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: "center bottom" }}
              >
                <div className={`aspect-[3/4] ${isCenter ? "shadow-2xl ring-2 ring-gold/20" : "shadow-lg"}`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded-sm"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === startIdx ? "bg-gold w-6" : "bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Rasm ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
