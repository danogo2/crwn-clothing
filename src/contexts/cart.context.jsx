import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const { id } = productToAdd;
  const existingItem = cartItems.find(item => item.id === id);
  if (existingItem) {
    return cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [
    ...cartItems,
    {
      ...productToAdd,
      quantity: 1,
    },
  ];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, curItem) => total + curItem.quantity, 0)
    );
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    if (!isCartOpen) setIsCartOpen(true);
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
