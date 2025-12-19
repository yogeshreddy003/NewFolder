import Product from "../models/product.js";

import mongoose from "mongoose";


export const getAllProducts = async (req, res) => {
  try {
   
    const products = await Product.find().lean();

    
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.error("Error fetching all products:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error fetching products",
      error: err.message,
    });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    
    console.error("Error fetching product by ID:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


export const createProduct = async (req, res) => {
  try {
   
    const { name, description, price, imageUrl } = req.body;
    const trimmedName = name ? name.trim() : name;
    const trimmedDescription = description ? description.trim() : description;
    const trimmedImageUrl = imageUrl ? imageUrl.trim() : imageUrl;

   
    if (!trimmedName || !trimmedDescription || !price || !trimmedImageUrl) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, description, price, imageUrl",
      });
    }

    const numericPrice = Number(price);

   
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

   
    const existingProduct = await Product.findOne({
      name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
    });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: `Product with the name '${trimmedName}' already exists`,
      });
    }

    
    const newProduct = await Product.create({
      name: trimmedName,
      description: trimmedDescription,
      price: numericPrice,
      imageUrl: trimmedImageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: err.message,
    });
  }
};











