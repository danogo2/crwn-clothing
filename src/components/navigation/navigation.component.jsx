import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLinkStyled,
} from './navigation.styles.jsx';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
//imports necessary to get currently logged in user from context and change Sign In to Sign Out
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
    <NavigationContainer className='navigation'>
      <LogoContainer className='logo-container' to='/'>
        <CrwnLogo className='logo' />
      </LogoContainer>
      <NavLinksContainer className='nav-links-container'>
        <NavLinkStyled className='nav-link' to='/shop'>
          <div>SHOP</div>
        </NavLinkStyled>

        {currentUser ? (
          <NavLinkStyled
            as='span'
            className='nav-link'
            onClick={() => signOutUser()}
          >
            {/*if there is a user show sign out link, otherwise show sign in link */}
            SIGN OUT
          </NavLinkStyled>
        ) : (
          <NavLinkStyled className='nav-link' to='/auth'>
            SIGN IN
          </NavLinkStyled>
        )}
        <CartIcon />
      </NavLinksContainer>
      {isCartOpen && <CartDropdown />}
    </NavigationContainer>
  );
};

export default Navigation;
