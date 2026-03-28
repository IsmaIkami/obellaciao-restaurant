# 🚀 Complete Step-by-Step Setup Guide - O Bella Ciao

Follow these steps exactly to get your restaurant system running in 15 minutes.

---

## ✅ Step 0: Prerequisites Check

Before starting, make sure you have:

```bash
# Check Node.js (need 18+)
node --version
# Should show: v18.x.x or higher

# Check npm
npm --version
# Should show: 9.x.x or higher
```

**Don't have Node.js?** Download from: https://nodejs.org/

---

## 📂 Step 1: Get the Project (2 minutes)

### Option A: If you already cloned it

```bash
cd /Users/isma/Projects/obellaciao-restaurant
```

### Option B: Clone fresh from GitHub

```bash
cd ~/Projects
git clone https://github.com/IsmaIkami/obellaciao-restaurant.git
cd obellaciao-restaurant
```

### Install dependencies

```bash
npm install
```

**Wait for installation to complete...** (~30 seconds)

You should see: `added 166 packages`

---

## 🗄️ Step 2: Create Supabase Database (5 minutes)

### 2.1: Sign Up for Supabase

1. Open browser and go to: **https://supabase.com**
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

### 2.2: Create New Project

1. Click **"New Project"** (green button)
2. Fill in:
   - **Name**: `obellaciao` (or any name you like)
   - **Database Password**: Create a strong password (save it!)
     - Example: `MyRestaurant2024!`
   - **Region**: Choose closest to you (e.g., "Europe West")
   - **Pricing Plan**: Free (already selected)
