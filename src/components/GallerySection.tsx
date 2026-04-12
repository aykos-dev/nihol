import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import interiorImg from "@/assets/nihol-interior.png";
import buildingImg from "@/assets/nihol-building.jpg";
import coasterImg from "@/assets/nihol-coaster.png";
import dish1 from "@/assets/dish-1.jpg";

const images = [
  { src: buildingImg, alt: "Nihol binosi", span: "col-span-2 row-span-2" },
  { src: interiorImg, alt: "Restoran ichki ko'rinishi", span: "col-span-1" },
  { src: dish1, alt: "Taom", span: "col-span-1" },
  { src: coasterImg, alt: "Nihol brendi", span: "col-span-1" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream-dark overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`overflow-hidden rounded-sm ${i === 0 ? "md:" + img.span : ""}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{ y: i % 2 === 0 ? y1 : y2 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 min-h-[250px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
