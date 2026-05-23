"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { StaticImageData } from "next/image";

import catSalads from "@/assets/cat/cat-salads.jpg";
import catAssorti from "@/assets/cat/assorti-3.jpg";
import catShorva from "@/assets/cat/cat-shorva.jpg";
import catSomsa from "@/assets/cat/cat-somsa.jpg";
import catChicken from "@/assets/cat/cat-chicken.jpg";
import catFish from "@/assets/cat/cat-fish.jpg";
import catMangal from "@/assets/cat/cat-mangal.jpg";
import catSetlar from "@/assets/cat/cat-setlar.jpg";
import catBar from "@/assets/cat/cat-bar.jpg";
import catShirinlik from "@/assets/cat/cat-shirinlik.jpg";

//shirinliklar (fallback when `src/assets/menu/desserts` bo'sh)
import dessertTiramisu from "@/assets/dessert-tiramisu.jpg";
import dessertBaklava from "@/assets/dessert-baklava.jpg";
import dessertFondant from "@/assets/dessert-fondant.jpg";
import patternBg from "@/assets/pattern-bg.png";
import { MENU_DISH_ROWS, type MenuDishRow } from "@/data/menuDishMeta";
import OptimizedImage from "@/components/media/OptimizedImage";
import { toCdnMediaUrl } from "@/lib/cdn";

type SubDish = { id: string; name: string; image: string; price: string };
type PreviewImage = { src: string; alt: string };

