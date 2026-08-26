import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

type CartDrawerProps = {
  onCheckout: () => void;
};

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-stone-700" />
            <h2 className="text-lg font-semibold text-stone-900">
              Cart {totalItems > 0 && `(${totalItems})`}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <ShoppingBag size={28} className="text-stone-400" />
            </div>
            <p className="text-stone-600 font-medium">Your cart is empty</p>
            <p className="text-sm text-stone-400 mt-1">Add some products to get started</p>
            <button
              onClick={closeCart}
              className="mt-6 px-6 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-stone-900 line-clamp-1">{item.product.name}</h3>
                    <p className="text-sm text-stone-500 mt-0.5">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-stone-900 flex-shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Subtotal</span>
                <span className="text-xl font-bold text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-stone-400">Shipping and taxes calculated at checkout</p>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
