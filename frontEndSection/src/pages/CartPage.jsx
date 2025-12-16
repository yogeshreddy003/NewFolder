import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const { cart, loading, fetchCart, removeFromCart, updateCartQuantity } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = useMemo(() => {
    return cart.items
      .reduce(
        (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
        0
      )
      .toFixed(2);
  }, [cart.items]);

  if (loading) {
    return <div className="py-20 text-center">Loading your cart…</div>;
  }

  if (cart.items.length === 0) {
    return (
      <div>
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <button
            onClick={() => navigate("/home")}
            className="bg-red-500 text-white px-6 py-2 rounded"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                className="flex bg-white p-4 rounded shadow"
                key={item.productId._id}
              >
                <img
                  src={item.productId.imageUrl}
                  className="w-24 h-24 object-contain mr-4"
                  alt=""
                />
                <div className="flex-grow">
                  <h2 className="font-semibold">{item.productId.name}</h2>
                  <p>${item.productId.price.toFixed(2)} each</p>

                  <div className="flex mt-2">
                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                      className="border px-3"
                    >
                      -
                    </button>
                    <span className="border-t border-b px-4">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                      className="border px-3"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.productId._id)}
                    className="text-red-500 mt-2"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <button className="bg-red-500 w-full text-white py-2 rounded hover:bg-red-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
