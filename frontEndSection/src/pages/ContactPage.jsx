import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://newfolder-biza.onrender.com/api/contact", {
        name,
        email,
        phone,
        message,
      })
      .then(() => {
        alert("Message sent successfully!");
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="font-sans bg-white">
      <div className="bg-black text-white py-3 text-sm">
        <div className="container mx-auto flex justify-center items-center px-4">
          <p className="flex-grow text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <a href="#" className="font-semibold underline ml-2">
              ShopNow
            </a>
          </p>
        </div>
      </div>

      <Header />

      <div className="container mx-auto py-8 px-4 text-sm text-gray-500">
        <span onClick={() => navigate("/home")} className="hover:text-red-600 cursor-pointer">
          Home
        </span>{" "}
        / <span className="text-black">Contact</span>
      </div>

      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <IoCallOutline size={24} className="text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold">Call To Us</h3>
                <p className="text-sm text-gray-600">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-sm">Phone: +8801234567890</p>
              </div>
            </div>

            <hr />

            <div className="flex items-start gap-4">
              <IoMailOutline size={24} className="text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold">Write To Us</h3>
                <p className="text-sm text-gray-600">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-sm">Emails: customer@exclusive.com</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-8 shadow-lg rounded-md border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows="8"
                className="w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="text-right">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-red-500 text-white px-10 py-3 rounded-md hover:bg-red-600 transition-colors"
                >
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