3. Click **"Create new project"**
4. **Wait 2-3 minutes** for database to provision (you'll see a loading screen)

### 2.3: Create Database Tables

Once your project is ready:

1. **Left sidebar**: Click **"SQL Editor"** (icon looks like `</>`)
2. Click **"New query"** button (top right)
3. **Go to your terminal** and copy the SQL:

```bash
# Open the database schema file
cat /Users/isma/Projects/obellaciao-restaurant/DATABASE_SCHEMA.md
```

4. **Copy ALL the SQL** starting from `CREATE TABLE orders` down to the last `INSERT INTO tables` statement
5. **Paste into Supabase SQL Editor**
6. Click **"Run"** button (or press Cmd+Enter)
7. You should see: ✅ **"Success. No rows returned"**

### 2.4: Enable Real-time Updates

1. **Left sidebar**: Click **"Database"**
2. Click **"Replication"** tab (at the top)
3. You'll see a list of tables. For each of these 4 tables, click the toggle to enable:
   - ☑️ `orders`
   - ☑️ `reservations`
   - ☑️ `tables`
   - ☑️ `calls`
4. All 4 should show as **"Enabled"**

### 2.5: Get Your API Keys

1. **Left sidebar**: Click the **gear icon** (⚙️) at the bottom → **"Settings"**
2. Click **"API"** in the settings menu
3. You'll see two important values:

**Copy these carefully:**

```
Project URL:
https://xxxxxxxxxxxxx.supabase.co

anon public key:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
(this will be VERY long - make sure to copy the entire thing!)
```

**Keep this browser tab open** - you'll need these values in the next step!

---

## 🔐 Step 3: Configure Environment (1 minute)

Back in your terminal:

```bash
# Make sure you're in the project folder
cd /Users/isma/Projects/obellaciao-restaurant

# Copy the example environment file
cp .env.example .env

# Open the .env file in your editor
nano .env
# Or use: code .env (if you have VS Code)
# Or use: open -e .env (TextEdit on Mac)
```

Replace the placeholder values with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```

**Important:**
- Replace the ENTIRE line (don't keep "your_supabase_project_url")
- Make sure the URL starts with `https://`
- Make sure the key is complete (it's very long!)
- No spaces before or after the `=`

**Save the file** (Ctrl+O, Enter, Ctrl+X if using nano)

---

## 🚀 Step 4: Start the Application (1 minute)

```bash
# Start the development server
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Success!** Your app is running! 🎉

---

## 🌐 Step 5: Open the App

1. Open your browser
2. Go to: **http://localhost:5173**

You should see the beautiful O Bella Ciao homepage!

---

## 🧪 Step 6: Test All Three Apps (5 minutes)

### Test 1: Customer Site (Default View)

**You should see:**
- Italian restaurant landing page
- "O Bella Ciao" header
- Menu sections
- Navigation at bottom

**Try this:**
1. Scroll down and tap **"🍕 Commander"** button
2. You'll see the menu with categories (Pizza, Pasta, etc.)
3. **Click on "Margherita DOP"** pizza
4. A modal pops up showing ingredients
5. Try unchecking "Basilic frais" (it will show as removed)
6. Click **"Ajouter — €12,50"**
7. You should see a green toast: ✅ "🍕 Margherita DOP ajouté"
8. Click **"Panier (1)"** at the bottom navigation
9. You should see your pizza in the cart!

### Test 2: Server App (Waiter Interface)

**Switch to Server Mode:**
1. Click **"Mode Serveur"** button (top right)
2. You should see a black header: "O Bella Ciao — Serveur"

**Try this:**
1. Enter in the fields:
   - **Client**: "Marco Rossi"
   - **Table**: "5"
2. Tap on a pizza (e.g., "Diavola")
3. Click through ingredient customization
4. Add it to cart
5. You'll see a floating cart summary at the bottom
6. Click **"💳 Encaisser"**
7. Choose a payment method (e.g., "💳 Visa / Mastercard")
8. Click **"Payer €XX,XX"**
9. Wait 2 seconds
10. Click **"Fermer"**
11. You should see: ✅ "Commande enregistrée"

### Test 3: Admin/Kitchen Dashboard

**Switch to Admin Mode:**
1. Click **"Admin"** button (top right, red button)
2. You should see: "O Bella Ciao Admin" with live KPIs at top

**Try this:**
1. You should see the order you just placed!
2. Click the **"🍳 Cuisine"** tab (if not already there)
3. Your order should appear under **"REÇU (1)"** in amber
4. Click **"→ En prépa"** button
5. The order moves to **"EN PRÉPA (1)"** in blue!
6. Click **"→ Prêt ✓"** button
7. The order disappears (it's now ready!)

### Test 4: Real-time Sync

**Open the app in 2 browser tabs:**

**Tab 1:** Set to **Admin Mode** (Kitchen view)
**Tab 2:** Set to **Server Mode** (Waiter view)

**Now:**
1. In Tab 2 (Server), create a new order
2. **Watch Tab 1 (Admin)** → Order appears instantly! ⚡
3. In Tab 1, change order status to "Preparing"
4. **Watch Tab 2** → Status updates live!

**This is real-time synchronization in action!** 🔥

---

## 🎨 Step 7: Customize for Your Restaurant (Optional)

### Change the Menu

Edit the menu items:

```bash
# Open the menu file
code src/data/menu.js
# Or: nano src/data/menu.js
```

Change any item:
```javascript
{
  id: 1,
  cat: "pizza",
  emoji: "🍕",
  name: "Your Pizza Name",  // ← Change this
  desc: "Your description",  // ← Change this
  price: 15.99,              // ← Change this
  ingredients: [             // ← Change these
    "Your ingredient 1",
    "Your ingredient 2"
  ]
}
```

Save, and the app will hot-reload automatically!

### Change Colors

Edit the design system:

```bash
code src/lib/design.js
```

Change the color palette in the `T` object.

---

## 📱 Step 8: Test on Mobile

The app is mobile-first! Test it:

1. **Option A:** Open Chrome DevTools
   - Press `F12` or `Cmd+Option+I`
   - Click the phone icon (Toggle device toolbar)
   - Choose "iPhone 12 Pro" or similar
   - Refresh the page

2. **Option B:** Test on your actual phone
   - Get your computer's IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - On your phone, go to: `http://YOUR_IP:5173`
   - (Make sure phone and computer are on same WiFi)

---

## 🌐 Step 9: Deploy to Production (Optional)

### Quick Deploy to Netlify

1. Go to: **https://app.netlify.com/start**
2. Click **"Import from Git"** → Choose **GitHub**
3. Authorize Netlify to access your repos
4. Select: **"obellaciao-restaurant"**
5. Netlify auto-fills settings (it reads `netlify.toml`)
6. Click **"Add environment variables"**
7. Add two variables:
   ```
   Key: VITE_SUPABASE_URL
   Value: [paste your Supabase URL]

   Key: VITE_SUPABASE_ANON_KEY
   Value: [paste your Supabase anon key]
   ```
8. Click **"Deploy site"**
9. Wait ~2 minutes
10. **You'll get a live URL!** 🎉

Example: `https://inspiring-curie-123456.netlify.app`

**Customize the URL:**
- Click "Site settings" → "Change site name"
- Choose: `obellaciao-demo`
- New URL: `https://obellaciao-demo.netlify.app`

---

## 🎯 Step 10: Share Your Demo

**Local demo:**
```
http://localhost:5173
```

**Live demo (after Netlify deploy):**
```
https://your-site-name.netlify.app
```

**Switch between modes:**
- Customer view → Default
- Server view → Click "Mode Serveur"
- Admin view → Click "Admin"

---

## 🐛 Troubleshooting

### Problem: "Network error" or can't connect to database

**Solution:**
1. Check your `.env` file exists: `cat .env`
2. Make sure values are correct (no quotes, no spaces)
3. Restart the dev server: `Ctrl+C` then `npm run dev`

### Problem: Orders don't save or appear

**Solution:**
1. Go to Supabase → SQL Editor
2. Run: `SELECT * FROM orders;`
3. If error "relation does not exist" → Re-run the SQL from DATABASE_SCHEMA.md

### Problem: Real-time doesn't work

**Solution:**
1. Go to Supabase → Database → Replication
2. Make sure all 4 tables are enabled
3. Refresh your browser

### Problem: Page is blank or shows errors

**Solution:**
1. Open browser console (F12 → Console tab)
2. Look for error messages
3. Most common: Check `.env` file has correct values

---

## 📚 What You've Built

✅ Customer ordering website
✅ Waiter POS system
✅ Kitchen dashboard
✅ Real-time order sync
✅ Payment processing
✅ Table management
✅ Reservation system
✅ Analytics dashboard

**Tech Stack:**
- React 18 + Vite
- Supabase (PostgreSQL + Realtime)
- Modern Italian design system
- Mobile-first responsive

---

## 🎓 Next Steps

1. ✅ **You're done!** The system is fully functional
2. 📱 **Test on mobile** (Step 8)
3. 🌐 **Deploy to production** (Step 9)
4. 🎨 **Customize menu** for your restaurant
5. 🎨 **Add your branding** (logo, colors)
6. 📸 **Share screenshots** on social media!

---

## 💡 Pro Tips

- Use **Admin view on tablet** for kitchen display
- Keep **Server view on phone/tablet** for waiters
- **Customer view** works on any device
- Open multiple tabs to see real-time sync magic! ✨

---

## 🆘 Need Help?

**GitHub Issues:** https://github.com/IsmaIkami/obellaciao-restaurant/issues

**Check these files:**
- `README.md` - Full documentation
- `QUICK_START.md` - Quick setup
- `DATABASE_SCHEMA.md` - Database details
- `DEPLOY.md` - Deployment options

---

**🎉 Congratulations! You have a professional restaurant system!** 🍕

Made with ❤️ using Claude Code
