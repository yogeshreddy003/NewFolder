import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { employmodel } from "../models/employmodel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingUser = await employmodel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await employmodel.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await employmodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Email or Password is incorrect" });
    }

    const accessToken = jwt.sign(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Combine first and last name from the form
      user.name = `${req.body.firstName || ""} ${req.body.lastName || ""}`.trim();
      user.address = req.body.address || user.address;

      // Optional: Handle password update
      if (req.body.newPassword) {
        // First, check if the current password matches
        const isPasswordMatch = await bcrypt.compare(
          req.body.currentPassword,
          user.password
        );
        if (!isPasswordMatch) {
          return res
            .status(400)
            .json({ message: "Current password is incorrect" });
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
