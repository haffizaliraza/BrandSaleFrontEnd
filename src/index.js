import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  
  RouterProvider,
} from "react-router-dom";
import Product from './Component/Product';
import ProductDetails from './Component/ProductDetails';
import Matel from './Component/Matel';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
  
     {/* <Route path="/" element={<Matel/>} /> */}
    <Route path="/" element={<Product/>} /> 
    <Route path="/productDetails/:productId" element={<ProductDetails/>} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);