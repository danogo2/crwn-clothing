import { NavLink } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
  return (
    <nav className='navigation'>
      <NavLink className='logo-container' to='/'>
        <CrwnLogo className='logo' />
      </NavLink>
      <div className='nav-links-container'>
        <NavLink className='nav-link' to='/shop'>
          <div>shop</div>
        </NavLink>
        <NavLink className='nav-link' to='/sign-in'>
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
