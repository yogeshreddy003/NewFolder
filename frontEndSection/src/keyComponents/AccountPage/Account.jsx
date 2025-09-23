import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSearch, FaRegHeart, FaShoppingCart, FaRegUserCircle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import { FiMenu, FiX } from "react-icons/fi";
export default function EditProfile() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="min-h-screen  flex flex-col">
    
      {/* Announcement Bar */}
<div className="bg-black text-white py-3 text-sm">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center px-4">
    <p className="flex-grow text-center sm:text-left">
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
      <a href="#" className="font-semibold underline ml-2">ShopNow</a>
    </p>
    <div className="flex items-center space-x-1 mt-2 sm:mt-0">
      {/* Optional promo icons or controls */}
    </div>
  </div>
</div>

{/* Header / Navbar */}
<header className="w-full shadow bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 relative">
        
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          {/* Hamburger - only visible on small screens */}
          <button
            className="sm:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
          {/* Logo */}
          <h1 className="text-2xl font-bold text-red-600">Exclusive</h1>
        </div>

        {/* Navigation */}
        <nav
          className={`
            flex-col sm:flex-row gap-4 sm:gap-6 
            ${isOpen ? "flex" : "hidden sm:flex"} 
            absolute sm:static top-full left-0 w-full sm:w-auto 
            bg-white sm:bg-transparent shadow sm:shadow-none 
            px-6 py-4 sm:p-0 z-20
          `}
        >
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/home")}>Home</a>
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/contact")}>Contact</a>
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/about")}>About</a>
        </nav>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a href="#"><FaRegHeart size={22} /></a>
          <a href="#"><FaShoppingCart size={22} /></a>
        </div>
      </div>
    </header>


     
      <div className="max-w-6xl mx-4 my-8">
        <nav className="text-sm text-gray-500 mb-4">
          Home &nbsp; / &nbsp; <span className="font-medium text-black">My Account</span>
        </nav>
        <div className="mb-10">
          <span className="font-semibold text-base text-gray-700">Welcome!</span>
          <span className="text-red-500 font-semibold"></span>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
      
          <aside className="w-full md:w-56 mb-8 md:mb-0 text-sm">
            <div className="mb-6">
              <span className="font-semibold mb-2 block">Manage My Account</span>
              <ul>
                <li className="text-red-500 font-medium">My Profile</li>
                <li className="text-gray-700 mt-2">Address Book</li>
                <li className="text-gray-700 mt-2">My Payment Options</li>
              </ul>
            </div>
            <div className="mb-6">
              <span className="font-semibold mb-2 block">My Orders</span>
              <ul>
                <li className="text-gray-700 mt-2">My Returns</li>
                <li className="text-gray-700 mt-2">My Cancellations</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold mb-2 block">My Wishlist</span>
            </div>
          </aside>

         
          <main className="w-full flex-1 bg-white rounded shadow p-4 md:p-8">
            <h2 className="text-lg font-semibold mb-6 text-red-500">Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="border rounded w-full px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="border rounded w-full px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border rounded w-full px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="border rounded w-full px-4 py-2"
                />
              </div>
             
              <div className="col-span-2 mt-2">
                <h3 className="text-base font-semibold mb-4 text-gray-700">Password Changes</h3>
                <div className="mb-4">
                  <input
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    placeholder="Current Password"
                    className="border rounded w-full px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="border rounded w-full px-4 py-2"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={form.confirmNewPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    className="border rounded w-full px-4 py-2"
                  />
                </div>
              </div>
             
              <div className="col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  className="py-2 px-6 rounded border border-gray-400 text-gray-700 font-medium bg-white hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>

     
      <Footer />
    </div>
  );
}
