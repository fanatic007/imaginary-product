import { getLocalStorageItem } from "my-lib";
import { createContext, useState, useMemo, useEffect, useCallback, useContext } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getLocalStorageItem('cart')?.cartItems || []);
  const [appliedCoupon, setAppliedCoupon] = useState(getLocalStorageItem('cart')?.appliedCoupon || '');  

  const subtotal = useMemo(() => {
    return cartItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
  }, [cartItems]);

  const tax = useMemo(() => {
    return subtotal * 0.08;
  }, [subtotal]);

  const shipping = useMemo(() => {
    return subtotal > 50 ? 0 : 9.99;
  }, [subtotal]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon === 'SAVE10' && subtotal > 100) return subtotal * 0.1;
    if (appliedCoupon === 'SAVE20' && subtotal > 200) return subtotal * 0.2;
    if (appliedCoupon === 'FREESHIP') return shipping;

    return 0;
  }, [appliedCoupon, subtotal, shipping]);
  
  const total = useMemo(() => {
    return subtotal + tax + shipping - discount;
  }, [subtotal, tax, shipping, discount]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ cartItems, appliedCoupon: appliedCoupon ?? '' }));
  }, [cartItems, appliedCoupon]);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    setCartItems((prev) =>
      prev?.map((item) =>
        (item?.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item)
      )
    );
  }, [setCartItems]);

  const removeItem = useCallback((itemId) => {
    setCartItems((prev) => prev?.filter((item) => item?.id !== itemId));
  }, [setCartItems]);

  const handleApplyCoupon = useCallback((couponCode) => {
    const validCoupons = ['SAVE10', 'SAVE20', 'FREESHIP'];
    if (!validCoupons?.includes(couponCode?.toUpperCase())) {
      alert('Invalid coupon code');
    }
    setAppliedCoupon(couponCode?.toUpperCase());
  }, [setAppliedCoupon]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const addToCart = useCallback((product) => {
    const isExisting = cartItems.find((item) => item.id === product.id);
    if (isExisting) {
      updateQuantity(product.id, isExisting.quantity + product?.quantity);
      return;
    }
    setCartItems((prevItems) => [...prevItems, { ...product }]);
  }, [cartItems, updateQuantity, setCartItems]);

  const value = {
    cartItems,
    subtotal,
    tax,
    shipping,
    discount,
    appliedCoupon,
    total,
    handleApplyCoupon,
    clearCart,
    addToCart,
    updateQuantity ,
    removeItem,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default useCart;
