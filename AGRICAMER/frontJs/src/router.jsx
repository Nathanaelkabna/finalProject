import { Navigate, createBrowserRouter } from "react-router-dom";
// import Contact from "./components/userComponent/Contact";
import DefaultLayout from "./components/DefaultLayout";
import Acceuil from "./components/userComponent/Accueil";
import Admin from "./components/adminComponent/Admin";
import GuestLayout from "./components/adminComponent/GuestLayout";
import Login from "./components/adminComponent/Login";
import SignUp from "./components/adminComponent/SignUp";
import DashBoard from "./components/adminComponent/DashBoard";
import Products from "./components/adminComponent/Produits";
import CreateProduct from "./components/adminComponent/CreateProduct";
import ProductDetails from "./components/adminComponent/ProductDetails";
import ToutProduits from "./components/userComponent/ToutProduits";
import UnProduit from "./components/userComponent/UnProduit";
import Basket from "./components/userComponent/Basket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/accueil" />,
  },

  {
    path: "/admin",
    element: <DashBoard />,
    children: [
      {
        path: "",
        element: <Admin />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
      {
        path: "products/:id",
        element: <ProductDetails/>
      },
    ],
  },

  {
    path: "/admin",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/accueil",
        element: <Acceuil />,
      },
      {
        path: "/nos-produits",
        element: <ToutProduits />
      },
      {
        path: "/product/:id",
        element: <UnProduit />
      },
      {
        path: "/basket",
        element: <Basket />
      },
    //   {
    //     path: "/contact",
    //     element: <Contact />,
    //   },
    ],
  },
]);
export default router;
