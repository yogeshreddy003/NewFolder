import express from "express";
import { login } from "../login.js";
import { protect } from "../middleware/authMiddleware.js"; 
import { employmodel } from "../models/Schema.js";      
import bcrypt from "bcrypt";   

const router = express.Router();
router.post("/login", login);




router.put("/profile", protect, async (req, res) => {
  const user = await employmodel.findById(req.user._id);

  if (user) {
    // Combine first and last name from the form
    user.name = `${req.body.firstName || ''} ${req.body.lastName || ''}`.trim();
    user.address = req.body.address || user.address;

    // Optional: Handle password update
    if (req.body.newPassword) {
      // First, check if the current password matches
      const isPasswordMatch = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isPasswordMatch) {
          return res.status(400).json({ message: "Current password is incorrect" });
      }
      // Hash the new password and update it
      user.password = await bcrypt.hash(req.body.newPassword, 10);
    }
    
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;