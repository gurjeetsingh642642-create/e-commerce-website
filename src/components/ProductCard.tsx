import { Star } from 'lucide-react';
import type { Product } from '@/lib/supabase';
import { formatPrice, discountPercent } from '@/lib/utils';

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discount = hasDiscount ? discountPercent(product.price, product.compare_at_price!) : 0;

  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:border-stone-300 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-stone-900 text-white text-xs font-semibold rounded-full">
            -{discount}%
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-stone-900 text-sm sm:text-base line-clamp-1 group-hover:text-stone-700">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-stone-500">{product.rating.toFixed(1)} ({product.reviews_count})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-stone-900">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-stone-400 line-through">{formatPrice(product.compare_at_price!)}</span>
          )}
        </div>
      </div>
    </button>
  );
}
