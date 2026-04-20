/**
 * Taom nomi va narxi — faqat shu faylni tahrirlang (rasmlar `src/assets/menu/` da qoladi).
 * Yangi rasm: papkaga qo'shing, keyin `npm run gen:menu-meta` yoki qo'lda `MENU_DISH_ROWS` ga qator qo'shing.
 */
export type MenuDishMeta = { name: string; price: string };

export type MenuDishRow = { rel: string; name: string; price: string };

export const MENU_DISH_ROWS: readonly MenuDishRow[] = [
  { rel: "assorti/Go'shtli Assorti", name: "Go'shtli Assorti", price: "300.000" },
  { rel: "assorti/Sirnoy Assorti", name: "Sirnoy Assorti", price: "140.000" },
  { rel: "bar/coffee/glace-coffee", name: "glace-coffee", price: "22,000" },
  { rel: "bar/coffee/irish-coffee", name: "irish-coffee", price: "20,000" },
  { rel: "bar/coffee/latte", name: "latte", price: "18,000" },
  { rel: "bar/coffee/mocha", name: "mocha", price: "30,000" },
  { rel: "bar/coffee/raf", name: "raf", price: "20,000" },
  { rel: "bar/lemonades/MOX_0683", name: "Ananasli Limonad", price: "25,000" },
  { rel: "bar/lemonades/MOX_0693", name: "Malinali Limonad", price: "20,000" },
  { rel: "bar/lemonades/MOX_0774", name: "Klassik Limonad", price: "20,000" },
  { rel: "bar/lemonades/MOX_0883", name: "Greyp Fruit Limonad", price: "22,000" },
  { rel: "bar/lemonades/MOX_0885", name: "Nihol Tarxun limonad", price: "20,000" },
  { rel: "bar/milkshake/nihol-milkshake", name: "nihol-milkshake", price: "30,000" },
  { rel: "bar/milkshake/snikers", name: "Qulupnayli Milkshake", price: "25,000" },
  { rel: "bar/milkshake/str-milkshake", name: "Snikers Milkshake", price: "30,000" },
  { rel: "bar/mojito/MOX_0527", name: "Klassik Moxito", price: "18,000" },
  { rel: "bar/mojito/MOX_0893", name: "Moxito Malina greypfruit", price: "20,000" },
  { rel: "bar/mojito/MOX_0917", name: "Moxito Energetik Nihol", price: "25,000" },
  { rel: "bar/mojito/MOX_0926", name: "Sitrus Mevali Smuzi", price: "29,500" },
  { rel: "bar/mojito/MOX_0943", name: "Yashil Smuzi", price: "29,500" },
  { rel: "bar/mojito/MOX_0964", name: "MOX_0964", price: "29,500" },
  { rel: "bar/tea/limon-tea", name: "limon-tea", price: "40,000" },
  { rel: "bar/tea/malina-tea", name: "malina-tea", price: "32,000" },
  { rel: "bulon/Frikadelki", name: "Frikadelki", price: "12.500 / 25.000" },
  { rel: "bulon/Okroshka", name: "Okroshka", price: "12.500 / 25.000" },
  { rel: "bulon/Tovuq Bulon", name: "Tovuq Bulon", price: "12.500 / 25.000" },
  { rel: "chicken/1 Qovurilgan Tovuq", name: "1 Qovurilgan Tovuq", price: "34.500 / 46.000 / 115.000" },
  { rel: "chicken/2 Nihol Qanotlari", name: "2 Nihol Qanotlari", price: "39.000 / 52.000 / 130.000" },
  { rel: "chicken/3 Nihol Boldiri", name: "3 Nihol Boldiri", price: "39.000 / 52.000 / 130.000" },
  { rel: "chicken/4 Niholdan Yangilik", name: "4 Niholdan Yangilik", price: "39.000 / 52.000 / 130.000" },
  { rel: "chicken/5 Nihol Qarsildoq Qanotlari", name: "5 Nihol Qarsildoq Qanotlari", price: "90.000" },
  { rel: "chicken/6 Nihol Qarsildoq Jo'jallari", name: "6 Nihol Qarsildoq Jo'jallari", price: "90.000" },
  { rel: "fish/1 Sazan", name: "1 Sazan", price: "48.000 / 64.000 / 160.000" },
  { rel: "fish/2 Sudak File", name: "2 Sudak File", price: "51.000 / 68.000 / 170.000" },
  { rel: "fish/3 Losos", name: "3 Losos", price: "48.000 / 64.000 / 160.000" },
  { rel: "fish/4 Farel", name: "4 Farel", price: "42.000 / 56.000 / 140.000" },
  { rel: "fish/5 Dorado", name: "5 Dorado", price: "90.000" },
  { rel: "fish/6 Losos Norvegiya", name: "6 Losos Norvegiya", price: "110.000" },
  { rel: "mangal/1 Napoleon Kabobi", name: "1 Napoleon Kabobi", price: "25.000" },
  { rel: "mangal/2 Jaz Kabob", name: "2 Jaz Kabob", price: "22.000" },
  { rel: "mangal/3 Qiyma", name: "3 Qiyma", price: "20.000" },
  { rel: "mangal/4 O'rama Kabob", name: "4 O'rama Kabob", price: "20.000" },
  { rel: "mangal/5 Koreyka", name: "5 Koreyka", price: "84.000 / 112.000 / 280.000" },
  { rel: "mangal/6 Tovuqli Barbekyu", name: "6 Tovuqli Barbekyu", price: "39.000 / 52.000 / 130.000" },
  { rel: "mangal/7 Pishloqli Kofte", name: "7 Pishloqli Kofte", price: "63.000" },
  { rel: "mangal/8 Baliqli Kofte", name: "8 Baliqli Kofte", price: "66.000" },
  { rel: "salads/Achichik-Chuchuk", name: "Achichik-Chuchuk", price: "16.500" },
  { rel: "salads/Ajabsanda", name: "Ajabsanda", price: "36.000" },
  { rel: "salads/Avokado Salati", name: "Avokado Salati", price: "68.000" },
  { rel: "salads/Bir Zumda", name: "Bir Zumda", price: "25,000" },
  { rel: "salads/Brukallo", name: "Brukallo", price: "25,000" },
  { rel: "salads/Dubay Salati", name: "Dubay Salati", price: "35.000" },
  { rel: "salads/Elba Salati", name: "Elba Salati", price: "31.500" },
  { rel: "salads/Fabritsio Salati", name: "Fabritsio Salati", price: "37.000" },
  { rel: "salads/Fasol Fresh", name: "Fasol Fresh", price: "42.000" },
  { rel: "salads/Fransuskiy", name: "Fransuzskiy", price: "24.000" },
  { rel: "salads/Grecheskiy", name: "Grecheskiy", price: "33.500" },
  { rel: "salads/Gribnoy Salati", name: "Gribnoy Salati", price: "19.500" },
  { rel: "salads/Marakanskiy", name: "Marakandskiy", price: "50.000" },
  { rel: "salads/Mavsumiy Salati", name: "Mavsumiy Salati", price: "55.000" },
  { rel: "salads/Meksika Salati", name: "Meksika Salati", price: "46.000" },
  { rel: "salads/Motsarello Fiesta", name: "Motsarello Fiesta", price: "49.000" },
  { rel: "salads/Motsarello Salati", name: "Mosarello Salati", price: "68.000" },
  { rel: "salads/Mujskoy Kapriz Salati", name: "Mujskoy Kapriz", price: "33.000" },
  { rel: "salads/Nihol Garden", name: "Nihol Garden", price: "57.000" },
  { rel: "salads/Nihol Salati", name: "Nihol", price: "31.500" },
  { rel: "salads/Olivye Salati", name: "Oliv'e", price: "28.000" },
  { rel: "salads/Ot shefa", name: "Ot Shefa", price: "47.000" },
  { rel: "salads/Qarsildoq", name: "Qarsildoq", price: "30,000" },
  { rel: "salads/Qarsildoq Pishloq", name: "Qarsildoq Pishloq", price: "48.000" },
  { rel: "salads/Safori Bliss", name: "Safori Bliss", price: "33.000" },
  { rel: "salads/Sezar Salati", name: "Sezar", price: "39.500" },
  { rel: "salads/Sitrus Bliss Salati", name: "Sitrus Bliss", price: "42.000" },
  { rel: "salads/Sitsiliya Salati", name: "Sitsilia Salati", price: "45.000" },
  { rel: "salads/Sizzle Salati", name: "Sizzle Salati", price: "55.000" },
  { rel: "salads/Steyk Salati", name: "Steyk Salati", price: "54.000" },
  { rel: "salads/Suzma", name: "Suzma", price: "10.200" },
  { rel: "salads/Svejiy Assorti", name: "Svejiy Assorti 300g / 600g", price: "22.500 / 43.000" },
  { rel: "salads/Svejiy Salati", name: "Svejiy", price: "18.500" },
  { rel: "salads/Svekolniy salat s appelsinom", name: "Svekolniy salat s apelsinovim sousom", price: "33.500" },
  { rel: "salads/Tembura Salati", name: "Tembura Salati", price: "45.000" },
  { rel: "salads/Terrra Salati", name: "Terra Salati", price: "36.000" },
  { rel: "salads/Tibon Salati", name: "Tibon", price: "49.000" },
  { rel: "salads/Vinegret", name: "Vinegret", price: "16.000" },
  { rel: "salads/Yaponskiy Salati", name: "Yaponskiy", price: "29.500" },
  { rel: "set/Nihol Assorti  ( 25 kishi )", name: "Nihol Assorti  ( 25 kishi )", price: "2.322.000" },
  { rel: "set/Nihol Assorti (1 kishi )", name: "Nihol Assorti (1 kishi )", price: "97.900" },
  { rel: "set/Nihol Assorti (10 kishi )", name: "Nihol Assorti (10 kishi )", price: "1.236.000" },
  { rel: "set/Nihol Assorti (15 kishi )", name: "Nihol Assorti (15 kishi )", price: "1.854.000" },
  { rel: "set/Nihol Assorti (20 kishi )", name: "Nihol Assorti (20 kishi )", price: "2.018.000" },
  { rel: "set/Nihol Assorti (4 kishi )", name: "Nihol Assorti (4 kishi )", price: "685.000" },
  { rel: "set/Nihol Assorti (6 kishi )", name: "Nihol Assorti (6 kishi )", price: "777.000" },
  { rel: "somsa/Non", name: "Non", price: "4.800" },
  { rel: "somsa/Somsa", name: "Somsa", price: "6.500" },
] as const;

