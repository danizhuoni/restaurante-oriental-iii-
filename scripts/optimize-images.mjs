// Converts the source PNGs in assets-src/images into responsive WebP files
// in public/img. Run with `npm run images` whenever a source image changes.
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('assets-src/images');
const OUT = path.resolve('public/img');
const WIDTHS = [640, 1280, 1920];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;
  for (const width of WIDTHS) {
    const out = path.join(OUT, `${name}-${width}.webp`);
    const info = await sharp(path.join(SRC, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width >= 1920 ? 72 : 76, effort: 6 })
      .toFile(out);
    console.log(`${path.basename(out)}  ${(info.size / 1024).toFixed(0)} KB`);
  }
}
