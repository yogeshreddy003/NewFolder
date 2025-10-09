import express from "express";
import { productmodel } from "../models/Schema.js";

const router02 = express.Router();

// Route to get ALL products (e.g., /api/products)
router02.get("/", async (req, res) => {
  try {
    const products = await productmodel.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ msg: "No products found" });
    }
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to get a SINGLE product by its ID (e.g., /api/products/:id)
router02.get("/:id", async (req, res) => {
  try {
    const product = await productmodel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching single product:", err.message);
    res.status(500).send("Server Error");
  }
});

export default router02;