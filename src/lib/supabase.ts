import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  image_url: string;
  images: string[];
  category_id: string | null;
  rating: number;
  reviews_count: number;
  stock: number;
  featured: boolean;
  created_at: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
