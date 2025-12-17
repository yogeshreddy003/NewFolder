import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CartContext = createContext();

const API_URL = "https://newfolder-biza.onrender.com/api/cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔐 IMPROVED: Get auth header dynamically
  const getAuthConfig = () => {
    // Try to get the token from all possible locations
    const token =
      Cookies.get("jwt_token") ||
      localStorage.getItem("token") || 
      Cookies.get("token");

    if (!token) {
      console.warn("Auth check: No token found in Cookies or LocalStorage");
      return null;
    }

    return { 
      headers: { 
        Authorization: `Bearer ${token.replace(/^"|"$/g, '')}` // Removes quotes if they exist
      } 
    };
  };

  // 🛒 Fetch cart
  const fetchCart = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) {
      setCart({ items: [] });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(API_URL, config);
      setCart(response.data.data || response.data || { items: [] });
    } catch (err) {
      console.error("Fetch cart failed:", err);
      if (err.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          Cookies.remove("jwt_token");
      }
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  // ➕ Add to cart
  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      // Re-fetch config right at the moment of clicking
      const config = getAuthConfig();
      
      if (!config) {
        console.error("Not authenticated - context couldn't find token");
        return false; // This triggers your "Please Login" alert
      }

      try {
        const response = await axios.post(
          API_URL,
          { productId, quantity },
          config
        );

        if (response.status === 200 || response.status === 201) {
            await fetchCart();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
            return true;
        }
        return false;
      } catch (err) {
        console.error("Add to cart failed API Error:", err.response?.data || err.message);
        return false;
      }
    },
    [fetchCart]
  );

  // ❌ Remove from cart
  const removeFromCart = useCallback(
    async (productId) => {
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
    },
    [fetchCart]
  );

  // 🔄 Update quantity
  const updateCartQuantity = useCallback(
    async (productId, quantity) => {
      if (quantity <= 0) {
        return removeFromCart(productId);
      }

      const config = getAuthConfig();
      if (!config) return false;

      try {
        await axios.put(
          `${API_URL}/${productId}`,
          { quantity },
          config
        );
        await fetchCart();
        return true;
      } catch (err) {
        console.error("Update cart failed:", err);
        return false;
      }
    },
    [fetchCart, removeFromCart]
  );

  const value = useMemo(
    () => ({
      cart,
      loading,
      showSuccess,
      fetchCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
    }),
    [cart, loading, showSuccess, fetchCart, addToCart, removeFromCart, updateCartQuantity]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;