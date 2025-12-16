import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

const Customer = mongoose.model("signup", customerSchema);
export default Customer;
