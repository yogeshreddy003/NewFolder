import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Inside your User Schema
password: {
  type: String,
  required: true,
  select: false // This hides it from queries by default
},
    address: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
