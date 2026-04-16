import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import catSalads from "@/assets/cat-salads.jpg";
import catAssorti from "@/assets/cat-assorti.jpg";
import catShorva from "@/assets/cat-shorva.jpg";
import catSomsa from "@/assets/cat-somsa.jpg";
import catChicken from "@/assets/cat-chicken.jpg";
import catFish from "@/assets/cat-fish.jpg";
import catMangal from "@/assets/cat-mangal.jpg";
import catSetlar from "@/assets/cat-setlar.jpg";
import catBar from "@/assets/cat-bar.jpg";
import catShirinlik from "@/assets/cat-shirinlik.jpg";

import salad1 from "@/assets/salad-1.jpg";
import salad2 from "@/assets/salad-2.jpg";
import salad3 from "@/assets/salad-3.jpg";
import assorti1 from "@/assets/assorti-1.jpg";
import assorti2 from "@/assets/assorti-2.jpg";
import assorti3 from "@/assets/assorti-3.jpg";
import shorva1 from "@/assets/shorva-1.jpg";
import shorva2 from "@/assets/shorva-2.jpg";
import shorva3 from "@/assets/shorva-3.jpg";
import somsa1 from "@/assets/somsa-1.jpg";
import somsa2 from "@/assets/somsa-2.jpg";
import somsa3 from "@/assets/somsa-3.jpg";
import chicken1 from "@/assets/chicken-1.jpg";
import chicken2 from "@/assets/chicken-2.jpg";
import chicken3 from "@/assets/chicken-3.jpg";
import fish1 from "@/assets/fish-1.jpg";
import fish2 from "@/assets/fish-2.jpg";
import fish3 from "@/assets/fish-3.jpg";
import mangal1 from "@/assets/mangal-1.jpg";
import mangal2 from "@/assets/mangal-2.jpg";
import mangal3 from "@/assets/mangal-3.jpg";
import set1 from "@/assets/set-1.jpg";
import set2 from "@/assets/set-2.jpg";
import set3 from "@/assets/set-3.jpg";
import barCoffee from "@/assets/bar-coffee.jpg";
import barIcedCoffee from "@/assets/bar-iced-coffee.jpg";
import barLimonad from "@/assets/bar-limonad.jpg";
import barMojito from "@/assets/bar-mojito.jpg";
import barMilkshake from "@/assets/bar-milkshake.jpg";
import barChoy from "@/assets/bar-choy.jpg";
import barFresh from "@/assets/bar-fresh.jpg";
import dessertTiramisu from "@/assets/dessert-tiramisu.jpg";
import dessertBaklava from "@/assets/dessert-baklava.jpg";
import dessertFondant from "@/assets/dessert-fondant.jpg";
import patternBg from "@/assets/pattern-bg.png";

type SubDish = { name: string; image: string; price: string };

type BarSubSection = { title: string; items: SubDish[] };

type Category = {
  name: string;
  image: string;
  type: "normal" | "bar" | "dessert";
  dishes?: SubDish[];
  barSections?: BarSubSection[];
};

