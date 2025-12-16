import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import About from "./keyComponents/About/About.jsx";
import Account from "./keyComponents/AccountPage/Account.jsx";
import AddProduct from "./keyComponents/AddProduct/AddProduct.jsx";
import Cart from "./keyComponents/CartPage/CartPage.jsx";
import Contact from "./keyComponents/ContactUs/Contact.jsx";
import HomePage from "./keyComponents/HomePage/Home.jsx";
import LoginPage from "./keyComponents/LoginPage/Login.jsx";
import ProductDetails from "./keyComponents/ProductDetails/Product.jsx";
import SignupPage from "./keyComponents/SignupPage/Signup.jsx";
import "./styles/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetails/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addproduct"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
