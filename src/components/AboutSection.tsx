import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import buildingImg from "@/assets/gallery/nihol-building.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
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
              src={buildingImg}
              alt="Nihol restoran ichki ko'rinishi"
              className="w-full h-[460px] md:h-[620px] object-cover"
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
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">
              Biz haqimizda
            </span>
            <div className="gold-separator mt-4 mb-6" />
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-8">
              Nihol — Restourant
            </h2>
            <p className="font-editorial text-lg text-muted-foreground leading-relaxed mb-6">
              Biz sizga o‘zimizning “NIHOL” restoranimizni taqdim etishdan
              mamnunmiz. Bizning muassasamiz tarixi 2005-yildan boshlanadi.
              Asosiy taomimiz bo‘lgan “Tovuq Tabaka” uchun firmaviy retsept
              mualliflik texnologiyasi asosida tayyorlanadi va restoran
              faoliyati davomida nafaqat Toshkent aholisi, balki poytaxt
              mehmonlari orasida ham katta mashhurlikka erishgan.
            </p>
            <p className="font-editorial text-lg text-muted-foreground leading-relaxed mb-6">
              Shuni faxr bilan aytamizki, biz tovuqlarni Toshkent shahri
              atrofidagi o‘z fermalarimizda yetishtiramiz. Bu esa
              mahsulotlarimizning sifati va doimo yangi bo‘lishini ta’minlaydi,
              ayniqsa yozning issiq kunlarida bu juda muhim. Har qanday
              oshxonaning yuragi — bu oshpazlar jamoasidir. “NIHOL”da
              poytaxtdagi mashhur restoranlarda, jumladan “Anhor” restoranida
              ishlagan tajribali oshpazlar faoliyat yuritadi. Oshpazlarimiz
              fikricha, haqiqiy oshxonaning asosiy fazilatlari —
              professionallik, samimiylik, ijobiy kayfiyat va o‘z ishiga bo‘lgan
              muhabbatdir.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-px bg-gold/50" />
              {/* <span className="font-editorial italic text-gold text-sm">
                nihol.uz
              </span> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
