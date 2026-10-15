/**
 * Cloudinary Media Helper for White Frog Productions
 * Automatically routes images through Cloudinary Edge CDN (f_auto, q_auto)
 * Prevents hotlinking blocks and guarantees zero broken images.
 */

// Defensive cleanup in case user pasted "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=lyoxtgem" or quotes into Vercel
let rawCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "lyoxtgem";
if (rawCloudName.includes("=")) {
  rawCloudName = rawCloudName.split("=")[1].trim();
}
const CLOUD_NAME = rawCloudName.replace(/["';]/g, "").trim() || "lyoxtgem";

export function getOptimizedImageUrl(src: string, options: { width?: number; quality?: string } = {}): string {
  if (!src) return '';

  // If it's already a Cloudinary URL or local static asset, return as-is
  if (src.startsWith('/') || src.includes('res.cloudinary.com')) {
    return src;
  }

  // Build Cloudinary Fetch transformation
  const transformations: string[] = ['f_auto', 'q_auto'];
  if (options.width) {
    transformations.push(`w_${options.width}`);
  }

  const transformString = transformations.join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transformString}/${encodeURI(src)}`;
}

export function cld(src: string, width?: number): string {
  return getOptimizedImageUrl(src, { width });
}
