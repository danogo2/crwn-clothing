import { NavLink } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
//imports needed to get currently logged in user from context and change Sign In to Sign Out
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
  // useContext triggers rerender whenever value inside this useContext hook changes (here when currentUser has changed)
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  // don't need, firebase auth state observer has it covered
  // const signOutUserHandler = async () => {
  //   // wait till user is signed out, we don't have to catch any value because it return undefined after is finished
  //   await signOutUser();
  //   // and clear context, setting user to null (so it will show Sign in again)
  //   setCurrentUser(null);
  // };

  return (
    <nav className='navigation'>
      <NavLink className='logo-container' to='/'>
        <CrwnLogo className='logo' />
      </NavLink>
      <div className='nav-links-container'>
        <NavLink className='nav-link' to='/shop'>
          <div>SHOP</div>
        </NavLink>

        {currentUser ? (
          <span className='nav-link' onClick={() => signOutUser()}>
            {/*if there is a user show sign out link, otherwise show sign in link */}
            SIGN OUT
          </span>
        ) : (
          <NavLink className='nav-link' to='/auth'>
            SIGN IN
          </NavLink>
        )}
        <CartIcon />
      </div>
      {isCartOpen && <CartDropdown />}
    </nav>
  );
};

export default Navigation;
