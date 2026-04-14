import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import catChicken from "@/assets/cat-chicken.jpg";
import catFish from "@/assets/cat-fish.jpg";
import catKebab from "@/assets/cat-kebab.jpg";
import catBulon from "@/assets/cat-bulon.jpg";
import catSalads from "@/assets/cat-salads.jpg";
import catDessert from "@/assets/cat-dessert.jpg";

import chicken1 from "@/assets/chicken-1.jpg";
import chicken2 from "@/assets/chicken-2.jpg";
import chicken3 from "@/assets/chicken-3.jpg";
import fish1 from "@/assets/fish-1.jpg";
import fish2 from "@/assets/fish-2.jpg";
import fish3 from "@/assets/fish-3.jpg";
import kebab1 from "@/assets/kebab-1.jpg";
import kebab2 from "@/assets/kebab-2.jpg";
import kebab3 from "@/assets/kebab-3.jpg";
import bulon1 from "@/assets/bulon-1.jpg";
import bulon2 from "@/assets/bulon-2.jpg";
import bulon3 from "@/assets/bulon-3.jpg";
import salad1 from "@/assets/salad-1.jpg";
import salad2 from "@/assets/salad-2.jpg";
import salad3 from "@/assets/salad-3.jpg";
import dessert1 from "@/assets/dessert-1.jpg";
import dessert2 from "@/assets/dessert-2.jpg";
import dessert3 from "@/assets/dessert-3.jpg";

type SubDish = { name: string; image: string };
type Category = { name: string; image: string; dishes: SubDish[] };

const categories: Category[] = [
  {
    name: "Tovuq",
    image: catChicken,
    dishes: [
      { name: "Tovuq grill", image: chicken1 },
      { name: "Tovuq qanoti", image: chicken2 },
      { name: "Tovuq tabaka", image: chicken3 },
    ],
  },
  {
    name: "Baliq",
    image: catFish,
    dishes: [
      { name: "Baliq grill", image: fish1 },
      { name: "Butun baliq", image: fish2 },
      { name: "Baliq kabob", image: fish3 },
    ],
  },
  {
    name: "Kabob",
    image: catKebab,
    dishes: [
      { name: "Qo'y kabob", image: kebab1 },
      { name: "Lyulya kabob", image: kebab2 },
      { name: "Aralash grill", image: kebab3 },
    ],
  },
  {
    name: "Bulon",
    image: catBulon,
    dishes: [
      { name: "Mol go'sht bulon", image: bulon1 },
      { name: "Tovuq bulon", image: bulon2 },
      { name: "Shurpa", image: bulon3 },
    ],
  },
  {
    name: "Salatlar",
    image: catSalads,
    dishes: [
      { name: "Sezar salati", image: salad1 },
      { name: "Achichiq", image: salad2 },
      { name: "Grek salati", image: salad3 },
    ],
  },
  {
    name: "Shirinliklar",
    image: catDessert,
    dishes: [
      { name: "Baklava", image: dessert1 },
      { name: "Shokolad fondan", image: dessert2 },
      { name: "Chak-chak", image: dessert3 },
    ],
  },
];

const MenuSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Category | null>(null);

  return (
    <>
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
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelected(cat)}
              >
                <div className="relative overflow-hidden rounded-sm aspect-square">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={768}
                    height={512}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="font-display text-lg md:text-xl text-cream group-hover:text-gold transition-colors duration-300">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-forest-dark/90 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              className="relative bg-forest-dark border border-cream/10 rounded-sm max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-cream/50 hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">{selected.name}</span>
              <div className="gold-separator mt-3 mb-6" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selected.dishes.map((dish) => (
                  <div key={dish.name} className="group/dish">
                    <div className="relative overflow-hidden rounded-sm aspect-square mb-2">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/dish:scale-110"
                        loading="lazy"
                        width={512}
                        height={512}
                      />
                    </div>
                    <p className="font-display text-sm text-cream text-center">{dish.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuSection;