/** Vite glob kaliti → `salads/sezar salati` */
export function menuMetaKeyFromGlobPath(modulePath: string): string {
  const n = modulePath.replace(/\\/g, "/").toLowerCase();
  const idx = n.indexOf("/menu/");
  if (idx === -1) {
    const file = n.split("/").pop() ?? "";
    const d = file.lastIndexOf(".");
    return d === -1 ? file : file.slice(0, d);
  }
  const rest = n.slice(idx + "/menu/".length);
  const d = rest.lastIndexOf(".");
  return d === -1 ? rest : rest.slice(0, d);
}

export const MENU_DISH_META: Record<string, MenuDishMeta> = Object.fromEntries(
  MENU_DISH_ROWS.map((row) => [row.rel.toLowerCase(), { name: row.name, price: row.price }])
);

export const DEFAULT_MENU_PRICE = "25,000";

export function resolveMenuDishLabel(modulePath: string, imageUrl: string): {
  id: string;
  name: string;
  price: string;
  image: string;
} {
  const key = menuMetaKeyFromGlobPath(modulePath);
  const meta = MENU_DISH_META[key];
  const stemPart = key.includes("/") ? key.slice(key.lastIndexOf("/") + 1) : key;
  const fallbackName = stemPart.replace(/_/g, " ").replace(/-/g, " ");
  return {
    id: key,
    name: meta?.name ?? fallbackName,
    price: meta?.price ?? DEFAULT_MENU_PRICE,
    image: imageUrl,
  };
}
