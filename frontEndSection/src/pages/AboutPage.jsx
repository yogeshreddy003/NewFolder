import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white font-sans">
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

      <div className="container mx-auto px-8 py-8 text-sm text-gray-500">
        <span
          onClick={() => navigate("/home")}
          className="hover:text-red-600 cursor-pointer"
        >
          Home
        </span>{" "}
        / <span className="text-black">About</span>
      </div>

      <section className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold">Our Story</h1>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2010, Exclusive is a brick-and-mortar retail company that
            transitioned to an online e-commerce platform in 2015. Headquartered
            in a small office, the company has grown to become a global leader in
            online retail. Exclusive now serves over 10,000 sellers and 300
            brands, delivering to over 1 million customers worldwide.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Exclusive has over 1 million diverse products, categorized into
            fashion, electronics, home goods, and more. Our commitment to quality
            and customer satisfaction is what drives us to deliver an
            unparalleled shopping experience.
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
          <p className="mt-2 text-sm">Monthly Product uploads</p>
        </div>

        <div className="bg-red-500 text-white p-8 rounded-lg text-center flex flex-col items-center">
          <div className="text-4xl font-bold">45.5k</div>
          <p className="mt-2 text-sm">Customer active in our site</p>
        </div>

        <div className="bg-red-500 text-white p-8 rounded-lg text-center flex flex-col items-center">
          <div className="text-4xl font-bold">25k</div>
          <p className="mt-2 text-sm">Annual gross sale in our site</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
