import {
  BackgroundImage,
  DirectoryItemContainer,
  Body,
} from './directory-item.styles.jsx';

import { useNavigate } from 'react-router-dom';

// name of the custom imageUrl prop passed down to the styled component has to start with '$' due to react error
const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();
  const goToCategoryPage = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={goToCategoryPage}>
      <BackgroundImage $imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

// Old version without styled components

/*
const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <div className='directory-item-container'>
      <div
        className='background-image'
############## We can't set style property for styled component like this, we pass value to the component and access it inside styled component using string interpolation, see above ########################        
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className='body'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};*/
