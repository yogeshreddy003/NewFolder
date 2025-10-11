// The import statement is now corrected.
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      // If no token, there's no cart to fetch, so we're not loading anymore.
      setCart({ items: [] }); // Set an empty cart
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get("https://newfolder-biza.onrender.com/api/cart", config);
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
      // If fetching fails, still provide a default empty cart structure
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity) => {
    const token = Cookies.get("jwt_token");
    if (!token) return alert("Please log in to add items to your cart.");
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post("https://newfolder-biza.onrender.com/api/cart", { productId, quantity }, config);
      setCart(data);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Failed to add to cart", error);
      alert("Error adding item to cart.");
    }
  };
  
  const removeFromCart = async (productId) => {
    const token = Cookies.get("jwt_token");
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.delete(`https://newfolder-biza.onrender.com/api/cart/${productId}`, config);
      setCart(data);
      alert("Item removed from cart.");
    } catch (error) {
      console.error("Failed to remove from cart", error);
      alert("Error removing item from cart.");
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      // If quantity is less than 1, remove the item instead
      return removeFromCart(productId);
    }
    
    const token = Cookies.get("jwt_token");
    if (!token) return;

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.put(
        "https://newfolder-biza.onrender.com/api/cart",
        { productId, quantity },
        config
      );
      setCart(data); // Update state with the updated cart from the server
    } catch (error) {
      console.error("Failed to update cart quantity", error);
      alert("Error updating item quantity.");
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, updateCartQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;