const categories: Category[] = [
  {
    name: "Salatlar",
    image: catSalads,
    type: "normal",
    dishes: [
      { name: "Achichiq", image: salad1, price: "20,000" },
      { name: "Sharq salati", image: salad2, price: "28,000" },
      { name: "Sezar salati", image: salad3, price: "35,000" },
      { name: "Grek salati", image: salad1, price: "30,000" },
      { name: "Mavsum salati", image: salad2, price: "25,000" },
      { name: "Toshkent salati", image: salad3, price: "32,000" },
      { name: "Mimoza salati", image: salad1, price: "28,000" },
    ],
  },
  {
    name: "Assorti",
    image: catAssorti,
    type: "normal",
    dishes: [
      { name: "Go'sht assorti", image: assorti1, price: "65,000" },
      { name: "Pishloq assorti", image: assorti2, price: "55,000" },
      { name: "Sabzavot assorti", image: assorti3, price: "35,000" },
      { name: "Baliq assorti", image: assorti1, price: "75,000" },
      { name: "Tuzlama assorti", image: assorti2, price: "45,000" },
      { name: "Aralash assorti", image: assorti3, price: "60,000" },
    ],
  },
  {
    name: "Sho'rvalar",
    image: catShorva,
    type: "normal",
    dishes: [
      { name: "Shurpa", image: shorva1, price: "38,000" },
      { name: "Mastava", image: shorva2, price: "35,000" },
      { name: "Lag'mon sho'rva", image: shorva3, price: "40,000" },
      { name: "Tovuq bulon", image: shorva1, price: "30,000" },
      { name: "Mol go'sht bulon", image: shorva2, price: "35,000" },
      { name: "Chuchvara sho'rva", image: shorva3, price: "40,000" },
    ],
  },
  {
    name: "Somsa",
    image: catSomsa,
    type: "normal",
    dishes: [
      { name: "Tandir somsa", image: somsa1, price: "20,000" },
      { name: "Pufak somsa", image: somsa2, price: "22,000" },
      { name: "Mini somsa", image: somsa3, price: "25,000" },
      { name: "Qo'y go'shtli somsa", image: somsa1, price: "25,000" },
      { name: "Tovuqli somsa", image: somsa2, price: "20,000" },
      { name: "Kartoshkali somsa", image: somsa3, price: "15,000" },
    ],
  },
  {
    name: "Tovuq taomlari",
    image: catChicken,
    type: "normal",
    dishes: [
      { name: "Tovuq grill", image: chicken1, price: "45,000" },
      { name: "Tovuq qanoti", image: chicken2, price: "35,000" },
      { name: "Tovuq tabaka", image: chicken3, price: "50,000" },
      { name: "Tovuq shashlik", image: chicken1, price: "38,000" },
      { name: "Tovuq kabob", image: chicken2, price: "40,000" },
      { name: "Tovuq kotlet", image: chicken3, price: "35,000" },
    ],
  },
  {
    name: "Baliq taomlari",
    image: catFish,
    type: "normal",
    dishes: [
      { name: "Baliq grill", image: fish1, price: "55,000" },
      { name: "Butun baliq", image: fish2, price: "65,000" },
      { name: "Baliq kabob", image: fish3, price: "50,000" },
      { name: "Baliq file", image: fish1, price: "60,000" },
      { name: "Qovurilgan baliq", image: fish2, price: "55,000" },
      { name: "Baliq steygi", image: fish3, price: "70,000" },
    ],
  },
  {
    name: "Mangal taomlari",
    image: catMangal,
    type: "normal",
    dishes: [
      { name: "Qo'y kabob", image: mangal1, price: "55,000" },
      { name: "Lyulya kabob", image: mangal2, price: "45,000" },
      { name: "Qovurg'a", image: mangal3, price: "65,000" },
      { name: "Mol go'sht shashlik", image: mangal1, price: "50,000" },
      { name: "Aralash grill", image: mangal2, price: "75,000" },
      { name: "Jigar kabob", image: mangal3, price: "40,000" },
    ],
  },
  {
    name: "Setlar",
    image: catSetlar,
    type: "normal",
    dishes: [
      { name: "Oilaviy set", image: set1, price: "180,000" },
      { name: "Do'stona set", image: set2, price: "250,000" },
      { name: "Premium set", image: set3, price: "350,000" },
      { name: "Mini set", image: set1, price: "120,000" },
      { name: "Bayram seti", image: set2, price: "400,000" },
      { name: "Biznes lanch set", image: set3, price: "85,000" },
    ],
  },
  {
    name: "Bar",
    image: catBar,
    type: "bar",
    barSections: [
      { title: "Kofe", items: [
        { name: "Amerikano", image: barCoffee, price: "18,000" },
        { name: "Kapuchino", image: barCoffee, price: "22,000" },
        { name: "Latte", image: barCoffee, price: "25,000" },
      ]},
      { title: "Muzli kofe", items: [
        { name: "Ays latte", image: barIcedCoffee, price: "28,000" },
        { name: "Ays amerikano", image: barIcedCoffee, price: "22,000" },
        { name: "Frappe", image: barIcedCoffee, price: "30,000" },
      ]},
      { title: "Limonadlar", items: [
        { name: "Klassik limonad", image: barLimonad, price: "25,000" },
        { name: "Yalpiz limonad", image: barLimonad, price: "28,000" },
        { name: "Mango limonad", image: barLimonad, price: "30,000" },
      ]},
      { title: "Mojito", items: [
        { name: "Klassik mojito", image: barMojito, price: "30,000" },
        { name: "Qulupnayli mojito", image: barMojito, price: "35,000" },
        { name: "Malinali mojito", image: barMojito, price: "35,000" },
      ]},
      { title: "Milkshake", items: [
        { name: "Shokoladli", image: barMilkshake, price: "30,000" },
        { name: "Vanil milkshake", image: barMilkshake, price: "28,000" },
        { name: "Banana milkshake", image: barMilkshake, price: "28,000" },
      ]},
      { title: "Choy", items: [
        { name: "Yashil choy", image: barChoy, price: "12,000" },
        { name: "Qora choy", image: barChoy, price: "10,000" },
        { name: "Mevali choy", image: barChoy, price: "18,000" },
      ]},
      { title: "Fresh sharbatlar", items: [
        { name: "Apelsin fresh", image: barFresh, price: "25,000" },
        { name: "Olma fresh", image: barFresh, price: "22,000" },
        { name: "Sabzi fresh", image: barFresh, price: "20,000" },
      ]},
    ],
  },
  {
    name: "Shirinliklar",
    image: catShirinlik,
    type: "dessert",
    dishes: [
      { name: "Tiramisu", image: dessertTiramisu, price: "35,000" },
      { name: "Baklava", image: dessertBaklava, price: "28,000" },
      { name: "Shokoladli fondant", image: dessertFondant, price: "40,000" },
      { name: "Chiz keyk", image: dessertTiramisu, price: "38,000" },
      { name: "Panna kotta", image: dessertBaklava, price: "30,000" },
      { name: "Medovik", image: dessertFondant, price: "25,000" },
      { name: "Napoleon", image: dessertTiramisu, price: "28,000" },
    ],
  },
];

