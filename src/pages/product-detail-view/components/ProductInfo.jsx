import { useMemo } from 'react';
import Icon from '@/components/AppIcon';

const ProductInfo = ({ product }) => {
  const price = useMemo(() => product?.price, [product?.price]);
  const discount = useMemo(() => product?.discount, [product?.discount]);
  const rating = useMemo(() => product?.rating, [product?.rating]);

  const finalPrice = price - (price * discount / 100);
  const savings = price - finalPrice;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
          {product?.name}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          SKU: {product?.sku}
        </p>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1">
          {[...Array(5)]?.map((_, i) => (
            <Icon
              key={i}
              name={i < Math.floor(rating) ? 'Star' : 'Star'}
              size={16}
              color={i < Math.floor(rating) ? 'var(--color-warning)' : 'var(--color-muted)'}
              className={i < Math.floor(rating) ? 'fill-warning' : 'fill-muted'}
            />
          ))}
        </div>
        <span className="text-sm md:text-base text-foreground font-medium">
          {rating?.toFixed(1)}
        </span>
        <span className="text-sm md:text-base text-muted-foreground">
          ({product?.reviewCount} reviews)
        </span>
      </div>
      {/* Pricing */}
      <div className="bg-muted rounded-lg p-4 md:p-6">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            ${finalPrice?.toFixed(2)}
          </span>
          {discount > 0 && (
            <>
              <span className="text-lg md:text-xl text-muted-foreground line-through">
                ${price?.toFixed(2)}
              </span>
              <span className="px-2 py-1 bg-error/20 text-error text-sm md:text-base font-semibold rounded">
                {discount}% OFF
              </span>
            </>
          )}
        </div>
        {discount > 0 && (
          <p className="text-sm md:text-base text-success mt-2">
            You save ${savings?.toFixed(2)}
          </p>
        )}
      </div>
      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <Icon
          name={product?.inStock ? 'CheckCircle2' : 'XCircle'}
          size={20}
          color={product?.inStock ? 'var(--color-success)' : 'var(--color-error)'}
        />
        <span className={`text-sm md:text-base font-medium ${product?.inStock ? 'text-success' : 'text-error'}`}>
          {product?.inStock ? `In Stock (${product?.stockCount} available)` : 'Out of Stock'}
        </span>
      </div>
      {/* Product Description */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
          Description
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {product?.description}
        </p>
      </div>
      {/* Key Features */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">
          Key Features
        </h2>
        <ul className="space-y-2">
          {product?.features?.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Icon name="Check" size={18} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;