function toTitleCaseWords(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function normalizeDishName(rawName: string): string {
  const withoutLeadingNumber = rawName.replace(/^\s*\d+\s*/u, "");
  const cleaned = withoutLeadingNumber.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return rawName;
  const titled = toTitleCaseWords(cleaned);
  return titled;
}

function extractLeadingNumber(rawName: string): number | null {
  const m = rawName.match(/^\s*(\d+)\b/u);
  return m ? Number(m[1]) : null;
}

function extractLeadingNumberFromId(id: string): number | null {
  const last = id.includes("/") ? id.slice(id.lastIndexOf("/") + 1) : id;
  return extractLeadingNumber(last.replace(/[_-]+/g, " "));
}

function compareDishOrder(a: SubDish, b: SubDish): number {
  const na = extractLeadingNumberFromId(a.id);
  const nb = extractLeadingNumberFromId(b.id);
  if (na !== null && nb !== null) return na - nb;
  if (na !== null) return -1;
  if (nb !== null) return 1;
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
}

function applySaladPriority(dishes: SubDish[]): SubDish[] {
  const forcedLast = ["Achichuk", "Ajob Sanda", "Bir Zumda", "Rukolle"] as const;
  const firstName = "Avokado Salati";

  const first = dishes.find((dish) => dish.name === firstName);
  const middle = dishes.filter((dish) => dish.name !== firstName && !forcedLast.includes(dish.name as (typeof forcedLast)[number]));
  const tail = forcedLast
    .map((name) => dishes.find((dish) => dish.name === name))
    .filter((dish): dish is SubDish => Boolean(dish));

  return [first, ...middle, ...tail].filter((dish): dish is SubDish => Boolean(dish));
}

function menuImageUrlFromRel(rel: string): string {
  const encodedRel = rel
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return toCdnMediaUrl(`/api/menu-image/${encodedRel}`, { resourceType: "image" });
}

function dishesFromRows(rows: readonly MenuDishRow[], opts?: { saladMode?: boolean }): SubDish[] {
  const mapped = rows
    .map((row) => ({
      id: row.rel.toLowerCase(),
      name: normalizeDishName(row.name),
      image: menuImageUrlFromRel(row.rel),
      price: row.price,
    }))
    .sort(compareDishOrder);

  return opts?.saladMode ? applySaladPriority(mapped) : mapped;
}

type BarSubSection = { title: string; items: SubDish[] };
type SetSpec = { people: number; name: string; price: string };

const BAR_FOLDER_ORDER = ["coffee", "lemonades", "mojito", "milkshake", "tea"] as const;
const BAR_FOLDER_TITLES: Record<(typeof BAR_FOLDER_ORDER)[number], string> = {
  coffee: "Kofe",
  lemonades: "Limonadlar",
  mojito: "Mojito",
  milkshake: "Milkshake",
  tea: "Choy",
};

function rowsByPrefix(prefix: string): MenuDishRow[] {
  return MENU_DISH_ROWS.filter((row) => row.rel.startsWith(prefix));
}

type Category = {
  name: string;
  image: string | StaticImageData;
  type: "normal" | "bar" | "dessert";
  dishes?: SubDish[];
  barSections?: BarSubSection[];
};

const SET_MENU_SPECS: SetSpec[] = [
  { people: 1, name: "Nihol Assorti (1 kishi )", price: "103.200" },
  { people: 4, name: "Nihol Assorti (4 kishi)", price: "718.000" },
  { people: 6, name: "Nihol Assorti (6 kishi)", price: "834.000" },
  { people: 10, name: "Nihol Assorti (10 kishi)", price: "1.215.600" },
  { people: 15, name: "Nihol Assorti (15 kishi)", price: "1.678.000" },
  { people: 20, name: "Nihol Assorti (20 kishi)", price: "2.124.800" },
  { people: 25, name: "Nihol Assorti  (25 kishi)", price: "2.438.600" },
];

function getSetPeopleValue(value: string): number | null {
  const match = value.match(/(\d+)\s*kishi/iu);
  return match ? Number(match[1]) : null;
}

function normalizeSetDishes(dishes: SubDish[]): SubDish[] {
  const byPeople = new Map<number, SubDish>();

  dishes.forEach((dish) => {
    const personCount = getSetPeopleValue(`${dish.name} ${dish.id}`);
    if (personCount !== null && !byPeople.has(personCount)) {
      byPeople.set(personCount, dish);
    }
  });

  return SET_MENU_SPECS.map((spec) => {
    const matched = byPeople.get(spec.people);
    return {
      id: matched?.id ?? `set-${spec.people}`,
      image: matched?.image ?? "",
      name: spec.name,
      price: spec.price,
    };
  }).filter((dish) => Boolean(dish.image));
}

function buildCategories(): Category[] {
  const saladDishes = dishesFromRows(rowsByPrefix("salads/"), { saladMode: true });
  const dessertDishesFromMenu = dishesFromRows(rowsByPrefix("desserts/"));
  const dessertDishes: SubDish[] =
    dessertDishesFromMenu.length > 0
      ? dessertDishesFromMenu
      : [
          { id: "dessert-fallback-tiramisu", name: "Tiramisu", image: dessertTiramisu.src, price: "35,000" },
          { id: "dessert-fallback-baklava", name: "Baklava", image: dessertBaklava.src, price: "28,000" },
          { id: "dessert-fallback-fondant", name: "Shokoladli fondant", image: dessertFondant.src, price: "40,000" },
          { id: "dessert-fallback-cheesecake", name: "Chiz keyk", image: dessertTiramisu.src, price: "38,000" },
          { id: "dessert-fallback-panna", name: "Panna kotta", image: dessertBaklava.src, price: "30,000" },
          { id: "dessert-fallback-medovik", name: "Medovik", image: dessertFondant.src, price: "25,000" },
          { id: "dessert-fallback-napoleon", name: "Napoleon", image: dessertTiramisu.src, price: "28,000" },
        ];

  const barSections: BarSubSection[] = BAR_FOLDER_ORDER.flatMap((folder) => {
    const items = dishesFromRows(rowsByPrefix(`bar/${folder}/`));
    if (items.length === 0) return [];
    return [{ title: BAR_FOLDER_TITLES[folder], items }];
  });

  const assortiDishes = dishesFromRows(rowsByPrefix("assorti/"));
  const bulonDishes = dishesFromRows(rowsByPrefix("bulon/"));
  const somsaDishes = dishesFromRows(rowsByPrefix("somsa/"));
  const chickenDishes = dishesFromRows(rowsByPrefix("chicken/"));
  const fishDishes = dishesFromRows(rowsByPrefix("fish/"));
  const mangalDishes = dishesFromRows(rowsByPrefix("mangal/"));
  const setDishes = dishesFromRows(rowsByPrefix("set/"));

  return [
    { name: "Salatlar", image: catSalads, type: "normal", dishes: saladDishes },
    { name: "Assorti", image: catAssorti, type: "normal", dishes: assortiDishes },
    { name: "Bulon", image: catShorva, type: "normal", dishes: bulonDishes },
    { name: "Somsa", image: catSomsa, type: "normal", dishes: somsaDishes },
    { name: "Tovuq taomlari", image: catChicken, type: "normal", dishes: chickenDishes },
    { name: "Baliq taomlari", image: catFish, type: "normal", dishes: fishDishes },
    { name: "Mangal taomlari", image: catMangal, type: "normal", dishes: mangalDishes },
    { name: "Setlar", image: catSetlar, type: "normal", dishes: normalizeSetDishes(setDishes) },
    { name: "Bar", image: catBar, type: "bar", barSections },
    { name: "Shirinliklar", image: catShirinlik, type: "dessert", dishes: dessertDishes },
  ];
}

type ScrollRootRef = RefObject<HTMLElement | null>;

/** Loads full-res src only when near the modal scrollport (or viewport) — avoids 30+ huge JPEGs at once */
function LazyMenuImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className="relative w-full h-full min-h-0 bg-forest-dark/30">
      <OptimizedImage
        src={src}
        alt={alt}
        className={className}
        fill
        sizes="(max-width: 768px) 33vw, 20vw"
      />
    </div>
  );
}

