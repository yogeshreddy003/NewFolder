import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch, FaRegHeart, FaShoppingCart, FaRegUserCircle, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';



const AboutPage = () => {
    const Navigate = useNavigate();
  return (
    <div className="bg-white font-sans">
        <div className="bg-black text-white py-3 text-sm">
            <div className="container mx-auto flex justify-center items-center px-4">
                <p className="flex-grow text-center">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#" className="font-semibold underline ml-2">ShopNow</a>
                </p>
                <div className="flex items-center space-x-1">
                    
                    
                </div>
            </div>
        </div>
      <header className="py-4 px-8 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">Exclusive</a>
          <nav className="hidden md:flex space-x-8 text-gray-700">
            <a href="#" className="hover:text-red-500" onClick={()=>Navigate("/home")}>Home</a>
            <a href="#" className="hover:text-red-500" onClick={()=> Navigate("/contact")}>Contact</a>
            <a href="#" className="text-red-500 text-decoration-line: underline">About</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block relative">
              <div className="flex items-center space-x-6">
                                  <div className="relative">
                                      <input type="text" placeholder="What are you looking for?" className="bg-gray-100 px-4 py-2 rounded text-sm w-64" />
                                      <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                  </div>
                                  <a href="#"><FaRegHeart size={22} /></a>
                                  <a href="#"><FaShoppingCart size={22} /></a>
                                  <a href="#"><FaRegUserCircle size={22} /></a>
                              </div>
              
            </div>
          </div>
        </div>
      </header>

    
      <div className="container mx-auto px-8 py-8 text-sm text-gray-500">
        Home / <span className="text-black">About</span>
      </div>

      <section className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold">Our Story</h1>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2010, Exclusive is a brick-and-mortar retail company that transitioned to an online e-commerce platform in 2015. Headquartered in a small office, the company has grown to become a global leader in online retail. Exclusive now serves over 10,000 sellers and 300 brands, delivering to over 1 million customers worldwide.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Exclusive has over 1 million diverse products, categorized into fashion, electronics, home goods, and more. Our commitment to quality and customer satisfaction is what drives us to deliver an unparalleled shopping experience.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1540243685368-e054101185a1?q=80&w=1974&auto=format&fit=crop"
            alt="Two women looking at a mobile phone and shopping bags"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

   
      <section className="container mx-auto px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
 
        <div className="bg-red-500 text-white p-8 rounded-lg text-center flex flex-col items-center">
          <div className="text-4xl font-bold">10.5k</div>
          <p className="mt-2 text-sm">Sellers active on site</p>
        </div>
     
        <div className="bg-red-500 text-white p-8 rounded-lg text-center flex flex-col items-center">
          <div className="text-4xl font-bold">33k</div>
          <p className="mt-2 text-sm">Monthly product sale</p>
        </div>
      
        <div className="bg-white border-2 border-red-500 p-8 rounded-lg text-center flex flex-col items-center">
          <div className="text-4xl font-bold text-black">45.5k</div>
          <p className="mt-2 text-sm text-gray-500">Customer active in our site</p>
        </div>
     
        <div className="bg-white border-2 border-red-500 p-8 rounded-lg text-center flex flex-col items-center">
          <div className="text-4xl font-bold text-black">25k</div>
          <p className="mt-2 text-sm text-gray-500">Annual gross sale in our site</p>
        </div>
      </section>

      <section className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
       
          <div className="flex flex-col items-center text-center">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
              alt="Tom Cruise"
              className="w-64 h-64 rounded-lg object-cover"
            />
            <h3 className="mt-4 text-2xl font-semibold">Tom Cruise</h3>
            <p className="text-gray-500">Founder & Chairman</p>
         
            <div className="flex space-x-4 mt-2">
              <div className="w-5 h-5 bg-gray-400"></div>
              <div className="w-5 h-5 bg-gray-400"></div>
              <div className="w-5 h-5 bg-gray-400"></div>
            </div>
          </div>
     
          <div className="flex flex-col items-center text-center">
            <img
              src="https://images.unsplash.com/photo-1531746020795-81432f837c7f?q=80&w=1974&auto=format&fit=crop"
              alt="Emma Watson"
              className="w-64 h-64 rounded-lg object-cover"
            />
            <h3 className="mt-4 text-2xl font-semibold">Emma Watson</h3>
            <p className="text-gray-500">Managing Director</p>
            <div className="flex space-x-4 mt-2">
              <div className="w-5 h-5 bg-gray-400"></div>
              <div className="w-5 h-5 bg-gray-400"></div>
              <div className="w-5 h-5 bg-gray-400"></div>
            </div>
          </div>
       
          <div className="flex flex-col items-center text-center">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
              alt="Will Smith"
              className="w-64 h-64 rounded-lg object-cover"
            />
            <h3 className="mt-4 text-2xl font-semibold">Will Smith</h3>
            <p className="text-gray-500">Product Designer</p>
            <div className="flex space-x-4 mt-2">
              <div className="w-5 h-5 bg-gray-400"></div>
              <div className="w-5 h-5 bg-gray-400"></div>
              <div className="w-5 h-5 bg-gray-400"></div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="container mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
     
        <div className="flex flex-col items-center">
        
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200"></div>
          <h4 className="mt-4 text-lg font-bold">FREE AND FAST DELIVERY</h4>
          <p className="text-sm text-gray-500">Free delivery for all orders over $140</p>
        </div>
       
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200"></div>
          <h4 className="mt-4 text-lg font-bold">24/7 CUSTOMER SERVICE</h4>
          <p className="text-sm text-gray-500">Friendly 24/7 customer support</p>
        </div>
    
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200"></div>
          <h4 className="mt-4 text-lg font-bold">MONEY BACK GUARANTEE</h4>
          <p className="text-sm text-gray-500">We return money within 30 days</p>
        </div>
      </section>

   
      <footer className="bg-black text-white py-16 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
      
        </div>
        <div className="container mx-auto text-center mt-12 text-gray-400 text-sm border-t border-gray-700 pt-8">
          © Copyright Exclusive 2025. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;