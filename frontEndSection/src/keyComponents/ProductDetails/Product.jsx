// src/pages/Product.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaStar, FaStarHalfAlt, FaRegStar, FaRegHeart, FaShoppingCart, FaRegUserCircle
} from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { TbTruckDelivery, TbReload } from "react-icons/tb";
import Footer from "../../components/Footer.jsx";
import CartContext from '../../context/CartContext.jsx';

// StarRating and ProductCard components unchanged — include them here or import if you have them separated
const StarRating = ({ rating = 0, reviewCount = 0 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars.push(<FaStar key={i} className="text-yellow-500" />);
    else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    else stars.push(<FaRegStar key={i} className="text-yellow-500" />);
  }
  return (
    <div className="flex items-center space-x-1">
      {stars}
      <span className="text-gray-500 text-sm">({reviewCount})</span>
    </div>
  );
};

const ProductCard = ({ image, name, price, oldPrice, rating, reviewCount, discount }) => {
  return (
    <div>
      <div className="relative group bg-gray-100 flex items-center justify-center aspect-square rounded">
        <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">{image}</span>
        </div>
        {discount && <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded">{discount}</div>}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button className="bg-white p-2 rounded-full shadow"><FaRegHeart /></button>
          <button className="bg-white p-2 rounded-full shadow"><FiEye /></button>
        </div>
        <button className="absolute bottom-0 w-full bg-black text-white py-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add To Cart
        </button>
      </div>
      <div className="mt-4">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-red-500 font-medium">${price}</span>
          {oldPrice && <span className="text-gray-500 line-through">${oldPrice}</span>}
        </div>
        <div className="mt-1">
          <StarRating rating={rating} reviewCount={reviewCount} />
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  // use context
  const cartContext = useContext(CartContext) || {};
  const { addToCart, showSuccess, fetchCart } = cartContext;


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://newfolder-biza.onrender.com/api/products/${id}`);
        setProduct(response.data.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch product data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Optionally refresh cart after adding
  const handleAddToCart = async () => {
    if (!product || !product._id) return;
    const success = await addToCart(product._id, quantity);
    if (success) {
      // optionally refresh cart data (if needed)
      if (typeof fetchCart === 'function') fetchCart();
    } else {
      // if failed due to not logged in, navigate to login (optional)
      // you can show a nicer modal/toast here instead
      alert('Failed to add to cart. Please login and try again.');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><p className="text-xl">Loading product details...</p></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen"><p className="text-xl text-red-500">{error}</p></div>;
  if (!product) return <div className="flex justify-center items-center min-h-screen"><p className="text-xl">Product not found.</p></div>;

  return (
    <div className="font-sans relative">
      {/* Success popup (top-right) — uses showSuccess from context */}
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce z-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Added to Cart!</span>
        </div>
      )}

      <div className="bg-black text-white py-3 text-sm">
        <div className="container mx-auto flex justify-center items-center px-4">
          <p className="flex-grow text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#" className="font-semibold underline ml-2">ShopNow</a>
          </p>
        </div>
      </div>

      <header className="flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-red-600">Exclusive</h1>
        <nav className="flex gap-6">
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/home")}>Home</a>
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/contact")}>Contact</a>
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/about")}>About</a>
        </nav>
        <div className="flex items-center space-x-6">
          <a href="#"><FaRegHeart size={22} /></a>
          <a href="#"><FaShoppingCart size={22} /></a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={() => navigate("/account")}
            className="hover:text-red-600 size-6 cursor-pointer"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
      </header>

      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 py-10">
        <div className="flex justify-center p-4">
          <div className="bg-gray-100 flex items-center justify-center rounded p-4 h-[500px] w-full">
            <img src={product?.imageUrl} alt={product?.name} className="max-w-full max-h-full object-contain" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold">{product.name}</h2>
          <div className="flex items-center space-x-4 my-4">
            <StarRating rating={4.5} reviewCount={150} />
            <span className="text-gray-400">|</span>
            <span className="text-green-600">In Stock</span>
          </div>
          <p className="text-3xl font-light mb-6">₹{Number(product?.price ?? 0).toFixed(2)}</p>
          <p className="text-gray-600 border-b pb-6">{product.description}</p>

          <div className="flex items-center space-x-4 my-6">
            <div className="flex border border-gray-400 rounded">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-red-500 hover:text-white rounded-l">-</button>
              <input type="text" value={quantity} readOnly className="w-16 text-center border-l border-r border-gray-400" />
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-r">+</button>
            </div>

            <button className="bg-red-500 text-white px-12 py-3 rounded hover:bg-red-600 transition">Buy Now</button>

            <button className="p-3 border border-gray-400 rounded hover:bg-gray-100"><FaRegHeart size={20} /></button>

            <button
              onClick={handleAddToCart}
              className="bg-red-500 text-white px-12 py-3 rounded hover:bg-red-600 transition"
            >
              Add To Cart
            </button>
          </div>

          <div className="border border-gray-300 rounded mt-8">
            <div className="flex items-center space-x-4 p-4 border-b border-gray-300">
              <TbTruckDelivery size={32} />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-xs text-gray-600">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <TbReload size={32} />
              <div>
                <p className="font-medium">Return Delivery</p>
                <p className="text-xs text-gray-600">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="container mx-auto my-24 px-4">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-5 h-10 bg-red-500 rounded"></div>
          <h2 className="text-red-500 font-semibold">Related Items</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <ProductCard name="HAVIT HV-G92 Gamepad" price="120" oldPrice="160" rating={5} reviewCount={88} discount="-40%" image="Gamepad" />
          <ProductCard name="AK-900 Wired Keyboard" price="960" oldPrice="1160" rating={4.5} reviewCount={75} discount="-35%" image="Keyboard" />
          <ProductCard name="IPS LCD Gaming Monitor" price="370" oldPrice="400" rating={5} reviewCount={99} discount="-30%" image="Monitor" />
          <ProductCard name="RGB liquid CPU Cooler" price="160" oldPrice="170" rating={4.5} reviewCount={65} image="CPU Cooler" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;
