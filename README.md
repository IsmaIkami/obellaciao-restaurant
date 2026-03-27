# 🍕 O Bella Ciao - Restaurant Ordering System

A professional, full-stack restaurant management system with three integrated apps:
- **Customer Site** - Browse menu, order, make reservations
- **Server App** - Waiter interface for taking orders and managing tables
- **Admin/Kitchen Dashboard** - Owner and kitchen staff view for managing all operations

Built with React, Vite, and Supabase for real-time updates.

## ✨ Features

### 🎨 Customer Site
- Beautiful, mobile-first Italian restaurant landing page
- Interactive menu browser with category filters
- Ingredient customization (remove/add ingredients)
- Shopping cart with quantity management
- Order flow with pickup/delivery options
- Table reservation system
- Real-time order status updates

### 👨‍🍳 Server/Waiter App
- Quick order entry with menu browser
- Table management and assignment
- Active orders tracking
- Service alerts (waiter calls, ready orders)
- Payment processing (cash, card, QR, counter)
- Real-time kitchen updates

### 📊 Admin/Kitchen Dashboard
- Kitchen queue view with order priorities
- Order status management (received → preparing → ready)
- Live analytics (revenue, active orders, table occupancy)
- Reservation management
- Table plan overview
- Real-time synchronization across all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/obellaciao-restaurant.git
cd obellaciao-restaurant
npm install
```

### 2. Set Up Supabase

1. Create a free account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the SQL from `DATABASE_SCHEMA.md` to create tables
4. Enable Realtime for all tables (Database → Replication)
5. Get your credentials from Project Settings → API:
   - `Project URL`
   - `Anon/Public Key`

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## 📱 Using the App

### Switching Between Apps

Use the mode switcher buttons in the top navigation:
- **Client** - Customer-facing website
- **Server** - Waiter/staff interface
- **Admin** - Kitchen/management dashboard

### Customer Flow
1. Browse menu and tap items to customize
2. Add to cart and proceed to checkout
3. Choose pickup or delivery
4. Enter details and make payment
5. Receive order confirmation with ID

### Server Flow
1. Enter customer name and table number
2. Browse menu and add items to cart
3. Process payment (cash/card/QR)
4. Order automatically appears in kitchen queue

### Kitchen Flow
1. View incoming orders in "Reçu" section
2. Mark as "En prépa" when starting
3. Mark as "Prêt" when complete
4. Waiters see ready orders in their alerts

## 🏗️ Project Structure

```
src/
├── components/          # Shared UI components
│   ├── UI.jsx          # Basic components (Button, Input, Card)
│   ├── Toast.jsx       # Toast notification system
│   ├── MenuCard.jsx    # Menu item display
│   ├── MenuBrowser.jsx # Full menu with filters
│   ├── CartItem.jsx    # Shopping cart item
│   ├── IngredientSheet.jsx # Ingredient customization modal
│   └── PaymentSheet.jsx    # Payment processing modal
├── views/              # Main application views
│   ├── ClientView.jsx  # Customer site
│   ├── ServerView.jsx  # Waiter interface
│   └── AdminView.jsx   # Kitchen/admin dashboard
├── lib/                # Utilities and configuration
│   ├── supabase.js     # Database client and operations
│   └── design.js       # Design system (colors, fonts, utils)
├── data/               # Static data
│   └── menu.js         # Menu items and categories
├── App.jsx             # Main app with mode switching
├── App.css             # Global styles
└── main.jsx            # Entry point
```

## 🎨 Design System

The app uses a modern Italian color palette inspired by Milanese minimalism and Neapolitan warmth:

- **Primary**: Deep black (#0D0D0D)
- **Accent**: Tomato red (#E63946)
- **Success**: Basil green (#2D6A4F)
- **Warning**: Amber/gold (#F4A261)
- **Base**: Warm white (#FAFAF7)

Fonts:
- **Headings**: DM Serif Display
- **Body**: DM Sans

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 🚀 Deployment

### Netlify / Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
3. Add environment variables in deployment settings
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
```
VITE_SUPABASE_URL=your_production_url
VITE_SUPABASE_ANON_KEY=your_production_key
```

## 🔒 Security Notes

**⚠️ Important for Production:**

The current setup has RLS (Row Level Security) disabled for MVP/demo purposes. For production:

1. Enable RLS on all Supabase tables
2. Implement proper authentication
3. Add role-based access control
4. Use Supabase Auth for user management
5. Implement proper API security

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime
- **Styling**: Inline styles with CSS-in-JS approach
- **State**: React hooks (useState, useEffect)
- **Deployment**: Netlify/Vercel ready

## 📝 Database Schema

See `DATABASE_SCHEMA.md` for complete database setup instructions and schema details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your restaurant!

## 🙏 Credits

Design inspiration from modern Italian pizzerias and the Neapolitan tradition.

---

**Built with ❤️ for restaurant owners who want a modern, efficient ordering system**

For questions or support, please open an issue on GitHub.
