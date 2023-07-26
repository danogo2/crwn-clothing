import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
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
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
