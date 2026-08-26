import { useEffect, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Product, Category } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

type ShopPageProps = {
  selectedCategory: string | null;
  searchQuery: string;
  onCategorySelect: (slug: string | null) => void;
  onProductSelect: (product: Product) => void;
};

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

export default function ShopPage({
  selectedCategory,
  searchQuery,
  onCategorySelect,
  onProductSelect,
}: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [priceFilter, setPriceFilter] = useState<number>(1000);

  useEffect(() => {
    supabase.from('categories').select('*').then((res) => setCategories(res.data ?? []));
  }, []);

  useEffect(() => {
    setLoading(true);
    let query = supabase.from('products').select('*');

    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) query = query.eq('category_id', cat.id);
    }

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    query.then((res) => {
      let data = res.data ?? [];
      data = data.filter((p) => p.price <= priceFilter);

      switch (sort) {
        case 'price-low':
          data = [...data].sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          data = [...data].sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          data = [...data].sort((a, b) => b.rating - a.rating);
          break;
        case 'featured':
          data = [...data].sort((a, b) => Number(b.featured) - Number(a.featured));
          break;
      }
      setProducts(data);
      if (data.length > 0) {
        const prices = data.map((p) => p.price);
        setMaxPrice(Math.ceil(Math.max(...prices)));
        setPriceFilter((prev) => Math.min(prev, Math.ceil(Math.max(...prices))));
      }
      setLoading(false);
    });
  }, [selectedCategory, searchQuery, sort, priceFilter, categories]);

  const activeCategory = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
          {searchQuery ? `Results for "${searchQuery}"` : activeCategory ? activeCategory.name : 'All Products'}
        </h1>
        <p className="text-stone-500 mt-1">
          {loading ? 'Loading...' : `${products.length} ${products.length === 1 ? 'product' : 'products'} found`}
        </p>
      </div>

      <div className="flex items-center justify-between mb-6 gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 lg:hidden"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-stone-500 hidden sm:inline">Sort by:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-400"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`w-60 flex-shrink-0 ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:z-auto lg:p-0`}>
          {showFilters && (
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 text-stone-500">
                <X size={20} />
              </button>
            </div>
          )}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-3">Categories</h3>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => {
                      onCategorySelect(null);
                      setShowFilters(false);
                    }}
                    className={`text-sm w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                      !selectedCategory ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        onCategorySelect(cat.slug);
                        setShowFilters(false);
                      }}
                      className={`text-sm w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                        selectedCategory === cat.slug ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-3">Price Range</h3>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-full accent-stone-900"
              />
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>$0</span>
                <span>Up to ${priceFilter}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-stone-100 rounded-2xl aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-stone-500 text-lg">No products found</p>
              <p className="text-stone-400 text-sm mt-1">Try adjusting your filters or search</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => onProductSelect(p)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
