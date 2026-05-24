import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "favicon.ico");
  try {
    const fileBuffer = await fs.readFile(filePath);
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/x-icon",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
