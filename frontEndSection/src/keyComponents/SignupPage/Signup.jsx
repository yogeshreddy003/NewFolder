// SignUp.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function SignUp  () {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");


 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/signup", {
      name,
      email,
      password,
    });

    if (res.status === 201) {
      setError("");
      navigate("/login");
    } else {
      setError(res.data.message || "Failed to create an account");
    }
  } catch (err) {
    if (err.response && err.response.data) {
      setError(err.response.data.message);
    } else {
      setError("Something went wrong. Try again.");
    }
  }
};
     
            


  return (
    <div className="bg-white min-h-screen flex flex-col">
      
      

      
      <main className="flex flex-1 container mx-auto mt-8">
        
        <div className="flex-1 flex items-center">
          <form className="w-full max-w-sm mx-auto space-y-4">
            <h2 className="font-semibold text-2xl">Create an account</h2>
            <p className="text-gray-500">Enter your details below</p>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            

            <input
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Name"
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Email or Phone Number"
              type="email"
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Password"
              type="password"
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit} className="w-full bg-[#db4444] text-white py-2 rounded font-semibold" type="submit">
              Create Account
            </button>
            
            <div className="text-center text-gray-500">
              Already have account?{" "}
              <button type="button" onClick={() => navigate("/")} className="text-[#db4444] font-medium underline hover:no-underline">
                Log In
              </button>
            </div>
          </form>
        </div>
      </main>

      
      
    </div>
  );
};

export default SignUp;
