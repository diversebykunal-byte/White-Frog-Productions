#!/usr/bin/env python3
"""
White Frog Productions - Instagram Media Extractor & Cloudinary Ingestor
Usage:
  python3 scripts/add_from_instagram.py "https://www.instagram.com/p/C-xyz123/"
  python3 scripts/add_from_instagram.py --urls-file instagram_links.txt

How it works:
1. Accepts one or multiple Instagram post/reel URLs
2. Resolves the high-res image / thumbnail via Instagram embed/open-graph metadata
3. Ingests directly into your Cloudinary account (whitefrog/instagram/...)
4. Returns the permanent Cloudinary CDN URL ready to paste into any gallery or story!
"""

import sys
import os
import re
import urllib.request
import urllib.parse
import json

CLOUDINARY_CLOUD_NAME = os.environ.get("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "lyoxtgem")
CLOUDINARY_API_KEY = "488787948725331"
CLOUDINARY_API_SECRET = "O_bzU2hzITLtz5R56ln8hVo6zsw"

def extract_instagram_image_url(insta_url: str):
    """Extracts high-resolution image URL and caption/title from an Instagram post or reel."""
    clean_url = insta_url.split("?")[0].rstrip("/")
    headers = {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    }
    
    try:
        req = urllib.request.Request(clean_url + "/", headers=headers)
        with urllib.request.urlopen(req, timeout=15) as res:
            html = res.read().decode("utf-8", errors="ignore")
            
            og_imgs = re.findall(r'property=[\"\']og:image[\"\']\s+content=[\"\']([^\"\']+)[\"\']', html) or \
                      re.findall(r'content=[\"\']([^\"\']+)[\"\']\s+property=[\"\']og:image[\"\']', html)
            og_titles = re.findall(r'property=[\"\']og:title[\"\']\s+content=[\"\']([^\"\']+)[\"\']', html) or \
                        re.findall(r'content=[\"\']([^\"\']+)[\"\']\s+property=[\"\']og:title[\"\']', html)
            
            img_url = og_imgs[0].replace("&amp;", "&") if og_imgs else ""
            title = og_titles[0].replace("&amp;", "&").replace("&quot;", '"') if og_titles else ""
            
            if img_url:
                return img_url, title
    except Exception as e:
        print(f"  [Crawler error for {insta_url}]: {e}")
    
    # Fallback to embed
    embed_url = f"{clean_url}/embed/captioned/"
    try:
        from bs4 import BeautifulSoup
        req = urllib.request.Request(embed_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as res:
            html = res.read().decode("utf-8", errors="ignore")
            soup = BeautifulSoup(html, "html.parser")
            for im in soup.find_all("img"):
                src = im.get("src", "")
                if ("fbcdn.net" in src or "cdninstagram.com" in src) and "s100x100" not in src:
                    return src.replace("&amp;", "&"), ""
    except Exception as e:
        print(f"  [Embed fallback error for {insta_url}]: {e}")
    
    return "", ""

def upload_to_cloudinary(image_url: str, public_id_name: str) -> str:
    """Uploads remote image URL directly to Cloudinary."""
    import base64
    upload_endpoint = f"https://api.cloudinary.com/v1_1/{CLOUDINARY_CLOUD_NAME}/image/upload"
    
    auth_str = f"{CLOUDINARY_API_KEY}:{CLOUDINARY_API_SECRET}"
    auth_header = "Basic " + base64.b64encode(auth_str.encode()).decode()
    
    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    body_lines = [
        f"--{boundary}",
        'Content-Disposition: form-data; name="file"',
        "",
        image_url,
        f"--{boundary}",
        'Content-Disposition: form-data; name="public_id"',
        "",
        f"whitefrog/instagram/{public_id_name}",
        f"--{boundary}",
        'Content-Disposition: form-data; name="overwrite"',
        "",
        "true",
        f"--{boundary}--",
        ""
    ]
    body = "\r\n".join(body_lines).encode("utf-8")
    
    req = urllib.request.Request(
        upload_endpoint,
        data=body,
        headers={
            "Authorization": auth_header,
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        }
    )
    
    with urllib.request.urlopen(req, timeout=30) as res:
        data = json.loads(res.read().decode())
        return data.get("secure_url", "")

def process_url(insta_url: str):
    print(f"\n📸 Processing: {insta_url}")
    img_url, title = extract_instagram_image_url(insta_url)
    if not img_url:
        print("  ✗ Could not extract image from Instagram.")
        return None
    
    post_id = insta_url.split("?")[0].rstrip("/").split("/")[-1]
    print(f"  ✓ Found source image. Title: {title[:60]}")
    print(f"  Uploading to Cloudinary...")
    try:
        cld_url = upload_to_cloudinary(img_url, post_id)
        print(f"  🚀 Uploaded to Cloudinary successfully!")
        print(f"  URL: {cld_url}")
        return {
            "title": title,
            "url": cld_url,
            "insta_url": insta_url,
            "post_id": post_id
        }
    except Exception as e:
        print(f"  ✗ Cloudinary upload error: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/add_from_instagram.py <INSTAGRAM_URL> [<INSTAGRAM_URL_2> ...]")
        sys.exit(1)
    
    results = []
    for url in sys.argv[1:]:
        res = process_url(url)
        if res:
            results.append(res)
    
    print("\n" + "="*60)
    print("✨ ALL UPLOADED TO CLOUDINARY ✨")
    print("="*60)
    for r in results:
        print(f"  • {r['title']}")
        print(f"    CDN: {r['url']}")
        print(f"    Post: {r['insta_url']}\n")
