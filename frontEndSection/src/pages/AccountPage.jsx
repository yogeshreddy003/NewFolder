import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AccountPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentUser = decodedToken.user;
        const [firstName = "", lastName = ""] = currentUser.name.split(" ");

        setForm((prevForm) => ({
          ...prevForm,
          firstName,
          lastName,
          email: currentUser.email,
        }));
      } catch (error) {
        console.error("Failed to decode token:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (form.newPassword && form.newPassword !== form.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get("jwt_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
      };

      if (form.newPassword && form.currentPassword) {
        body.newPassword = form.newPassword;
        body.currentPassword = form.currentPassword;
      }

      await axios.put(
        "https://newfolder-biza.onrender.com/api/user/profile",
        body,
        config
      );

      setMessage("Profile updated successfully!");
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while updating."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="max-w-6xl mx-auto my-8 w-full px-4">
        <div className="mb-10">
          <span className="font-semibold text-base text-gray-700">
            Welcome,
          </span>
          <span className="text-red-500 font-semibold">{` ${form.firstName}!`}</span>
        </div>

        <main className="w-full flex-1 bg-white rounded shadow p-4 md:p-8">
          <h2 className="text-lg font-semibold mb-6 text-red-500">
            Edit Your Profile
          </h2>

          {message && (
            <div className="mb-4 text-center p-2 rounded bg-green-100 text-green-800">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 text-center p-2 rounded bg-red-100 text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              disabled
              className="w-full border rounded px-4 py-2 bg-gray-100 focus:outline-none"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <hr />

            <div>
              <h3 className="font-semibold text-red-500 mb-4">
                Change Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  value={form.confirmNewPassword}
                  onChange={handleChange}
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}
