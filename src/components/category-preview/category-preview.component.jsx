import {
  CategoryPreviewContainer,
  CategoryPreviewProducts,
  PreviewProductTitleContainer,
  PreviewProductTitle,
} from './category-preview.styles.jsx';

// import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <PreviewProductTitleContainer>
        <PreviewProductTitle to={`${title}`}>
          {title.toUpperCase()}
        </PreviewProductTitle>
      </PreviewProductTitleContainer>
      <CategoryPreviewProducts>
        {products
          .filter((_, index) => index < 4)
          .map(product => (
            <ProductCard key={product.id} productData={product} />
          ))}
      </CategoryPreviewProducts>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
