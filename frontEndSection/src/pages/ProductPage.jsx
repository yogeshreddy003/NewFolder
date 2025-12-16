import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContext from "../context/CartContext";

const StarRating = ({ rating = 0, reviewCount = 0 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars.push(<FaStar key={i} className="text-yellow-500" />);
    else if (i === Math.ceil(rating) && !Number.isInteger(rating))
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    else stars.push(<FaRegStar key={i} className="text-yellow-500" />);
  }
  return (
    <div className="flex items-center space-x-1">
      {stars}
      <span className="text-gray-500 text-sm">({reviewCount})</span>
    </div>
  );
};

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart, fetchCart } = useContext(CartContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newfolder-biza.onrender.com/api/products/${id}`
        );
        setProduct(response.data);
        setError("");
      } catch {
        setError("Failed to fetch product data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !product._id) return;
    const success = await addToCart(product._id, quantity);
    if (success) {
      if (typeof fetchCart === "function") fetchCart();
      alert("Added to cart!");
    } else {
      alert("Failed to add to cart. Please login and try again.");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (error)
    return (
      <div className="text-center py-20 text-red-500">{error}</div>
    );

  if (!product)
    return (
      <div className="text-center py-20">Product not found.</div>
    );

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-gray-100 rounded p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-w-md"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <StarRating rating={4} reviewCount={88} />

            <p className="text-2xl font-bold text-red-600 my-4">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2"
                >
                  -
                </button>
                <span className="px-6 py-2 border-l border-r">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
