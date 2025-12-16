import React, { createContext, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CartContext = createContext();

const API_URL = "https://newfolder-biza.onrender.com/api/cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });   // ✔️ default non-null
  const [loading, setLoading] = useState(false);

  const getAuthConfig = () => {
    const token = Cookies.get("jwt_token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
  };

  // 🎯 Fetch only when CartPage asks for it
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

  const addToCart = useCallback(async (productId, quantity) => {
    const config = getAuthConfig();
    if (!config) return alert("Please log in first");

    try {
      const { data } = await axios.post(API_URL, { productId, quantity }, config);
      setCart(data);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    const config = getAuthConfig();
    if (!config) return;

    // Optimistic UI
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.productId._id !== productId),
    }));

    try {
      const { data } = await axios.delete(`${API_URL}/${productId}`, config);
      setCart(data);
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  }, []);

  const updateCartQuantity = useCallback(async (productId, quantity) => {
    const config = getAuthConfig();
    if (!config) return;

    if (quantity < 1) return removeFromCart(productId);

    // Optimistic UI
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId._id === productId ? { ...item, quantity } : item
      ),
    }));

    try {
      const { data } = await axios.put(
        API_URL,
        { productId, quantity },
        config
      );
      setCart(data);
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  }, []);

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
