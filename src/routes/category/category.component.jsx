import './category.styles.scss';
import { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
  const category = useLoaderData();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className='category-container'>
      <h2 className='category-product-title-container'>
        <span className='category-product-title' to={`./${category}`}>
          {category.toUpperCase()}
        </span>
      </h2>
      <div className='category-products'>
        {products &&
          products.map(product => (
            <ProductCard key={product.id} productData={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
