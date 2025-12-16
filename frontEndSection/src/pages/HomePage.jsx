import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://newfolder-biza.onrender.com/api/products"
        );
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderProductGrid = () => {
    if (isLoading) {
      return <p className="text-center col-span-full">Loading products...</p>;
    }
    if (error) {
      return (
        <p className="text-center text-red-500 col-span-full">
          Error: {error}
        </p>
      );
    }
    if (products.length === 0) {
      return (
        <p className="text-center col-span-full">No products found.</p>
      );
    }
    return products.map((product) => (
      <Link
        to={`/product/${product._id}`}
        key={product._id}
        className="block border p-4 rounded-md text-center shadow hover:shadow-lg transition-shadow"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x400/EEE/31343C?text=Image+Not+Found";
          }}
        />
        <h3 className="font-semibold mt-2 h-12">{product.name}</h3>
        <p className="text-red-600 font-bold">${product.price.toFixed(2)}</p>
      </Link>
    ));
  };

  return (
    <div className="font-sans bg-white text-gray-800">
      <div className="bg-black text-white py-3 text-sm">
        <div className="container mx-auto flex justify-center items-center px-4">
          <p className="flex-grow text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <a href="#" className="font-semibold underline ml-2">
              ShopNow
            </a>
          </p>
        </div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderProductGrid()}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
