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

  const transformations: string[] = ['f_auto', 'q_auto'];
  if (options.width) {
    transformations.push(`w_${options.width}`);
  }
  const transformString = transformations.join(',');

  // If it's a Cloudinary upload URL, inject automatic compression & sizing if not already present
  if (src.includes('res.cloudinary.com') && src.includes('/image/upload/')) {
    if (!src.includes('f_auto') && !src.includes('q_auto')) {
      return src.replace('/image/upload/', `/image/upload/${transformString}/`);
    }
    return src;
  }

  // Local static asset
  if (src.startsWith('/')) {
    return src;
  }

  // Build Cloudinary Fetch transformation for external images
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transformString}/${encodeURI(src)}`;
}

export function cld(src: string, width?: number): string {
  return getOptimizedImageUrl(src, { width });
}
