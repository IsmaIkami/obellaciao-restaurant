# 🚀 Deploy to Get Live Demo Link

## Option 1: Netlify (Fastest - 2 Minutes)

### Step 1: Go to Netlify
1. Visit https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify

### Step 2: Select Repository
1. Find and select `obellaciao-restaurant`
2. Netlify will auto-detect the settings (from `netlify.toml`)

### Step 3: Add Environment Variables
Before clicking "Deploy", scroll down to **Environment variables** and add:

```
VITE_SUPABASE_URL = your_supabase_url_here
VITE_SUPABASE_ANON_KEY = your_supabase_anon_key_here
```

### Step 4: Deploy
1. Click "Deploy site"
2. Wait ~2 minutes for build to complete
3. Get your live demo link! (format: `https://random-name.netlify.app`)

### Step 5: (Optional) Custom Domain
Click "Domain settings" to add a custom domain like `obellaciao.netlify.app`

---

## Option 2: Vercel (Also Fast)

### Step 1: Go to Vercel
1. Visit https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository

### Step 2: Configure
1. Vercel auto-detects Vite settings
2. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Step 3: Deploy
1. Click "Deploy"
2. Wait ~2 minutes
3. Get your live link! (format: `https://obellaciao-restaurant.vercel.app`)

---

## Option 3: GitHub Pages (Static Demo)

**Note**: This won't work without Supabase, but you can show the UI

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages using `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json`:
   ```json
   "homepage": "https://IsmaIkami.github.io/obellaciao-restaurant",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

---

## 🎯 Recommended: Use Netlify

**Why Netlify?**
- Easiest setup
- Free SSL certificate
- Automatic deploys from GitHub
- Environment variables support
- CDN included

**Your demo will be live at**: `https://[your-site-name].netlify.app`

---

## 📝 Don't Forget!

Before deploying, make sure you:
1. ✅ Created your Supabase project
2. ✅ Ran the SQL from `DATABASE_SCHEMA.md`
3. ✅ Enabled realtime on all tables
4. ✅ Have your Supabase URL and anon key ready

---

**Need the keys?**
Go to your Supabase project → Settings → API → Copy the URL and anon key
