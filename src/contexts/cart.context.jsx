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

const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter(item => item.id !== cartItemToRemove.id);
};

const decrementCartItem = (cartItems, cartItemToDecrement) => {
  const existingItem = cartItems.find(
    item => item.id === cartItemToDecrement.id
  );

  if (existingItem.quantity === 1) {
    return removeCartItem(cartItems, existingItem);
  }

  return cartItems.map(item => {
    return item.id === existingItem.id
      ? { ...item, quantity: item.quantity - 1 }
      : item;
  });
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
  const [cartTotal, setCartTotal] = useState(0);
  //  best practice is to make useEffect responsible for one thing
  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, curItem) => total + curItem.quantity, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(() => {
      return cartItems.reduce(
        (total, curItem) =>
          total + Number(curItem.quantity) * Number(curItem.price),
        0
      );
    });
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = cartItemToRemove => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const decrementItemInCart = cartToDecrement => {
    setCartItems(decrementCartItem(cartItems, cartToDecrement));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    decrementItemInCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
