import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaRegHeart, FaShoppingCart, FaRegUserCircle, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoCallOutline, IoMailOutline, IoPaperPlaneOutline } from "react-icons/io5";



const Footer = () => (
    <footer className="bg-black text-white pt-20 pb-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4">
            <div>
                <h3 className="text-2xl font-bold mb-4">Exclusive</h3>
                <p className="mb-4">Subscribe</p>
                <p className="text-sm mb-4">Get 10% off your first order</p>
                <div className="relative">
                    <input type="email" placeholder="Enter your email" className="bg-transparent border border-gray-300 py-2 pl-3 pr-10 rounded w-full" />
                    <IoPaperPlaneOutline className="absolute right-3 top-1/2 -translate-y-1/2" size={20} />
                </div>
            </div>
            <div>
                <h3 className="text-xl font-medium mb-4">Support</h3>
                <p className="mb-2 w-4/5">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                <p className="mb-2">exclusive@gmail.com</p>
                <p>+88015-88888-9999</p>
            </div>
            <div>
                <h3 className="text-xl font-medium mb-4">Account</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">My Account</a></li>
                    <li><a href="#" className="hover:underline">Login / Register</a></li>
                    <li><a href="#" className="hover:underline">Cart</a></li>
                    <li><a href="#" className="hover:underline">Wishlist</a></li>
                    <li><a href="#" className="hover:underline">Shop</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-medium mb-4">Quick Link</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                    <li><a href="#" className="hover:underline">Terms Of Use</a></li>
                    <li><a href="#" className="hover:underline">FAQ</a></li>
                    <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-medium mb-4">Download App</h3>
                <p className="text-xs text-gray-400 mb-2">Save $3 with App New User Only</p>
                <div className="flex space-x-2">
                  
                    <div className="w-20 h-20 bg-gray-700 border border-gray-500 flex items-center justify-center text-xs">QR Code</div>
                    <div className="flex flex-col justify-between space-y-2">
                    
                        <div className="h-9 w-28 bg-gray-800 border border-gray-600 rounded-sm flex items-center justify-center text-xs">Google Play</div>
                        <div className="h-9 w-28 bg-gray-800 border border-gray-600 rounded-sm flex items-center justify-center text-xs">App Store</div>
                    </div>
                </div>
                <div className="flex space-x-6 mt-6">
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaLinkedinIn /></a>
                </div>
            </div>
        </div>
        <div className="text-center text-gray-600 mt-16 border-t border-gray-800 pt-4">
            <p>&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
    </footer>
);


const ContactPage = () => {
const [name, setName] =useState();
const [email, setEmail] = useState();
const [phone, setPhone] = useState();
const [message, setMessage] = useState();
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/contact', {name, email, phone, message})
    .then(result => {console.log(result)
navigate("/login")})
      .catch(err => console.log(err));
}               


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

    
        <header className="border-b">
            <div className="container mx-auto flex justify-between items-center py-6 px-4">
                <h1 className="text-2xl font-bold">Exclusive</h1>
                <nav>
                    <ul className="flex space-x-12">
                        <li><a href="#" className="hover:underline" onClick={()=>navigate("/home")}>Home</a></li>
                        <li><a href="#" className="text-red-500 text-decoration-line: underline">Contact</a></li>
                        <li><a href="#" className="hover:underline" onClick={()=>navigate("/about")}>About</a></li>
                        
                    </ul>
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
            </div>
        </header>

           
            <div className="container mx-auto py-8 px-4 text-sm text-gray-500">
                <span>Home</span> / <span className="text-black">Contact</span>
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
