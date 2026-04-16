import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import interiorImg from "@/assets/nihol-interior.png";
import buildingImg from "@/assets/nihol-building.jpg";
import coasterImg from "@/assets/nihol-coaster.png";
import dish1 from "@/assets/dish-1.jpg";
import room1 from "@/assets/room-1.jpg";
import room3 from "@/assets/room-3.jpg";

const images = [
  { src: buildingImg, alt: "Nihol binosi" },
  { src: interiorImg, alt: "Restoran ichki ko'rinishi" },
  { src: dish1, alt: "Taom" },
  { src: coasterImg, alt: "Nihol brendi" },
  { src: room1, alt: "Xona 1" },
  { src: room3, alt: "Xona 3" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream-dark overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
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

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-sm aspect-[16/9] bg-forest-dark">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={current}
              src={images[current].src}
              alt={images[current].alt}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-forest-dark/60 hover:bg-forest-dark/80 text-cream rounded-full transition-colors"
            aria-label="Oldingi"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-forest-dark/60 hover:bg-forest-dark/80 text-cream rounded-full transition-colors"
            aria-label="Keyingi"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-gold w-6" : "bg-cream/40 hover:bg-cream/60"
                }`}
                aria-label={`Rasm ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
