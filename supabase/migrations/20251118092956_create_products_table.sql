/*
  # Create Products Table for Athletic Clothing Store

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `price` (numeric) - Product price in currency
      - `currency` (text) - Currency code (e.g., 'DH', 'USD')
      - `image_url` (text) - URL to product image
      - `description` (text, optional) - Product description
      - `category` (text) - Product category (e.g., 'hoodies', 'shirts', 'pants')
      - `is_active` (boolean) - Whether product is currently available
      - `stock_quantity` (integer) - Available stock
      - `created_at` (timestamptz) - When product was added
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (shopping site needs public product viewing)
    - Authenticated users cannot modify products (admin-only in future)

  3. Notes
    - Products are publicly readable for e-commerce functionality
    - Price stored as numeric for accurate calculations
    - Currency field allows for multi-currency support
    - Stock tracking prepared for inventory management
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10, 2) NOT NULL,
  currency text DEFAULT 'DH',
  image_url text NOT NULL,
  description text,
  category text NOT NULL,
  is_active boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active products
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Allow authenticated users to view all products
CREATE POLICY "Authenticated users can view all products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);