/**
 * Browser-side image compression.
 * Posts store images as { data: "data:image/webp;base64,…", name, type } in RTDB,
 * so files are resized and re-encoded before they ever reach the database.
 */

const MAX_BYTES = 380 * 1024; // keep each image comfortably under the RTDB write limit

function drawToCanvas(bitmap, maxWidth) {
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function encode(canvas, quality) {
  const webp = canvas.toDataURL('image/webp', quality);
  if (webp.startsWith('data:image/webp')) return webp;
  return canvas.toDataURL('image/jpeg', quality);
}

/**
 * @param {File} file
 * @param {{ maxWidth?: number }} options
 * @returns {Promise<{ data: string, name: string, type: string }>}
 */
export async function compressImage(file, { maxWidth = 1600 } = {}) {
  const bitmap = await createImageBitmap(file);
  const canvas = drawToCanvas(bitmap, maxWidth);
  bitmap.close?.();

  let quality = 0.86;
  let data = encode(canvas, quality);

  // Step the quality down until the payload is small enough.
  while (data.length * 0.75 > MAX_BYTES && quality > 0.45) {
    quality -= 0.1;
    data = encode(canvas, quality);
  }

  return {
    data,
    name: file.name,
    type: data.slice(5, data.indexOf(';')),
  };
}

/** Approximate decoded size of a data URL, in kilobytes. */
export function dataUrlSizeKb(dataUrl) {
  if (!dataUrl) return 0;
  const base64 = dataUrl.split(',')[1] || '';
  return Math.round((base64.length * 3) / 4 / 1024);
}
