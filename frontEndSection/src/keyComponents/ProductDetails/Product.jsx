import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegHeart, FaHeart, FaSearch, FaShoppingCart, FaRegUserCircle, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { TbTruckDelivery, TbReload } from "react-icons/tb";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const StarRating = ({ rating, reviewCount }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-yellow-500" />);
        }
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
                
                {discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded">
                        {discount}
                    </div>
                )}
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
    const [quantity, setQuantity] = useState(2);
    const [selectedSize, setSelectedSize] = useState('M');
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const navigate = useNavigate();

    return (
        <div className="font-sans">
         
            <div className="bg-black text-white py-3 text-sm">
                <div className="container mx-auto flex justify-center items-center">
                    <p className="flex-grow text-center">
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#" className="font-semibold underline ml-2">ShopNow</a>
                    </p>
                    <div className="flex items-center space-x-1">
                        <span>English</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

         
            <header className="border-b">
                <div className="container mx-auto flex justify-between items-center py-6 px-4">
                    <h1 className="text-2xl font-bold">Exclusive</h1>
                    <nav>
                        <ul className="flex space-x-12">
                            <li><a href="#" className="hover:underline"  onClick={()=> navigate('/home')}>Home</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                            <li><a href="#" className="hover:underline">About</a></li>
                            <li><a href="#" className="hover:underline">Sign Up</a></li>
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

        
            <div className="container mx-auto py-6 px-4 text-sm text-gray-500">
                <span>Account</span> / <span>Gaming</span> / <span className="text-black">Havic HV-G92 Gamepad</span>
            </div>
         
            <main className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4">
               
                <div className="flex flex-row-reverse lg:flex-row gap-4">
                     <div className="flex-grow bg-gray-100 flex items-center justify-center rounded">
                      
                        <div className="w-[400px] h-[400px] bg-gray-200"></div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                                 
                                <div className="w-20 h-20 bg-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>

               
                <div>
                    <h2 className="text-3xl font-semibold">Havic HV G-92 Gamepad</h2>
                    <div className="flex items-center space-x-4 my-4">
                        <StarRating rating={4.5} reviewCount={150} />
                        <span className="text-gray-400">|</span>
                        <span className="text-green-600">In Stock</span>
                    </div>
                    <p className="text-3xl font-light mb-6">$192.00</p>
                    <p className="text-gray-600 border-b pb-6">
                        PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal pressure sensitive.
                    </p>
                    <div className="flex items-center space-x-4 my-6">
                        <span>Colours:</span>
                        <button className="w-5 h-5 rounded-full bg-gray-300 ring-2 ring-offset-2 ring-gray-400"></button>
                        <button className="w-5 h-5 rounded-full bg-red-500"></button>
                    </div>
                    <div className="flex items-center space-x-4 my-6">
                        <span>Size:</span>
                        {sizes.map(size => (
                             <button key={size} onClick={() => setSelectedSize(size)}
                                className={`w-10 h-10 border rounded ${selectedSize === size ? 'bg-red-500 text-white border-red-500' : 'border-gray-300'}`}>
                                {size}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4 my-6">
                         <div className="flex border border-gray-400 rounded">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-red-500 hover:text-white rounded-l">-</button>
                            <input type="text" value={quantity} readOnly className="w-16 text-center border-l border-r border-gray-400" />
                            <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-r">+</button>
                        </div>
                        <button className="bg-red-500 text-white px-12 py-3 rounded hover:bg-red-600 transition">Buy Now</button>
                        <button className="p-3 border border-gray-400 rounded hover:bg-gray-100">
                            <FaRegHeart size={20} />
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
                    <ProductCard name="AK-900 Wired Keyboard" price="960" oldPrice="1160" rating={4.5} reviewCount={75} discount="-35%" image="Keyboard"/>
                    <ProductCard name="IPS LCD Gaming Monitor" price="370" oldPrice="400" rating={5} reviewCount={99} discount="-30%" image="Monitor"/>
                    <ProductCard name="RGB liquid CPU Cooler" price="160" oldPrice="170" rating={4.5} reviewCount={65} image="CPU Cooler"/>
                </div>
            </section>
            
          
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
                           
                            <div className="w-20 h-20 bg-gray-700 border border-gray-500"></div>
                            <div className="flex flex-col justify-between">
                                
                                <div className="h-9 w-28 bg-gray-800 border border-gray-600 rounded-sm"></div>
                                <div className="h-9 w-28 bg-gray-800 border border-gray-600 rounded-sm"></div>
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
        </div>
    );
};

export default Product;