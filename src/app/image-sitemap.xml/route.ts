import { NextResponse } from "next/server";
import { STORIES, GALLERY_PHOTOS, COX_AND_KINGS_PHOTOS } from "@/data/siteData";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = "https://www.whitefrogproductions.com";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // 1. Core Gallery Photos on /gallery-of-emotions
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/gallery-of-emotions</loc>\n`;
  for (const photo of GALLERY_PHOTOS.slice(0, 50)) {
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${escapeXml(photo)}</image:loc>\n`;
    xml += `      <image:title>Fine-Art Luxury Wedding Photography Still | White Frog Productions</image:title>\n`;
    xml += `      <image:caption>Editorial destination wedding photography heirloom captured by White Frog Productions</image:caption>\n`;
    xml += `    </image:image>\n`;
  }
  xml += `  </url>\n`;

  // 2. Each Story and its Full Photo Gallery
  for (const story of STORIES) {
    const pageUrl = `${baseUrl}/cinematic-heirlooms/${story.slug}`;
    const allPhotos = [story.coverImage, ...(story.photos || [])];
    const uniquePhotos = Array.from(new Set(allPhotos));

    xml += `  <url>\n`;
    xml += `    <loc>${pageUrl}</loc>\n`;

    for (let i = 0; i < uniquePhotos.length; i++) {
      const photoUrl = uniquePhotos[i];
      const title = `${story.couple} Luxury Wedding Photography at ${story.location} | White Frog Productions - Still ${i + 1}`;
      const caption = `Fine-art destination wedding cinema and photography heirlooms of ${story.couple} at ${story.location} by White Frog Productions.`;

      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(photoUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(title)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(caption)}</image:caption>\n`;
      xml += `    </image:image>\n`;
    }

    xml += `  </url>\n`;
  }

  // 3. Corporate Commercial Campaign Photos on /corporate
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/corporate</loc>\n`;
  for (let i = 0; i < COX_AND_KINGS_PHOTOS.length; i++) {
    const photoUrl = COX_AND_KINGS_PHOTOS[i];
    const title = `Cox & Kings Kullu Lifestyle Campaign Still ${i + 1} | White Frog Productions`;
    const caption = `Commercial travel and lifestyle cinematography and photography campaign in Kullu by White Frog Productions.`;

    xml += `    <image:image>\n`;
    xml += `      <image:loc>${escapeXml(photoUrl)}</image:loc>\n`;
    xml += `      <image:title>${escapeXml(title)}</image:title>\n`;
    xml += `      <image:caption>${escapeXml(caption)}</image:caption>\n`;
    xml += `    </image:image>\n`;
  }
  xml += `  </url>\n`;

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
