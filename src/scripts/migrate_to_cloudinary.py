"""
White Frog Productions - Cloudinary Batch Uploader
Uploads all extracted high-res wedding photos from Pixieset directly to Cloudinary.
No local file download needed: Cloudinary fetches directly from the remote URL.

Usage:
  export CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
  python3 migrate_to_cloudinary.py
"""

import os
import json
import time

try:
    import cloudinary
    import cloudinary.uploader
except ImportError:
    print("Please install cloudinary: pip install cloudinary")
    exit(1)

DATA_PATH = "/Users/kunalkhanna/.gemini/antigravity/scratch/whitefrog-extracted/extracted_site_data.json"

if not os.path.exists(DATA_PATH):
    print(f"Data file not found at {DATA_PATH}")
    exit(1)

with open(DATA_PATH) as f:
    site_data = json.load(f)

images = site_data.get("all_images", [])
print(f"Found {len(images)} images to process for Cloudinary.")

# Cloudinary automatically reads CLOUDINARY_URL from environment
# or configure manually:
# cloudinary.config(cloud_name="...", api_key="...", api_secret="...")

success_count = 0
failed_count = 0

for idx, img in enumerate(images):
    url = img["url"]
    page = img.get("page", "general").strip("/").replace("/", "_") or "home"
    
    # Generate clean public_id
    filename = url.split("/")[-1].split("?")[0]
    public_id = f"whitefrog/{page}/{filename}"
    
    print(f"[{idx+1}/{len(images)}] Ingesting {url} -> {public_id}...")
    try:
        res = cloudinary.uploader.upload(
            url,
            public_id=public_id,
            overwrite=False,
            resource_type="image"
        )
        print(f"  ✓ Uploaded: {res.get('secure_url')}")
        success_count += 1
    except Exception as e:
        print(f"  ✗ Error: {e}")
        failed_count += 1
    
    time.sleep(0.2)

print("\n--- CLOUDINARY MIGRATION FINISHED ---")
print(f"Success: {success_count}")
print(f"Failed: {failed_count}")
