import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6 max-w-4xl text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">Our Story</span>
          <div className="gold-separator mx-auto mt-4 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-8">
            Welcome to Nihol
          </h2>
          <p className="font-editorial text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            At Nihol, we believe dining is an art form. Our kitchen crafts each dish with the finest
            seasonal ingredients, blending time-honored traditions with modern culinary innovation.
          </p>
          <p className="font-editorial text-lg md:text-xl text-muted-foreground leading-relaxed">
            From the warm glow of candlelight to the carefully curated flavors on every plate,
            Nihol offers more than a meal — it offers an experience. A place where sophistication
            meets warmth, and every visit becomes a cherished memory.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
