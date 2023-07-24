import { CategoriesPreviewContainer } from './categories-preview.styles.jsx';
import { useContext } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <CategoriesPreviewContainer>
      {Object.keys(categoriesMap).map(title => (
        <CategoryPreview
          key={title}
          title={title}
          products={categoriesMap[title]}
        />
      ))}
    </CategoriesPreviewContainer>
  );
};

export default CategoriesPreview;
