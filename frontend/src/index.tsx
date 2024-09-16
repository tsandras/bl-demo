import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './features/shared/layout';
import ProductsListPage from './features/product/productsListPage';
import AddProductPage from './features/product/addProductPage';
import ProductDetailPage from './features/product/productDetailPage';
import { ErrorPage } from './features/shared/errorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProductsListPage />,
      },
      {
        path: '/add',
        element: <AddProductPage/>
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage/>
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);