import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gem, Flame, UtensilsCrossed, Heart } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Premium Ingredients",
    description: "Sourced from artisan producers and local farms for unmatched freshness and quality.",
  },
  {
    icon: Flame,
    title: "Refined Atmosphere",
    description: "An intimate setting where warm lighting and curated design create the perfect ambiance.",
  },
  {
    icon: UtensilsCrossed,
    title: "Signature Dishes",
    description: "Each creation tells a story, blending global inspiration with masterful technique.",
  },
  {
    icon: Heart,
    title: "Memorable Service",
    description: "Attentive, personalized hospitality that makes every guest feel truly welcomed.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">The Nihol Way</span>
          <div className="gold-separator mx-auto mt-4 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            A Signature Experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-all duration-300">
                <f.icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg text-foreground mb-3">{f.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
