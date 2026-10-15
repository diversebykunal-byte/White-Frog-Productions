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

def extract_instagram_image_url(insta_url: str) -> str:
    """Extracts high-resolution image URL from an Instagram post or reel."""
    clean_url = insta_url.split("?")[0].rstrip("/")
    embed_url = f"{clean_url}/embed/captioned/"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    }
    
    req = urllib.request.Request(embed_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            html = res.read().decode("utf-8", errors="ignore")
            
            # Match EmbeddedMediaImage
            match = re.search(r'class="EmbeddedMediaImage"[^>]*src="([^"]+)"', html)
            if match:
                img_url = match.group(1).replace("&amp;", "&")
                return img_url
            
            # Fallback open graph image
            og_match = re.search(r'property="og:image"\s+content="([^"]+)"', html) or \
                       re.search(r'content="([^"]+)"\s+property="og:image"', html)
            if og_match:
                return og_match.group(1).replace("&amp;", "&")
    except Exception as e:
        print(f"  [Error fetching {insta_url}]: {e}")
    
    return ""

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
    img_url = extract_instagram_image_url(insta_url)
    if not img_url:
        print("  ✗ Could not extract image directly from Instagram embed.")
        print(f"  💡 Fallback proxy: https://res.cloudinary.com/{CLOUDINARY_CLOUD_NAME}/image/fetch/f_auto,q_auto/{insta_url}")
        return
    
    post_id = insta_url.split("?")[0].rstrip("/").split("/")[-1]
    print(f"  ✓ Found source image. Uploading to Cloudinary...")
    try:
        cld_url = upload_to_cloudinary(img_url, post_id)
        print(f"  🚀 Uploaded to Cloudinary successfully!")
        print(f"  URL: {cld_url}")
        return cld_url
    except Exception as e:
        print(f"  ✗ Cloudinary upload error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/add_from_instagram.py <INSTAGRAM_URL>")
        sys.exit(1)
    
    for url in sys.argv[1:]:
        process_url(url)
