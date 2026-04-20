import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "src", "assets", "menu");

/** @type {string[]} */
const acc = [];

function walk(d, prefix = "") {
  if (!fs.existsSync(d)) return;
  for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, ent.name);
    if (ent.isDirectory()) walk(full, prefix + ent.name + "/");
    else if (/\.(jpe?g)$/i.test(ent.name))
      acc.push(prefix + ent.name.replace(/\.(jpe?g)$/i, ""));
  }
}

walk(root);
acc.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

const outPath = path.join(__dirname, "..", "src", "data", "menuDishMeta.ts");
const prev = new Map();
if (fs.existsSync(outPath)) {
  const existing = fs.readFileSync(outPath, "utf8");
  for (const m of existing.matchAll(/\{\s*rel:\s*"([^"]+)",\s*name:\s*"([^"]*)",\s*price:\s*"([^"]*)"\s*\}/g)) {
    prev.set(m[1].toLowerCase(), { name: m[2], price: m[3] });
  }
}

const rows = acc.map((rel) => {
  const base = rel.split("/").pop() ?? rel;
  const key = rel.toLowerCase();
  const kept = prev.get(key);
  const name = kept?.name ?? base;
  const price = kept?.price ?? "25,000";
  return `  { rel: ${JSON.stringify(rel)}, name: ${JSON.stringify(name)}, price: ${JSON.stringify(price)} },`;
});

const body = `/**
 * Taom nomi va narxi — faqat shu faylni tahrirlang (rasmlar \`src/assets/menu/\` da qoladi).
 * Yangi rasm: papkaga qo'shing, keyin \`npm run gen:menu-meta\` yoki qo'lda \`MENU_DISH_ROWS\` ga qator qo'shing.
 */
export type MenuDishMeta = { name: string; price: string };

export type MenuDishRow = { rel: string; name: string; price: string };

export const MENU_DISH_ROWS: readonly MenuDishRow[] = [
${rows.join("\n")}
] as const;

/** Vite glob kaliti → \`salads/sezar salati\` */
export function menuMetaKeyFromGlobPath(modulePath: string): string {
  const n = modulePath.replace(/\\\\/g, "/").toLowerCase();
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
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, body, "utf8");
console.log("Wrote", outPath, "rows:", acc.length);
