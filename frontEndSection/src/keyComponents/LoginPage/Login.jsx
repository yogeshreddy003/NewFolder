import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



function Login() {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const loginUser = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ✅ fixed casing
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("📩 Login response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ save JWT in cookies
      Cookies.set("jwt_token", data.accessToken, { expires: 1 }); // 1 day

      setUser(data.user);
      navigate("/home");
    } catch (err) {
      console.error(" Login error:", err.message);
      setError(err.message || "Login failed! Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear old errors
    await loginUser(email, password);
  };

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="hidden md:flex  w-96 justify-center items-center bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
          alt="Login Visual"
          className="rounded-lg"
        />
      </div>

      
      <div className="flex w-full md:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Log in to Exclusive</h2>
          <form  className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email "
              onChange={(e) => setEmail(e.target.value)}
              
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center">
            Don’t have an account?{" "}
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
