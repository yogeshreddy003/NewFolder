import express from "express";
import { login, signup } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/profile", protect, updateProfile);

export default router;
