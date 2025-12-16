import Product from "../models/Product.js";
// Import the isValidObjectId helper from Mongoose
import mongoose from "mongoose";

/**
 * Get all products
 * @route GET /api/products
 * @access Public
 */
export const getAllProducts = async (req, res) => {
  try {
    // Lean is good for performance when you only need JSON, not Mongoose document methods
    const products = await Product.find().lean();

    // Check if products array is empty
    if (!products || products.length === 0) {
      // Respond 200 with an empty array or 404. 
      // 200 with an empty array is often preferred for GET /list endpoints.
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

/**
 * Get single product by ID
 * @route GET /api/products/:id
 * @access Public
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Use mongoose.isValidObjectId for cleaner ID validation
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    // Using .lean() here too for performance if no saving is expected
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
    // Catch-all for database connection errors, etc.
    console.error("Error fetching product by ID:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

/**
 * Create a new product
 * @route POST /api/products
 * @access Private/Admin
 */
export const createProduct = async (req, res) => {
  try {
    // Destructure and trim the inputs immediately
    const { name, description, price, imageUrl } = req.body;
    const trimmedName = name ? name.trim() : name;
    const trimmedDescription = description ? description.trim() : description;
    const trimmedImageUrl = imageUrl ? imageUrl.trim() : imageUrl;

    // Validate required fields (using trimmed values)
    if (!trimmedName || !trimmedDescription || !price || !trimmedImageUrl) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, description, price, imageUrl",
      });
    }

    const numericPrice = Number(price);

    // Validate price is a positive number
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    // Check if product with same name already exists
    // Using a case-insensitive check is often better for names
    const existingProduct = await Product.findOne({
      name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
    });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: `Product with the name '${trimmedName}' already exists`,
      });
    }

    // Create the new product
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
    // Consider checking for Mongoose validation errors (err.name === 'ValidationError')
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: err.message,
    });
  }
};

/**
 * Update a product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;

    // Use mongoose.isValidObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const updateFields = {};

    // Validate and prepare update fields
    if (name) {
      const trimmedName = name.trim();
      // Check for duplicate name ONLY if the name is changing and not the current product's name
      const existingProduct = await Product.findOne({
        name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
        _id: { $ne: id }, // Exclude the current product from the check
      });

      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: `Another product with the name '${trimmedName}' already exists`,
        });
      }
      updateFields.name = trimmedName;
    }
    if (description) {
      updateFields.description = description.trim();
    }
    if (price !== undefined) {
      const numericPrice = Number(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be a positive number",
        });
      }
      updateFields.price = numericPrice;
    }
    if (imageUrl) {
      updateFields.imageUrl = imageUrl.trim();
    }

    // Optimization: Use findByIdAndUpdate to perform the operation in one go
    // { new: true } returns the updated document
    // { runValidators: true } ensures Mongoose schema validations run on the update
    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
      lean: true, // Return as a plain JavaScript object
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: err.message,
    });
  }
};

/**
 * Delete a product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Use mongoose.isValidObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    // findByIdAndDelete is efficient. It returns the document that was deleted.
    const product = await Product.findByIdAndDelete(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 200 status is generally used for successful deletion, but 204 (No Content) is also common.
    // We use 200 here to return the deleted product data.
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: err.message,
    });
  }
};

/**
 * Search products by name and description (case-insensitive)
 * @route GET /api/products/search?query=keyword
 * @access Public
 */
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid search query",
      });
    }

    const searchQuery = query.trim();

    // Using $regex with $options: "i" is correct for case-insensitive search.
    // $or is used to search across multiple fields.
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    }).lean();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.error("Error searching products:", err.message);
    res.status(500).json({
      success: false,
      message: "Error searching products",
      error: err.message,
    });
  }
};

/**
 * Get products by price range
 * @route GET /api/products/filter?minPrice=100&maxPrice=500
 * @access Public
 */
export const getProductsByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    if (!minPrice && !maxPrice) {
      // If neither is provided, treat it like getAllProducts or return a 400
      return res.status(400).json({
        success: false,
        message: "Please provide at least one of minPrice or maxPrice",
      });
    }

    const min = minPrice !== undefined ? Number(minPrice) : 0;
    // Use a large number for max if not provided, assuming no practical upper limit
    const max = maxPrice !== undefined ? Number(maxPrice) : Infinity;

    if (
      isNaN(min) ||
      isNaN(max) ||
      min < 0 ||
      (max !== Infinity && max < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "minPrice and maxPrice must be non-negative numbers",
      });
    }

    if (min > max) {
      return res.status(400).json({
        success: false,
        message: "minPrice cannot be greater than maxPrice",
      });
    }

    // Build the query object dynamically
    const priceQuery = {};
    if (minPrice !== undefined) {
      priceQuery.$gte = min;
    }
    if (maxPrice !== undefined) {
      priceQuery.$lte = max;
    }

    const products = await Product.find({
      price: priceQuery,
    }).lean();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.error("Error filtering products:", err.message);
    res.status(500).json({
      success: false,
      message: "Error filtering products",
      error: err.message,
    });
  }
};