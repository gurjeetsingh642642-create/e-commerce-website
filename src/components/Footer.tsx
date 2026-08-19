import { ShoppingBag, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate: (page: 'home' | 'shop') => void }) {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <span className="w-9 h-9 rounded-lg bg-white text-stone-900 flex items-center justify-center">
                <ShoppingBag size={20} />
              </span>
              Luxe
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Premium products curated for modern living. Quality you can feel, style you can see.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">All Products</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">Fashion</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">Electronics</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">Home & Living</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Luxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
