import './directory.style.scss';
import CategoryItem from '../category-item/category-item.component.jsx';

const Directory = ({ categories }) => {
  return (
    <div className='directory-container'>
      {categories.map(category => (
        // key has to be added here where .map() happens, not where component is defined
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
