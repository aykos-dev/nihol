import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { menuData } from "@/data/menuData";
import MenuModal from "./MenuModal";

const previewCategories = menuData.slice(0, 4);

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section id="menu" className="py-24 md:py-32 bg-forest-dark">
        <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
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

          {/* Category tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-14"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {previewCategories.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(i)}
                className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-body transition-all duration-300 border ${
                  activeCategory === i
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-cream/15 text-cream/50 hover:text-cream hover:border-cream/30"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </motion.div>

          {/* Menu items */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-0 divide-y divide-cream/10"
          >
            {previewCategories[activeCategory].items.slice(0, 5).map((item, i) => (
              <motion.div
                key={item.name}
                className="flex items-baseline justify-between py-6 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex-1 pr-6">
                  <h3 className="font-display text-lg md:text-xl text-cream group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="font-editorial text-sm text-cream/40 mt-1 italic">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="font-display text-lg text-gold whitespace-nowrap">
                  {item.price}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Full menu button */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3 border border-gold/50 text-gold text-sm tracking-widest uppercase font-body hover:bg-gold hover:text-forest-dark transition-all duration-300"
            >
              To'liq menyuni ko'rish
            </button>
            <p className="text-cream/30 text-xs tracking-widest uppercase font-body mt-6">
              Mavsumiy tanlov · Narxlar o'zgarishi mumkin
            </p>
          </motion.div>
        </div>
      </section>

      <MenuModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default MenuSection;
