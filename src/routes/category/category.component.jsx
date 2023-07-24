import {
  CategoryContainer,
  CategoryProductTitle,
  CategoryProductTitleContainer,
  CategoryProducts,
} from './category.styles.jsx';
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
    <CategoryContainer>
      <CategoryProductTitleContainer>
        <CategoryProductTitle to={`./${category}`}>
          {category.toUpperCase()}
        </CategoryProductTitle>
      </CategoryProductTitleContainer>
      <CategoryProducts>
        {products &&
          products.map(product => (
            <ProductCard key={product.id} productData={product} />
          ))}
      </CategoryProducts>
    </CategoryContainer>
  );
};

export default Category;
