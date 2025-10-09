import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // You already have this
import dotenv from "dotenv";
import { employmodel, constomermodel, productmodel } from "./models/Schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import router01 from "./routes/registerRoute.js";
import rateLimti from "express-rate-limit";
import router from "./routes/userRoute.js";
import router02 from "./routes/productRoute.js";
import router03 from "./routes/cartRoute.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// ** 1. DEFINE YOUR FRONTEND'S URL **
// Use your deployed frontend URL if you have one, otherwise use your local development URL
const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

// ** 2. CREATE CORS OPTIONS **
const corsOptions = {
  origin: frontendURL,
  optionsSuccessStatus: 200 // For legacy browser support
};

const authLimiter = rateLimti({
    windowMs : 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 login/signup attempts per 15 mins
    message: "Too many login attempts, please try again after 15 minutes."
});
const productLimiter = rateLimti({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Allow 100 requests per minute
    message: "Too many requests, please try again later."
});

const contactLimiter = rateLimti({
    windowMs : 10 * 60 * 1000,
    max: 10
});
// Rate limiters (no changes here)


app.use(express.json());

// ** 3. USE THE CORS OPTIONS **
// Replace your old app.use(cors()) with this line
app.use(cors(corsOptions));

app.use("/api/user", authLimiter, router);
app.use("/api/register", authLimiter, router01);
app.use("/api/products", productLimiter, router02);
app.use('/api/cart', productLimiter, router03);


app.use(
  rateLimti({
    windowMs: 1 * 60 * 1000,
    max: 30,
  })
);


app.post("/contact", contactLimiter,async (req, res) => {
  try {
    const signup = await constomermodel.create(req.body);
    res.json(signup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/addproduct", async (req, res) => {
  try {
    const { name, description, imageUrl, price } = req.body;
    const newProduct = {
      name,
      description,
      imageUrl,
      price: Number(price), 
    };
    const createdProduct = await productmodel.create(newProduct);
    res.status(201).json(createdProduct); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





mongoose
  .connect(process.env.mongodb_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));