# White Frog Productions - Modern Web Platform

A 1:1 pixel-perfect replication and modernization of [whitefrogproductions.com](https://www.whitefrogproductions.com) (originally on Pixieset), re-engineered with Next.js 14, Tailwind CSS, Framer Motion, YouTube theater embeds, Cloudinary media optimization, and Supabase CRM.

---

## 🌟 What Was Built

1. **1:1 Fullscreen Minimalist Menu Overlay**:
   - Matches the signature Pixieset layout: *Home, Cinematic Heirlooms, Gallery of Emotions, Feature Films, Corporate, Info +, Reserve Your Experience*.
   - Uses the exact classical serif typography: **Forum** and **Cormorant Garamond**.

2. **Cinematic Heirlooms (Wedding Stories)**:
   - All 26 extracted destination wedding stories (*Amol & Sahil, Mridali & Prayas, Rea & Varaul, Tanya & Eshan, etc.*).
   - Click-to-play theater video modal.

3. **Gallery of Emotions (Fine-Art Stills)**:
   - High-resolution masonry grid with full-screen lightbox viewer.

4. **Feature Films Showcase**:
   - 29 feature wedding documentary films.

5. **About Us & The Experience**:
   - Kunal Khanna & Madhavi Singh founder narrative, brand history since September 2012, and client testimonials.

6. **All 9 FAQs**:
   - Exact answers for destination travel, turnaround times, drone inclusion, and payment terms.

7. **Reserve Your Experience (Inquiry CRM)**:
   - Elegant form connected directly to Supabase (`inquiries` table) with graceful offline fallback.

8. **Cloudinary Ingestion Script**:
   - `src/scripts/migrate_to_cloudinary.py` to auto-upload all 1,269 extracted photos directly via URL without downloading files locally.

---

## 🚀 Quick Start (Local Development)

```bash
cd /Users/kunalkhanna/.gemini/antigravity/scratch/whitefrog-web

# Install dependencies (already completed)
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In [Vercel](https://vercel.com), click **Add New > Project** and import the repository.
3. Add your environment variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**.
5. Under **Project Settings > Domains**, assign `whitefrogproductions.com`.
