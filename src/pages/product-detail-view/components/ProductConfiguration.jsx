import { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductConfiguration = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);

  const incrementQuantity = () => {
    setQuantity(prev => Math.min((prev || 1) + 1, product?.stockCount));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max((prev || 1) - 1, 1));
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity: quantity || 1,
      selectedColor,
      selectedSize
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 bg-card border border-border rounded-lg p-4 md:p-6">
      {/* Color Selection */}
      <div>
        <label className="block text-sm md:text-base font-medium text-foreground mb-3">
          Color: <span className="text-primary">{selectedColor}</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {product?.colors?.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`
                px-4 py-2 rounded-md border-2 transition-all text-sm md:text-base
                ${selectedColor === color
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-muted text-foreground hover:border-muted-foreground'
                }
              `}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div>
        <label className="block text-sm md:text-base font-medium text-foreground mb-3">
          Size: <span className="text-primary">{selectedSize}</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {product?.sizes?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`
                w-12 h-12 md:w-14 md:h-14 rounded-md border-2 transition-all font-medium
                ${selectedSize === size
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-muted text-foreground hover:border-muted-foreground'
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm md:text-base font-medium text-foreground mb-3">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={decrementQuantity}
            disabled={!quantity || quantity <= 1}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-muted border border-border rounded-md hover:bg-muted-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity"
          >
            <Icon name="Minus" size={18} />
          </button>
          
          <input
            type="number"
            value={quantity || ''}
            onChange={(e) => {
              const val = parseInt(e?.target?.value);
              if (!isNaN(val) && val >= 1 && val <= product?.stockCount) {
                setQuantity(val);
              }
            }}
            className="w-16 md:w-20 h-10 md:h-12 text-center bg-background border border-border rounded-md text-foreground font-mono text-base md:text-lg"
            min="1"
            max={product?.stockCount}
          />
          
          <button
            onClick={incrementQuantity}
            disabled={!quantity || quantity >= product?.stockCount}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-muted border border-border rounded-md hover:bg-muted-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity"
          >
            <Icon name="Plus" size={18} />
          </button>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mt-2">
          Maximum {product?.stockCount} items available
        </p>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-border">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
          onClick={handleAddToCart}
          disabled={!product?.inStock}
        >
          Add to Cart
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="Heart"
          iconPosition="left"
        >
          Add to Wishlist
        </Button>
      </div>
      {/* Shipping Info */}
      <div className="space-y-2 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm md:text-base">
          <Icon name="Truck" size={18} color="var(--color-success)" />
          <span className="text-foreground">Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-2 text-sm md:text-base">
          <Icon name="RotateCcw" size={18} color="var(--color-primary)" />
          <span className="text-foreground">30-day return policy</span>
        </div>
        <div className="flex items-center gap-2 text-sm md:text-base">
          <Icon name="Shield" size={18} color="var(--color-warning)" />
          <span className="text-foreground">1-year warranty included</span>
        </div>
      </div>
    </div>
  );
};

export default ProductConfiguration;