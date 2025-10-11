import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../Cart/CartContext';
import Footer from '../Footer/Footer';
import { FaTrash } from 'react-icons/fa';
import { FaRegHeart, FaSignOutAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';

const CartPage = () => {
    const { cart, loading, removeFromCart, updateCartQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
            // Remove the authentication token cookie
            Cookies.remove('jwt_token');
            // Redirect the user to the login page
            navigate('/login');
          };
    

    if (loading) {
        return <div className="text-center py-20">Loading your cart...</div>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            
            <div className="flex flex-col min-h-screen">
                
                <div className="flex-grow text-center py-20">
                    <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
                    <button onClick={() => navigate('/home')} className="bg-red-500 text-white px-6 py-2 rounded">
                        Continue Shopping
                    </button>
                </div>
                <Footer />
            </div>
        );
    }
    
    const calculateSubtotal = () => {
        return cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="font-sans bg-gray-50">
            {/* You can add your standard Header component here if you like */}
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
                                    <a href="#" className="hover:text-red-600" onClick={()=> navigate("/home")}>Home</a>
                                    <a href="#" className="hover:text-red-600" onClick={() => navigate("/contact")}>Contact</a>
                                    <a href="#" className="hover:text-red-600" onClick={() => navigate("/about")}>About</a>
                                </nav>
                                <div className="flex items-center space-x-6">
                                    <a href="#"><FaRegHeart size={22} /></a>
                                    
                                    {/* FIXED SVG ATTRIBUTES HERE */}
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
            
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cart.items.map(item => (
                            <div key={item.productId._id} className="flex items-center bg-white p-4 rounded-lg shadow">
                                <img 
                                    src={item.productId.imageUrl || 'https://placehold.co/100x100/EEE/31343C?text=No+Image'} 
                                    alt={item.productId.name || 'Product'} 
                                    className="w-24 h-24 object-contain mr-4"
                                />
                                <div className="flex-grow">
                                    <h2 className="font-semibold">{item.productId.name || 'Unknown Product'}</h2>
                                    
                                    {/* 2. ADD QUANTITY CONTROLS */}
                                    <div className="flex items-center mt-2">
                                        <button 
                                            onClick={() => updateCartQuantity(item.productId._id, item.quantity - 1)}
                                            className="border rounded-md py-1 px-3 hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateCartQuantity(item.productId._id, item.quantity + 1)}
                                            className="border rounded-md py-1 px-3 hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">
                                        ${item.productId && item.productId.price ? (item.productId.price * item.quantity).toFixed(2) : '0.00'}
                                    </p>
                                    <button onClick={() => removeFromCart(item.productId._id)} className="text-red-500 hover:text-red-700 mt-2">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* ... (Order Summary div remains the same) */}
                    <div className="bg-white p-6 rounded-lg shadow h-fit">
                         <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
                          <div className="flex justify-between mb-2">
                             <span>Subtotal</span> <span>${calculateSubtotal()}</span>
                            </div> <div className="flex justify-between mb-6"> 
                                <span>Shipping</span> <span>Free</span> 
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-4"> 
                        <span>Total</span> <span>${calculateSubtotal()}</span> 
                    </div> <button className="w-full bg-red-500 text-white py-3 rounded mt-6 hover:bg-red-600"> Proceed to Checkout </button> </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;