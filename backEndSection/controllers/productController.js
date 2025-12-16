import Product from "../models/Product.js";

/**
 * Get all products
 * @route GET /api/products
 * @access Public
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    
    if (!products || products.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No products found" 
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
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

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
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
    const { name, description, price, imageUrl } = req.body;

    // Validate required fields
    if (!name || !description || !price || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, description, price, imageUrl"
      });
    }

    // Validate price is a positive number
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number"
      });
    }

    // Check if product with same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product with this name already exists"
      });
    }

    const newProduct = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      imageUrl: imageUrl.trim()
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: err.message
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

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Validate and update fields
    if (name) {
      product.name = name.trim();
    }
    if (description) {
      product.description = description.trim();
    }
    if (price) {
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be a positive number"
        });
      }
      product.price = Number(price);
    }
    if (imageUrl) {
      product.imageUrl = imageUrl.trim();
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: err.message
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

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product
    });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: err.message
    });
  }
};

/**
 * Search products by name
 * @route GET /api/products/search?query=keyword
 * @access Public
 */
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide a search query"
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    console.error("Error searching products:", err.message);
    res.status(500).json({
      success: false,
      message: "Error searching products",
      error: err.message
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

    if (!minPrice || !maxPrice) {
      return res.status(400).json({
        success: false,
        message: "Please provide both minPrice and maxPrice"
      });
    }

    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (isNaN(min) || isNaN(max) || min < 0 || max < 0) {
      return res.status(400).json({
        success: false,
        message: "minPrice and maxPrice must be positive numbers"
      });
    }

    if (min > max) {
      return res.status(400).json({
        success: false,
        message: "minPrice cannot be greater than maxPrice"
      });
    }

    const products = await Product.find({
      price: { $gte: min, $lte: max }
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    console.error("Error filtering products:", err.message);
    res.status(500).json({
      success: false,
      message: "Error filtering products",
      error: err.message
    });
  }
};