/* 3-3-1 grid helper */
const SubDishGrid = ({ dishes }: { dishes: SubDish[] }) => {
  const rows: SubDish[][] = [];
  for (let i = 0; i < dishes.length; i += 3) {
    rows.push(dishes.slice(i, i + 3));
  }
  return (
    <div className="space-y-4">
      {rows.map((row, ri) => (
        <div
          key={ri}
          className={`grid gap-4 ${row.length === 3 ? "grid-cols-3" : row.length === 2 ? "grid-cols-2 max-w-[66%] mx-auto" : "grid-cols-1 max-w-[33%] mx-auto"}`}
        >
          {row.map((dish) => (
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
              <p className="text-gold text-xs text-center font-body mt-1">{dish.price} so'm</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const MenuSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Category | null>(null);

  return (
    <>
      <section id="menu" className="py-24 md:py-32 bg-forest-dark relative overflow-hidden">
        {/* Pattern decoration */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url(${patternBg})`, backgroundSize: "400px", backgroundRepeat: "repeat" }}
        />

        <div className="container mx-auto px-6 max-w-6xl relative z-10" ref={ref}>
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

          {/* Row 1: 4 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-5 md:mb-6">
            {categories.slice(0, 4).map((cat, i) => (
              <CategoryCard key={cat.name} cat={cat} i={i} inView={inView} onClick={() => setSelected(cat)} />
            ))}
          </div>
          {/* Row 2: 4 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-5 md:mb-6">
            {categories.slice(4, 8).map((cat, i) => (
              <CategoryCard key={cat.name} cat={cat} i={i + 4} inView={inView} onClick={() => setSelected(cat)} />
            ))}
          </div>
          {/* Row 3: 2 items centered */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            <div className="md:col-start-2 md:col-span-1">
              <CategoryCard cat={categories[8]} i={8} inView={inView} onClick={() => setSelected(categories[8])} />
            </div>
            <div className="md:col-span-1">
              <CategoryCard cat={categories[9]} i={9} inView={inView} onClick={() => setSelected(categories[9])} />
            </div>
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
              className="relative bg-forest-dark border border-accent/20 rounded-sm max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-cream/50 hover:text-gold transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">{selected.name}</span>
              <div className="gold-separator mt-3 mb-6" />

              {/* Bar: grouped sub-sections */}
              {selected.type === "bar" && selected.barSections && (
                <div className="space-y-8">
                  {selected.barSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="font-display text-lg text-cream mb-4">{section.title}</h3>
                      <SubDishGrid dishes={section.items} />
                    </div>
                  ))}
                </div>
              )}

              {/* Normal & Dessert: 3-3-1 grid */}
              {(selected.type === "normal" || selected.type === "dessert") && selected.dishes && (
                <SubDishGrid dishes={selected.dishes} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CategoryCard = ({
  cat,
  i,
  inView,
  onClick,
}: {
  cat: Category;
  i: number;
  inView: boolean;
  onClick: () => void;
}) => (
  <motion.div
    className="group cursor-pointer"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: i * 0.08 }}
    onClick={onClick}
  >
    <div className="relative overflow-hidden rounded-sm aspect-square">
      <img
        src={cat.image}
        alt={cat.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        width={768}
        height={768}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <h3 className="font-display text-base md:text-lg text-cream group-hover:text-gold transition-colors duration-300">
          {cat.name}
        </h3>
      </div>
    </div>
  </motion.div>
);

export default MenuSection;
