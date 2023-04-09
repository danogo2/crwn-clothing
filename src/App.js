import './App.css';

const App = () => {
  const categories = [
    { id: 1, title: 'Hats' },
    { id: 1, title: 'Jackets' },
    { id: 1, title: 'Sneaker' },
    { id: 1, title: 'Womens' },
    { id: 1, title: 'Mens' },
  ];
  return (
    <div className='categories-container'>
      {categories.map(({ title }) => (
        <div className='category-container'>
          <img src='' alt='' />
          <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;