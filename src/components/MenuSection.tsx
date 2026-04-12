import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type MenuItem = { name: string; description: string; price: string };
type MenuCategory = { category: string; items: MenuItem[] };

const menuData: MenuCategory[] = [
  {
    category: "Starters",
    items: [
      { name: "Burrata & Heirloom Tomato", description: "Aged balsamic, basil oil, fleur de sel", price: "$18" },
      { name: "Tuna Tartare", description: "Avocado, sesame, crispy wontons, yuzu dressing", price: "$22" },
      { name: "Wild Mushroom Soup", description: "Truffle cream, chive oil, sourdough crostini", price: "$16" },
      { name: "Foie Gras Terrine", description: "Fig compote, toasted brioche, Sauternes gel", price: "$28" },
    ],
  },
  {
    category: "Main Courses",
    items: [
      { name: "Wagyu Beef Tenderloin", description: "Red wine jus, roasted bone marrow, seasonal vegetables", price: "$58" },
      { name: "Pan-Seared Sea Bass", description: "Saffron beurre blanc, fennel purée, citrus salad", price: "$42" },
      { name: "Lamb Rack", description: "Herb crust, pomegranate glaze, pistachio couscous", price: "$48" },
      { name: "Lobster Risotto", description: "Mascarpone, tarragon, Parmesan crisp", price: "$45" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Chocolate Fondant", description: "Molten center, vanilla bean ice cream, gold leaf", price: "$16" },
      { name: "Crème Brûlée", description: "Tahitian vanilla, caramelized sugar, fresh berries", price: "$14" },
      { name: "Pistachio Mille-Feuille", description: "Rose cream, raspberry coulis, candied petals", price: "$18" },
    ],
  },
  {
    category: "Cocktails",
    items: [
      { name: "Nihol Signature", description: "Aged rum, cardamom, honey, smoked rosemary", price: "$19" },
      { name: "Garden of Eden", description: "Gin, elderflower, cucumber, lime, basil", price: "$17" },
      { name: "Golden Hour", description: "Bourbon, saffron syrup, orange bitters, gold dust", price: "$21" },
    ],
  },
];

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="py-24 md:py-32 bg-forest-dark">
      <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">Curated Selection</span>
          <div className="gold-separator mx-auto mt-4 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl text-cream">Our Menu</h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {menuData.map((cat, i) => (
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
          {menuData[activeCategory].items.map((item) => (
            <div key={item.name} className="flex items-baseline justify-between py-6 group">
              <div className="flex-1 pr-6">
                <h3 className="font-display text-lg md:text-xl text-cream group-hover:text-gold transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="font-editorial text-sm text-cream/40 mt-1 italic">
                  {item.description}
                </p>
              </div>
              <span className="font-display text-lg text-gold whitespace-nowrap">
                {item.price}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <span className="text-cream/30 text-xs tracking-widest uppercase font-body">
            Seasonal selections · Prices subject to change
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