/* 3-3-1 grid helper */
const SubDishGrid = ({
  dishes,
  scrollRootRef,
  onImageClick,
}: {
  dishes: SubDish[];
  /** Modal body (overflow-y-auto) so images load as you scroll, not all at once */
  scrollRootRef?: ScrollRootRef;
  onImageClick: (image: PreviewImage) => void;
}) => {
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
          {row.map((dish, ci) => (
            <div key={`${ri}-${ci}-${dish.id}`} className="group/dish">
              <button
                type="button"
                onClick={() => onImageClick({ src: dish.image, alt: dish.name })}
                className="relative overflow-hidden rounded-sm aspect-square mb-2 w-full cursor-pointer hover:cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                aria-label={`${dish.name} rasmini kattalashtirish`}
              >
                <LazyMenuImage
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/dish:scale-125"
                />
              </button>
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
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<PreviewImage | null>(null);
  const isImagePreviewOpen = Boolean(selectedImage);
  const selected = useMemo(
    () => categories.find((category) => category.name === selectedName) ?? null,
    [categories, selectedName],
  );

  useEffect(() => {
    setCategories(buildCategories());
  }, []);

  useEffect(() => {
    if (!selected) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [selected]);

  useEffect(() => {
    if (!isImagePreviewOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isImagePreviewOpen]);

  useEffect(() => {
    if (selected) return;
    setSelectedImage(null);
  }, [selected]);

  return (
    <>
      <section id="menu" className="py-24 md:py-32 bg-forest-dark relative overflow-hidden">
        {/* Pattern decoration */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url(${toCdnMediaUrl(patternBg.src, { resourceType: "image" })})`, backgroundSize: "400px", backgroundRepeat: "repeat" }}
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
              <CategoryCard key={cat.name} cat={cat} i={i} inView={inView} onClick={() => setSelectedName(cat.name)} />
            ))}
          </div>
          {/* Row 2: 4 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-5 md:mb-6">
            {categories.slice(4, 8).map((cat, i) => (
              <CategoryCard key={cat.name} cat={cat} i={i + 4} inView={inView} onClick={() => setSelectedName(cat.name)} />
            ))}
          </div>
          {/* Row 3: 2 items centered */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {categories.slice(8, 10).map((cat, index) => (
              <div key={cat.name} className={index === 0 ? "md:col-start-2 md:col-span-1" : "md:col-span-1"}>
                <CategoryCard cat={cat} i={index + 8} inView={inView} onClick={() => setSelectedName(cat.name)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-forest-dark/93" onClick={() => setSelectedName(null)} />
            <motion.div
              ref={modalBodyRef}
              className="menu-modal-scroll relative bg-forest-dark border border-accent/20 rounded-sm w-[min(100%,96vw)] max-w-7xl max-h-[94vh] overflow-y-auto overflow-x-hidden overscroll-contain p-5 sm:p-6 md:p-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedName(null)}
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
                      <SubDishGrid
                        dishes={section.items}
                        scrollRootRef={modalBodyRef}
                        onImageClick={setSelectedImage}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Normal & Dessert: 3-3-1 grid */}
              {(selected.type === "normal" || selected.type === "dessert") && selected.dishes && (
                <SubDishGrid
                  dishes={selected.dishes}
                  scrollRootRef={modalBodyRef}
                  onImageClick={setSelectedImage}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submenu image preview (over category modal) */}
      <AnimatePresence>
        {isImagePreviewOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-8 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-forest-dark/95" onClick={() => setSelectedImage(null)} />
            <motion.div
              className="relative z-10 w-full max-w-6xl border border-gold/30 bg-forest-dark rounded-sm p-3 sm:p-4 md:p-5 shadow-[0_10px_80px_rgba(0,0,0,0.55)]"
              initial={{ scale: 0.9, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 12, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 z-20 text-cream/60 hover:text-gold transition-colors"
                aria-label="Rasm preview oynasini yopish"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mb-3 pr-8">
                <p className="font-display text-gold text-base md:text-lg">{selectedImage.alt}</p>
              </div>
              <div className="relative w-full max-h-[86vh] overflow-hidden rounded-sm">
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 0.94, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <OptimizedImage
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-full max-h-[84vh] object-contain"
                    width={1600}
                    height={1200}
                    loading="eager"
                    sizes="100vw"
                  />
                </motion.div>
              </div>
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
      <OptimizedImage
        src={cat.image}
        alt={cat.name}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
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
