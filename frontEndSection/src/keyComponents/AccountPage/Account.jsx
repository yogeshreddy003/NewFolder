import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; // 1. IMPORT AXIOS

import { FaRegHeart, FaShoppingCart,FaSignOutAlt } from 'react-icons/fa';
import Footer from "../../components/Footer.jsx";

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
  
  // 2. ADD STATE FOR MESSAGES AND LOADING
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token cookie
    Cookies.remove('jwt_token');
    // Redirect the user to the login page
    navigate('/login');
  };

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentUser = decodedToken.user;
        const [firstName = '', lastName = ''] = currentUser.name.split(' ');

        setForm(prevForm => ({
          ...prevForm,
          firstName,
          lastName,
          email: currentUser.email,
          // We will fetch address separately or assume it's not in the token
        }));
      } catch (error) {
        console.error("Failed to decode token:", error);
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3. IMPLEMENT THE SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Password confirmation check
    if (form.newPassword && form.newPassword !== form.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    
    try {
      const token = Cookies.get('jwt_token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const body = {
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
      };

      // Only include password fields if a new password is provided
      if (form.newPassword && form.currentPassword) {
          body.newPassword = form.newPassword;
          body.currentPassword = form.currentPassword;
      }

      await axios.put(
        'https://newfolder-biza.onrender.com/api/user/profile',
        body,
        config
      );
      
      setMessage('Profile updated successfully!');
      // Clear password fields after successful update
      setForm(prev => ({...prev, currentPassword: '', newPassword: '', confirmNewPassword: ''}));

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header section... no changes here */}
      <header className="flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-red-600">Exclusive</h1>
        <nav className="flex gap-6">
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/home")}>Home</a>
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/contact")}>Contact</a>
          <a href="#" className="hover:text-red-600" onClick={() => navigate("/about")}>About</a>
        </nav>
        <div className="flex items-center space-x-6">
          <a href="#"><FaRegHeart size={22} /></a>
          <a href="#"><FaShoppingCart size={22} /></a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-red-600 size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <a onClick={handleLogout}  href='#'><FaSignOutAlt size = {24}/> <a className='text-sm p-2'>Logout</a> </a>

        </div>
        
        
      </header>
      
      <div className="max-w-6xl mx-auto my-8 w-full px-4">
        <div className="mb-10">
          <span className="font-semibold text-base text-gray-700">Welcome,</span>
          <span className="text-red-500 font-semibold">{` ${form.firstName}!`}</span>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <aside className="w-full md:w-56 mb-8 md:mb-0 text-sm">
            {/* Aside menu... no changes here */}
          </aside>
          
          <main className="w-full flex-1 bg-white rounded shadow p-4 md:p-8">
            <h2 className="text-lg font-semibold mb-6 text-red-500">Edit Your Profile</h2>
            
            {/* 4. DISPLAY SUCCESS AND ERROR MESSAGES */}
            {message && <div className="mb-4 text-center p-2 rounded bg-green-100 text-green-800">{message}</div>}
            {error && <div className="mb-4 text-center p-2 rounded bg-red-100 text-red-800">{error}</div>}
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="bg-gray-100 border rounded w-full px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="bg-gray-100 border rounded w-full px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" name="email" value={form.email} readOnly className="bg-gray-200 border rounded w-full px-4 py-2 cursor-not-allowed" />
              </div>
              
              
              <div className="col-span-1 md:col-span-2 mt-2">
                <h3 className="text-base font-semibold mb-4 text-gray-700">Password Changes</h3>
                <div className="mb-4">
                  <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} placeholder="Current Password" className="bg-gray-100 border rounded w-full px-4 py-2" />
                </div>
                <div className="mb-4">
                  <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="New Password" className="bg-gray-100 border rounded w-full px-4 py-2" />
                </div>
                <div className="mb-6">
                  <input type="password" name="confirmNewPassword" value={form.confirmNewPassword} onChange={handleChange} placeholder="Confirm New Password" className="bg-gray-100 border rounded w-full px-4 py-2" />
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 flex justify-end gap-4">
                <button type="button" className="py-2 px-6 rounded border border-gray-400 text-gray-700 font-medium bg-white hover:bg-gray-100 transition" onClick={() => navigate('/home')}>Cancel</button>
                <button type="submit" disabled={loading} className="py-2 px-6 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:bg-gray-400">
                  {loading ? 'Saving...' : 'Save Changes'}
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