import React ,{useState, useEffect} from "react";
import { useNavigate, } from "react-router-dom";
import {  FaRegHeart, FaShoppingCart, FaRegUserCircle } from 'react-icons/fa';
import Footer from "../Footer/Footer";
import axios from "axios";
function Home() {

     const navigate = useNavigate();
     const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

     useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch from the backend API we created.
                // Ensure your backend server is running.
                const response=await axios.get("http://localhost:5000/api/products")
                const data=response.data
                setProducts(data);
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
            <div key={product._id} className="border p-4 rounded-md text-center shadow hover:shadow-lg transition-shadow">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-48 object-contain mb-4" 
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/EEE/31343C?text=Image+Not+Found' }}
              />
              <h3 className="font-semibold mt-2 h-12">{product.name}</h3>
              <p className="text-red-600 font-bold">${product.price.toFixed(2)}</p>
            </div>
        ));
    };
  return (
    <div className="font-sans bg-white text-gray-800">
      <div className="bg-black text-white py-3 text-sm">
            <div className="container mx-auto flex justify-center items-center px-4">
                <p className="flex-grow text-center">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#" className="font-semibold underline ml-2">ShopNow</a>
                </p>
                <div className="flex items-center space-x-1">
                    
                    
                </div>
            </div>
        </div>
     
      <header className="flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-red-600">Exclusive</h1>
        <nav className="flex gap-6">
          <a href="#" className="text-red-500 text-decoration-line: underline" >Home</a>
          <a href="#" className="hover:text-red-600"  onClick={() => navigate("/contact")}>Contact</a>
          <a href="#" className="hover:text-red-600"  onClick={()=> navigate("/about")}>About</a>
        </nav>
        <div className="flex items-center space-x-6">
                            
                            <a href="#"><FaRegHeart size={22} /></a>
                            <a href="#"><FaShoppingCart size={22} /></a>
                            <a href="#"><FaRegUserCircle size={22} onClick={() => navigate("/account")} /></a>
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
          <div className="p-6  bg-white border rounded-md text-center">Phones</div>
          <div className="p-6  bg-white border rounded-md text-center">Computers</div>
          <div className="p-6  bg-white border rounded-md text-center">SmartWatch</div>
          <div className="p-6  bg-white border rounded-md text-center">Camera</div>
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
            src="https://via.placeholder.com/300x200"
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
