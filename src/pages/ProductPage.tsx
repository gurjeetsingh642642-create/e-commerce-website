import { useState } from 'react';
import { ArrowLeft, Star, ShoppingBag, Minus, Plus, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import type { Product } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import { formatPrice, discountPercent } from '@/lib/utils';

type ProductPageProps = {
  product: Product;
  onBack: () => void;
};

export default function ProductPage({ product, onBack }: ProductPageProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discount = hasDiscount ? discountPercent(product.price, product.compare_at_price!) : 0;
  const allImages = [product.image_url, ...(product.images ?? [])];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to shop
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100">
            <img
              src={allImages[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-3">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-stone-900' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {hasDiscount && (
                <span className="px-2.5 py-1 bg-stone-900 text-white text-xs font-semibold rounded-full">
                  -{discount}%
                </span>
              )}
              {product.stock === 0 ? (
                <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  Out of Stock
                </span>
              ) : product.stock < 20 ? (
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  Only {product.stock} left
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  In Stock
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= Math.round(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-stone-500">
                {product.rating.toFixed(1)} ({product.reviews_count} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-stone-900">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-lg text-stone-400 line-through">{formatPrice(product.compare_at_price!)}</span>
            )}
          </div>

          <p className="text-stone-600 leading-relaxed">{product.description}</p>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-stone-300 rounded-xl">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-stone-600 hover:text-stone-900"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 text-base font-semibold text-stone-900 min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 text-stone-600 hover:text-stone-900"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => addItem(product, quantity)}
              disabled={product.stock === 0}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200">
            {[
              { icon: Truck, label: 'Free Shipping', sub: 'Over $50' },
              { icon: RefreshCw, label: '30-Day Returns', sub: 'No questions' },
              { icon: ShieldCheck, label: 'Secure', sub: 'Checkout' },
            ].map((b) => (
              <div key={b.label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center mx-auto mb-2">
                  <b.icon size={18} className="text-stone-700" />
                </div>
                <p className="text-xs font-semibold text-stone-900">{b.label}</p>
                <p className="text-xs text-stone-500">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
