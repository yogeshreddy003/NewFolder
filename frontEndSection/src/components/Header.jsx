import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaRegHeart, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import CartContext from "../context/CartContext"; // Fixed path

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <h1 className="text-2xl font-bold text-red-600 cursor-pointer" onClick={() => navigate("/home")}>
        Exclusive
      </h1>
      <nav className="flex gap-6">
        <Link to="/home" className="hover:text-red-600">Home</Link>
        <Link to="/contact" className="hover:text-red-600">Contact</Link>
        <Link to="/about" className="hover:text-red-600">About</Link>
      </nav>
      <div className="flex items-center space-x-6">
        <FaRegHeart size={22} className="cursor-pointer hover:text-red-600" />
        <div className="relative cursor-pointer hover:text-red-600" onClick={() => navigate("/cart")}>
          <FaShoppingCart size={22} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
        <FaSignOutAlt size={22} onClick={handleLogout} className="cursor-pointer hover:text-red-600" />
      </div>
    </header>
  );
};
export default Header;