import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSearch, FaRegHeart, FaShoppingCart, FaRegUserCircle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

function Home() {

     const navigate = useNavigate();
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
                            <div className="relative">
                                <input type="text" placeholder="What are you looking for?" className="bg-gray-100 px-4 py-2 rounded text-sm w-64" />
                                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                            <a href="#"><FaRegHeart size={22} /></a>
                            <a href="#"><FaShoppingCart size={22} /></a>
                            <a href="#"><FaRegUserCircle size={22} /></a>
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
          {Array(8).fill("").map((_, i) => (
            <div key={i} className="border p-4 rounded-md text-center">
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" alt="Product" />
              <p className="mt-2">Product Name</p>
              <p className="text-red-600 font-bold">$150</p>
            </div>
          ))}
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

      <footer className="bg-black text-gray-300 px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <h3 className="font-bold text-white mb-2">Exclusive</h3>
            <p>Subscribe</p>
            <input
              type="text"
              placeholder="Enter your email"
              className="mt-2 p-2 w-full rounded-md text-black"
            />
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Support</h3>
            <p>111 Bijoy Sarani, Dhaka</p>
            <p>exclusive@gmail.com</p>
            <p>+880123456789</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Account</h3>
            <p>My Account</p>
            <p>Login/Register</p>
            <p>Cart</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Quick Links</h3>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>FAQ</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-6">
          © Copyright 2025. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
