import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  FaRegHeart, FaShoppingCart, FaRegUserCircle } from 'react-icons/fa';
import Footer from '../Footer/Footer';
const AddProduct = () => {
    const [name, setName] =useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [imageUrl, setImageUrl] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://newfolder-biza.onrender.com/addproduct', {name,price , description, imageUrl})
    .then(result => {console.log(result)
navigate("/home")})
      .catch(err => console.log(err));
}  
    return (
        <>
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
                    
                    <div className="flex items-center space-x-6">
                                        
                                        <a href="#"><FaRegHeart size={22} /></a>
                                        <a href="#"><FaShoppingCart size={22} /></a>
                                        <a href="#"><FaRegUserCircle size={22} onClick={() => navigate("/account")} /></a>
                                    </div>
                  </header>

           
           

            <main className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="md:col-span-1 p-8 shadow-lg rounded-md border border-gray-100">
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                
                                
                            </div>
                          
                        </div>
                        <hr className="my-8"/>
                        <div>
                           
                        </div>
                    </div>

                  
                    <div className="md:col-span-2 p-8 shadow-lg rounded-md border border-gray-100">
                        <form  >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <input type="text" placeholder="Product Name *" className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" onChange={(e) => setName(e.target.value)} />
                                <input type="number" placeholder="Product Price *" className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" onChange= {(e)=>setPrice(e.target.value)}  />
                                <input type="text" placeholder="Product image url *" className="bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" onChange= {(e)=>setImageUrl(e.target.value)}  />
                            </div>
                            <div className="mb-6">
                                <textarea placeholder="Product Description" rows="8" className="w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"  onChange={(e)=>setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="text-right">
                                <button type="submit" onClick={handleSubmit} className="bg-red-500 text-white px-10 py-3 rounded-md hover:bg-red-600 transition-colors">
                                    add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
        </>
    )

}

export default AddProduct;