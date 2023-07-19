import './shop.styles.scss';
import { Outlet } from 'react-router-dom';

const Shop = () => {
  return <div className='shop-container'>{<Outlet />}</div>;
};

export default Shop;
