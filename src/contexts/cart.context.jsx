import { createContext, useState, useEffect, useReducer } from 'react';

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
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  DECREMENT_ITEM_IN_CART: 'DECREMENT_ITEM_IN_CART',
  TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_ITEM_TO_CART':
      return { ...state, cartItems: addCartItem(state.cartItems, payload) }; // payload is an item to add
    case 'REMOVE_ITEM_FROM_CART':
      return { ...state, cartItems: removeCartItem(state.cartItems, payload) }; // payload is an item to remove
    case 'DECREMENT_ITEM_IN_CART':
      return {
        ...state,
        cartItems: decrementCartItem(state.cartItems, payload),
      }; // payload is an item to be decremented
    case 'TOGGLE_IS_CART_OPEN':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'SET_CART_COUNT':
      return {
        ...state,
        cartCount: state.cartItems.reduce(
          (cartCount, curItem) => cartCount + curItem.quantity,
          0
        ),
      };
    case 'SET_TOTAL_PRICE':
      return {
        ...state,
        cartTotal: state.cartItems.reduce(
          (totalPrice, curItem) =>
            totalPrice + curItem.quantity * curItem.price,
          0
        ),
      };
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
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  //  best practice is to make useEffect responsible for one thing
  useEffect(() => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT });
  }, [cartItems]);

  useEffect(() => {
    dispatch({ type: CART_ACTION_TYPES.SET_TOTAL_PRICE });
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: productToAdd,
    });
  };

  const removeItemFromCart = cartItemToRemove => {
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
      payload: cartItemToRemove,
    });
  };

  const decrementItemInCart = cartToDecrement => {
    dispatch({
      type: CART_ACTION_TYPES.DECREMENT_ITEM_IN_CART,
      payload: cartToDecrement,
    });
  };

  const toggleIsCartOpen = () => {
    console.log('CART ICON TOGGLED!!!');
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN });
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
