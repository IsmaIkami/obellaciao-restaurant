# Database Schema for O Bella Ciao Restaurant System

This document describes the Supabase database schema needed for the restaurant ordering system.

## Tables

### 1. orders
Stores all customer orders (dine-in, pickup, delivery).

```sql
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  time TEXT NOT NULL,
  type TEXT NOT NULL, -- 'table', 'pickup', 'delivery', 'counter'
  table_id INTEGER,
  items JSONB NOT NULL, -- Array of order items
  status TEXT NOT NULL DEFAULT 'received', -- 'received', 'preparing', 'ready'
  payment TEXT, -- 'cash', 'card', 'qr', 'counter'
  waiter TEXT,
  slot TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_table_id ON orders(table_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

### 2. reservations
Stores table reservations.

```sql
CREATE TABLE reservations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'confirmé', -- 'confirmé', 'en attente', 'annulé'
  table_assigned INTEGER,
  arrived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_status ON reservations(status);
```

### 3. tables
Stores restaurant table information.

```sql
CREATE TABLE tables (
  id INTEGER PRIMARY KEY,
  seats INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'libre', -- 'libre', 'occupé', 'réservé'
  waiter TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default tables
INSERT INTO tables (id, seats, status, waiter) VALUES
  (1, 2, 'libre', 'Paolo'),
  (2, 4, 'libre', 'Maria'),
  (3, 4, 'réservé', 'Paolo'),
  (4, 2, 'libre', 'Maria'),
  (5, 6, 'libre', 'Paolo'),
  (6, 4, 'libre', 'Maria'),
  (7, 8, 'libre', 'Paolo'),
  (8, 2, 'réservé', 'Maria');
```

### 4. calls
Stores waiter/service calls from tables.

```sql
CREATE TABLE calls (
  id BIGSERIAL PRIMARY KEY,
  table_id INTEGER NOT NULL,
  type TEXT NOT NULL, -- 'waiter', 'bill'
  time TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_calls_done ON calls(done);
CREATE INDEX idx_calls_table_id ON calls(table_id);
```

## Real-time Configuration

To enable real-time updates, you need to enable Supabase Realtime for all tables:

1. Go to your Supabase project
2. Navigate to Database → Replication
3. Enable replication for:
   - `orders`
   - `reservations`
   - `tables`
   - `calls`

## Row Level Security (RLS)

For the MVP, you can disable RLS or set it to allow all operations:

```sql
-- Disable RLS for MVP (WARNING: Only for development/demo)
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE tables DISABLE ROW LEVEL SECURITY;
ALTER TABLE calls DISABLE ROW LEVEL SECURITY;
```

## Setup Instructions

1. Create a free Supabase account at https://supabase.com
2. Create a new project
3. Go to SQL Editor and run the above SQL commands to create tables
4. Go to Database → Replication and enable realtime for all tables
5. Go to Project Settings → API to get your:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. Add these to your `.env` file

## Data Structure Examples

### Order Item (JSONB)
```json
{
  "id": 1,
  "emoji": "🍕",
  "name": "Margherita DOP",
  "price": 12.5,
  "qty": 2,
  "removed": ["Basilic frais"],
  "note": "Bien cuit",
  "cartId": 1234567890.123
}
```

### Complete Order
```json
{
  "order_id": "#OBC-1234",
  "name": "Marco Rossi",
  "phone": "+32477001122",
  "time": "19:30",
  "type": "table",
  "table_id": 4,
  "status": "preparing",
  "payment": "card",
  "items": [
    {
      "emoji": "🍕",
      "name": "Margherita DOP",
      "price": 12.5,
      "qty": 2,
      "removed": [],
      "note": ""
    }
  ]
}
```
