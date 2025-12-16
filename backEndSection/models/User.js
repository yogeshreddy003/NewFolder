import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
