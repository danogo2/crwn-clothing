import './cart-item.styles.scss';

const CartItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='cart-item-container' key={id}>
      <img src={imageUrl} alt={name} />
      <div className='item-details'>
        <div>{name}</div>
        <div>
          {quantity} x ${price}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
