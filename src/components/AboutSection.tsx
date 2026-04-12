import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import interiorImg from "@/assets/nihol-interior.png";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image with parallax */}
          <motion.div
            className="relative overflow-hidden rounded-sm"
            style={{ y: imgY }}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <img
              src={interiorImg}
              alt="Nihol restoran ichki ko'rinishi"
              className="w-full h-[400px] md:h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-forest-dark/10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">Biz haqimizda</span>
            <div className="gold-separator mt-4 mb-6" />
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-8">
              Nihol — Kafe va Restoran
            </h2>
            <p className="font-editorial text-lg text-muted-foreground leading-relaxed mb-6">
              Nihol — bu nafaqat restoran, balki an'anaviy o'zbek oshxonasining zamonaviy talqini. 
              Biz har bir taomni eng sifatli mahsulotlardan, an'anaviy retseptlar asosida 
              tayyorlaymiz.
            </p>
            <p className="font-editorial text-lg text-muted-foreground leading-relaxed mb-6">
              Bizning issiq muhit, diqqatga sazovor xizmat va unutilmas ta'mlar sizni qayta-qayta 
              tashrif buyurishga undaydi. Nihol — bu mazali taom, iliq suhbat va yoqimli lahzalar 
              uchun joy.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-px bg-gold/50" />
              <span className="font-editorial italic text-gold text-sm">nihol.uz</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
