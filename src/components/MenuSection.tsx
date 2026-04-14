import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import foodLagmon from "@/assets/food-lagmon.jpg";
import foodKabob from "@/assets/food-kabob.jpg";
import foodManti from "@/assets/food-manti.jpg";
import foodPalov from "@/assets/food-palov.jpg";
import foodSalat from "@/assets/food-salat.jpg";
import foodIchimlik from "@/assets/food-ichimlik.jpg";

const menuItems = [
  { name: "Lag'mon", image: foodLagmon },
  { name: "Kabob va Grill", image: foodKabob },
  { name: "Manti", image: foodManti },
  { name: "Palov", image: foodPalov },
  { name: "Salatlar", image: foodSalat },
  { name: "Ichimliklar", image: foodIchimlik },
];

const MenuSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="py-24 md:py-32 bg-forest-dark">
      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">Tanlangan taomlar</span>
          <div className="gold-separator mx-auto mt-4 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-cream">Bizning Menyu</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.name}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-sm aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={512}
                  height={512}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-display text-lg md:text-xl text-cream group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
