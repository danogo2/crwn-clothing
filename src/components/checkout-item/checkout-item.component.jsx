import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  const { addItemToCart, decrementItemInCart, removeItemFromCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(cartItem);
  const decrementItemHandler = () => decrementItemInCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <div className='name'>{name}</div>
      <div className='quantity'>
        <button className='arrow' onClick={decrementItemHandler}>
          &#10094;
        </button>
        <span className='value'>{quantity}</span>
        <button className='arrow' onClick={addItemHandler}>
          &#10095;
        </button>
      </div>
      <div className='price'>${price}</div>
      <div className=' remove-button' onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
