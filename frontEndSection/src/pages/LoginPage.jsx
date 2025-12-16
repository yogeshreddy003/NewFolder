import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async (email, password) => {
    try {
      const res = await fetch("https://newfolder-biza.onrender.com/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      Cookies.set("jwt_token", data.accessToken, { expires: 1 });
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed! Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
      <div className="hidden md:flex w-96 justify-center items-center bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
          alt="Login Visual"
          className="rounded-lg"
        />
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Log in to Exclusive</h2>
          <form className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center">
            Don't have an account?{" "}
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
