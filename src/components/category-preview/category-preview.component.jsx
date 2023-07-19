import './category-preview.styles.scss';

import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className='category-preview-container'>
      <h2 className='preview-product-title-container'>
        <Link className='preview-product-title' to={`${title}`}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className='category-preview-products'>
        {products
          .filter((_, index) => index < 4)
          .map(product => (
            <ProductCard key={product.id} productData={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
