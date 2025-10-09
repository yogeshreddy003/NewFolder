import express from "express";
import mongoose from "mongoose";
import { protect } from "../middleware/authMiddleware.js";
import { cartmodel } from "../models/Schema.js";

const router03 = express.Router();

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router03.get("/", protect, async (req, res) => {
  try {
    const cart = await cartmodel.findOne({ userId: req.user._id }).populate({
      path: "items.productId",
      model: "product",
    });

    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
router03.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    let cart = await cartmodel.findOne({ userId });

    // If cart doesn't exist for user, create one
    if (!cart) {
      cart = await cartmodel.create({ userId, items: [{ productId, quantity }] });
      return res.status(201).json(cart);
    }

    // If cart exists, check if product is already in cart
    const itemIndex = cart.items.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      // Product exists in the cart, update the quantity
      let productItem = cart.items[itemIndex];
      productItem.quantity += quantity;
      cart.items[itemIndex] = productItem;
    } else {
      // Product does not exists in cart, add new item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
router03.delete("/:productId", protect, async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        let cart = await cartmodel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});



router03.put("/", protect, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Basic validation
    if (!mongoose.Types.ObjectId.isValid(productId) || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Invalid data provided." });
    }

    try {
        let cart = await cartmodel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

        if (itemIndex > -1) {
            // Update the quantity of the existing item
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        const updatedCart = await cart.save();
        
        // Populate the product details before sending back
        const populatedCart = await updatedCart.populate({
            path: "items.productId",
            model: "product",
            select: "name price imageUrl",
        });

        res.status(200).json(populatedCart);

    } catch (error) {
        console.error("PUT /api/cart Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router03;