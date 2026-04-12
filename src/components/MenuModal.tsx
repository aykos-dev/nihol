import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Leaf, Vegan } from "lucide-react";
import { menuData, type MenuCategory } from "@/data/menuData";

type DietaryFilter = "all" | "vegetarian" | "vegan";

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
}

const MenuModal = ({ open, onClose }: MenuModalProps) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");

  const filteredData = useMemo(() => {
    let data: MenuCategory[] = menuData;

    if (activeCategory !== null) {
      data = [data[activeCategory]];
    }

    return data
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const matchesSearch =
            !search ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase());

          const matchesDietary =
            dietaryFilter === "all" ||
            item.dietary?.includes(dietaryFilter);

          return matchesSearch && matchesDietary;
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search, activeCategory, dietaryFilter]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-forest-dark/95 backdrop-blur-md" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[85vh] mx-4 bg-forest-dark border border-cream/10 overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-cream/10 flex-shrink-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl md:text-3xl text-cream">To'liq Menyu</h2>
                <button
                  onClick={onClose}
                  className="text-cream/50 hover:text-cream transition-colors p-1"
                  aria-label="Yopish"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                <input
                  type="text"
                  placeholder="Taom qidirish..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-cream/5 border border-cream/10 text-cream font-body text-sm py-2.5 pl-10 pr-4 placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors rounded-sm"
                />
              </div>

              {/* Filters row */}
              <div className="flex flex-wrap gap-2">
                {/* Category chips */}
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-3 py-1.5 text-xs tracking-wider uppercase font-body border transition-all duration-200 ${
                    activeCategory === null
                      ? "border-gold text-gold bg-gold/10"
                      : "border-cream/15 text-cream/40 hover:text-cream"
                  }`}
                >
                  Barchasi
                </button>
                {menuData.map((cat, i) => (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(i)}
                    className={`px-3 py-1.5 text-xs tracking-wider uppercase font-body border transition-all duration-200 ${
                      activeCategory === i
                        ? "border-gold text-gold bg-gold/10"
                        : "border-cream/15 text-cream/40 hover:text-cream"
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              {/* Dietary filters */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setDietaryFilter(dietaryFilter === "vegetarian" ? "all" : "vegetarian")}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-body border rounded-sm transition-all ${
                    dietaryFilter === "vegetarian"
                      ? "border-green-500/50 text-green-400 bg-green-500/10"
                      : "border-cream/10 text-cream/30 hover:text-cream/50"
                  }`}
                >
                  <Leaf className="w-3 h-3" /> Vegetarian
                </button>
                <button
                  onClick={() => setDietaryFilter(dietaryFilter === "vegan" ? "all" : "vegan")}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-body border rounded-sm transition-all ${
                    dietaryFilter === "vegan"
                      ? "border-green-500/50 text-green-400 bg-green-500/10"
                      : "border-cream/10 text-cream/30 hover:text-cream/50"
                  }`}
                >
                  <Vegan className="w-3 h-3" /> Vegan
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              {filteredData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-cream/40 font-editorial italic">Taom topilmadi</p>
                </div>
              ) : (
                filteredData.map((cat) => (
                  <div key={cat.category} className="mb-10 last:mb-0">
                    <h3 className="font-display text-lg text-gold mb-4 tracking-wider">
                      {cat.category}
                    </h3>
                    <div className="divide-y divide-cream/8">
                      {cat.items.map((item) => (
                        <div key={item.name} className="flex items-baseline justify-between py-4 group">
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2">
                              <h4 className="font-display text-base text-cream group-hover:text-gold transition-colors">
                                {item.name}
                              </h4>
                              {item.dietary?.includes("vegetarian") && (
                                <Leaf className="w-3 h-3 text-green-500/60 flex-shrink-0" />
                              )}
                              {item.dietary?.includes("vegan") && (
                                <Vegan className="w-3 h-3 text-green-500/60 flex-shrink-0" />
                              )}
                            </div>
                            {item.description && (
                              <p className="font-editorial text-xs text-cream/35 mt-0.5 italic">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <span className="font-display text-sm text-gold/80 whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
