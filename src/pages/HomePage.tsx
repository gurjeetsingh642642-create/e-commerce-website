import { useEffect, useState } from 'react';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import type { Product, Category } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

type HomePageProps = {
  onNavigate: (page: 'home' | 'shop') => void;
  onCategorySelect: (slug: string | null) => void;
  onProductSelect: (product: Product) => void;
};

export default function HomePage({ onNavigate, onCategorySelect, onProductSelect }: HomePageProps) {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [prodRes, catRes] = await Promise.all([
        supabase.from('products').select('*').eq('featured', true).limit(8),
        supabase.from('categories').select('*'),
      ]);
      setFeatured(prodRes.data ?? []);
      setCategories(catRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                New Collection 2026
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight tracking-tight">
                Premium products for modern living
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed max-w-md">
                Discover curated fashion, electronics, and home essentials. Quality you can trust, delivered to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onCategorySelect('fashion')}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-stone-900 font-semibold rounded-xl border border-stone-300 hover:border-stone-400 transition-colors"
                >
                  Explore Fashion
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.pexels.com/photos/8743972/pexels-photo-8743972.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Fashion"
                    className="rounded-2xl shadow-lg w-full h-72 object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/9058879/pexels-photo-9058879.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Electronics"
                    className="rounded-2xl shadow-lg w-full h-48 object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.pexels.com/photos/20573189/pexels-photo-20573189.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Home"
                    className="rounded-2xl shadow-lg w-full h-48 object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/20298285/pexels-photo-20298285.png?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Sneakers"
                    className="rounded-2xl shadow-lg w-full h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: 'Protected checkout' },
              { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team' },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <f.icon size={20} className="text-stone-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{f.title}</p>
                  <p className="text-xs text-stone-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Shop by Category</h2>
            <p className="text-stone-500 mt-1">Find exactly what you're looking for</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onCategorySelect(cat.slug);
                onNavigate('shop');
              }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100"
            >
              {cat.image_url && (
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                <span className="inline-flex items-center gap-1 text-sm text-white/80 mt-1 group-hover:gap-2 transition-all">
                  Shop now <ArrowRight size={16} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Featured Products</h2>
            <p className="text-stone-500 mt-1">Our top picks for you</p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            View all <ArrowRight size={16} />
          </button>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-stone-100 rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => onProductSelect(p)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
