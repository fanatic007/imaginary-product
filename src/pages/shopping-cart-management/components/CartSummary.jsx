import { memo, useMemo } from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const CartSummary = memo(({ 
  subtotal, 
  tax, 
  shipping, 
  discount, 
  total,
  couponCode,
  appliedCoupon,
  onCouponChange,
  onApplyCoupon,
  onCheckout,
  itemCount
}) => {
  const formattedSubtotal = useMemo(() => {
    return subtotal?.toFixed(2);
  }, [subtotal]);

  const formattedTax = useMemo(() => {
    return tax?.toFixed(2);
  }, [tax]);

  const formattedShipping = useMemo(() => {
    return shipping?.toFixed(2);
  }, [shipping]);

  const formattedDiscount = useMemo(() => {
    return discount?.toFixed(2);
  }, [discount]);

  const formattedTotal = useMemo(() => {
    return total?.toFixed(2);
  }, [total]);

  return (
    <div className="w-full lg:w-96 flex-shrink-0 space-y-4 md:space-y-6">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-md">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2">
          <Icon name="ShoppingCart" size={24} color="var(--color-primary)" />
          Order Summary
        </h2>

        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
            <span className="font-semibold text-foreground">${formattedSubtotal}</span>
          </div>

          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span className="font-semibold text-foreground">${formattedTax}</span>
          </div>

          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-semibold text-foreground">
              {shipping === 0 ? 'FREE' : `$${formattedShipping}`}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex items-center justify-between text-sm md:text-base text-success">
              <span className="flex items-center gap-1">
                <Icon name="Tag" size={16} />
                Discount ({appliedCoupon})
              </span>
              <span className="font-semibold">-${formattedDiscount}</span>
            </div>
          )}

          <div className="border-t border-border pt-3 md:pt-4 flex items-center justify-between">
            <span className="text-base md:text-lg font-bold text-foreground">Total</span>
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
              ${formattedTotal}
            </span>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => onCouponChange(e?.target?.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={onApplyCoupon}
              iconName="Tag"
            >
              Apply
            </Button>
          </div>

          <div className="bg-muted rounded-md p-3 md:p-4">
            <div className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
              <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">Available Coupons:</p>
                <p>SAVE10 - 10% off orders &gt; $100</p>
                <p>SAVE20 - 20% off orders &gt; $200</p>
                <p>FREESHIP - Free shipping on any order</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onCheckout}
          iconName="CreditCard"
          iconPosition="left"
        >
          Proceed to Checkout
        </Button>

        <div className="mt-4 md:mt-6 space-y-2 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span>Secure checkout with SSL encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="RotateCcw" size={16} color="var(--color-success)" />
            <span>30-day return policy</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Truck" size={16} color="var(--color-success)" />
            <span>Free shipping on orders over $50</span>
          </div>
        </div>
      </div>
    </div>
  );
});

CartSummary.displayName = 'CartSummary';

export default CartSummary;