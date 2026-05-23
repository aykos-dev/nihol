"use client";

import { motion } from "framer-motion";
import niholLogo from "@/assets/nihol-logo.png";
import OptimizedImage from "@/components/media/OptimizedImage";
import LazyVideo from "@/components/media/LazyVideo";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <LazyVideo
        className="absolute inset-0 w-full h-full object-cover object-[center_35%] md:object-[center_30%]"
        sources={[{ src: "/IMG_2104.mp4", type: "video/mp4" }]}
        rootMargin="0px"
      />

      <div className="absolute inset-0 gradient-hero-overlay" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          className="w-48 md:w-64 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <OptimizedImage
            src={niholLogo}
            alt="NIHOL"
            width={480}
            height={240}
            priority
            className="w-full h-auto"
            sizes="(max-width: 768px) 192px, 256px"
          />
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-6xl text-cream tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Oilaviy premium restoran
        </motion.h1>

        <motion.p
          className="font-editorial text-lg md:text-xl text-cream/70 mt-4 max-w-lg italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Mazali taomlar & shinam xonalar
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <a
            href="#menu"
            className="px-8 py-3 bg-gold/90 text-forest-dark text-sm tracking-widest uppercase font-body font-semibold hover:bg-gold transition-all duration-300"
          >
            Menyuni ko'rish
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-cream/40 text-cream text-sm tracking-widest uppercase font-body hover:border-gold hover:text-gold transition-all duration-300"
          >
            Joy band qilish
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-cream/40 text-xs tracking-widest uppercase font-body">Pastga</span>
            <motion.div
              className="w-px h-8 bg-gold/50"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
