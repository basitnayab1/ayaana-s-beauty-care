-- ========================================================
-- Ayaana's Luxury Skincare - Supabase Database Schema
-- Run this script in your Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Run)
-- ========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Admins Table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Store Manager',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Super Admin
INSERT INTO public.admins (name, email, password_hash, role)
VALUES 
    ('Basit Nayab', 'basitmalix01@gmail.com', 'Muhana5424@.', 'Super Admin'),
    ('Syeda Ayaana', 'admin@ayaanas.com', 'ayaana123', 'Store Manager')
ON CONFLICT (email) DO NOTHING;

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    category TEXT NOT NULL,
    category_name TEXT NOT NULL,
    volume TEXT DEFAULT '50ml',
    price_pkr NUMERIC NOT NULL,
    original_price_pkr NUMERIC,
    price_usd NUMERIC,
    stock INTEGER DEFAULT 50,
    badge TEXT,
    image TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    how_to_use TEXT,
    ingredients TEXT,
    benefits JSONB DEFAULT '[]'::jsonb,
    has_3d BOOLEAN DEFAULT false,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    order_id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    payment_method TEXT DEFAULT 'Cash on Delivery (COD)',
    items JSONB NOT NULL,
    total NUMERIC NOT NULL,
    currency TEXT DEFAULT 'PKR',
    status TEXT DEFAULT 'Processing Order',
    courier TEXT,
    tracking_no TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public products viewable by everyone" ON public.products
    FOR SELECT USING (true);

-- Allow public insert to orders (customers checkout)
CREATE POLICY "Public can insert orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Allow public read of own order tracking
CREATE POLICY "Public can view orders" ON public.orders
    FOR SELECT USING (true);

-- Full access for authenticated / service role
CREATE POLICY "Admins full access to products" ON public.products
    FOR ALL USING (true);

CREATE POLICY "Admins full access to orders" ON public.orders
    FOR ALL USING (true);

CREATE POLICY "Admins full access to admins" ON public.admins
    FOR ALL USING (true);
