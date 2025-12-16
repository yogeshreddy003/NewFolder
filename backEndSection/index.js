import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import customer from "./models/customer.js";


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// ** 1. DEFINE YOUR FRONTEND'S URL **
// Use your deployed frontend URL if you have one, otherwise use your local development URL
const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

// ** 2. CREATE CORS OPTIONS **
const corsOptions = {
  origin: frontendURL,
  optionsSuccessStatus: 200, // For legacy browser support
};

// ** 3. RATE LIMITERS **
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 login/signup attempts per 15 mins
  message: "Too many login attempts, please try again after 15 minutes.",
});

const productLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // Allow 1000 requests per minute
  message: "Too many requests, please try again later.",
});

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  message: "Too many contact requests, please try again later.",
});

// ** 4. MIDDLEWARE **
app.use(express.json());
app.use(cors(corsOptions));

// ** 5. ROUTES **
app.use("/api/user", authLimiter, userRoutes);
app.use("/api/products", productLimiter, productRoutes);
app.use("/api/cart", productLimiter, cartRoutes);

// ** 6. CONTACT ENDPOINT **
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const contact = await customer.create(req.body);
    res.status(201).json({
      message: "Contact message received",
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ** 7. DATABASE CONNECTION **
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✓ MongoDB connected"))
  .catch((err) => console.error("✗ MongoDB connection error:", err));

// ** 8. START SERVER **
app.listen(PORT, () => {
  console.log(`✓ Server started on port ${PORT}`);
  console.log(`✓ Frontend URL: ${frontendURL}`);
});
