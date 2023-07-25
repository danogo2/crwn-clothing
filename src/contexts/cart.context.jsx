import { createContext, useEffect, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

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
  addItemToCart: () => null,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CART_ITEMS':
      // payload here:
      // { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal}
      return { ...state, ...payload };
    case 'TOGGLE_IS_CART_OPEN':
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} of action in cartReducer`);
  }
};

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  useEffect(() => {
    updateCartItemsReducer(cartItems);
  }, [cartItems]);

  const updateCartItemsReducer = newCartItems => {
    const newCartTotal = newCartItems.reduce(
      (totalPrice, curItem) => totalPrice + curItem.quantity * curItem.price,
      0
    );
    const newCartCount = newCartItems.reduce(
      (cartCount, curItem) => cartCount + curItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = cartItemToAdd => {
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = cartItemToRemove => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const decrementItemInCart = cartItemToDecrement => {
    const newCartItems = decrementCartItem(cartItems, cartItemToDecrement);
    updateCartItemsReducer(newCartItems);
  };

  const toggleIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, !isCartOpen));
  };

  const value = {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    decrementItemInCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
