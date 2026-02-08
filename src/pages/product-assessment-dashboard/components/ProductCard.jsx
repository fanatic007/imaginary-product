import Image from '@/components/AppImage';
import Icon from '@/components/AppIcon';

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-250 hover:shadow-lg hover:scale-[0.98] w-full min-w-0"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product?.image}
          alt={product?.imageAlt}
          className="w-full h-full object-cover"
        />
        {product?.isNew && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
            NEW
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-2 mb-2">
          {product?.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)]?.map((_, index) => (
            <Icon
              key={index}
              name={index < Math.floor(product?.rating) ? 'Star' : 'StarOff'}
              size={14}
              color={index < Math.floor(product?.rating) ? 'var(--color-warning)' : 'var(--color-muted)'}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({product?.rating?.toFixed(1)})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl font-bold text-primary whitespace-nowrap">
            ${product?.price?.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground capitalize">
            {product?.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;