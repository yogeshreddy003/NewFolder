import mongoose from "mongoose";

const employSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Name is required']
    },
    email: {
        type: String,
        required:[true, 'Email is required'],
        unique: [true, 'Email must be unique']
    },
    password: {
        type: String,
        required:[true, 'Password is required']
    }
});
const constomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
});


const productSchema = new mongoose.Schema({
  name: { type: String,
     required: true },
  description: { type: String,
     required: true },
  price: { type: Number,
     required: true },
  imageUrl: { type: String,
     required: true },
});


const productmodel = mongoose.model('product', productSchema);



const employmodel = mongoose.model('projecttestings', employSchema);
const constomermodel = mongoose.model('signup', constomerSchema);


export {constomermodel,employmodel,productmodel};