import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";

import Home from "./pages/Home/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import About from "./pages/About/About.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail.jsx";
import Account from "./pages/Account/Account.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "shop",
        element: <Shop />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "categories",
        element: <Categories />,
      },

      {
        path: "category/:categorySlug",
        element: <Shop />,
      },

      {
        path: "product/:id",
        element: <ProductDetails />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "wishlist",
        element: <Wishlist />,
      },

      {
        path: "checkout",
        element: <Checkout />,
      }, 
      {
        path:"odersuccess",
        element:<OrderSuccess />
      }, 

      {
  path: "register",
  element: <Register />,
   }, 

   {
  path: "login",
  element: <Login />,
},

 {
  path: "verify-email",
  element: <VerifyEmail />,
},

{ path: 
  "account", 
  element: <Account /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);