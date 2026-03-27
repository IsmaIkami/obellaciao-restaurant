# 🚀 Quick Start Guide - O Bella Ciao

Get your restaurant system up and running in 10 minutes!

## Step 1: Clone the Repository

```bash
git clone https://github.com/IsmaIkami/obellaciao-restaurant.git
cd obellaciao-restaurant
npm install
```

## Step 2: Set Up Supabase (Free)

1. Go to [https://supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in:
   - Name: `obellaciao`
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)

## Step 3: Create Database Tables

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste the entire SQL from `DATABASE_SCHEMA.md`
4. Click "Run" to execute

## Step 4: Enable Real-time

1. Go to **Database** → **Replication** (left sidebar)
2. Find these tables and enable replication for each:
   - `orders` ✅
   - `reservations` ✅
   - `tables` ✅
   - `calls` ✅

## Step 5: Get Your API Keys

1. Go to **Project Settings** (gear icon, bottom left)
2. Click **API**
3. Copy these two values:
   - `Project URL` → This is your `VITE_SUPABASE_URL`
   - `anon public` key → This is your `VITE_SUPABASE_ANON_KEY`

## Step 6: Configure Environment

```bash
cp .env.example .env
```

Edit the `.env` file and paste your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 7: Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🎉 You're Done!

### Using the App

**Switch between modes using the buttons in the header:**

1. **Client Mode** (Default)
   - Customer-facing website
   - Browse menu, order, make reservations

2. **Server Mode**
   - Click "Mode Serveur" button
   - Waiter interface for taking orders

3. **Admin Mode**
   - Click "Admin" button
   - Kitchen and owner dashboard

### Test the System

1. In **Client Mode**:
   - Click a menu item → customize ingredients → add to cart
   - Go to cart → place an order

2. Switch to **Admin Mode**:
   - See your order appear in real-time!
   - Mark it as "preparing" → "ready"

3. Switch to **Server Mode**:
   - See all orders and alerts
   - Take new orders for tables

## 🐛 Troubleshooting

### Issue: "Network error" or database not connecting

**Solution:** Check your `.env` file:
- Make sure `VITE_SUPABASE_URL` starts with `https://`
- Make sure `VITE_SUPABASE_ANON_KEY` is the full key (very long string)
- Restart the dev server: `Ctrl+C` then `npm run dev`

### Issue: Orders don't appear in real-time

**Solution:** Enable realtime replication:
1. Go to Supabase → Database → Replication
2. Enable for all four tables

### Issue: Can't create orders (database errors)

**Solution:** Run the SQL schema:
1. Go to Supabase → SQL Editor
2. Copy all SQL from `DATABASE_SCHEMA.md`
3. Run it

## 📚 Next Steps

- Read the full `README.md` for deployment instructions
- Customize the menu in `src/data/menu.js`
- Add your restaurant's branding
- Deploy to Netlify or Vercel (free!)

## 💡 Pro Tips

- Open the app in multiple browser tabs to see real-time sync!
- Use Chrome DevTools mobile view for best mobile experience
- Check the kitchen view (Admin mode) on a tablet for best results

---

**Need help?** Open an issue on GitHub: https://github.com/IsmaIkami/obellaciao-restaurant/issues
