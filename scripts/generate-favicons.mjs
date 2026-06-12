import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "src/assets/adam-badge.png");
const outDir = path.join(root, "public");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const meta = await sharp(source).metadata();
const size = Math.min(meta.width ?? 396, meta.height ?? 630);
const left = Math.floor(((meta.width ?? 396) - size) / 2);
const top = Math.floor(((meta.height ?? 630) - size) / 2);

const square = sharp(source).extract({ left, top, width: size, height: size });

const sizes = [
  ["favicon-48x48.png", 48],
  ["favicon-192x192.png", 192],
  ["apple-touch-icon.png", 180],
  ["logo.png", 512],
];

for (const [name, dim] of sizes) {
  await square.clone().resize(dim, dim).png().toFile(path.join(outDir, name));
  console.log(`Wrote public/${name}`);
}

await square.clone().resize(32, 32).png().toFile(path.join(outDir, "favicon.ico"));
console.log("Wrote public/favicon.ico");
