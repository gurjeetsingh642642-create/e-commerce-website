import { useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

type CheckoutPageProps = {
  onBack: () => void;
  onComplete: () => void;
};

export default function CheckoutPage({ onBack, onComplete }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
  });
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal >= 50 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      clearCart();
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">Order Confirmed!</h1>
        <p className="text-stone-600 mt-3 max-w-md mx-auto">
          Thank you for your purchase. We've sent a confirmation email to {form.email || 'your email'}.
          Your order will be shipped within 1-2 business days.
        </p>
        <button
          onClick={onComplete}
          className="mt-8 px-8 py-3.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="text-stone-500 mt-2">Add some products before checking out.</p>
        <button
          onClick={onBack}
          className="mt-6 px-8 py-3.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to cart
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Contact Information</h2>
            <input
              type="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-sm"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-sm"
              />
              <input
                required
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-sm"
              />
            </div>
            <input
              required
              placeholder="Street address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full mt-3 px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-sm"
            />
            <div className="grid grid-cols-3 gap-3 mt-3">
              <input
                required
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-sm"
              />
              <input
                required
                placeholder="ZIP"
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
                className="px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-sm"
              />
              <input
                required
                placeholder="Country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 text-sm"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Payment</h2>
            <div className="border border-stone-300 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <Lock size={16} />
                This is a demo store. No real payment will be processed.
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-stone-900">
                <CreditCard size={18} className="text-stone-600" />
                Credit / Debit Card
              </div>
              <input
                placeholder="Card number"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="MM / YY"
                  className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 text-sm"
                />
                <input
                  placeholder="CVC"
                  className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-stone-50 rounded-2xl p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-stone-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 border-t border-stone-200 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-stone-200">
              <span className="font-semibold text-stone-900">Total</span>
              <span className="text-xl font-bold text-stone-900">{formatPrice(total)}</span>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-60"
            >
              {processing ? 'Processing...' : `Place Order — ${formatPrice(total)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
