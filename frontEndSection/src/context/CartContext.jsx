import React, { createContext, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CartContext = createContext();

const API_URL = "https://newfolder-biza.onrender.com/api/cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const getAuthConfig = () => {
    const token = Cookies.get("jwt_token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
  };

  // Fetch cart
  const fetchCart = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) {
      setCart({ items: [] });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL, config);
      setCart(data);
    } catch (err) {
      console.error("Fetch cart failed:", err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  // Add to cart
  const addToCart = useCallback(async (productId, quantity = 1) => {
    const config = getAuthConfig();
    if (!config) {
      console.error("Not authenticated");
      return false;
    }

    try {
      await axios.post(API_URL, { productId, quantity }, config);
      await fetchCart();
      return true;
    } catch (err) {
      console.error("Add to cart failed:", err);
      return false;
    }
  }, [fetchCart]);

  // Remove from cart
  const removeFromCart = useCallback(async (productId) => {
    const config = getAuthConfig();
    if (!config) return false;

    try {
      await axios.delete(`${API_URL}/${productId}`, config);
      await fetchCart();
      return true;
    } catch (err) {
      console.error("Remove from cart failed:", err);
      return false;
    }
  }, [fetchCart]);

  // Update cart quantity
  const updateCartQuantity = useCallback(async (productId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    const config = getAuthConfig();
    if (!config) return false;

    try {
      await axios.put(`${API_URL}/${productId}`, { quantity }, config);
      await fetchCart();
      return true;
    } catch (err) {
      console.error("Update cart failed:", err);
      return false;
    }
  }, [fetchCart, removeFromCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
