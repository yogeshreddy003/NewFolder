import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => (
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
);

export default Footer;
