import { useState } from 'react';
import type { Product } from '@/lib/supabase';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import CheckoutPage from '@/pages/CheckoutPage';

type Page = 'home' | 'shop' | 'product' | 'checkout';

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = (p: 'home' | 'shop') => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);
    if (slug) setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        onNavigate={navigate}
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
      />

      <main className="flex-1">
        {page === 'home' && (
          <HomePage
            onNavigate={navigate}
            onCategorySelect={handleCategorySelect}
            onProductSelect={handleProductSelect}
          />
        )}
        {page === 'shop' && (
          <ShopPage
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onCategorySelect={handleCategorySelect}
            onProductSelect={handleProductSelect}
          />
        )}
        {page === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            onBack={() => {
              setPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
        {page === 'checkout' && (
          <CheckoutPage
            onBack={() => setPage('shop')}
            onComplete={() => navigate('home')}
          />
        )}
      </main>

      <Footer onNavigate={navigate} />

      <CartDrawer onCheckout={() => setPage('checkout')} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
