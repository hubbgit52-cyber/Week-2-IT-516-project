import sharp from 'sharp';
import { writeFile } from 'fs/promises';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
const pngPath = path.join(publicDir, 'hero.png');
const webpPath = path.join(publicDir, 'hero.webp');
const avifPath = path.join(publicDir, 'hero.avif');

async function convert() {
  try {
    const img = sharp(pngPath);

    // Create a resized, optimized WebP
    await img
      .clone()
      .webp({ quality: 75, effort: 6 })
      .toFile(webpPath);

    // Create an AVIF version (better compression)
    await img
      .clone()
      .avif({ quality: 60, effort: 4 })
      .toFile(avifPath);

    console.log('Created hero.webp and hero.avif in public/');
  } catch (err) {
    console.error('Conversion failed:', err);
    process.exit(1);
  }
}

convert();
