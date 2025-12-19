import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { FaRegHeart, FaShoppingCart,FaSignOutAlt } from 'react-icons/fa';
import Footer from "../../components/Footer.jsx";
import CartContext from "../../context/CartContext.jsx";
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cart } = useContext(CartContext); // Use the context
    const cartItemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
            // If backend returns { success: true, data: [...] }, use response.data.data
            const productData = response.data.data || response.data; 
            setProducts(productData);
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
            return <p className="text-center text-red-500 col-span-full">Error: {error}</p>;
        }
        if (products.length === 0) {
            return <p className="text-center col-span-full">No products found.</p>;
        }
        return products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="block border p-4 rounded-md text-center shadow hover:shadow-lg transition-shadow">
                <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-48 object-contain mb-4" 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/EEE/31343C?text=Image+Not+Found' }}
                />
                <h3 className="font-semibold mt-2 h-12">{product.name}</h3>
                <p className="text-red-600 font-bold">${product.price.toFixed(2)}</p>
            </Link>
        ));
    };

    const handleLogout = () => {
        // Remove the authentication token cookie
        Cookies.remove('jwt_token');
        // Redirect the user to the login page
        navigate('/login');
      };

    return (
        <div className="font-sans bg-white text-gray-800">
            <div className="bg-black text-white py-3 text-sm">
                <div className="container mx-auto flex justify-center items-center px-4">
                    <p className="flex-grow text-center">
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#" className="font-semibold underline ml-2">ShopNow</a>
                    </p>
                </div>
            </div>
     
            <header className="flex justify-between items-center px-6 py-4 shadow">
  <h1 className="text-2xl font-bold text-red-600">Exclusive</h1>

  {/* NAVIGATION */}
  <nav className="flex gap-6">
    <Link to="/" className="text-red-500 underline">Home</Link>
    <Link to="/contact" className="hover:text-red-600">Contact</Link>
    <Link to="/about" className="hover:text-red-600">About</Link>
  </nav>

  {/* ICONS & ACTIONS */}
  <div className="flex items-center space-x-6">
    
    {/* Wishlist */}
    <button className="hover:text-red-600">
      <FaRegHeart size={22} />
    </button>

    {/* Cart */}
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
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0"
        />
      </svg>
    </button>

   
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 hover:text-red-600"
    >
      <FaSignOutAlt size={22} />
      <span className="text-sm">Logout</span>
    </button>
  </div>
</header>


            <section className="bg-gray-100 flex justify-between items-center p-10">
                <div>
                    <h2 className="text-lg">Up to 10% Off Voucher</h2>
                    <h1 className="text-3xl font-bold my-2">PlayStation 5</h1>
                    <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md">
                        Shop Now
                    </button>
                </div>
                <img
                    src="https://www.shutterstock.com/image-illustration/shopping-cart-floating-out-online-260nw-1688061943.jpg"
                    alt="Banner"
                    className="rounded-md"
                />
            </section>

            <section className="px-6 py-10">
                <h2 className="text-xl font-semibold mb-4">Flash Sales</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="border p-4 rounded-md text-center">
                        <img src="https://res.cloudinary.com/dvmruiclt/image/upload/v1757564768/5e634682db5174aff99bb9337d2dc9598a0b44e4_uesxtg.png" alt="Product" />
                        <p className="mt-2">Product Name</p>
                        <p className="text-red-600 font-bold">$820</p>
                    </div>
                    <div className="border p-4 rounded-md text-center">
                        <img src="https://res.cloudinary.com/dvmruiclt/image/upload/v1756790705/samples/ecommerce/shoes.png" alt="Product" />
                        <p className="mt-2">Product Name</p>
                        <p className="text-red-600 font-bold">$99</p>
                    </div>
                </div>
            </section>

            <section className="px-6 py-10 bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">Browse By Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="p-6 bg-white border rounded-md text-center">Phones</div>
                    <div className="p-6 bg-white border rounded-md text-center">Computers</div>
                    <div className="p-6 bg-white border rounded-md text-center">SmartWatch</div>
                    <div className="p-6 bg-white border rounded-md text-center">Camera</div>
                </div>
            </section>
      
            <section className="px-6 py-10">
                <h2 className="text-xl font-semibold mb-4">Best Selling Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="border p-4 rounded-md text-center">
                        <img src="https://res.cloudinary.com/dvmruiclt/image/upload/v1756790799/5d5c2e5250752d55f8b60f2aa2923183dadbc135_lmst5q.png" alt="Product" />
                        <p className="mt-2">Product Name</p>
                        <p className="text-red-600 font-bold">$220</p>
                    </div>
                    <div className="border p-4 rounded-md text-center">
                        <img src="https://res.cloudinary.com/dvmruiclt/image/upload/v1756790713/samples/chair.png" alt="Product" />
                        <p className="mt-2">Product Name</p>
                        <p className="text-red-600 font-bold">$180</p>
                    </div>
                </div>
            </section>

            <section className="px-6 py-10">
                <div className="bg-black text-white rounded-md p-10 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Enhance Your Music Experience</h2>
                        <button className="mt-4 px-6 py-2 bg-red-600 rounded-md">
                            Shop Now
                        </button>
                    </div>
                    <img
                        src="https://img.freepik.com/free-photo/laptop-shopping-bags-online-shopping-concept_1423-189.jpg?semt=ais_hybrid&w=740&q=80"
                        alt="Promo"
                        className="rounded-md"
                    />
                </div>
            </section>

            <section className="px-6 py-10">
                <h2 className="text-xl font-semibold mb-4">Explore Our Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {renderProductGrid()}
                </div>
            </section>

            <section className="px-6 py-10 bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">New Arrival</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="col-span-2 bg-black text-white p-10 rounded-md">
                        <h3 className="text-2xl font-bold">PlayStation 5</h3>
                        <p className="mt-2 text-sm">Black and White version of the PS5...</p>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-md">Other Product</div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;