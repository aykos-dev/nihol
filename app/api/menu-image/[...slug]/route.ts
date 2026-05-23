import { promises as fs } from "node:fs";
import path from "node:path";
import { MENU_DISH_ROWS } from "@/data/menuDishMeta";

const MENU_ROOT = path.join(process.cwd(), "src", "assets", "menu");
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function normalizeSegment(segment: string): string {
  return segment.trim().toLowerCase();
}

function normalizeToken(value: string): string {
  return normalizeSegment(value).replace(/[^a-z0-9]+/g, "");
}

function menuRelFromDecodedSlug(decoded: string[]): string {
  return decoded.join("/").toLowerCase();
}

function metaNameFromRel(rel: string): string | null {
  const matched = MENU_DISH_ROWS.find((row) => row.rel.toLowerCase() === rel);
  return matched?.name ?? null;
}

function rowIndexInFolder(rel: string, folderPrefix: string): number {
  return MENU_DISH_ROWS.filter((row) => row.rel.toLowerCase().startsWith(folderPrefix)).findIndex(
    (row) => row.rel.toLowerCase() === rel,
  );
}

function contentTypeFromExtension(ext: string): string {
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".avif") return "image/avif";
  return "image/jpeg";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  if (!Array.isArray(slug) || slug.length < 2) {
    return new Response("Not found", { status: 404 });
  }

  const decoded = slug.map((segment) => decodeURIComponent(segment));
  if (decoded.some((segment) => segment.includes("..") || path.isAbsolute(segment))) {
    return new Response("Invalid path", { status: 400 });
  }

  const folderSegments = decoded.slice(0, -1);
  const stem = decoded[decoded.length - 1];
  const folderPath = path.join(MENU_ROOT, ...folderSegments);
  const relFromSlug = menuRelFromDecodedSlug(decoded);
  const metaName = metaNameFromRel(relFromSlug);
  const candidates = [stem, metaName].filter((value): value is string => Boolean(value));
  const folderPrefix = `${folderSegments.join("/").toLowerCase()}/`;

  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    const matchedEntry = entries.find((entry) => {
      if (!entry.isFile()) return false;
      const ext = path.extname(entry.name).toLowerCase();
      if (!SUPPORTED_EXTENSIONS.has(ext)) return false;
      const entryStem = path.basename(entry.name, ext);
      return candidates.some((candidate) => normalizeToken(entryStem) === normalizeToken(candidate));
    });

    if (!matchedEntry) {
      const folderFiles = entries
        .filter((entry) => {
          if (!entry.isFile()) return false;
          const ext = path.extname(entry.name).toLowerCase();
          return SUPPORTED_EXTENSIONS.has(ext);
        })
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
      const index = rowIndexInFolder(relFromSlug, folderPrefix);
      const fallbackByIndex = index >= 0 ? folderFiles[index] : undefined;
      const fallbackEntry = fallbackByIndex ?? folderFiles[0];
      if (!fallbackEntry) {
        return new Response("Not found", { status: 404 });
      }

      const fallbackPath = path.join(folderPath, fallbackEntry.name);
      const fallbackBuffer = await fs.readFile(fallbackPath);
      const fallbackExt = path.extname(fallbackEntry.name).toLowerCase();
      return new Response(fallbackBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentTypeFromExtension(fallbackExt),
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    const fullPath = path.join(folderPath, matchedEntry.name);
    const fileBuffer = await fs.readFile(fullPath);
    const ext = path.extname(matchedEntry.name).toLowerCase();

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentTypeFromExtension(ext),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
