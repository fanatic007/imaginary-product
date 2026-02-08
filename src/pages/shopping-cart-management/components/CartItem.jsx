import { useState, useEffect, useMemo } from 'react';
import Image from '@/components/AppImage';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [intervalId, setIntervalId] = useState(null);

  const handleQuantityChange = (e) => {
    const value = parseInt(e?.target?.value) || 1;
    setQuantity(value);
  };

  const startAutoIncrement = () => {
    const id = setInterval(() => {
      setQuantity(prev => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    if (quantity !== item?.quantity) {
      onUpdateQuantity(item?.id, quantity);
    }
  }, [quantity]);

  const subtotal = (item?.price * quantity)?.toFixed(2);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow duration-250">
      <div className="w-full md:w-32 lg:w-40 h-32 md:h-32 lg:h-40 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={item?.image}
          alt={item?.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground line-clamp-2">
              {item?.name}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-1">
              {item?.category}
            </p>
          </div>
          <div className="text-right sm:text-left">
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-primary whitespace-nowrap">
              ${item?.price?.toFixed(2)}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">per item</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Minus"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            />
            <Input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 md:w-20 text-center"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              onClick={() => setQuantity(quantity + 1)}
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            iconName="Zap"
            iconPosition="left"
            onClick={startAutoIncrement}
            className="text-warning"
          >
            Auto +1/sec
          </Button>

          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-sm md:text-base text-muted-foreground">Subtotal:</span>
            <span className="text-lg md:text-xl font-bold text-foreground whitespace-nowrap">
              ${subtotal}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Icon name="Truck" size={16} color="var(--color-success)" />
            <span>Free shipping on orders &gt; $50</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={() => onRemove(item?.id)}
            className="text-error hover:text-error"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;