import React ,{  useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {  FaRegHeart, FaShoppingCart, FaSignOutAlt  } from 'react-icons/fa';


import Cookies from 'js-cookie';
import Footer from "../../components/Footer.jsx";
import CartContext from '../../context/CartContext.jsx';


const AboutPage = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext); // Use the context
    const cartItemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
    const handleLogout = () => {
            // Remove the authentication token cookie
            Cookies.remove('jwt_token');
            // Redirect the user to the login page
            navigate('/login');
          };
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
             
              <header className="flex justify-between items-center px-6 py-4 shadow">
                <h1 className="text-2xl font-bold text-red-600">Exclusive</h1>
                <nav className="flex gap-6">
                  <a href="#" className="hover:text-red-600"  onClick={()=> navigate("/home")}>Home</a>
                  <a href="#" className="hover:text-red-600"  onClick={() => navigate("/contact")}>Contact</a>
                  <a href="#" className="text-red-500 text-decoration-line: underline" >About</a>
                </nav>
                <div className="flex items-center space-x-6">
                                    
                                    <a href="#"><FaRegHeart size={22} /></a>
                                    <a href="#" className="relative" onClick={() => navigate("/cart")}>
                                      <FaShoppingCart size={22} />
                                        {cartItemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                          {cartItemCount}
                                        </span>
                                      )}
                                      </a>
                                      <svg 
                                                              xmlns="http://www.w3.org/2000/svg" 
                                                              fill="none" 
                                                              viewBox="0 0 24 24" 
                                                              strokeWidth="1.5" // Changed stroke-width to strokeWidth
                                                              stroke="currentColor" 
                                                              onClick={() => navigate("/account")} 
                                                              className="hover:text-red-600 size-6 cursor-pointer" // Changed class to className and added cursor-pointer
                                                          >
                                                              <path 
                                                                  strokeLinecap="round" // Changed stroke-linecap to strokeLinecap
                                                                  strokeLinejoin="round" // Changed stroke-linejoin to strokeLinejoin
                                                                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
                                                              />
                                                          </svg>
                                                          <a onClick={handleLogout} className="hover:text-red-600"  href='#'><FaSignOutAlt size = {24}/> <a className='text-sm p-2 hover:text-red-600'>Logout</a> </a>                                    
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

   
      <Footer />
    </div>
  );
};

export default AboutPage;