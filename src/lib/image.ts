import sharp from "sharp";

export async function optimizeUpload(fileBuffer: Buffer) {
  const full = await sharp(fileBuffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const thumbnail = await sharp(fileBuffer)
    .resize({ width: 480, height: 320, fit: "cover" })
    .webp({ quality: 75 })
    .toBuffer();

  return {
    full,
    thumbnail,
    contentType: "image/webp"
  };
}
