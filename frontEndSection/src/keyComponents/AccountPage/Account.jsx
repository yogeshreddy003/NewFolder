import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
 

import { FaRegHeart, FaShoppingCart,FaSignOutAlt } from 'react-icons/fa';
import Footer from "../../components/Footer.jsx";

export default function EditProfile() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    
  });
  
 


  const navigate = useNavigate();

  

useEffect(() => {
  const token = Cookies.get("jwt_token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const decoded = jwtDecode(token);

    
    if (!decoded?.user || !decoded.user.email) {
      throw new Error("Invalid token structure");
    }

    const { name, email } = decoded.user;

    const [firstName = "", lastName = ""] = (name || "").split(" ");

    setForm(prev => ({
      ...prev,
      firstName,
      lastName,
      email
    }));

  } catch (err) {
    console.error("Token decode failed:", err);
    Cookies.remove("jwt_token");
    navigate("/login");
  }
}, [navigate]);






  const handleLogout = () => {
    
    Cookies.remove('jwt_token');
    
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-red-600">Exclusive</h1>
        <nav className="flex gap-6">
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/home")}>Home</a>
          <a href="#" className="hover:text-red-600" >Contact</a>
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/about")}>About</a>
        </nav>
        <div className="flex items-center space-x-6">
          <a href="#"><FaRegHeart size={22} /></a>
          <a href="#"><FaShoppingCart size={22} /></a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-red-600 size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-red-600"
              >
                <FaSignOutAlt size={22} />
                <span className="text-sm">Logout</span>
          </button>

        </div>
        
        
      </header>
      
      <div className="max-w-6xl mx-auto my-8 w-full px-4">
        <div className="mb-10">
          <span className="font-semibold text-base text-gray-700">Welcome,</span>
          <span className="text-red-500 font-semibold">{` ${form.firstName}!`}</span>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <aside className="w-full md:w-56 mb-8 md:mb-0 text-sm">
           
          </aside>
          
          <main className="w-full flex-1 bg-white rounded shadow p-4 md:p-8">
            
            
            
            
            
            
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}