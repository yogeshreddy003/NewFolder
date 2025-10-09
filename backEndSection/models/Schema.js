import mongoose from "mongoose";

const employSchema = new mongoose.Schema({
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
});
const constomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projecttestings", // This refers to your 'employmodel'
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // This refers to your 'productmodel'
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const productmodel = mongoose.model("product", productSchema);
const employmodel = mongoose.model("projecttestings", employSchema);
const constomermodel = mongoose.model("signup", constomerSchema);
const cartmodel = mongoose.model("cart", cartSchema);
export { constomermodel, employmodel, productmodel,cartmodel };
