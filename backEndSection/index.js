import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import Customer from "./models/Customer.js";


dotenv.config();


const app = express();

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://shopbycommerse.vercel.app",
    frontendURL,
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};



const productLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 1000, 
  message: "Too many requests, please try again later.",
});

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 10,
  message: "Too many contact requests, please try again later.",
});


app.use(express.json());
app.use(cors(corsOptions));

//  ROUTES 
app.use("/api/user", userRoutes)

app.use("/api/products", productLimiter, productRoutes);
app.use("/api/cart", productLimiter, cartRoutes);

//  CONTACT ENDPOINT 
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const contact = await Customer.create(req.body);
    res.status(201).json({
      message: "Contact message received",
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DATABASE CONNECTION 
mongoose
  .connect(process.env.mongodb_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  
