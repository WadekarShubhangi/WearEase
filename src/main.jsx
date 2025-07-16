import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import Address from "./pages/Address.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UpdateAddress from "./pages/UpdateAddress.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/wishlist",  element: <Wishlist />},
  { path: "/orders",  element: <Orders />},
  { path: "/cart",  element: <Cart />},
  { path: "/address",  element: <Address />},
  { path: "/productdetails/:prodId",  element: <ProductDetails />},
  { path: "/productlisting",  element: <ProductListing />},
  { path: "/userprofile",  element: <UserProfile />},
  { path: "/updateAddress/:addressId",  element: <UpdateAddress />},


]);

createRoot(document.getElementById("root")).render(
<StrictMode>
  <ProductProvider>
    <RouterProvider router={router} />
  </ProductProvider>
</StrictMode>

);
