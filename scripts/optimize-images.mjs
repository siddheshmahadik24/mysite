/**
 * One-off script: optimize hero photos for fast browser decode.
 * Run with: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const picsDir = path.join(__dirname, "..", "public", "pics");

const jobs = [
  {
    input: path.join(picsDir, "with-wife.png"),
    output: path.join(picsDir, "with-wife.jpg"),
    label: "With Wife (PNG → JPEG)",
  },
  {
    input: path.join(picsDir, "siddesh-solo.jpg"),
    output: path.join(picsDir, "siddesh-solo.jpg"),
    label: "Siddesh Solo (JPEG → smaller JPEG)",
  },
];

for (const { input, output, label } of jobs) {
  const sameFile = path.resolve(input) === path.resolve(output);
  const writeTo = sameFile ? output + ".tmp" : output;

  const result = await sharp(input)
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(writeTo);

  if (sameFile) {
    fs.renameSync(writeTo, output);
  }

  const kb = (result.size / 1024).toFixed(0);
  console.log(`✓ ${label} → ${kb} KB  (${result.width}×${result.height})`);
}
