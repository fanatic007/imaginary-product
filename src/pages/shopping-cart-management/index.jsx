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
import useCart from '@/context/cartContext';

const ShoppingCartManagement = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { cartItems, updateQuantity, removeItem, subtotal, tax, shipping, discount, total, clearCart, handleApplyCoupon, appliedCoupon } = useCart();
  const [couponCode, setCouponCode] = useState(appliedCoupon);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };  

  return (
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
                      onClick={clearCart}
                      className="text-error">

                        Clear All
                      </Button>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      {cartItems?.map((item) =>
                        <CartItem
                          key={item?.id}
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeItem} />
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
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                  couponCode={couponCode}
                  appliedCoupon={appliedCoupon}
                  onCouponChange={setCouponCode}
                  onApplyCoupon={() => handleApplyCoupon(couponCode)}
                  onCheckout={handleCheckout}
                  itemCount={cartItems?.reduce((sum, item) => sum + item?.quantity, 0)} />

              </div>
            }
          </div>
        </main>

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          total={total} />

      </div>
  );

};

export default ShoppingCartManagement;