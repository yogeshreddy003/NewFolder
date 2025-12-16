import mongoose from "mongoose";

const employSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error
const User = mongoose.models.User || mongoose.model("User", employSchema);

export default User;
