import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  FaRegHeart, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { IoCallOutline, IoMailOutline,  } from "react-icons/io5";
import Cookies from 'js-cookie';
import Footer from "../../components/Footer.jsx";
import CartContext from '../../context/CartContext.jsx';





const ContactPage = () => {
const [name, setName] =useState();
const [email, setEmail] = useState();
const [phone, setPhone] = useState();
const [message, setMessage] = useState();
const navigate = useNavigate();
const { cart } = useContext(CartContext); // Use the context
    const cartItemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;


const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://newfolder-biza.onrender.com/contact', {name, email, phone, message})
    .then(result => {console.log(result)
navigate("/login")})
      .catch(err => console.log(err));
}  

const handleLogout = () => {
        // Remove the authentication token cookie
        Cookies.remove('jwt_token');
        // Redirect the user to the login page
        navigate('/login');
      };



    return (
        <div className="font-sans bg-white">
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
                      <a href="#" className="hover:text-red-600" onClick={() => navigate("/home")} >Home</a>
                      <a href="#" className="text-red-500 text-decoration-line: underline"  >Contact</a>
                      <a href="#" className="hover:text-red-600"  onClick={()=> navigate("/about")}>About</a>
                    </nav>
                    <div className="flex items-center space-x-6">
                                        
                                        <a href="#"><FaRegHeart size={22} /></a>
                                        <a href="#" className='relative' onClick={()=> navigate("/cart")}>
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

           
            <div className="container mx-auto py-8 px-4 text-sm text-gray-500">
                <span onClick={() => navigate("/home")} className='hover:text-red-600 cursor-pointer'>Home</span> / <span className="text-black">Contact</span>
            </div>

            <main className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="md:col-span-1 p-8 shadow-lg rounded-md border border-gray-100">
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="bg-red-500 p-2 rounded-full">
                                    <IoCallOutline className="text-white" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold ml-4">Call To Us</h3>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">We are available 24/7, 7 days a week.</p>
                            <p className="text-sm text-gray-700">Phone: +8801611112222</p>
                        </div>
                        <hr className="my-8"/>
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="bg-red-500 p-2 rounded-full">
                                    <IoMailOutline className="text-white" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold ml-4">Write To US</h3>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">Fill out our form and we will contact you within 24 hours.</p>
                            <p className="text-sm text-gray-700 mb-2">Emails: customer@exclusive.com</p>
                            <p className="text-sm text-gray-700">Emails: support@exclusive.com</p>
                        </div>
                    </div>

                  
                    <div className="md:col-span-2 p-8 shadow-lg rounded-md border border-gray-100">
                        <form  >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <input type="text" placeholder="Your Name *" className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" onChange={(e) => setName(e.target.value)} />
                                <input type="email" placeholder="Your Email *" className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" onChange= {(e)=>setEmail(e.target.value)}  />
                                <input type="tel" placeholder="Your Phone *" className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" onChange= {(e)=>setPhone(e.target.value)}  />
                            </div>
                            <div className="mb-6">
                                <textarea placeholder="Your Message" rows="8" className="w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"  onChange={(e)=>setMessage(e.target.value)}></textarea>
                            </div>
                            <div className="text-right">
                                <button type="submit" onClick={handleSubmit} className="bg-red-500 text-white px-10 py-3 rounded-md hover:bg-red-600 transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
