import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaRegHeart, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import CartContext from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const cartItemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow">
      <h1 className="text-2xl font-bold text-red-600 cursor-pointer" onClick={() => navigate("/home")}>
        Exclusive
      </h1>

      <nav className="flex gap-6">
        <Link to="/home" className="hover:text-red-600">
          Home
        </Link>
        <Link to="/contact" className="hover:text-red-600">
          Contact
        </Link>
        <Link to="/about" className="hover:text-red-600">
          About
        </Link>
      </nav>

      <div className="flex items-center space-x-6">
        <button className="hover:text-red-600">
          <FaRegHeart size={22} />
        </button>

        <button
          className="relative hover:text-red-600"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart size={22} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate("/account")}
          className="hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>

        <button onClick={handleLogout} className="hover:text-red-600">
          <FaSignOutAlt size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
