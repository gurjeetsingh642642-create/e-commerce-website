import { useState } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type HeaderProps = {
  onNavigate: (page: 'home' | 'shop' | 'category') => void;
  onCategorySelect: (slug: string | null) => void;
  onSearch: (query: string) => void;
};

export default function Header({ onNavigate, onCategorySelect, onSearch }: HeaderProps) {
  const { totalItems, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onNavigate('shop');
    setMobileOpen(false);
  };

  const navItems = [
    { label: 'All Products', slug: null },
    { label: 'Fashion', slug: 'fashion' },
    { label: 'Electronics', slug: 'electronics' },
    { label: 'Home & Living', slug: 'home-living' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900"
            >
              <span className="w-9 h-9 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                <ShoppingBag size={20} />
              </span>
              <span className="hidden sm:inline">Luxe</span>
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onCategorySelect(item.slug);
                  onNavigate('shop');
                }}
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-48 lg:w-64 text-sm bg-stone-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-stone-300 transition-all"
              />
            </form>
            <button
              onClick={openCart}
              className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-stone-200 py-4 space-y-2">
            <form onSubmit={handleSearch} className="relative mb-3">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-100 rounded-lg focus:outline-none focus:bg-white focus:border-stone-300 border border-transparent"
              />
            </form>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onCategorySelect(item.slug);
                  onNavigate('shop');
                  setMobileOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
