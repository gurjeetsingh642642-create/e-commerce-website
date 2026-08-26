/*
# E-commerce Schema: categories and products

1. New Tables
- `categories`
  - `id` (uuid, PK)
  - `name` (text, unique, not null)
  - `slug` (text, unique, not null)
  - `image_url` (text)
  - `created_at` (timestamptz)
- `products`
  - `id` (uuid, PK)
  - `name` (text, not null)
  - `slug` (text, unique, not null)
  - `description` (text, not null)
  - `price` (numeric(10,2), not null)
  - `compare_at_price` (numeric(10,2), nullable, for showing discounts)
  - `image_url` (text, not null)
  - `images` (text[], additional gallery images)
  - `category_id` (uuid, FK -> categories.id)
  - `rating` (numeric(2,1), default 0)
  - `reviews_count` (int, default 0)
  - `stock` (int, default 0)
  - `featured` (boolean, default false)
  - `created_at` (timestamptz)

2. Security
- Single-tenant, no auth: RLS enabled, anon+authenticated full CRUD (catalog is public).
- Products/categories are read-only for anon (select only). Insert/update/delete allowed for admin management via anon in this demo context.

3. Indexes
- products.slug (unique)
- products.category_id
- categories.slug (unique)
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL,
  compare_at_price numeric(10,2),
  image_url text NOT NULL,
  images text[] DEFAULT '{}',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  rating numeric(2,1) DEFAULT 0,
  reviews_count integer DEFAULT 0,
  stock integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);
