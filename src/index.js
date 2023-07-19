import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home/home.component.jsx';
import Shop from './routes/shop/shop.component.jsx';
import Authentication from './routes/authentication/authentication.component.jsx';
import Checkout from './routes/checkout/checkout.component';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';
import CategoriesPreview from './components/categories-preview/categories-preview.component';
import Category from './routes/category/category.component';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'shop/*',
        element: <Shop />,
        children: [
          { path: '', element: <CategoriesPreview /> },
          {
            path: ':category',
            loader: async ({ params }) => {
              return params.category;
            },
            element: <Category />,
          },
        ],
      },
      {
        path: 'auth',
        element: <Authentication />,
      },
      { path: 'checkout', element: <Checkout /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
