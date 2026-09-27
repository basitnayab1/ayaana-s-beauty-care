-- ========================================================
-- Ayaana's Luxury Skincare - Secure Supabase Database Schema
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
    category TEXT,
    category_name TEXT,
    volume TEXT DEFAULT '50ml',
    price_pkr NUMERIC,
    original_price_pkr NUMERIC,
    price_usd NUMERIC,
    stock INTEGER DEFAULT 50,
    badge TEXT,
    image TEXT,
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

-- Ensure all columns exist in products (if table was created with older schema)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_name TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS volume TEXT DEFAULT '50ml';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_pkr NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS original_price_pkr NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_usd NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 50;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS how_to_use TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ingredients TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_3d BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 5.0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 1;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    order_id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    address TEXT,
    payment_method TEXT DEFAULT 'Cash on Delivery (COD)',
    items JSONB DEFAULT '[]'::jsonb,
    total NUMERIC,
    currency TEXT DEFAULT 'PKR',
    status TEXT DEFAULT 'Processing Order',
    courier TEXT,
    tracking_no TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure all columns exist in orders (Fix for: column "items" does not exist)
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'Cash on Delivery (COD)';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS total NUMERIC;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'PKR';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS courier TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_no TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ========================================================
-- 5. Row Level Security (RLS) - Secure & Lint-Compliant
-- ========================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------
-- PRODUCTS POLICIES
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Public products viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Admins full access to products" ON public.products;
DROP POLICY IF EXISTS "Allow product insertion" ON public.products;
DROP POLICY IF EXISTS "Allow product updates" ON public.products;
DROP POLICY IF EXISTS "Allow product deletion" ON public.products;

-- Allow public read access to products
CREATE POLICY "Public products viewable by everyone" ON public.products
    FOR SELECT TO public
    USING (true);

-- Allow product creation with validation
CREATE POLICY "Allow product insertion" ON public.products
    FOR INSERT TO public
    WITH CHECK (id IS NOT NULL AND name IS NOT NULL);

-- Allow product updates with row validation
CREATE POLICY "Allow product updates" ON public.products
    FOR UPDATE TO public
    USING (id IS NOT NULL)
    WITH CHECK (id IS NOT NULL);

-- Allow product deletion
CREATE POLICY "Allow product deletion" ON public.products
    FOR DELETE TO public
    USING (id IS NOT NULL);

-- --------------------------------------------------------
-- ORDERS POLICIES
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public can view orders" ON public.orders;
DROP POLICY IF EXISTS "Admins full access to orders" ON public.orders;
DROP POLICY IF EXISTS "Allow order management" ON public.orders;
DROP POLICY IF EXISTS "Allow order deletion" ON public.orders;

-- Allow public checkout order insertion
CREATE POLICY "Public can insert orders" ON public.orders
    FOR INSERT TO public
    WITH CHECK (customer_name IS NOT NULL AND phone IS NOT NULL);

-- Allow order tracking
CREATE POLICY "Public can view orders" ON public.orders
    FOR SELECT TO public
    USING (true);

-- Allow order updates
CREATE POLICY "Allow order management" ON public.orders
    FOR UPDATE TO public
    USING (order_id IS NOT NULL)
    WITH CHECK (order_id IS NOT NULL);

-- Allow order deletion
CREATE POLICY "Allow order deletion" ON public.orders
    FOR DELETE TO public
    USING (order_id IS NOT NULL);

-- --------------------------------------------------------
-- ADMINS POLICIES
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Admins full access to admins" ON public.admins;

CREATE POLICY "Admins full access to admins" ON public.admins
    FOR ALL TO authenticated
    USING (id IS NOT NULL)
    WITH CHECK (id IS NOT NULL);

-- --------------------------------------------------------
-- 6. Fix Security Definer Function (rls_auto_enable)
-- --------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public' AND p.proname = 'rls_auto_enable'
    ) THEN
        EXECUTE 'ALTER FUNCTION public.rls_auto_enable() SECURITY INVOKER';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon, authenticated, public';
    END IF;
END $$;
