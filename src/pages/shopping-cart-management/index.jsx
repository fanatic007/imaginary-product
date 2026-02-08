import { useState } from 'react';
import Header from '@/components/ui/Header';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import AssessmentProgressIndicator from '@/components/ui/AssessmentProgress';
import { ErrorBoundaryStatusIndicator } from '@/components/ui/ErrorBoundaryStatus';
import Button from '@/components/ui/Button';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import CheckoutModal from './components/CheckoutModal';
import LiveDataStreamingSvc from './components/LiveDataStreamingSvc';
import EmptyCart from './components/EmptyCart';
import FloatigBoxDemo from './components/FloatigBoxDemo';
import PromiseProblemDemo from './components/PromiseProblemDemo';
import VideoPlayerDemo from './components/VideoPlayerDemo';
import APIUsecaseDemo from './components/APIUsecaseDemo';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

const ShoppingCartManagement = () => {
  const [cartItems, setCartItems] = useState([
  {
    id: 1,
    name: "Professional Wireless Noise-Cancelling Headphones with Premium Audio Quality",
    category: "Electronics > Audio",
    price: 299.99,
    quantity: 2,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13e126511-1765030295691.png",
    imageAlt: "Black wireless over-ear headphones with silver accents on white background showing premium build quality and cushioned ear cups"
  },
  {
    id: 2,
    name: "Ergonomic Mechanical Gaming Keyboard with RGB Backlight",
    category: "Electronics > Computers",
    price: 149.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1619683322755-4545503f1afa",
    imageAlt: "Modern mechanical keyboard with colorful RGB lighting effects displaying rainbow colors across black keys in dark gaming setup"
  },
  {
    id: 3,
    name: "Ultra-Slim Laptop Stand with Adjustable Height and Cooling Design",
    category: "Electronics > Accessories",
    price: 49.99,
    quantity: 1,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9ea2001-1764658995251.png",
    imageAlt: "Silver aluminum laptop stand with sleek minimalist design holding MacBook at ergonomic angle on modern white desk"
  },
  {
    id: 4,
    name: "High-Performance Wireless Gaming Mouse with Precision Sensor",
    category: "Electronics > Gaming",
    price: 79.99,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1604080214833-df65352fb97a",
    imageAlt: "Black gaming mouse with blue LED accents and ergonomic grip design positioned on dark gaming mousepad"
  }]
  );

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const calculateSubtotal = () => {
    return cartItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 9.99;
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    const subtotal = calculateSubtotal();
    if (appliedCoupon === 'SAVE10' && subtotal > 100) return subtotal * 0.1;
    if (appliedCoupon === 'SAVE20' && subtotal > 200) return subtotal * 0.2;
    if (appliedCoupon === 'FREESHIP') return calculateShipping();

    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping() - calculateDiscount();
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((prev) =>
    prev?.map((item) =>
    item?.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev?.filter((item) => item?.id !== itemId));
  };

  const handleApplyCoupon = () => {
    const validCoupons = ['SAVE10', 'SAVE20', 'FREESHIP'];
    if (validCoupons?.includes(couponCode?.toUpperCase())) {
      setAppliedCoupon(couponCode?.toUpperCase());
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const cartContextValue = {
    cartItems,
    setCartItems,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    subtotal: calculateSubtotal(),
    tax: calculateTax(),
    shipping: calculateShipping(),
    discount: calculateDiscount(),
    total: calculateTotal()
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <div className="min-h-screen bg-background">
        <Header />
        <PerformanceMonitor />
        <AssessmentProgressIndicator />
        <ErrorBoundaryStatusIndicator hasActiveErrors={true} />

        <main className="pt-[76px] px-4 md:px-6 lg:px-8 pb-8 md:pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
                Shopping Cart
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Review your items and proceed to checkout
              </p>
            </div>


            {cartItems?.length === 0 ?
            <EmptyCart /> :

            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                <div className="flex-1 space-y-4 md:space-y-6">
                  <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h2 className="text-lg md:text-xl font-semibold text-foreground">
                        Cart Items ({cartItems?.length})
                      </h2>
                      <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      iconPosition="left"
                      onClick={() => setCartItems([])}
                      className="text-error">

                        Clear All
                      </Button>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      {cartItems?.map((item) =>
                    <CartItem
                      key={item?.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem} />

                    )}
                    </div>
                  </div>

                  <LiveDataStreamingSvc />

                  <FloatigBoxDemo />

                  <PromiseProblemDemo />

                  <VideoPlayerDemo />

                  <APIUsecaseDemo />
                </div>

                <CartSummary
                subtotal={calculateSubtotal()}
                tax={calculateTax()}
                shipping={calculateShipping()}
                discount={calculateDiscount()}
                total={calculateTotal()}
                couponCode={couponCode}
                onCouponChange={setCouponCode}
                onApplyCoupon={handleApplyCoupon}
                onCheckout={handleCheckout}
                itemCount={cartItems?.reduce((sum, item) => sum + item?.quantity, 0)} />

              </div>
            }
          </div>
        </main>

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          total={calculateTotal()} />

      </div>
    </CartContext.Provider>
  );

};

export default ShoppingCartManagement;