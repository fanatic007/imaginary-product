import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 px-4">
      <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-muted rounded-full flex items-center justify-center mb-6 md:mb-8">
        <Icon name="ShoppingCart" size={64} color="var(--color-muted-foreground)" />
      </div>

      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 text-center">
        Your Cart is Empty
      </h2>

      <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8 text-center max-w-md">
        Looks like you haven't added any items to your cart yet. Start shopping to find amazing products!
      </p>

      <Link to="/product-detail-view">
        <Button
          variant="default"
          size="lg"
          iconName="ShoppingBag"
          iconPosition="left"
        >
          Start Shopping
        </Button>
      </Link>

      <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl">
        <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
          <Icon name="Truck" size={32} color="var(--color-success)" className="mb-3" />
          <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">Free Shipping</h3>
          <p className="text-xs md:text-sm text-muted-foreground">On orders over $50</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
          <Icon name="RotateCcw" size={32} color="var(--color-success)" className="mb-3" />
          <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">Easy Returns</h3>
          <p className="text-xs md:text-sm text-muted-foreground">30-day return policy</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
          <Icon name="Shield" size={32} color="var(--color-success)" className="mb-3" />
          <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">Secure Payment</h3>
          <p className="text-xs md:text-sm text-muted-foreground">SSL encrypted checkout</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;