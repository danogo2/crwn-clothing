import { ItemDetails, CartItemContainer } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer key={id}>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <div>{name}</div>
        <div>
          {quantity} x ${price}
        </div>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
