import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
import { MENU_DISH_ROWS, resolveMenuDishLabel } from "@/data/menuDishMeta";

type SubDish = { id: string; name: string; image: string; price: string };

/** All images in `src/assets/menu/salads` */
const saladImageModules = import.meta.glob<string>("../assets/menu/salads/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});

/** All images under `src/assets/menu/bar` — papka bo‘yicha guruhlangan */
const barImageModules = import.meta.glob<string>("../assets/menu/bar/**/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});

const assortiMenuModules = import.meta.glob<string>("../assets/menu/assorti/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});
const bulonMenuModules = import.meta.glob<string>("../assets/menu/bulon/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});
const somsaMenuModules = import.meta.glob<string>("../assets/menu/somsa/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});
const chickenMenuModules = import.meta.glob<string>("../assets/menu/chicken/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});
const fishMenuModules = import.meta.glob<string>("../assets/menu/fish/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});
const mangalMenuModules = import.meta.glob<string>("../assets/menu/mangal/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});
const setMenuModules = import.meta.glob<string>("../assets/menu/set/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});
const dessertsMenuModules = import.meta.glob<string>("../assets/menu/desserts/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});
const shirinlikMenuModules = import.meta.glob<string>("../assets/menu/shirinlik/*.{jpg,jpeg,JPG}", {
  eager: true,
  import: "default",
});

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
  return titled === "Brukallo" ? "Brukkallo" : titled;
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
  const forcedLast = ["Achichik Chuchuk", "Ajabsanda", "Bir Zumda", "Brukkallo"] as const;
  const firstName = "Avokado Salati";

  const first = dishes.find((dish) => dish.name === firstName);
  const middle = dishes.filter((dish) => dish.name !== firstName && !forcedLast.includes(dish.name as (typeof forcedLast)[number]));
  const tail = forcedLast
    .map((name) => dishes.find((dish) => dish.name === name))
    .filter((dish): dish is SubDish => Boolean(dish));

  return [first, ...middle, ...tail].filter((dish): dish is SubDish => Boolean(dish));
}

function mapDishFromPath(path: string, url: string): SubDish {
  const r = resolveMenuDishLabel(path, url);
  return { id: r.id, name: normalizeDishName(r.name), image: r.image, price: r.price };
}

function dishesFromModules(modules: Record<string, string>, opts?: { saladMode?: boolean }): SubDish[] {
  const mapped = Object.entries(modules)
    .map(([path, url]) => mapDishFromPath(path, url))
    .sort(compareDishOrder);

  return opts?.saladMode ? applySaladPriority(mapped) : mapped;
}

type BarSubSection = { title: string; items: SubDish[] };
type SetSpec = { people: number; name: string; price: string };

const saladDishes = dishesFromModules(saladImageModules, { saladMode: true });

const dessertMenuModulesAll: Record<string, string> = {
  ...dessertsMenuModules,
  ...shirinlikMenuModules,
};
const dessertDishesFromMenu = dishesFromModules(dessertMenuModulesAll);
const dessertDishes: SubDish[] =
  dessertDishesFromMenu.length > 0
    ? dessertDishesFromMenu
    : [
        { id: "dessert-fallback-tiramisu", name: "Tiramisu", image: dessertTiramisu, price: "35,000" },
        { id: "dessert-fallback-baklava", name: "Baklava", image: dessertBaklava, price: "28,000" },
        { id: "dessert-fallback-fondant", name: "Shokoladli fondant", image: dessertFondant, price: "40,000" },
        { id: "dessert-fallback-cheesecake", name: "Chiz keyk", image: dessertTiramisu, price: "38,000" },
        { id: "dessert-fallback-panna", name: "Panna kotta", image: dessertBaklava, price: "30,000" },
        { id: "dessert-fallback-medovik", name: "Medovik", image: dessertFondant, price: "25,000" },
        { id: "dessert-fallback-napoleon", name: "Napoleon", image: dessertTiramisu, price: "28,000" },
      ];

const BAR_FOLDER_ORDER = ["coffee", "lemonades", "mojito", "milkshake", "tea"] as const;
const BAR_FOLDER_TITLES: Record<(typeof BAR_FOLDER_ORDER)[number], string> = {
  coffee: "Kofe",
  lemonades: "Limonadlar",
  mojito: "Mojito",
  milkshake: "Milkshake",
  tea: "Choy",
};

const BAR_META_BY_FOLDER: Record<(typeof BAR_FOLDER_ORDER)[number], { rel: string; name: string; price: string }[]> = {
  coffee: [],
  lemonades: [],
  mojito: [],
  milkshake: [],
  tea: [],
};

for (const row of MENU_DISH_ROWS) {
  if (!row.rel.startsWith("bar/")) continue;
  const folder = row.rel.split("/")[1] as (typeof BAR_FOLDER_ORDER)[number];
  if (BAR_FOLDER_ORDER.includes(folder)) {
    BAR_META_BY_FOLDER[folder].push({ rel: row.rel, name: row.name, price: row.price });
  }
}

function barFolderFromPath(modulePath: string): string | null {
  const normalized = modulePath.replace(/\\/g, "/");
  const m = normalized.match(/\/bar\/([^/]+)\//);
  return m?.[1] ?? null;
}

const barSections: BarSubSection[] = BAR_FOLDER_ORDER.flatMap((folder) => {
  const sortedFolderEntries = Object.entries(barImageModules)
    .filter(([path]) => barFolderFromPath(path) === folder)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const items = sortedFolderEntries
    .map(([path, url], index) => {
      const metaRow = BAR_META_BY_FOLDER[folder][index];
      if (!metaRow) return mapDishFromPath(path, url);
      return {
        id: metaRow.rel.toLowerCase(),
        name: normalizeDishName(metaRow.name),
        image: url,
        price: metaRow.price,
      };
    })
    .sort(compareDishOrder);
  if (items.length === 0) return [];
  return [{ title: BAR_FOLDER_TITLES[folder], items }];
});

type Category = {
  name: string;
  image: string;
  type: "normal" | "bar" | "dessert";
  dishes?: SubDish[];
  barSections?: BarSubSection[];
};

const assortiDishes = dishesFromModules(assortiMenuModules);
const bulonDishes = dishesFromModules(bulonMenuModules);
const somsaDishes = dishesFromModules(somsaMenuModules);
const chickenDishes = dishesFromModules(chickenMenuModules);
const fishDishes = dishesFromModules(fishMenuModules);
const mangalDishes = dishesFromModules(mangalMenuModules);
const setDishes = dishesFromModules(setMenuModules);
const SET_MENU_SPECS: SetSpec[] = [
  { people: 1, name: "Nihol Assorti (1 kishi )", price: "97.900" },
  { people: 4, name: "Nihol Assorti (4 kishi)", price: "685.000" },
  { people: 6, name: "Nihol Assorti (6 kishi)", price: "777.000" },
  { people: 10, name: "Nihol Assorti (10 kishi)", price: "1.236.000" },
  { people: 15, name: "Nihol Assorti (15 kishi)", price: "1.854.000" },
  { people: 20, name: "Nihol Assorti (20 kishi)", price: "2.018.000" },
  { people: 25, name: "Nihol Assorti  (25 kishi)", price: "2.322.000" },
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

const categories: Category[] = [
  {
    name: "Salatlar",
    image: catSalads,
    type: "normal",
    dishes: saladDishes,
  },
  {
    name: "Assorti",
    image: catAssorti,
    type: "normal",
    dishes: assortiDishes,
  },
  {
    name: "Bulon",
    image: catShorva,
    type: "normal",
    dishes: bulonDishes,
  },
  {
    name: "Somsa",
    image: catSomsa,
    type: "normal",
    dishes: somsaDishes,
  },
  {
    name: "Tovuq taomlari",
    image: catChicken,
    type: "normal",
    dishes: chickenDishes,
  },
  {
    name: "Baliq taomlari",
    image: catFish,
    type: "normal",
    dishes: fishDishes,
  },
  {
    name: "Mangal taomlari",
    image: catMangal,
    type: "normal",
    dishes: mangalDishes,
  },
  {
    name: "Setlar",
    image: catSetlar,
    type: "normal",
    dishes: normalizeSetDishes(setDishes),
  },
  {
    name: "Bar",
    image: catBar,
    type: "bar",
    barSections,
  },
  {
    name: "Shirinliklar",
    image: catShirinlik,
    type: "dessert",
    dishes: dessertDishes,
  },
];

type ScrollRootRef = RefObject<HTMLElement | null>;

/** Loads full-res src only when near the modal scrollport (or viewport) — avoids 30+ huge JPEGs at once */
function LazyMenuImage({
  src,
  alt,
  scrollRootRef,
  className,
}: {
  src: string;
  alt: string;
  scrollRootRef?: ScrollRootRef;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || active) return;

    const root = scrollRootRef?.current ?? null;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setActive(true);
      },
      { root, rootMargin: "180px 0px 80px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active, scrollRootRef, src]);

  return (
    <div ref={wrapRef} className="relative w-full h-full min-h-0 bg-forest-dark/30">
      {active ? (
        <img
          src={src}
          alt={alt}
          className={className}
          decoding="async"
          loading="lazy"
          fetchPriority="low"
          width={480}
          height={480}
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-forest-dark/40" aria-hidden />
      )}
    </div>
  );
}

/* 3-3-1 grid helper */
const SubDishGrid = ({
  dishes,
  scrollRootRef,
}: {
  dishes: SubDish[];
  /** Modal body (overflow-y-auto) so images load as you scroll, not all at once */
  scrollRootRef?: ScrollRootRef;
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
              <div className="relative overflow-hidden rounded-sm aspect-square mb-2">
                <LazyMenuImage
                  src={dish.image}
                  alt={dish.name}
                  scrollRootRef={scrollRootRef}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/dish:scale-110"
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
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Category | null>(null);

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-forest-dark/93" onClick={() => setSelected(null)} />
            <motion.div
              ref={modalBodyRef}
              className="menu-modal-scroll relative bg-forest-dark border border-accent/20 rounded-sm w-[min(100%,96vw)] max-w-7xl max-h-[94vh] overflow-y-auto overflow-x-hidden overscroll-contain p-5 sm:p-6 md:p-10"
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
                      <SubDishGrid dishes={section.items} scrollRootRef={modalBodyRef} />
                    </div>
                  ))}
                </div>
              )}

              {/* Normal & Dessert: 3-3-1 grid */}
              {(selected.type === "normal" || selected.type === "dessert") && selected.dishes && (
                <SubDishGrid dishes={selected.dishes} scrollRootRef={modalBodyRef} />
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
        decoding="async"
        fetchPriority="low"
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
